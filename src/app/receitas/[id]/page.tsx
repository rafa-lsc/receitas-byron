import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ReceitaPage () {
    return (
        <main className="flex-grow py-8">
            <div className="container mx-auto">
                <Link className="flex text-blue-500 hover:text-blue-700" href="receitas">
                    <ChevronLeft/>
                    Voltar para receitas
                </Link>

                <section>
                    {/* Imagem de Capa da receita */}
                    <div className="relative h-96 w-full">
                        <Image 
                        src=""
                        fill
                        alt="Titulo da Receita"

                        />
                    </div>

                    {/* Descriçao da receita */}
                    <div>
                        <h1>Titulo da receita</h1>
                        <p>Descrição</p>

                        {/* Infos de Preparo*/}
                        <div>
                            {/* TODO: componentes de info */}
                        </div>

                        {/* Colunas */}
                        <div>
                            {/* coluna dos ingredientes */}
                            <div>

                            </div>
                            {/* coluna do preparo */}
                            <div>
                               {/* TODO: componente de passo de preparo */} 
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </main>
    )
}