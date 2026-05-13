import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ProfesionalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Fetch the professional
  const { data: profesional, error: errorProf } = await supabase
    .from('profesionales')
    .select('*')
    .eq('id', id)
    .single();

  if (errorProf || !profesional) {
    return notFound();
  }

  // Fetch the company
  const { data: empresa, error: errorEmpresa } = await supabase
    .from('empresas')
    .select('*')
    .eq('id', profesional.id_empresa)
    .single();

  // Fetch other professionals in the same company
  const { data: otrosProfesionales } = await supabase
    .from('profesionales')
    .select('*')
    .eq('id_empresa', profesional.id_empresa)
    .neq('id', profesional.id);

  if (errorEmpresa || !empresa) {
    // If somehow there's no company, still maybe show the professional, but our prompt implies the company is important
    console.error("Error fetching company", errorEmpresa);
  }

  return (
    <main className="min-h-screen py-12 bg-gray-50 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto px-4">
        
        {/* Nav */}
        <div className="mb-6">
          <Link href="/" className="text-[#1b4d70] hover:text-[#123650] font-medium inline-flex items-center transition">
            ← Volver al inicio
          </Link>
        </div>

        {/* Card Principal */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Header (Company Info) */}
          <div className="bg-[#1b4d70] text-white p-8 relative flex items-center justify-between overflow-hidden">
             <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
               {/* Decorative icon or abstract shape */}
               <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                 <path d="M12 2L2 22H22L12 2Z" />
               </svg>
             </div>
             <div className="relative z-10 flex items-center gap-6">
                {empresa?.foto_url && (
                  <img src={empresa.foto_url} alt={empresa?.nombre || "Empresa"} className="w-24 h-24 object-cover rounded-xl border-2 border-white/20 shadow-lg bg-white" />
                )}
                <div>
                   <span className="bg-[#123650] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3 inline-block">
                     Empresa
                   </span>
                   <h1 className="text-3xl font-bold mb-2">
                     {empresa?.nombre || "Empresa Desconocida"}
                   </h1>
                   <p className="text-white/80 text-lg">
                     {empresa?.servicio || "Servicio no especificado"}
                   </p>
                </div>
             </div>
          </div>

          {/* Body (Professional Info) */}
          <div className="p-8 md:p-12">
             <div className="flex flex-col md:flex-row gap-8 items-start">
               
               {/* Left column: Photo */}
               <div className="w-full md:w-1/3 flex flex-col items-center">
                 {profesional.foto_url ? (
                   <img 
                     src={profesional.foto_url} 
                     alt={profesional.nombre} 
                     className="w-48 h-48 object-cover rounded-full shadow-md border-4 border-white mb-4"
                   />
                 ) : (
                   <div className="w-48 h-48 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border-4 border-white shadow-md mb-4 text-6xl font-bold">
                     {profesional.nombre?.charAt(0) || 'P'}
                   </div>
                 )}
                 <div className="flex items-center space-x-2 bg-yellow-50 px-4 py-2 rounded-full border border-yellow-200">
                    <span className="text-yellow-500 font-bold text-lg">⭐</span>
                    <span className="text-yellow-700 font-bold">
                      {profesional.valoracion !== undefined ? `${profesional.valoracion} / 5.0` : 'Sin valorar'}
                    </span>
                 </div>
               </div>

               {/* Right column: Details */}
               <div className="w-full md:w-2/3">
                 <h2 className="text-4xl font-bold text-gray-900 mb-2">
                   {profesional.nombre}
                 </h2>
                 <p className="text-xl text-gray-500 mb-8 border-b pb-6">
                   Profesional Asociado
                 </p>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    {/* Precio */}
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <p className="text-sm text-gray-500 font-medium mb-1">Precio por hora</p>
                      <p className="text-2xl font-bold text-[#1b4d70]">
                        {profesional.precio_hora !== undefined ? `${profesional.precio_hora}€` : 'A convenir'}
                      </p>
                    </div>

                    {/* Horario */}
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <p className="text-sm text-gray-500 font-medium mb-1">Horario disponible</p>
                      <p className="text-lg font-bold text-gray-800">
                        {profesional.horario || 'No especificado'}
                      </p>
                    </div>
                 </div>

                 {/* Descripción */}
                 <div>
                   <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                      <span className="mr-2">📝</span> Sobre {profesional.nombre}
                   </h3>
                   <div className="prose prose-blue max-w-none text-gray-600 bg-gray-50 p-6 rounded-xl border border-gray-100">
                     {profesional.descripcion ? (
                       <p className="whitespace-pre-line leading-relaxed">{profesional.descripcion}</p>
                     ) : (
                       <p className="italic text-gray-400">Este profesional aún no ha añadido una descripción a su perfil.</p>
                     )}
                   </div>
                 </div>

                 {/* Botón de Contacto */}
                 <div className="mt-10">
                   <button className="w-full sm:w-auto bg-[#66a032] hover:bg-[#528228] text-white font-bold py-3 px-8 rounded-xl shadow-sm transition transform hover:-translate-y-0.5 text-lg">
                     Contactar ahora
                   </button>
                 </div>
                 
               </div>
             </div>
          </div>
          
        </div>

        {/* Otros Profesionales */}
        {otrosProfesionales && otrosProfesionales.length > 0 && (
          <div className="mt-12 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
              Otros profesionales en {empresa?.nombre}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {otrosProfesionales.map((prof) => (
                <Link href={`/profesional/${prof.id}`} key={prof.id} className="flex flex-col p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition transform duration-200 cursor-pointer block">
                  <div className="flex items-center mb-3">
                    {prof.foto_url ? (
                      <img src={prof.foto_url} alt={prof.nombre} className="w-12 h-12 rounded-full object-cover mr-3 border border-gray-100 shadow-sm" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-[#1b4d70]/10 flex items-center justify-center mr-3 text-[#1b4d70] font-bold shadow-sm">
                        {prof.nombre?.charAt(0) || 'P'}
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-gray-800 text-sm leading-tight">{prof.nombre || 'Profesional'}</p>
                      <p className="text-yellow-500 font-bold text-xs mt-0.5">
                        ⭐ {prof.valoracion !== undefined ? prof.valoracion : 'N/D'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-auto flex justify-between items-center pt-3 border-t border-gray-100">
                    <span className="text-gray-500 font-medium text-xs">Precio:</span>
                    <span className="text-[#1b4d70] font-bold text-sm">
                      {prof.precio_hora !== undefined ? `${prof.precio_hora}€/h` : 'A convenir'}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
