import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  BookmarkIcon,
  HeartIcon,
  StarIcon,
  CalendarIcon,
  ClockIcon,
  PlayIcon
} from '@heroicons/react/24/solid';

export default function AnimePage() {
  const router = useRouter();
  const { id } = router.query;
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [watchedStatus, setWatchedStatus] = useState('none'); // none, watching, completed
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  // Simulación de fetch de datos del anime
  useEffect(() => {
    if (!id) return;

    const fetchAnime = async () => {
      try {
        // En producción, reemplazar con API real usando el id
        const mockAnime = {
          id: id,
          title: 'Attack on Titan: The Final Season',
          image: 'https://via.placeholder.com/800x400?text=Attack+on+Titan',
          coverImage: 'https://via.placeholder.com/1600x400?text=Cover+Image',
          description: 'La humanidad vive en ciudades rodeadas por enormes muros que los protegen de los Titanes, criaturas gigantes que devoran humanos. Eren Jaeger y sus amigos Mikasa y Armin se unen al Cuerpo de Exploración para combatir a los Titanes después de que su ciudad es destruida y su madre es devorada.',
          genres: ['Action', 'Drama', 'Fantasy', 'Horror'],
          rating: 4.9,
          year: 2020,
          status: 'Completed',
          episodes: 16,
          duration: '24 min',
          studio: 'MAPPA',
          episodesList: Array.from({ length: 16 }, (_, i) => ({
            id: i + 1,
            title: `Episodio ${i + 1}`,
            description: `Descripción del episodio ${i + 1} de Attack on Titan.`,
            thumbnail: `https://via.placeholder.com/300x170?text=Episodio+${i + 1}`,
            duration: '24 min',
            date: `2020-${(i + 1).toString().padStart(2, '0')}-01`
          }))
        };

        setAnime(mockAnime);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching anime:', error);
        setLoading(false);
      }
    };

    fetchAnime();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <p className="text-white">Anime no encontrado</p>
      </div>
    );
  }

  const handlePlayEpisode = (episode) => {
    setSelectedEpisode(episode);
    // En una implementación real, aquí podrías redirigir al reproductor
    // o abrir un modal con el reproductor
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Head>
        <title>{anime.title} | TuAnimePro</title>
        <meta name="description" content={anime.description.substring(0, 160)} />
      </Head>

      {/* Portada */}
      <div className="relative h-64 md:h-96 w-full">
        <img
          src={anime.coverImage || anime.image}
          alt={anime.title}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <h1 className="text-3xl md:text-5xl font-bold">{anime.title}</h1>
          
          <div className="flex flex-wrap items-center mt-4 gap-4">
            <div className="flex items-center">
              <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
              <span>{anime.rating}/5</span>
            </div>
            
            <div className="flex items-center">
              <CalendarIcon className="h-5 w-5 text-gray-400 mr-1" />
              <span>{anime.year}</span>
            </div>
            
            <div className="flex items-center">
              <ClockIcon className="h-5 w-5 text-gray-400 mr-1" />
              <span>{anime.duration}</span>
            </div>
            
            <span className="bg-purple-600 px-2 py-1 rounded text-sm">
              {anime.status}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Información principal */}
          <div className="md:w-2/3">
            {/* Acciones del usuario */}
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`flex items-center px-4 py-2 rounded-md ${isFavorite ? 'bg-red-500' : 'bg-gray-700 hover:bg-gray-600'}`}
              >
                <HeartIcon className="h-5 w-5 mr-2" />
                {isFavorite ? 'Favorito' : 'Añadir a favoritos'}
              </button>
              
              <select
                value={watchedStatus}
                onChange={(e) => setWatchedStatus(e.target.value)}
                className="bg-gray-700 rounded-md px-4 py-2"
              >
                <option value="none">No visto</option>
                <option value="watching">Viendo</option>
                <option value="completed">Completado</option>
              </select>
              
              <button className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md">
                <BookmarkIcon className="h-5 w-5 mr-2" />
                Listas
              </button>
            </div>

            {/* Sinopsis */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Sinopsis</h2>
              <p className="text-gray-300 leading-relaxed">{anime.description}</p>
            </div>

            {/* Información detallada */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div>
                <h3 className="text-gray-400 text-sm">Estudio</h3>
                <p>{anime.studio}</p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm">Estado</h3>
                <p>{anime.status}</p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm">Duración</h3>
                <p>{anime.duration}</p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm">Episodios</h3>
                <p>{anime.episodes}</p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm">Géneros</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {anime.genres.map(genre => (
                    <span key={genre} className="bg-gray-700 px-2 py-1 rounded text-sm">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Episodios */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Episodios</h2>
              <div className="space-y-2">
                {anime.episodesList.map(episode => (
                  <div 
                    key={episode.id} 
                    className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex">
                      <div className="w-1/3 relative">
                        <img 
                          src={episode.thumbnail} 
                          alt={episode.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                          <button 
                            onClick={() => handlePlayEpisode(episode)}
                            className="bg-purple-600 hover:bg-purple-700 rounded-full p-2"
                          >
                            <PlayIcon className="h-6 w-6" />
                          </button>
                        </div>
                      </div>
                      <div className="w-2/3 p-4">
                        <h3 className="font-semibold">{episode.title}</h3>
                        <p className="text-sm text-gray-400 mt-1">{episode.date}</p>
                        <p className="text-sm text-gray-300 mt-2 line-clamp-2">{episode.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:w-1/3">
            <div className="bg-gray-800 rounded-lg overflow-hidden sticky top-4">
              <img 
                src={anime.image} 
                alt={anime.title}
                className="w-full h-auto"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">Información</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-gray-400 text-sm">Título en inglés</h4>
                    <p>Attack on Titan: The Final Season</p>
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-sm">Título japonés</h4>
                    <p>進撃の巨人 The Final Season</p>
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-sm">Tipo</h4>
                    <p>Serie</p>
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-sm">Estreno</h4>
                    <p>Diciembre 2020</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recomendaciones (podría ser otro componente) */}
            <div className="mt-6">
              <h3 className="font-bold text-lg mb-4">Recomendaciones</h3>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(item => (
                  <div key={item} className="bg-gray-800 rounded-lg overflow-hidden">
                    <img 
                      src={`https://via.placeholder.com/300x400?text=Recomendación+${item}`}
                      alt={`Recomendación ${item}`}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-2">
                      <h4 className="text-sm font-semibold truncate">Anime similar {item}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reproductor modal (simplificado) */}
      {selectedEpisode && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {anime.title} - {selectedEpisode.title}
              </h3>
              <button 
                onClick={() => setSelectedEpisode(null)}
                className="text-gray-400 hover:text-white"
              >
                Cerrar
              </button>
            </div>
            
            {/* Aquí iría el reproductor real */}
            <div className="bg-black aspect-video flex items-center justify-center">
              <div className="text-center">
                <PlayIcon className="h-16 w-16 mx-auto text-gray-400" />
                <p className="mt-2">Reproductor de video</p>
                <p className="text-sm text-gray-500 mt-1">
                  En una implementación real, aquí estaría el video
                </p>
              </div>
            </div>
            
            <div className="mt-4 bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Opciones</h4>
              <div className="flex flex-wrap gap-4">
                <select className="bg-gray-700 rounded px-3 py-1">
                  <option>720p</option>
                  <option>1080p</option>
                  <option>480p</option>
                </select>
                <select className="bg-gray-700 rounded px-3 py-1">
                  <option>Español Latino</option>
                  <option>Español Castellano</option>
                  <option>Japonés (Subtitulado)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}