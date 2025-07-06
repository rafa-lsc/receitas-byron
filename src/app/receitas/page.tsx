"use client"

import RecipeCard from "@/components/RecipeCard";
import { recipes } from "../../lib/data";
import { Plus } from "lucide-react";
import { useState } from "react";
import RecipeFormModal from "@/components/RecipeFormModal";

export default function ReceitasPage(){
    const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false)

    return(
        <main className="flex-grow py-8">
            <div className="container mx-auto gap-8 px-4">
                <div className="flex justify-between w-full">
                    <h1 className="text-3xl font-bold sm:text-4xl">Todas as receitas</h1>

                    <button onClick={() => setIsRecipeModalOpen(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-black hover:bg-gray-800 transition-colors">
                        <Plus size={16}/>
                        Nova receita
                    </button>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                   {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe}/>
                   ))}
                </div>
            </div>

            <RecipeFormModal isOpen={isRecipeModalOpen} onClose={() => setIsRecipeModalOpen(false)} />
        </main>
    )
}