import RecipeCard from "@/components/RecipeCard";
import { recipes } from "../../lib/data";

export default function ReceitasPage(){
    return(
        <main className="flex-grow py-8">
            <div className="container mx-auto gap-8 px-4">
                <h1 className="text-3xl font-bold sm:text-4xl">Todas as receitas</h1>

                <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                   {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe}/>
                   ))}
                </div>
            </div>
        </main>
    )
}