export const validateEmail = (val: string) => {
  if (val.length >= 50) {
    return 'Email too long';
  } else if (/^[a-zA-Z0-9_]+$/.test(val)) return 'Invalid email format';
};
