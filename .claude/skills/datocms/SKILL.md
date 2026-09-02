---
name: datocms
description: This skill should be used when the user or an agent asks to "publish to DatoCMS", "create a DatoCMS record", "list DatoCMS models", "update a DatoCMS item", or interact with the DatoCMS Content Management API. Also invoked by the Content Engine agent when publishing approved blog posts to tomstagl.com.
version: 1.0.0
---

# DatoCMS Content Management

You are helping the user interact with DatoCMS via the Content Management API (CMA).

> **Primary caller:** The Content Engine agent uses this skill to publish approved blog posts to tomstagl.com. Always confirm content is approved before publishing.

## Setup

The DatoCMS CMA base URL is `https://site-api.datocms.com`.

**Required headers for every request:**
```
Authorization: Bearer $DATOCMS_API_TOKEN
Accept: application/json
X-Api-Version: 3
Content-Type: application/vnd.api+json
```

The API token must be in the environment variable `DATOCMS_API_TOKEN`. If it is not set, ask the user to provide it or set it with:
```
export DATOCMS_API_TOKEN=your_token_here
```

Check the token is available before making API calls:
```bash
echo $DATOCMS_API_TOKEN
```

## Operations

Based on the request, perform one or more of the following operations using `curl` via the Bash tool.

---

### 1. List all models (item types)

```bash
curl -s -X GET "https://site-api.datocms.com/item-types" \
  -H "Authorization: Bearer $DATOCMS_API_TOKEN" \
  -H "Accept: application/json" \
  -H "X-Api-Version: 3" | jq '.data[] | {id: .id, name: .attributes.name, api_key: .attributes.api_key}'
```

---

### 2. List records (optionally filtered by model)

```bash
# All records (paginated, max 500)
curl -s -X GET "https://site-api.datocms.com/items?page[limit]=100" \
  -H "Authorization: Bearer $DATOCMS_API_TOKEN" \
  -H "Accept: application/json" \
  -H "X-Api-Version: 3" | jq .

# Filter by model api_key or ID
curl -s -X GET "https://site-api.datocms.com/items?filter[type]=MODEL_API_KEY&page[limit]=100" \
  -H "Authorization: Bearer $DATOCMS_API_TOKEN" \
  -H "Accept: application/json" \
  -H "X-Api-Version: 3" | jq .
```

---

### 3. Create a new record

```bash
curl -s -X POST "https://site-api.datocms.com/items" \
  -H "Authorization: Bearer $DATOCMS_API_TOKEN" \
  -H "Accept: application/json" \
  -H "X-Api-Version: 3" \
  -H "Content-Type: application/vnd.api+json" \
  -d '{
    "data": {
      "type": "item",
      "relationships": {
        "item_type": {
          "data": { "type": "item_type", "id": "MODEL_ID" }
        }
      },
      "attributes": {
        "field_api_key": "value"
      }
    }
  }' | jq .
```

The response includes the new record's `id`. Save it if you need to publish immediately after.

---

### 4. Publish an existing record

```bash
curl -s -X POST "https://site-api.datocms.com/items/ITEM_ID/publish" \
  -H "Authorization: Bearer $DATOCMS_API_TOKEN" \
  -H "Accept: application/json" \
  -H "X-Api-Version: 3" | jq .
```

> Do NOT include a request body — the API rejects even an empty `{}`.

---

### 5. Create and immediately publish a record

Run the create command first, extract the `id` from the response, then run the publish command with that ID.

```bash
# Step 1: Create
ITEM_ID=$(curl -s -X POST "https://site-api.datocms.com/items" \
  -H "Authorization: Bearer $DATOCMS_API_TOKEN" \
  -H "Accept: application/json" \
  -H "X-Api-Version: 3" \
  -H "Content-Type: application/vnd.api+json" \
  -d '{
    "data": {
      "type": "item",
      "relationships": {
        "item_type": {
          "data": { "type": "item_type", "id": "MODEL_ID" }
        }
      },
      "attributes": {
        "field_api_key": "value"
      }
    }
  }' | jq -r '.data.id')

echo "Created item: $ITEM_ID"

# Step 2: Publish
curl -s -X POST "https://site-api.datocms.com/items/$ITEM_ID/publish" \
  -H "Authorization: Bearer $DATOCMS_API_TOKEN" \
  -H "Accept: application/json" \
  -H "X-Api-Version: 3" | jq .
```

---

### 6. Update an existing record

```bash
curl -s -X PUT "https://site-api.datocms.com/items/ITEM_ID" \
  -H "Authorization: Bearer $DATOCMS_API_TOKEN" \
  -H "Accept: application/json" \
  -H "X-Api-Version: 3" \
  -H "Content-Type: application/vnd.api+json" \
  -d '{
    "data": {
      "type": "item",
      "id": "ITEM_ID",
      "attributes": {
        "field_api_key": "new_value"
      }
    }
  }' | jq .
```

---

## Workflow

1. If the model ID is not specified, first **list models** to find the right one.
2. Confirm the field structure needed before creating records.
3. After creating, show the new record ID and its dashboard URL: `https://YOUR_PROJECT.admin.datocms.com/editor/item_types/MODEL_ID/items/ITEM_ID/edit`
4. Ask whether to publish immediately or leave as draft.

## Error handling

| Status | Meaning | Action |
|--------|---------|--------|
| `401 Unauthorized` | Token missing or invalid | Check `$DATOCMS_API_TOKEN` |
| `422 Unprocessable Entity` | Field validation failed | Check field names and types match model schema |
| `404 Not Found` | Wrong item or model ID | Verify IDs |
| `429 Too Many Requests` | Rate limited | Wait before retrying |

Always show the full error response body with `jq .` so the user can see what went wrong.
