const codes: { [key: string]: string } = {};

export const addCode = (code: string) => {
  codes[code] = code;
};

export const verifyCode = (code: string): boolean => {
  return !!codes[code];
};
