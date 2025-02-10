/* Todo: Implment the functions below and then export them
      using ES6 syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

export let deepEquality = (obj1, obj2) => {
      if ((!obj1) || (!obj2))
            throw "Object does not exist"
      if ((typeof obj1 !== "object") || (typeof obj2 !== "object"))
            throw "Input needs to be of object type"
};

export let commonKeysValues = (obj1, obj2) => {
      if ((!obj1) || (!obj2))
            throw "Object does not exist"
      if ((typeof obj1 !== "object") || (typeof obj2 !== "object"))
            throw "Input needs to be of object type"
};

export let calculateObject = (object, func) => {
      let resultObj = {}
      if (!object)
            throw "Object does not exist"
      if (typeof object !== "object")
            throw `${object} needs to be an object`
      if (typeof func !== "function")
            throw `${func} needs to be a function`
      for (const [key, value] of Object.entries(object)) {
            if (typeof value !== "number") {
                throw `Value of "${key}" must be a valid number`;
            }
            const res = func(value)
            resultObj[key] = Math.sqrt(res).toFixed(2)
      }

      return resultObj
};
