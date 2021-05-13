const groupData = (key) => (array) =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});

export const groupBy = (arr) => {
  const groupByHash = groupData("hashtag");
  return groupByHash(arr);
};

export default groupBy;
