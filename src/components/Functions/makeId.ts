export const makeid = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "1234567890";
  const id =
    characters[Math.floor(Math.random() * characters.length)] +
    characters[Math.floor(Math.random() * characters.length)] +
    numbers[Math.floor(Math.random() * numbers.length)] +
    numbers[Math.floor(Math.random() * numbers.length)] +
    numbers[Math.floor(Math.random() * numbers.length)] +
    numbers[Math.floor(Math.random() * numbers.length)];

  return id;
};
