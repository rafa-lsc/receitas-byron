import { useFieldArray, useForm } from "react-hook-form";
import { Dialog, DialogHeader, DialogContent, DialogTitle } from "../ui/dialog";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  RecipeFormData,
  recipeSchema,
} from "@/lib/formValidationSchemas/recipeSchema";
import { Span } from "next/dist/trace";
import { Recipe } from "@/lib/data";
import { useEffect } from "react";

interface RecipeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (recipe: Omit<Recipe, "id"> | Recipe) => void;
  mode: "create" | "edit",
  recipe?: Recipe
}

const DEFAULT_VALUES: RecipeFormData = {
  title: "",
  category: "",
  description: "",
  image: "",
  prepTime: "",
  cookTime: "",
  servings: 1,
  ingredients: [{ value: "" }],
  instructions: [{ value: "" }],
};

export default function RecipeFormModal({
  isOpen,
  onClose,
  onSave,
  mode,
  recipe
}: RecipeFormModalProps) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<RecipeFormData>({
    resolver: yupResolver(recipeSchema),
    mode: "onSubmit",
    defaultValues: DEFAULT_VALUES,
  });

  const {
    fields: ingredientFields,
    append: appendIngredients,
    remove: removeIngredidents,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  const {
    fields: instructionFields,
    append: appendInstructions,
    remove: removeInstructions,
  } = useFieldArray({
    control,
    name: "instructions",
  });

  useEffect(() => {
    if(isOpen){
      if(mode === "edit" && recipe){
        reset({
          ...recipe,
          ingredients:recipe.ingredients.map((ing) => ({value: ing.value})),
          instructions:recipe.ingredients.map((inst) => ({value: inst.value}))
        })
      } else {
        reset(DEFAULT_VALUES)
      }
    }
  }, [mode, isOpen, recipe, reset])

  const onSubmit = (data: RecipeFormData) => {

    onSave(mode === "edit" && recipe ? {...data, id: recipe.id} : data);
    reset();
    onClose();
  };

  const inputStyle = "p-2 border border-zinc-200 rounded-md flex-grow w-full";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white min-w-2xl max-h-[90dvh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Nova receita" : "Editar Receita"}</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <div className="grid grid-cols-2 gap-2">
            {/* Título */}
            <div className="flex flex-col gap-1">
              <label htmlFor="title">Titulo</label>
              <input
                className={inputStyle}
                type="text"
                id="title"
                {...register("title")}
              />
              {errors.title && (
                <span className="text-sm text-red-500">
                  {errors.title.message}
                </span>
              )}
            </div>
            {/* Categoria */}
            <div className="flex flex-col gap-1">
              <label htmlFor="category">Categoria</label>
              <input
                className={inputStyle}
                type="text"
                id="category"
                {...register("category")}
              />
              {errors.category && (
                <span className="text-sm text-red-500">
                  {errors.category.message}
                </span>
              )}
            </div>
          </div>

          {/* Descrição */}
          <div className="flex flex-col gap-1">
            <label htmlFor="description">Descrição</label>
            <textarea
              className={inputStyle}
              id="description"
              {...register("description")}
            />
            {errors.description && (
              <span className="text-sm text-red-500">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* URL da Imagem */}
          <div className="flex flex-col gap-1">
            <label htmlFor="imageUrl">URL da imagem</label>
            <input
              type="text"
              className={inputStyle}
              id="imageUrl"
              placeholder="/placeholder.svg"
              {...register("image")}
            />
            {errors.image && (
              <span className="text-sm text-red-500">
                {errors.image.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2">
            {/* Tempo de Preparo */}
            <div className="flex flex-col gap-1">
              <label htmlFor="prepTime">Tempo de preparo</label>
              <input
                className={inputStyle}
                type="text"
                id="prepTime"
                placeholder="15 min"
                {...register("prepTime")}
              />
              {errors.prepTime && (
                <span className="text-sm text-red-500">
                  {errors.prepTime.message}
                </span>
              )}
            </div>

            {/* Tempo de Cozimento */}
            <div className="flex flex-col gap-1">
              <label htmlFor="cookTime">Tempo de cozimento</label>
              <input
                className={inputStyle}
                type="text"
                id="cookTime"
                placeholder="30 min"
                {...register("cookTime")}
              />
              {errors.cookTime && (
                <span className="text-sm text-red-500">
                  {errors.cookTime.message}
                </span>
              )}
            </div>

            {/* Porçoes */}
            <div className="flex flex-col gap-1">
              <label htmlFor="servings">Porções</label>
              <input
                className={inputStyle}
                type="number"
                id="servings"
                defaultValue={1}
                {...register("servings")}
              />
              {errors.servings && (
                <span className="text-sm text-red-500">
                  {errors.servings.message}
                </span>
              )}
            </div>
          </div>

          {/* Lista de Ingredientes */}
          <div className="flex flex-col gap-1">
            <label htmlFor="ingredients">Ingredientes</label>
            <div className="flex flex-col gap-1">
              {/* Conteúdo */}
              {ingredientFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 w-full">
                  <div className="flex flex-row gap-1">
                      <input
                        id="ingredients"
                        type="text"
                        className={inputStyle}
                        placeholder="Digite um ingrediente"
                        {...register(`ingredients.${index}.value`)}
                      />
                      {errors.ingredients?.[index]?.value && (
                        <span className="text-sm text-red-500">
                          {errors.ingredients?.[index].value.message}
                        </span>
                      )}
                  </div>
                  {ingredientFields.length > 1 && (
                    <button
                      type="button"
                      className="bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition-colors px-4 py-2 font-medium cursor-pointer"
                      onClick={() => removeIngredidents(index)}
                    >
                      Remover
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                className="bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition-colors px-4 py-2 font-medium w-fit cursor-pointer"
                onClick={() => appendIngredients({ value: "" })}
              >
                Adicionar ingrediente
              </button>
            </div>
          </div>

          {/* Lista de instruções*/}
          <div className="flex flex-col gap-1">
            <label htmlFor="instructions">Intruções</label>
            <div className="flex flex-col gap-1">
              {/* Conteúdo */}
              {instructionFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 w-full">
                  <div className="flex flex-row gap-1">
                    <textarea
                      id="instructions"
                      className={inputStyle}
                      placeholder="Digite uma instrução"
                      {...register(`instructions.${index}.value`)}
                    />
                    {errors.instructions?.[index]?.value && (
                      <span className="text-sm text-red-500">
                        {errors.instructions?.[index].value.message}
                      </span>
                    )}
                  </div>

                  {instructionFields.length > 1 && (
                    <button
                      type="button"
                      className="bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition-colors px-4 py-2 font-medium h-fit cursor-pointer"
                      onClick={() => removeInstructions(index)}
                    >
                      Remover
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                className="bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition-colors px-4 py-2 font-medium w-fit cursor-pointer"
                onClick={() => appendInstructions({ value: "" })}
              >
                Adicionar instrução
              </button>
            </div>
          </div>

          <div className="flex gap-2 self-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-white border border-zinc-300 rounded-md hover:bg-gray-100 transition-colors px-4 py-2 font-medium cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-black rounded-md text-white hover:bg-gray-800 transition-colors px-4 py-2 font-medium cursor-pointer"
            >
              {mode === "create" ? "Criar receita" : "Salvar alterações"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
