/* eslint-disable */
const generateId = () => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);

  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

const objectCompare = (o1, o2, p) => {
  const properties = p || Object.keys(o1);
  return properties.filter(property => o1[property] !== o2[property]).length === 0;
};

export { generateId, objectCompare };
