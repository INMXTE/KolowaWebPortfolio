import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  isVideo?: boolean;
  videoUrl?: string;
  isExpanded: boolean;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  currentIndex,
  onPrevious,
  onNext,
  isVideo,
  videoUrl,
  isExpanded
}) => {
  if (!images || images.length === 0) {
    return null;
  }

  const showNavigation = isExpanded && images.length > 1;

  return (
    <div className="relative w-full h-full group">
      {isVideo && videoUrl ? (
        <iframe
          src={videoUrl}
          title="Project Video"
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <>
          <img
            src={images[currentIndex]}
            alt="Project image"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {showNavigation && (
            <>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onPrevious();
                }}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-opacity opacity-100 focus:outline-none z-50 pointer-events-auto"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-opacity opacity-100 focus:outline-none z-50 pointer-events-auto"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
              
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 opacity-100 transition-opacity">
                {images.map((_, index) => (
                  <div 
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-white/50'}`}
                  ></div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
