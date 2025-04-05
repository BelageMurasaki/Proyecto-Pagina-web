import { useState, useEffect } from 'react';
import Head from 'next/head';
import Carousel from '../components/Carousel';
import AnimeCard from '../components/AnimeCard';
import FilterPanel from '../components/FilterPanel';
import Header from '../components/Header';

export default function Home() {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    status: '',
    sort: 'popularity'
  });

  // Simulación de fetch de animes
  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        // En producción, reemplazar con API real
        const mockAnimes = [
          {
            id: 1,
            title: 'Attack on Titan',
            image: 'https://via.placeholder.com/300x400?text=Attack+on+Titan',
            genres: ['Action', 'Drama', 'Fantasy'],
            year: 2013,
            rating: 4.9,
            status: 'Completed'
          },
          // ... más animes de ejemplo
        ];
        
        // Aplicar filtros (simulado)
        const filtered = mockAnimes.filter(anime => {
          return (
            (!filters.genre || anime.genres.includes(filters.genre)) &&
            (!filters.year || anime.year === parseInt(filters.year)) &&
            (!filters.status || anime.status === filters.status)
          );
        });

        // Ordenar
        if (filters.sort === 'popularity') {
          filtered.sort((a, b) => b.rating - a.rating);
        } else if (filters.sort === 'newest') {
          filtered.sort((a, b) => b.year - a.year);
        }

        setAnimes(filtered);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching animes:', error);
        setLoading(false);
      }
    };

    fetchAnimes();
  }, [filters]);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Head>
        <title>TuAnimePro - Los mejores animes en streaming</title>
        <meta name="description" content="Mira tus animes favoritos en alta calidad" />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-6">
        {/* Carrusel de animes destacados */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Destacados</h2>
          <Carousel />
        </section>

        {/* Panel de filtros */}
        <FilterPanel filters={filters} setFilters={setFilters} />

        {/* Listado de animes */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">
              {filters.genre ? `${filters.genre}` : 'Animes Populares'}
            </h2>
            <span className="text-gray-400">{animes.length} resultados</span>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {animes.map((anime) => (
                <AnimeCard key={anime.id} anime={anime} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}