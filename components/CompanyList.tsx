"use client";

import { useState, useMemo } from 'react';
import { CompanyCard } from './CompanyCard';

export function CompanyList({ empresas, profesionales }: { empresas: any[], profesionales: any[] }) {
  const [expandedId, setExpandedId] = useState<number | string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  // Obtener lista única de servicios
  const servicios = useMemo(() => {
    const s = new Set<string>();
    empresas?.forEach(empresa => {
      if (empresa.servicio) s.add(empresa.servicio);
    });
    return Array.from(s).sort();
  }, [empresas]);

  const empresasFiltradas = selectedService
    ? empresas?.filter(e => e.servicio === selectedService)
    : empresas;

  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-[90rem] mx-auto px-6 md:px-12 lg:px-24">
      {/* Barra lateral de filtros */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 sticky top-6">
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
            <p className="text-gray-500">No se encontraron empresas para este servicio.</p>
          </div>
        )}
      </div>
    </div>
  );
}
