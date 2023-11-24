/* eslint-disable @typescript-eslint/no-explicit-any */
export function ValitingEqualObjects(object1: any, object2: any): boolean {
  const ObjectKeys1 = Object.keys(object1) as Array<keyof any>;
  const ObjectKeys2 = Object.keys(object2) as Array<keyof any>;

  if (ObjectKeys1.length !== ObjectKeys2.length) {
    return false;
  }

  for (const key of ObjectKeys1) {
    const objectValue1 = object1[key];
    const objectValue2 = object2[key];

    if (objectValue1 !== objectValue2) {
      if (
        typeof objectValue1 === "object" &&
        typeof objectValue2 === "object"
      ) {
        if (!ValitingEqualObjects(objectValue1, objectValue2)) {
          return false;
        }
      } else {
        return false;
      }
    }
  }

  return true;
}
export function findDifferentValues(object1: any, object2: any): Record<string, [any, any]> {
  const differences: Record<string, [any, any]> = {};

  for (const key in object1) {
    const value1 = object1[key];
    const value2 = object2[key];

    if (value1 !== value2) {
      differences[key] = value2;
    }
  }

  return differences;
}

export function removeDuplicateValues(value: any) {
  const uniqueDates = Array.from(new Set(value));

  return uniqueDates
}

export function findModifiedProperties(objeto: any, objetoReferencia: any): Partial<any> {
  const modifiedProperties: Partial<any> = {};

  for (const key in objetoReferencia) {
    if (objetoReferencia.hasOwnProperty(key)) {
      const value = objeto[key];
      const referenceValue = objetoReferencia[key];

      if (key === "machines" && Array.isArray(value) && Array.isArray(referenceValue)) {
        if (!arraysAreEqual(value, referenceValue)) {
          modifiedProperties[key] = referenceValue;
        }
      } else if (value !== referenceValue) {
        modifiedProperties[key] = value;
      }
    }
  }

  return modifiedProperties;
}


function arraysAreEqual(array1: string[], array2: string[]): boolean {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }

  return true;
}

export const ArrayDifference = (array1:any, array2:any ) => {
  const findDifference = () => {
    const differentObjects: any[] = [];

    array1.forEach((obj1:any) => {
      if (!array2.some((obj2:any) => deepEqual(obj1, obj2))) {
        differentObjects.push(obj1);
      }
    });

    if (differentObjects.length === 0) {
      return null;
    } else {
      return differentObjects;
    }
  };

  const deepEqual = (obj1: any, obj2: any): boolean => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }

    return true;
  };

  const difference = findDifference();
  return difference
};

