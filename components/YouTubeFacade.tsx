import { useState } from 'react';
import { Play } from 'lucide-react';

interface YouTubeFacadeProps {
  videoId: string;
  title: string;
}

export function YouTubeFacade({ videoId, title }: YouTubeFacadeProps) {
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    return (
      <button
        type="button"
        onClick={() => setLoaded(true)}
        aria-label={`Воспроизвести видео: ${title}`}
        className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden group cursor-pointer focus-visible:outline focus-visible:outline-3 focus-visible:outline-ekogumus-green-light"
      >
        <img
          src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
          alt=""
          width={480}
          height={360}
          loading="lazy"
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
          <span className="w-16 h-16 sm:w-20 sm:h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
            <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1" fill="white" />
          </span>
        </span>
      </button>
    );
  }

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ border: 0 }}
      />
    </div>
  );
}
