"use client";

import {
  createFoodEntry,
  deleteFoodEntry,
  getAllFoodEntries,
} from "@/app/actions/foodActions";
import { useEffect, useState } from "react";

type FoodEntry = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
};

export default function Home() {
  const [foods, setFoods] = useState<FoodEntry[]>([]);
  const [form, setForm] = useState({
    name: "",
    calories: "",
    protein: "",
    fat: "",
    carbs: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const dailyGoal = { calories: 2000, protein: 50, fat: 70, carbs: 300 };

  const totalCalories = foods.reduce((sum, f) => sum + f.calories, 0);
  const totalProtein = foods.reduce((sum, f) => sum + f.protein, 0);
  const totalFat = foods.reduce((sum, f) => sum + f.fat, 0);
  const totalCarbs = foods.reduce((sum, f) => sum + f.carbs, 0);

  const exceededCalories = totalCalories > dailyGoal.calories;
  const exceededProtein = totalProtein > dailyGoal.protein;
  const exceededFat = totalFat > dailyGoal.fat;
  const exceededCarbs = totalCarbs > dailyGoal.carbs;

  const excessCalories = totalCalories - dailyGoal.calories;
  const excessProtein = totalProtein - dailyGoal.protein;
  const excessFat = totalFat - dailyGoal.fat;
  const excessCarbs = totalCarbs - dailyGoal.carbs;

  useEffect(() => {
    async function fetchFoods() {
      const allFoods = await getAllFoodEntries();
      setFoods(allFoods);
    }
    fetchFoods();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    //Validation
    const numCalories = Number(form.calories);
    const numProtein = Number(form.protein);
    const numFat = Number(form.fat);
    const numCarbs = Number(form.carbs);

    if (
      isNaN(numCalories) ||
      isNaN(numProtein) ||
      isNaN(numFat) ||
      isNaN(numCarbs)
    ) {
      setError("All nutrition values must be numbers");
      return;
    }

    if (numCalories < 0 || numProtein < 0 || numFat < 0 || numCarbs < 0) {
      setError("Values cannot be negative");
      return;
    }
    setError(null);

    if (editingId) {
      // update existing entry (just client-side for nu)
      setFoods((prev) =>
        prev.map((f) =>
          f.id === editingId
            ? {
                ...f,
                name: form.name,
                calories: Number(form.calories),
                protein: Number(form.protein),
                fat: Number(form.fat),
                carbs: Number(form.carbs),
              }
            : f
        )
      );
      setEditingId(null);
    } else {
      const newEntry = await createFoodEntry({
        name: form.name,
        calories: Number(form.calories),
        protein: Number(form.protein),
        fat: Number(form.fat),
        carbs: Number(form.carbs),
      });
      setFoods([...foods, newEntry]);
    }

    setForm({ name: "", calories: "", protein: "", fat: "", carbs: "" });
  }

  async function handleDelete(id: string) {
    await deleteFoodEntry(id);
    setFoods(foods.filter((f) => f.id !== id));
  }

  const nutrientProgress = [
    {
      name: "Calories",
      total: totalCalories,
      goal: dailyGoal.calories,
      exceeded: exceededCalories,
      excess: excessCalories,
      unit: "kcal",
    },
    {
      name: "Protein",
      total: totalProtein,
      goal: dailyGoal.protein,
      exceeded: exceededProtein,
      excess: excessProtein,
      unit: "g",
    },
    {
      name: "Fat",
      total: totalFat,
      goal: dailyGoal.fat,
      exceeded: exceededFat,
      excess: excessFat,
      unit: "g",
    },
    {
      name: "Carbs",
      total: totalCarbs,
      goal: dailyGoal.carbs,
      exceeded: exceededCarbs,
      excess: excessCarbs,
      unit: "g",
    },
  ];

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
          value={form.calories}
          onChange={(e) => setForm({ ...form, calories: e.target.value })}
          className="w-full p-3 placeholder-gray-400 text-gray-800 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none"
        />
        {error && <p className="text-red-600 font-semibold mb-2">{error}</p>}
        <input
          name="protein"
          placeholder="Protein"
          value={form.protein}
          onChange={(e) => setForm({ ...form, protein: e.target.value })}
          className="w-full p-3 placeholder-gray-400 text-gray-800 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none"
        />
        {error && <p className="text-red-600 font-semibold mb-2">{error}</p>}
        <input
          name="fat"
          placeholder="Fat"
          value={form.fat}
          onChange={(e) => setForm({ ...form, fat: e.target.value })}
          className="w-full p-3 placeholder-gray-400 text-gray-800 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none"
        />
        {error && <p className="text-red-600 font-semibold mb-2">{error}</p>}
        <input
          name="carbs"
          placeholder="Carbs"
          value={form.carbs}
          onChange={(e) => setForm({ ...form, carbs: e.target.value })}
          className="w-full p-3 placeholder-gray-400 text-gray-800 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none"
        />
        {error && <p className="text-red-600 font-semibold mb-2">{error}</p>}
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition"
        >
          {editingId ? "Save" : "Add"}
        </button>
      </form>

      <section className="mt-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-green-700 mb-3">
          Intake today
        </h2>
        <ul className="space-y-2">
          {foods.map((f) => (
            <li
              key={f.id}
              className="bg-white shadow-sm border border-gray-200 rounded-xl p-3 flex justify-between"
            >
              <div>
                <span className="font-medium text-gray-700">{f.name}</span>
                <div className="text-sm text-gray-500">
                  {f.calories} kcal | {f.protein} g protein | {f.fat} g fat |{" "}
                  {f.carbs} g carbs
                </div>
              </div>
              <button
                type="button"
                className="bg-yellow-400 hover:bg-yellow-500 text-white py-1 px-3 rounded-lg text-sm"
                onClick={() => {
                  setForm({
                    name: f.name,
                    calories: String(f.calories),
                    protein: String(f.protein),
                    fat: String(f.fat),
                    carbs: String(f.carbs),
                  });
                  setEditingId(f.id);
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg text-sm"
                onClick={() => handleDelete(f.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {nutrientProgress.map((nutrient) => (
          <div key={nutrient.name} className="mt-6">
            <div
              data-testid={`progress-${nutrient.name.toLowerCase()}`}
              className="flex justify-between text-sm text-gray-700 mb-1"
            >
              <span>
                {nutrient.name}: {nutrient.total} {nutrient.unit} /{" "}
                {nutrient.goal} {nutrient.unit}
              </span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-500"
                style={{
                  width: `${Math.min(
                    (nutrient.total / nutrient.goal) * 100,
                    100
                  )}%`,
                }}
              ></div>
            </div>
            {nutrient.exceeded && (
              <p className="mt-2 text-red-600 font-semibold">
                You have exceeded your {nutrient.name.toLowerCase()} goal by{" "}
                {nutrient.excess} {nutrient.unit}
              </p>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
