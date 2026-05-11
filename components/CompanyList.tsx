"use client";

import { useState, useMemo } from 'react';
import { CompanyCard } from './CompanyCard';

export function CompanyList({ empresas, profesionales }: { empresas: any[], profesionales: any[] }) {
  const [expandedId, setExpandedId] = useState<number | string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [minRating, setMinRating] = useState<number>(0);

  // Obtener lista única de servicios
  const servicios = useMemo(() => {
    const s = new Set<string>();
    empresas?.forEach(empresa => {
      if (empresa.servicio) s.add(empresa.servicio);
    });
    return Array.from(s).sort();
  }, [empresas]);

  // Lógica combinada: Filtra por servicio Y por estrellas
  const empresasFiltradas = empresas?.filter(empresa => {
    const cumpleServicio = selectedService ? empresa.servicio === selectedService : true;
    
    // Aquí está el cambio: ahora busca "empresa.estrellas"
    const cumpleValoracion = (empresa.estrellas || 0) >= minRating;

    return cumpleServicio && cumpleValoracion;
  });

  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-[90rem] mx-auto px-6 md:px-12 lg:px-24">
      {/* Barra lateral de filtros */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 sticky top-6">
          
          {/* Bloque 1: Filtro por Servicio */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-800 border-b pb-2">Filtrar por Servicio</h3>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => { setSelectedService(null); setExpandedId(null); }}
                  className={`w-full text-left px-3 py-2 rounded-lg transition text-sm ${selectedService === null ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  Todos los servicios
                </button>
              </li>
              {servicios.map(servicio => (
                <li key={servicio}>
                  <button
                    onClick={() => { setSelectedService(servicio); setExpandedId(null); }}
                    className={`w-full text-left px-3 py-2 rounded-lg transition text-sm ${selectedService === servicio ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    {servicio}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Bloque 2: Filtro por Valoración */}
          <div className="mt-8">
            <h3 className="font-bold text-lg mb-4 text-gray-800 border-b pb-2">Filtrar por Valoración</h3>
            <ul className="space-y-1.5">
              {[
                { label: 'Cualquier valoración', value: 0 },
                { label: '3 estrellas o más', value: 3 },
                { label: '4 estrellas o más', value: 4 },
                { label: '4.5 estrellas o más', value: 4.5 }
              ].map(opcion => (
                <li key={opcion.value}>
                  <button
                    onClick={() => { setMinRating(opcion.value); setExpandedId(null); }}
                    className={`w-full text-left px-3 py-2 rounded-lg transition text-sm ${minRating === opcion.value ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    {opcion.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </aside>

      {/* Lista de empresas */}
      <div className="flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {empresasFiltradas?.map((empresa) => (
            <CompanyCard 
              key={empresa.id} 
              empresa={empresa} 
              profesionales={profesionales?.filter((p: any) => p.id_empresa === empresa.id) || []} 
              isExpanded={expandedId === empresa.id}
              onToggle={() => setExpandedId(expandedId === empresa.id ? null : empresa.id)}
            />
          ))}
        </div>
        
        {empresasFiltradas?.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100 mt-6">
            <p className="text-gray-500">No se encontraron empresas con estos filtros.</p>
          </div>
        )}
      </div>
    </div>
  );
}
