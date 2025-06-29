import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-grow">
      {/* Seção hero */}

      <section className="bg-blue-50 py-12">
        <div className="container mx-auto flex flex-col gap-6 items-center">
          <h1 className="text-5xl font-bold">Receitas Deliciosas</h1>
          <p className="text-xl">Descubra receitas simples e saborosas para todas as ocasiões</p>

          <Link className="bg-blue-500 hover:bg-blue-700 transition-colors text-white font-bold rounded-lg px-3 py-2" href="/receitas">
            Ver todas as receitas
          </Link>
        </div>
      </section>

      {/* seção receitas em destaque */}
      <section className="py-12">
        <div className="flex flex-col items-center container mx-auto">
          <h2 className="text-lg font-bold">Receitas em destaque</h2>

          {/* TODO: cards de receita */}

          <Link className="flex text-blue-400 hover:text-blue-700 transition-colors" href="/receitas">
            Ver todas as receitas
            <ChevronRight />
          </Link>

        </div>
      </section>
    </main>
  );
}
