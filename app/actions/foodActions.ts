"use server";
import { db } from "@/prisma/db";

// Skapa ett nytt matintag
export async function createFoodEntry(data: {
  name: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}) {
  return await db.foodEntry.create({
    data: {
      name: data.name,
      calories: data.calories,
      protein: data.protein,
      fat: data.fat,
      carbs: data.carbs,
    },
  });
}

// Ta bort ett matintag
export async function deleteFoodEntry(id: string) {
  return await db.foodEntry.delete({ where: { id } });
}

// Hämta alla matintag
export async function getAllFoodEntries() {
  return await db.foodEntry.findMany();
}
