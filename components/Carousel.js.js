import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const featuredAnimes = [
  {
    id: 1,
    title: 'Attack on Titan Final Season',
    image: 'https://via.placeholder.com/800x400?text=Attack+on+Titan',
    description: 'La batalla final por la humanidad'
  },
  {
    id: 2,
    title: 'Demon Slayer: Kimetsu no Yaiba',
    image: 'https://via.placeholder.com/800x400?text=Demon+Slayer',
    description: 'La aventura de Tanjiro para convertir a su hermana en humana'
  },
  // ... más animes destacados
];

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === featuredAnimes.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? featuredAnimes.length - 1 : prev - 1));
  };

  // Auto-avance del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-lg h-96">
      {featuredAnimes.map((anime, index) => (
        <div
          key={anime.id}
          className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
        >
          <img
            src={anime.image}
            alt={anime.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8">
            <h3 className="text-3xl font-bold text-white">{anime.title}</h3>
            <p className="text-gray-300 mt-2 max-w-lg">{anime.description}</p>
            <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md transition-colors">
              Ver ahora
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {featuredAnimes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 w-2 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-gray-500'}`}
          />
        ))}
      </div>
    </div>
  );
}