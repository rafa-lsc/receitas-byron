"use client";

import RecipeCard from "@/components/RecipeCard";
import type { Recipe } from "@/lib/data";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import RecipeFormModal from "@/components/RecipeFormModal";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import api from "@/lib/api";
import { toast } from "sonner";

export default function ReceitasPage() {
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await api.get("/recipes");

        setRecipes(response.data);
      } catch (error) {
        console.error("Erro ao requisitar as receitas", error);
        toast.error("Erro ao requisitar as receitas, tente novamente mais tarde")
      }
    };

    fetchRecipes();
  }, []);

  const handleOpenCreateModal = () => {
    setModalMode("create");
    setSelectedRecipe(undefined);
    setIsRecipeModalOpen(true);
  };

  const handleOpenEditModal = (recipe: Recipe) => {
    setModalMode("edit");
    setSelectedRecipe(recipe);
    setIsRecipeModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsRecipeModalOpen(false);
  };

  const handleSaveRecipe = async (recipedata: Omit<Recipe, "id"> | Recipe) => {
    try {
      if (modalMode === "create") {
        const response = await api.post("/recipes", recipedata);
        const newRecipe = response.data;
        setRecipes((prev) => [...prev, newRecipe]);
        toast.success("Receita criada com sucesso")
      } else {
        // modo "edit"
        const updatedRecipe = recipedata as Recipe;

        const response = await api.put(
          `/recipes/${updatedRecipe.id}`,
          updatedRecipe
        );
        setRecipes((prev) =>
          prev.map((recipe) =>
            recipe.id === updatedRecipe.id ? response.data : recipe
          )
        );
        toast.success("Receita editada com sucesso")
      }
      handleCloseModal();
      
    } catch (error) {
      console.error(
        `Erro ao ${modalMode === "create" ? "criar" : "editar"} a receita`,
        error
      );
      toast.error(`Erro ao ${modalMode === "create" ? "criar" : "editar"} a receita`)
    }
  };

  const handleOpenDeleteConfirmationModal = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsDeleteConfirmationModalOpen(true);
  };

  const handleDeleteRecipe = async () => {
    try {
      if (selectedRecipe) {
        await api.delete(`/recipes/${selectedRecipe.id}`)

        setRecipes((prev) =>
          prev.filter((recipe) => recipe.id !== selectedRecipe.id)
        );

        setIsDeleteConfirmationModalOpen(false);
        setSelectedRecipe(undefined);
      }
      toast.success("Receita excluida com sucesso")
    } catch (error) {
      console.error("Erro ao deletar receita", error)
      toast.error("Erro ao deletar a receita")
    }
  };

  return (
    <main className="flex-grow py-8">
      <div className="container mx-auto gap-8 px-4">
        <div className="flex justify-between w-full">
          <h1 className="text-3xl font-bold sm:text-4xl">Todas as receitas</h1>

          <button
            onClick={handleOpenCreateModal}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-black hover:bg-gray-900 transition-colors cursor-pointer"
          >
            <Plus size={16} />
            Nova receita
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onEdit={() => handleOpenEditModal(recipe)}
              onDelete={() => handleOpenDeleteConfirmationModal(recipe)}
            />
          ))}
        </div>
      </div>

      <RecipeFormModal
        isOpen={isRecipeModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveRecipe}
        mode={modalMode}
        recipe={selectedRecipe}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteConfirmationModalOpen}
        onClose={() => setIsDeleteConfirmationModalOpen(false)}
        onConfirm={handleDeleteRecipe}
        recipe={selectedRecipe}
      />
    </main>
  );
}
