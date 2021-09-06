module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './**/tsconfig.json',
  },
  ignorePatterns: ['*.js', '**/*.stories.js', 'next-env.d.ts'],
  plugins: ['import', 'react', '@typescript-eslint', 'sonarjs', 'prettier', 'jest', 'jsx-a11y'],
  extends: [
    'airbnb-typescript',
    'plugin:sonarjs/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jest/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  env: {
    'jest/globals': true,
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['/tests/**', '**/*.story.ts'] },
    ],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
  },
};
