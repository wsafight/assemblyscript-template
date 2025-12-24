import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      'build/**',
      'node_modules/**',
      'coverage/**',
      'dist/**',
      '*.wasm',
      'release/**',
      '*.lock',
      '*.lockb',
    ],
  },
  {
    files: ['assembly/**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
        // AssemblyScript globals
        i32: 'readonly',
        i64: 'readonly',
        f32: 'readonly',
        f64: 'readonly',
        bool: 'readonly',
        usize: 'readonly',
        ArrayBuffer: 'readonly',
        Uint8Array: 'readonly',
        Uint16Array: 'readonly',
        Uint32Array: 'readonly',
        Int8Array: 'readonly',
        Int16Array: 'readonly',
        Int32Array: 'readonly',
        Float32Array: 'readonly',
        Float64Array: 'readonly',
        NaN: 'readonly',
        Infinity: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      // Allow simple functions without explicit return type
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
  {
    files: ['tests/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        console: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
];
