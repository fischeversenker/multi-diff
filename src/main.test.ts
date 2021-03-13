import { diff } from './main';

describe('diff', () => {
  test('should return all properties that differ', () => {
    const a = { 
      id: 0,
      prop1: 1,
      prop2: 1,
      prop3: 'value'
    };
    const b = {
      id: 1,
      prop1: 1,
      prop2: 2,
      prop3: 'other value'
    };
    const c = {
      id: 2,
      prop1: 1,
      prop2: 3,
      prop3: 'value'
    };

    expect(diff(a, b, c)).toEqual({
      prop2: {
        0: 1,
        1: 2,
        2: 3
      },
      prop3: {
        0: 'value',
        1: 'other value',
        2: 'value'
      }
    });
  });

  test('should return no diff for equal nested objects', () => {
    const n = {
      propa: 42
    };
    const a = {
      id: 0,
      prop1: n
    };
    const b = {
      id: 1,
      prop1: n
    };

    expect(diff(a, b)).toEqual({});
  });

  test('should return diff for unequal nested objects', () => {
    const a = {
      id: 0,
      prop1: {
        prop11: 42
      }
    };
    const b = {
      id: 1,
      prop1: {
        prop11: 42
      }
    };

    expect(diff(a, b)).toEqual({
      prop1: {
        0: { prop11: 42 },
        1: { prop11: 42 }
      }
    });
  });

  test('should return no diff if given only one object', () => {
    const a = {
      id: 0,
      prop1: 42
    };

    expect(diff(a)).toEqual({});
  });

  test('should return no diff if given the same object twice', () => {
    const a = {
      id: 0,
      prop1: 42
    };

    expect(diff(a, a)).toEqual({});
  });
});

