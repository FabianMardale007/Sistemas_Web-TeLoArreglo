import { supabase } from '@/lib/supabase';
import { CompanyList } from '@/components/CompanyList';

export default async function Home(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const q = typeof searchParams?.q === 'string' ? searchParams.q : '';

  // 1. Pedimos los datos a la tabla "Empresas" (Cámbialo a 'profesionales' si al final usaste ese nombre)
  const { data: empresas, error: errorEmpresas } = await supabase.from('empresas').select('*');
  const { data: profesionales, error: errorProfesionales } = await supabase.from('profesionales').select('*');

  // Si hay un error, lo mostramos en consola
  if (errorEmpresas) {
    console.error("Error cargando empresas:", errorEmpresas);
  }
  if (errorProfesionales) {
    console.error("Error cargando profesionales:", errorProfesionales);
  }

  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <h1 className="text-4xl font-bold text-center mb-10 text-[#1b4d70]">
        Servicios en Vitoria-Gasteiz
      </h1>

      {/* Cuadrícula para las tarjetas */}
      <CompanyList empresas={empresas || []} profesionales={profesionales || []} searchQuery={q} />
    </main>
  );
}
