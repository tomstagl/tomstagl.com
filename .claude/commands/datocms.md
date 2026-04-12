# DatoCMS Content Management

You are helping the user interact with DatoCMS via the Content Management API (CMA) for **tomstagl.com**.

> **Primary caller:** The Content Engine agent uses this skill to publish approved blog posts. Always confirm content is approved before publishing.

---

## Setup — Token

The full-access token lives in `.env` as `DATO_CMS_FULL_ACCESSAPI_TOKEN` (NOT the read-only `DATO_CMS_API_TOKEN`). Load it before every session:

```bash
export DATOCMS_API_TOKEN=$(grep DATO_CMS_FULL_ACCESSAPI_TOKEN /Users/tom/code/tomstagl.com/.env | cut -d= -f2)
echo "Token loaded: ${DATOCMS_API_TOKEN:0:8}..."
```

**Required headers for every request:**
```
Authorization: Bearer $DATOCMS_API_TOKEN
Accept: application/json
X-Api-Version: 3
Content-Type: application/vnd.api+json   ← only on POST/PUT with body
```

**Base URL:** `https://site-api.datocms.com`

**Dashboard:** `https://tomstagl.admin.datocms.com`

---

## Schema — Hardcoded IDs (do not look these up, use them directly)

### Item type IDs
| Model | ID | API key | Is modular block |
|---|---|---|---|
| BlogPost | `233068` | `blogpost` | No (top-level) |
| Text block | `237121` | `text` | **Yes** |
| Image block | `236828` | `bild` | **Yes** |
| Separator | `236829` | `trennzeichen` | **Yes** |
| Quote | `237130` | `quote` | **Yes** |
| Code | `237350` | `code` | **Yes** |

### BlogPost field constraints
| Field | Type | Rules |
|---|---|---|
| `title` | string | required |
| `subtitle` | string | optional |
| `slug` | slug | required, unique across all blog posts |
| `abstract` | string | required, **min 100 chars, max 350 chars** |
| `blogimage` | file | optional but recommended — `{upload_id, alt, title, custom_data: {}, focal_point: null}` |
| `content` | modular | array of inline block objects (see below) |
| `seometatags` | seo | **required** — must include `title` and `description` |

### Modular block field names
| Block | Fields |
|---|---|
| Text | `section_title` (string, optional), `section` (markdown text) |
| Image | `bild` → `{upload_id, alt, title, custom_data: {}, focal_point: null}` |
| Separator | *(no fields)* |
| Quote | `quote` (text), `author` (string) |
| Code | `codeblock` (text), `language` (string) |

---

## Critical rules learned from production

1. **Modular blocks cannot be created standalone** — they only exist embedded inside the parent record. Pass them inline in the `content` array during `POST /items`. Never `POST /items` for a block type alone (returns `NOT_FOUND`).

2. **Publish uses `PUT`, not `POST`** — `PUT /items/{id}/publish` is correct. `POST /items/{id}/publish` returns `INVALID_ENDPOINT`.

3. **Always use Python for JSON encoding** — never build the payload inline in curl with `-d '{...}'`. Markdown content with backticks, em-dashes, apostrophes, and newlines breaks shell quoting. Write the payload to a temp file with Python.

4. **Always use `strict=False` when parsing responses** — DatoCMS echoes back markdown content that contains control characters. Python 3.7's default `json.loads` rejects these. Always use `json.loads(raw, strict=False)`.

5. **Use `--data-binary @/tmp/file.json`** — not `-d @file` or `-d "$(cat file)"`.

6. **`jq` is unreliable for response parsing** — use Python for all response parsing to avoid control character issues.

7. **SEO field is required** — omitting `seometatags` with `title` and `description` causes `VALIDATION_REQUIRED_SEO_FIELDS`.

8. **`filter[type]` URL-encode brackets** — use `filter%5Btype%5D=blogpost` in curl, not `filter[type]=blogpost`.

9. **Upload ID ≠ upload path** — after `POST /uploads`, the `data.id` in the response is the upload ID to use in image fields (a hash like `NW2S0rXNTxO4cWkN5VzsJQ`). Do NOT use the upload path from `/upload-requests`.

---

## Image Upload — 3-Step Flow

Images must be uploaded before creating a record. All three steps are required.

```python
# Full image upload helper — paste this into the Python script
import urllib.request, json, os

TOKEN = os.environ['DATOCMS_API_TOKEN']
BASE = "https://site-api.datocms.com"

def upload_image(local_path, filename, alt="", caption=""):
    """Upload a local image to DatoCMS. Returns the upload_id string."""
    headers = {
        "Authorization": f"Bearer {TOKEN}",
        "Accept": "application/json",
        "X-Api-Version": "3",
        "Content-Type": "application/vnd.api+json"
    }

    # Step 1: Request signed upload URL
    req = urllib.request.Request(
        f"{BASE}/upload-requests",
        data=json.dumps({"data": {"type": "upload_request", "attributes": {"filename": filename}}}).encode(),
        headers=headers, method="POST"
    )
    ctx = urllib.request.ssl._create_unverified_context()
    with urllib.request.urlopen(req, context=ctx) as r:
        resp = json.loads(r.read())
    upload_path = resp["data"]["id"]         # e.g. /27929/1234-filename.png
    signed_url = resp["data"]["attributes"]["url"]

    # Step 2: PUT file to signed URL (Cloudflare R2)
    with open(local_path, "rb") as f:
        file_data = f.read()
    put_req = urllib.request.Request(signed_url, data=file_data, method="PUT")
    put_req.add_header("Content-Type", "image/png")
    with urllib.request.urlopen(put_req, context=ctx) as r:
        pass  # 200 OK expected

    # Step 3: Register upload in DatoCMS
    payload = {"data": {"type": "upload", "attributes": {
        "path": upload_path,
        "default_field_metadata": {"en": {"alt": alt, "title": caption, "custom_data": {}}}
    }}}
    req = urllib.request.Request(
        f"{BASE}/uploads",
        data=json.dumps(payload).encode(),
        headers=headers, method="POST"
    )
    with urllib.request.urlopen(req, context=ctx) as r:
        resp = json.loads(r.read())
    return resp["data"]["id"]   # This is the upload_id to use in blogimage / bild fields
```

---

## Blog Post Creation — One-Shot Python Script

Use this template for every new blog post. Fill in the content variables at the top, run, done.

```python
#!/usr/bin/env python3
"""
One-shot blog post creation for tomstagl.com DatoCMS.
Fill in the variables below, then run.
"""
import json, os, subprocess, urllib.request, ssl

TOKEN = subprocess.check_output(
    "grep DATO_CMS_FULL_ACCESSAPI_TOKEN /Users/tom/code/tomstagl.com/.env | cut -d= -f2",
    shell=True).decode().strip()

BASE = "https://site-api.datocms.com"
CTX = ssl._create_unverified_context()
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Accept": "application/json",
    "X-Api-Version": "3",
    "Content-Type": "application/vnd.api+json"
}

# ─── FILL THESE IN ────────────────────────────────────────────────────────────

TITLE = "Post title here"
SUBTITLE = "Subtitle here"
SLUG = "url-slug-here"          # lowercase, hyphens, unique
ABSTRACT = "100–350 char excerpt shown on the blog list page. Must be at least 100 characters long."
SEO_TITLE = TITLE               # can override
SEO_DESC = ABSTRACT[:160]       # can override, max ~160 chars

HERO_IMAGE_PATH = None          # "/tmp/hero.png" or None
HERO_IMAGE_ALT = ""
HERO_IMAGE_CAPTION = ""

# ─── CONTENT BLOCKS ───────────────────────────────────────────────────────────
# Build with these helpers:
#   txt("Optional h2 heading", "Markdown body text")
#   img("/tmp/file.png", "filename.png", "alt text", "caption")
#   sep()    ← 3-dot separator
#   quote("quote text", "Author Name")
#   code("language", "code here")

def txt(heading, body):
    return {"type": "item",
            "relationships": {"item_type": {"data": {"type": "item_type", "id": "237121"}}},
            "attributes": {"section_title": heading, "section": body}}

def img(path, filename, alt="", caption=""):
    uid = _upload(path, filename, alt, caption)
    return {"type": "item",
            "relationships": {"item_type": {"data": {"type": "item_type", "id": "236828"}}},
            "attributes": {"bild": {"upload_id": uid, "alt": alt, "title": caption,
                                    "custom_data": {}, "focal_point": None}}}

def sep():
    return {"type": "item",
            "relationships": {"item_type": {"data": {"type": "item_type", "id": "236829"}}},
            "attributes": {}}

def quote(text, author=None):
    return {"type": "item",
            "relationships": {"item_type": {"data": {"type": "item_type", "id": "237130"}}},
            "attributes": {"quote": text, "author": author}}

def code(language, codeblock):
    return {"type": "item",
            "relationships": {"item_type": {"data": {"type": "item_type", "id": "237350"}}},
            "attributes": {"codeblock": codeblock, "language": language}}

CONTENT = [
    txt(None, "Intro paragraph here."),
    txt("Section Heading", "Section body here."),
    sep(),
    txt(None, "Closing paragraph here."),
]

# ─── ENGINE — do not edit below this line ─────────────────────────────────────

def _upload(local_path, filename, alt, caption):
    payload = {"data": {"type": "upload_request", "attributes": {"filename": filename}}}
    req = urllib.request.Request(f"{BASE}/upload-requests",
        data=json.dumps(payload).encode(), headers=HEADERS, method="POST")
    with urllib.request.urlopen(req, context=CTX) as r:
        resp = json.loads(r.read())
    upload_path = resp["data"]["id"]
    signed_url = resp["data"]["attributes"]["url"]

    with open(local_path, "rb") as f:
        file_data = f.read()
    put_req = urllib.request.Request(signed_url, data=file_data, method="PUT")
    put_req.add_header("Content-Type", "image/png")
    with urllib.request.urlopen(put_req, context=CTX) as r:
        pass

    payload = {"data": {"type": "upload", "attributes": {
        "path": upload_path,
        "default_field_metadata": {"en": {"alt": alt, "title": caption, "custom_data": {}}}
    }}}
    req = urllib.request.Request(f"{BASE}/uploads",
        data=json.dumps(payload).encode(), headers=HEADERS, method="POST")
    with urllib.request.urlopen(req, context=CTX) as r:
        resp = json.loads(r.read())
    return resp["data"]["id"]

def _api(method, path, body=None):
    data = json.dumps(body, ensure_ascii=False).encode("utf-8") if body else None
    req = urllib.request.Request(BASE + path, data=data, headers=HEADERS, method=method)
    with urllib.request.urlopen(req, context=CTX) as r:
        raw = r.read()
    return json.loads(raw, strict=False)

# Build payload
hero_image = None
if HERO_IMAGE_PATH:
    import os.path
    uid = _upload(HERO_IMAGE_PATH, os.path.basename(HERO_IMAGE_PATH), HERO_IMAGE_ALT, HERO_IMAGE_CAPTION)
    hero_image = {"upload_id": uid, "alt": HERO_IMAGE_ALT, "title": HERO_IMAGE_CAPTION,
                  "custom_data": {}, "focal_point": None}

payload = {"data": {
    "type": "item",
    "relationships": {"item_type": {"data": {"type": "item_type", "id": "233068"}}},
    "attributes": {
        "title": TITLE,
        "subtitle": SUBTITLE,
        "slug": SLUG,
        "abstract": ABSTRACT,
        "blogimage": hero_image,
        "content": CONTENT,
        "seometatags": {"title": SEO_TITLE, "description": SEO_DESC,
                        "image": None, "twitter_card": "summary_large_image", "no_index": False}
    }
}}

# Validate abstract length
assert 100 <= len(ABSTRACT) <= 350, f"Abstract must be 100–350 chars, got {len(ABSTRACT)}"

# Create as draft
print("Creating draft...")
resp = _api("POST", "/items", payload)
if isinstance(resp.get("data"), list):
    err = resp["data"][0]["attributes"]
    raise RuntimeError(f"Create failed: {err['code']} — {err.get('details')}")

item_id = resp["data"]["id"]
print(f"Draft created: {item_id}")
print(f"Preview: https://tomstagl.admin.datocms.com/editor/item_types/233068/items/{item_id}/edit")

# Publish
print("Publishing...")
resp = _api("PUT", f"/items/{item_id}/publish")
print(f"Published: https://tomstagl.com/blog/{SLUG}/")
```

---

## Listing and Fetching Records

```bash
# All blog posts (published)
curl -s "https://site-api.datocms.com/items?filter%5Btype%5D=blogpost&page%5Blimit%5D=50" \
  -H "Authorization: Bearer $DATOCMS_API_TOKEN" \
  -H "Accept: application/json" \
  -H "X-Api-Version: 3" | python3 -c "
import sys, json
data = json.loads(sys.stdin.read(), strict=False)['data']
for p in data:
    print(p['id'], p['attributes'].get('slug'), p.get('meta',{}).get('status'))
"

# All blog posts including drafts
curl -s "https://site-api.datocms.com/items?filter%5Btype%5D=blogpost&page%5Blimit%5D=50&nested=true" \
  -H "Authorization: Bearer $DATOCMS_API_TOKEN" \
  -H "Accept: application/json" \
  -H "X-Api-Version: 3" | python3 -c "
import sys, json
data = json.loads(sys.stdin.read(), strict=False)
for p in data['data']:
    print(p['id'], p['attributes'].get('slug','?'), p.get('meta',{}).get('status','?'))
"
```

---

## Publish / Unpublish

```bash
# Publish (PUT, no body)
curl -s -X PUT "https://site-api.datocms.com/items/ITEM_ID/publish" \
  -H "Authorization: Bearer $DATOCMS_API_TOKEN" \
  -H "Accept: application/json" \
  -H "X-Api-Version: 3"

# Unpublish
curl -s -X PUT "https://site-api.datocms.com/items/ITEM_ID/unpublish" \
  -H "Authorization: Bearer $DATOCMS_API_TOKEN" \
  -H "Accept: application/json" \
  -H "X-Api-Version: 3"
```

---

## Delete a Record

```bash
curl -s -X DELETE "https://site-api.datocms.com/items/ITEM_ID" \
  -H "Authorization: Bearer $DATOCMS_API_TOKEN" \
  -H "Accept: application/json" \
  -H "X-Api-Version: 3"
```

---

## Error Reference

| Code | Meaning | Fix |
|---|---|---|
| `NOT_FOUND` | Wrong item/type ID, or tried to create a modular block standalone | Use correct IDs from schema above; embed blocks inline in parent |
| `INVALID_ENDPOINT` | Wrong HTTP method | Publish is `PUT`, not `POST` |
| `VALIDATION_UNIQUE` | Slug already exists (even in hidden drafts) | Change the slug; phantom drafts can block slugs even when not visible |
| `VALIDATION_REQUIRED_SEO_FIELDS` | Missing `seometatags.title` or `.description` | Always include both fields |
| `VALIDATION_LENGTH` | `abstract` too short/long | Must be 100–350 chars |
| `INVALID_FIELD (bild)` | Wrong upload ID format | Use the hash ID from `POST /uploads` response, not the path from `/upload-requests` |
| `INVALID_ACCEPT_HEADER` | Missing `Accept: application/json` header | Always include this header |
