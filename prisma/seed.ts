import { PrismaClient, Todo } from "@/generated/prisma";
import { db } from "./db";

const prisma = new PrismaClient();

async function main() {
  let mockedTodos: Todo[] = [
    { id: "68adb3200c2c50f13d0a64f7", text: "Feed the cat" },
    { id: "68adb3200c2c50f13d0a64f8", text: "Ignore the dog" },
    { id: "68adb3200c2c50f13d0a64f9", text: "Walk all the cats" },
  ];

  for (const { id, ...todo } of mockedTodos) {
    await db.todo.upsert({
      where: { id },
      update: todo,
      create: { id, ...todo },
    });
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
