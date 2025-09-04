import { spawn, type ChildProcess } from "child_process";
import { defineConfig } from "cypress";
import { MongoMemoryReplSet } from "mongodb-memory-server";
import waitOn from "wait-on";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3100",
    // implement node event listeners here
    async setupNodeEvents(on, config) {
      //1) Skapa en in-memory databas (replica set vilket prisma kräver)
      const mongo = await MongoMemoryReplSet.create({ replSet: { count: 1 } });
      const dbUri = mongo.getUri("cypress-test");

      // 2) Starta Next.js-servern (på en annan port som ansluter till 1)
      let server: ChildProcess;
      try {
        server = spawn("npx", ["next", "dev", "--turbopack", "-p", "3100"], {
          env: {
            ...process.env,
            NODE_ENV: "test",
            DATABASE_URL: dbUri,
          },
          stdio: "inherit",
          shell: true, // <- viktig på Windows
        });
      } catch (error) {
        console.error("error");
        process.exit(1);
      }

      // 3) Vänta på att Next.js servern är igång innan cypress kör vidare
      await waitOn({ resources: ["http://localhost:3100"], timeout: 60_000 });

      // 4) Städa upp processerna, dvs Mongo-databasen och Next.js-servern
      const cleanup = async () => {
        server.kill();
        await mongo.stop();
      };
      on("after:run", cleanup);
      process.on("SIGTERM", cleanup);

      // 5) Reseeda databasen så att testerna blir oberoende av varandra
      process.env.DATABASE_URL = dbUri;
      on("task", {
        async reseed() {
          const { db } = await import("./prisma/db");
          await db.foodEntry.deleteMany();
          // const mockedFoods: FoodEntry[] = [
          //   {
          //     id: new ObjectId().toHexString(),
          //     name: "Apple",
          //     calories: 52,
          //     protein: 0.3,
          //     fat: 0.2,
          //     carbs: 14,
          //   },
          //   {
          //     id: new ObjectId().toHexString(),
          //     name: "Banana",
          //     calories: 89,
          //     protein: 1.1,
          //     fat: 0.3,
          //     carbs: 23,
          //   },
          //   {
          //     id: new ObjectId().toHexString(),
          //     name: "Carrot",
          //     calories: 41,
          //     protein: 0.9,
          //     fat: 0.2,
          //     carbs: 10,
          //   },
          // ];

          // for (const { id, ...food } of mockedFoods) {
          //   await db.foodEntry.upsert({
          //     where: { id },
          //     update: food,
          //     create: { id, ...food },
          //   });
          // }

          return null;
        },
      });
    },
  },
});
