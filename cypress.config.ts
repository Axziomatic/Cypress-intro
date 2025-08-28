import { spawn } from "child_process";
import { defineConfig } from "cypress";
import { MongoMemoryReplSet } from "mongodb-memory-server";
import waitOn from "wait-on";
import { Todo } from "./generated/prisma";
import { db } from "./prisma/db";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3100",
    // implement node event listeners here
    async setupNodeEvents(on, config) {
      //1) Skapa en in-memory databas (replica set vilket prisma kräver)
      const mongo = await MongoMemoryReplSet.create({ replSet: { count: 1 } });
      const dbUri = mongo.getUri("cypress-test");

      // 2) Starta Next.js-servern (på en annan port som ansluter till 1)
      const server = spawn(
        "npx",
        ["next", "dev", "--turbopack", "-p", "3100"],
        {
          env: {
            NODE_ENV: "test",
            DATABASE_URL: dbUri,
          },
          stdio: "inherit",
        }
      );

      // 3) Vänta på att Next.js servern är igång innan cypress kör vidare
      await waitOn({ resources: ["http://localhost:3100"], timeout: 60_000 });

      // 4) Städa upp processerna, dvs Mongo-databasen och Next.js-servern
      const cleanup = async () => {
        server.kill();
        await mongo.stop();
      };
      process.on("exit", cleanup);

      // 5) Reseeda databasen så att testerna blir oberoende av varandra

      on("task", {
        async reseed() {
          await db.todo.deleteMany();
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

          return null;
        },
      });
    },
  },
});
