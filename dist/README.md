# multi-diff

This tool allows to compute the difference between objects. There are plenty of other excellent tools to get the difference between objects, but most of them only work on two objects. This tool allows to compute the difference between however many objects you'd like.

The objects that are passed to `diff()` need to have an `id` property of type `string` or `number`. The `id`s are used to be able to tell which value belongs to which object.

## Installation
```sh
yarn add multi-diff
```
or
```sh
npm i multi-diff
```

## Usage
This tool can be used in both node and browser environments.

```ts
import { diff } from 'multi-diff';
// const { diff } = require('multi-diff');

const result = diff(
  {
    id: 0,
    prop1: 13,
    prop2: 'value'
  },
  {
    id: 1,
    prop1: 42,
    prop2: 'value'
  },
  {
    id: 'some-id',
    prop1: 7,
    prop2: 'value'
  }
);
// result = { prop1: { 0: 13, 1: 42, 'some-id': 7 } }
```

## Nested objects
`diff` internally uses a `Set` to keep track of property values (essentially a `===` comparison) so nested objects are shown as difference if they don't refer to the same object.

```ts
const a = {
  id: 0,
  prop1: { key: 'value' },
  prop2: 13
};

const b = {
  id: 1,
  prop1: { key: 'value' },
  prop2: 13
}

diff(a, b); // { prop1: { 0: { key: 'value' }, 1: { key: 'value' } } }

// shared object
const o = { key: 'value' };

const x = {
  id: 0,
  prop1: o,
  prop2: 13
};

const y = {
  id: 1,
  prop1: o,
  prop2: 42
};

diff(x, y); // { prop2: { 0: 13, 1: 42 } }
```

## Test
Run the tests with
```sh
yarn test
```
or
```sh
npm test
```
