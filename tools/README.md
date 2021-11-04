# Checker for translations

## Build

```sh
> cd ./tools
> rm -rf dist &&  npx tsc --build
```

## Check

Logouts `Checkout` objects of

```js
interface Checkout {
  [key: string]: { // Locale
    missing?: string[]; // Missing, untranslated keys
    waste?: string[]; // Unnecessary, extra keys
    present?: string[]; // Found, present keys
    expected?: string[]; // Expected, required keys
  };
}
```

Sample

```sh
Check actions {
  'ru-RU': {
    missing: [
      'v12 deprecates `emitDistinctChangesOnly`',
      'v12 `APP_INITIALIZER` callback types',
      'v13 ng update',
      'TypeScript 4.4',
      'v13 node',
      'v13 routerLink',
      'v13 router loadChildren',
      'v13 service worker activated',
      'v13 service worker available',
      'v13 renderModuleFactory',
      'v13 forms status',
      'v13 router serializer',
      'v13 host binding',
      'v13 spy location',
      'v13 router URL replacement',
      'v13 removed symbols'
    ],
    waste: [
      'v12 deprecates `emitDistinctChangesOnly',
      'v12 `APP_INITIALIZER`'
    ]
  }
}
Check labels {
  'ru-RU': {
    missing: [
      'to combine AngularJS & Angular',
      'Basic Apps',
      'Medium Apps',
      'Advanced Apps',
      'for'
    ],
    waste: []
  }
}
```

### Arguments

- `--locale=<LOCALE>`
- `--verbose`

### All locales

```sh
> node ./tools/dist/tools/src/index.js
```

### Specific locale

```sh
>  node ./tools/dist/tools/src/index.js --locale=ru-RU
```
