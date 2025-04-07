export const checkID = (id) => {
    if (!id) throw 'You must provide an id to search for'
    if (typeof id !== 'string') throw `${id} must be a string`
    id = id.trim()
    if (id.length === 0)
        throw `${id} cannot be an empty string or just spaces`
    return id
}

export const checkString = (string) => {
    if (!string) throw 'You must provide a string'
    if (typeof string !== 'string') throw `${string} must be a string`
    string = string.trim()
    if (string.length === 0)
        throw `${string} cannot be an empty string or string with just spaces`
    return string
}

export const checkStringArray = (arr) => {
    if (!arr || !Array.isArray(arr))
      throw `You must provide an array of ${arr}`;
    for (let i in arr) {
      if (typeof arr[i] !== 'string' || arr[i].trim().length === 0) {
        throw `One or more elements in ${arr[i]} array is not a string or is an empty string`;
      }
      arr[i] = arr[i].trim();
    }

    return arr;
}