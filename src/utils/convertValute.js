import roundTo from "./roundTo";

export default function convertValute(countA, priceA, priceB) {
  return roundTo((countA * priceA) / priceB, 4);
}
