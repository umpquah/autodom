export const smartJoin = (arr, conjunction) => {
  if (arr.length < 2)
    return arr.join("");
  const final = arr.slice(-2).join(` ${conjunction} `);
  return [...arr.slice(0, -2), final].join(", ");
}