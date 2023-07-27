const { round, pow } = Math;

export default function roundTo(num, precision = 2) {
  const step = pow(10, precision);

  return round(num * step) / step;
}
