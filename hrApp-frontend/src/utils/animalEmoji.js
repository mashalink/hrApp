const animalMap = {
  Owl: "🦉",
  Fox: "🦊",
  Cat: "🐱",
  Dog: "🐶",
  Bear: "🐻",
  Rabbit: "🐰",
  Swan: "🦢",
  Wolf: "🐺",
  Hedgehog: "🦔",
  Raven: "🪶",
  Tiger: "🐯",
  Elephant: "🐘",
  Lion: "🦁",
};

export function getAnimalEmoji(animalName) {
  if (!animalName) return "❓";
  return animalMap[animalName] || "❓";
}
