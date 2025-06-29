import Image from "next/image";
import Link from "next/link";

export default function RecipeCard(){
    return(
        <Link href="">
            <div className="border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md  transition-shadow">
                <div className="relative h-48 w-full">
                    <Image 
                    src="/receitas/salada-caprese.png"
                    alt="Título da Receita"
                    fill
                    />
                </div>

                <div className="flex flex-col p-4 gap-2">
                    <h3 className="text-lg font-bold">Título da Receita</h3>
                    <p>Descrição da receita</p>
                </div>
            </div>
        </Link>
    )
}