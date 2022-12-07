export const correctEnding = (num: number) => {
  const txt = ['иев', 'ия', 'ий'];
  const cases = [0, 2, 1, 1, 1, 0];
  return txt[num % 100 > 4 && num % 100 < 20 ? 0 : cases[num % 10 < 5 ? num % 10 : 5]];
};
