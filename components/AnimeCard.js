import Link from 'next/link';

export default function AnimeCard({ anime }) {
  return (
    <Link href={`/anime/${anime.id}`} passHref>
      <div className="group cursor-pointer transition-transform hover:scale-105">
        <div className="relative overflow-hidden rounded-lg">
          <img 
            src={anime.image} 
            alt={anime.title} 
            className="w-full h-64 object-cover transition-opacity group-hover:opacity-75"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h3 className="text-white font-semibold truncate">{anime.title}</h3>
            <div className="flex items-center mt-1">
              <span className="text-yellow-400 text-sm">★ {anime.rating}</span>
              <span className="text-gray-300 text-sm ml-2">{anime.year}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}