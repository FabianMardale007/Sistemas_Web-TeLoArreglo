export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      {/* Esto es el equivalente al Header en HTML */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-600">TeLoArreglo</h1>
        <p className="text-gray-600">Encuentra profesionales de confianza en Vitoria-Gasteiz</p>
      </header>

      {/* Un buscador sencillo */}
      <section className="max-w-md mx-auto mb-12">
        <input 
          type="text" 
          placeholder="¿Qué necesitas? (Ej: Fontanero)" 
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </section>

      {/* Grid de categorías */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-bold mb-2">🚰 Fontanería</h2>
          <p className="text-sm text-gray-500">Reparaciones de goteras y tuberías.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-bold mb-2">🔨 Carpintería</h2>
          <p className="text-sm text-gray-500">Muebles a medida y arreglos de madera.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-bold mb-2">🧱 Albañilería</h2>
          <p className="text-sm text-gray-500">Reformas, azulejos y fachadas.</p>
        </div>
      </div>
    </main>
  );
}
