const palette = ['#D2BCA1', '#B7C7B1', '#D8A98F', '#B9B2D1', '#C8B889', '#A7C7C7'];

export function colorFromString(input = '') {
  const value = Array.from(input).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return palette[value % palette.length];
}
