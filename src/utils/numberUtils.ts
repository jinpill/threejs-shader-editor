export const parseNumber = <D>(arg: any, defaultValue: D) => {
  const number = Number(arg);
  if (isNaN(number)) return defaultValue;
  else return number;
};
