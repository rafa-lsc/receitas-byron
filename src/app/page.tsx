"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { recipes } from "../lib/data";
import RecipeCard from "@/components/RecipeCard";

export default function Home() {
  const featuredRecipes = recipes.slice(0,3)

  return (
    <main className="flex-grow">
      {/* Seção hero */}

      <section className="bg-blue-50 py-12">
        <div className="container mx-auto flex flex-col gap-6 items-center px-4 sm:px-0 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold">Receitas Deliciosas</h1>
          <p className="text-base sm:text-xl sm:p-2">Descubra receitas simples e saborosas para todas as ocasiões</p>

          <Link className="bg-blue-500 hover:bg-blue-700 transition-colors text-white font-bold rounded-lg px-3 py-2
           w-full max-w-xs sm:w-auto text-center" href="/receitas">
            Ver todas as receitas
          </Link>
        </div>
      </section>

      {/* seção receitas em destaque */}
        <section className="py-12">
        <div className="container mx-auto flex flex-col items-center gap-8 px-4">
          <h2 className="text-lg font-bold">Receitas em destaque</h2>

          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 lg:py-6">
            {featuredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} onEdit={function (): void {
                throw new Error("Function not implemented.");
              } }/>
            ))}
          </div>

          <Link className="flex text-blue-400 hover:text-blue-700 transition-colors" href="/receitas">
            Ver todas as receitas
            <ChevronRight />
          </Link>
        </div>
      </section>
    </main>
  );
}
