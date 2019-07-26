export const removeWhiteSpace = str => str.replace(/\s+/g, '');

export const addWhiteSpace = str => {
  const indexes = str.match(/[A-Z]/g);

  return indexes
    ? indexes
        .map(char => {
          const index = str.indexOf(char);
          return str.slice(0, index) + ' ' + str.slice(index);
        })
        .join(' ')
    : str;
};
