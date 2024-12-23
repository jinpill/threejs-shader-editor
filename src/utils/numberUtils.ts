export const parseNumber = (arg: any) => {
  const number = Number(arg);
  if (isNaN(number)) return;
  else return number;
};
