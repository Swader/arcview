// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const deeplog = function (obj: any): void {
  console.log(JSON.stringify(obj, null, 2));
};
