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
  const exceeded = totalCalories > dailyGoal.calories;
  const excessAmount = totalCalories - dailyGoal.calories;

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
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-green-200 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold text-green-700 text-center mb-4">
        Nutrition Tracker
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md space-y-4"
      >
        <input
          name="food"
          placeholder="Food"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-3 placeholder-gray-400 text-gray-800 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none"
        />
        <input
          name="calories"
          placeholder="Calories"
          type="number"
          value={form.calories}
          onChange={(e) => setForm({ ...form, calories: e.target.value })}
          className="w-full p-3 placeholder-gray-400 text-gray-800 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none"
        />
        <input
          name="protein"
          placeholder="Protein"
          type="number"
          value={form.protein}
          onChange={(e) => setForm({ ...form, protein: e.target.value })}
          className="w-full p-3 placeholder-gray-400 text-gray-800 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none"
        />
        <input
          name="fat"
          placeholder="Fat"
          type="number"
          value={form.fat}
          onChange={(e) => setForm({ ...form, fat: e.target.value })}
          className="w-full p-3 placeholder-gray-400 text-gray-800 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none"
        />
        <input
          name="carbs"
          placeholder="Carbs"
          type="number"
          value={form.carbs}
          onChange={(e) => setForm({ ...form, carbs: e.target.value })}
          className="w-full p-3 placeholder-gray-400 text-gray-800 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none"
        />
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition"
        >
          Add
        </button>
      </form>

      <section className="mt-8 w-full max-w-md">
        <h2 className="text-xl font-semibold text-orange-500 mb-3">
          Intake today
        </h2>
        <ul className="space-y-2">
          {foods.map((f) => (
            <li
              key={f.id}
              className="bg-white shadow-sm border border-gray-200 rounded-xl p-3 flex justify-between"
            >
              <span className="font-medium text-gray-700">{f.name}</span>
              <span className="text-gray-900">{f.calories} kcal</span>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <div
            data-testid="progress-calories"
            className="flex justify-between text-sm text-gray-700 mb-1"
          >
            <span>
              {totalCalories} / {dailyGoal.calories}
            </span>
          </div>
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{
                width: `${Math.min(
                  (totalCalories / dailyGoal.calories) * 100,
                  100
                )}%`,
              }}
            ></div>
          </div>
          <div>
            {exceeded && (
              <p className="mt-2 text-red-600 font-semibold">
                You have exceeded your calorie goal by {excessAmount} kcal
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
