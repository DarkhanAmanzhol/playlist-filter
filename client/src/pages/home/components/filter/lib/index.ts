export type OptionType = { label: string; value: string };

export const parseToOptionsArray = (array: string[]) => {
  // TODO: somehow displace any type!
  let options: (OptionType | any)[] = [];
  for (let i = 0; i < array.length; i++) {
    options.push({ value: array[i]!, label: array[i]! });
  }
  return options;
};
