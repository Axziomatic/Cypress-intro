import { db } from "./db";

async function main() {
  const mockedFoods = [
    { name: "Ägg", calories: 150, protein: 12, fat: 10, carbs: 1 },
    { name: "Banan", calories: 100, protein: 1, fat: 0, carbs: 27 },
  ];

  for (const food of mockedFoods) {
    await db.foodEntry.create({ data: food });
  }
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
