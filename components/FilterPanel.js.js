export default function FilterPanel({ filters, setFilters }) {
    const genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Sci-Fi'];
    const years = Array.from({ length: 30 }, (_, i) => 2023 - i);
    const statuses = ['Airing', 'Completed', 'Upcoming'];
  
    return (
      <div className="bg-gray-800 rounded-lg p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Género</label>
            <select
              value={filters.genre}
              onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
              className="w-full bg-gray-700 text-white rounded-md p-2 text-sm"
            >
              <option value="">Todos</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Año</label>
            <select
              value={filters.year}
              onChange={(e) => setFilters({ ...filters, year: e.target.value })}
              className="w-full bg-gray-700 text-white rounded-md p-2 text-sm"
            >
              <option value="">Todos</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Estado</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full bg-gray-700 text-white rounded-md p-2 text-sm"
            >
              <option value="">Todos</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Ordenar por</label>
            <select
              value={filters.sort}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
              className="w-full bg-gray-700 text-white rounded-md p-2 text-sm"
            >
              <option value="popularity">Popularidad</option>
              <option value="newest">Más nuevos</option>
              <option value="rating">Mejor valorados</option>
            </select>
          </div>
        </div>
      </div>
    );
  }