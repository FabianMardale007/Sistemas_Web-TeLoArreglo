import { supabase } from '@/lib/supabase';
import { CompanyList } from '@/components/CompanyList';

export default async function Home() {
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
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-600">
        Servicios en Vitoria-Gasteiz
      </h1>

      {/* Cuadrícula para las tarjetas */}
      <CompanyList empresas={empresas || []} profesionales={profesionales || []} />
    </main>
  );
}
