/* Todo: Implment the functions below and then export them
      using ES6 syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

export let deepEquality = (obj1, obj2) => {
      if ((!obj1) || (!obj2))
            throw "Object does not exist"
      if ((typeof obj1 !== "object") || (typeof obj2 !== "object") || (Array.isArray(obj1)) || (Array.isArray(obj2)))
            throw "Input needs to be of object type"

      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);
      
      if ((keys1.length !== keys2.length) || !(keys1.every(key => keys2.includes(key))))
            return false

      for (let key of keys1) {
            const val1 = obj1[key]
            const val2 = obj2[key];
    
            if (typeof val1 === "object" && typeof val2 === "object") {
                if (!deepEquality(val1, val2)) return false;
            } else if (val1 !== val2) {
                return false;
            }
      }
        
      return true;
};

export let commonKeysValues = (obj1, obj2) => {
      if ((!obj1) || (!obj2))
            throw "Object does not exist"
      if ((typeof obj1 !== "object") || (typeof obj2 !== "object") || (Array.isArray(obj1)) || (Array.isArray(obj2)))
            throw "Input needs to be of object type"

      let result = {};
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);
      
      keys1.forEach((key) => {
            if (keys2.includes(key)) {
                  const val1 = obj1[key];
                  const val2 = obj2[key];

                  if (val1 === val2) 
                        result[key] = val1;
                  else if (typeof val1 === 'object' && typeof val2 === 'object') {
                        let nested = true;
                        const nestedKeys1 = Object.keys(val1);
                        const nestedKeys2 = Object.keys(val2);

                        nestedKeys1.forEach((nestedKey) => {
                        if (nestedKeys2.includes(nestedKey)) {
                              if (val1[nestedKey] !== val2[nestedKey]) 
                                    nested = false;
                              else 
                                    result[nestedKey] = val1[nestedKey];
                        } else 
                              nested = false;
                        })
                        if (nested) 
                              result[key] = val1;
                  }
            }
      })

      return result;
};

export let calculateObject = (object, func) => {
      let resultObj = {}
      if (!object)
            throw "Object does not exist"
      if (typeof object !== "object" || Array.isArray(object))
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
