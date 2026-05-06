"use client";

export function CompanyCard({ 
  empresa, 
  profesionales,
  isExpanded,
  onToggle
}: { 
  empresa: any, 
  profesionales: any[],
  isExpanded: boolean,
  onToggle: () => void
}) {
  return (
    <div 
      className={`bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer flex flex-col ${isExpanded ? 'lg:col-span-full lg:flex-row gap-6' : ''}`}
      onClick={onToggle}
    >
      {/* Lado izquierdo: Info de la empresa */}
      <div className={`flex flex-col ${isExpanded ? 'lg:w-1/3 border-b lg:border-b-0 lg:border-r border-gray-100 pb-5 lg:pb-0 lg:pr-6' : ''}`}>
        {empresa.foto_url && (
          <img
            src={empresa.foto_url}
            alt={`Foto de ${empresa.nombre}`}
            className="w-full h-36 object-cover rounded-lg mb-4"
          />
        )}
        <h2 className="text-xl font-semibold mb-2 text-gray-800">
          {empresa.nombre}
        </h2>
        <p className="text-gray-600 mb-4 text-sm font-medium">
          🛠️ {empresa.servicio}
        </p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-yellow-500 font-bold">
            ⭐ {empresa.estrellas}
          </span>
          <button 
            className="bg-blue-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-blue-700 transition"
            onClick={(e) => {
               e.stopPropagation(); // Evitar que el clic se propague y cierre/abra la tarjeta
               alert(`Contactar con ${empresa.nombre}`);
            }}
          >
            Contactar
          </button>
        </div>
      </div>

      {/* Lado derecho: Profesionales */}
      {isExpanded && (
        <div className="mt-5 lg:mt-0 lg:w-2/3 animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Profesionales Asociados</h3>
          {profesionales.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profesionales.map((prof) => (
                <div key={prof.id} className="flex flex-col p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
                  <div className="flex items-center mb-3">
                    {prof.foto_url ? (
                      <img src={prof.foto_url} alt={prof.nombre} className="w-12 h-12 rounded-full object-cover mr-3 border-2 border-white shadow-sm" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-3 text-blue-600 text-lg font-bold shadow-sm">
                        {prof.nombre?.charAt(0) || 'P'}
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-gray-800 text-base leading-tight">{prof.nombre || 'Profesional'}</p>
                      <p className="text-yellow-500 font-bold text-xs mt-1">
                        ⭐ {prof.valoracion !== undefined ? prof.valoracion : 'N/D'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-auto flex justify-between items-center pt-3 border-t border-gray-200">
                    <span className="text-gray-600 font-medium text-xs">Precio:</span>
                    <span className="text-blue-600 font-bold text-base">
                      {prof.precio_hora !== undefined ? `${prof.precio_hora}€/h` : 'A convenir'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 flex items-center justify-center flex-1">
              <p className="text-blue-600 font-medium text-sm">Aún no hay profesionales registrados en esta empresa.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
