export interface Diffable {
  id: string | number;
  [key: string]: any;
}

export interface DiffResult {
  [key: string]: any;
}

export function diff(...objects: Diffable[]): DiffResult {
  const propsMap = new Map<string, Set<any>>();

  const hasNoId = (object: Diffable) => object.id === undefined || object.id === null;

  // make sure all given objects have an id
  if (objects.some(hasNoId)) {
    throw new Error('objects to diff need to have an id!');
  }

  // collect all properties from all objects
  objects.forEach(object => {
    Object.entries(object).forEach(([key, value]) => {
      let set = propsMap.get(key);
      if (!set) {
        set = new Set();
      }
      set.add(value);
      propsMap.set(key, set);
    });
  });

  // filter all properties that exist in more than one shape (except the id)
  // yields an array of all properties in which the objects differ
  const differentProps = Array.from(propsMap)
    .filter(([key, value]) => value.size > 1 && key !== 'id')
    .map(([key, value]) => key);

  return differentProps.reduce((acc, prop) => {
    acc[prop] = objects.reduce((propAcc, object) => {
      propAcc[object.id] = object[prop];
      return propAcc;
    }, {} as any);
    return acc;
  }, {} as any);
}

export default diff;
