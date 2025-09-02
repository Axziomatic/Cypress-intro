"use client";

import { db } from "@/prisma/db";
import { useState } from "react";

export default function Home() {
  type FoodEntry = NonNullable<
    Awaited<ReturnType<typeof db.foodEntry.findFirst>>
  >;

  const [foods, setFoods] = useState<FoodEntry[]>([]);
  const [form, setForm] = useState({
    name: "",
    calories: "",
    protein: "",
    fat: "",
    carbs: "",
  });

  const dailyGoal = { calories: 2000 };

  const totalCalories = foods.reduce((sum, f) => sum + f.calories, 0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFoods([
      ...foods,
      {
        id: "temp-" + crypto.randomUUID(), // tillfälligt ID för UI
        name: form.name,
        calories: Number(form.calories),
        protein: Number(form.protein),
        fat: Number(form.fat),
        carbs: Number(form.carbs),
      },
    ]);
    setForm({ name: "", calories: "", protein: "", fat: "", carbs: "" });
  }

  return (
    <main className="bg-slate-200 h-screen">
      <form onSubmit={handleSubmit}>
        <input
          name="food"
          placeholder="Food"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          name="calories"
          placeholder="Calories"
          type="number"
          value={form.calories}
          onChange={(e) => setForm({ ...form, calories: e.target.value })}
        />
        <input
          name="protein"
          placeholder="Protein"
          type="number"
          value={form.protein}
          onChange={(e) => setForm({ ...form, protein: e.target.value })}
        />
        <input
          name="fat"
          placeholder="Fat"
          type="number"
          value={form.fat}
          onChange={(e) => setForm({ ...form, fat: e.target.value })}
        />
        <input
          name="carbs"
          placeholder="Carbs"
          type="number"
          value={form.carbs}
          onChange={(e) => setForm({ ...form, carbs: e.target.value })}
        />
        <button type="submit">Add</button>
      </form>

      <h2>Intake today</h2>
      <ul>
        {foods.map((f) => (
          <li key={f.id}>
            {f.name} - {f.calories} kcal
          </li>
        ))}
      </ul>
      <div data-testid="progress-calories">
        {totalCalories} / {dailyGoal.calories}
      </div>
    </main>
  );
}
