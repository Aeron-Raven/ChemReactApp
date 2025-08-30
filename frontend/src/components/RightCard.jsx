import { useEffect, useState } from 'react';
import pic1 from '../assets/LoginPic1.png';
import pic2 from '../assets/LoginPic2.png';
import pic3 from '../assets/LoginPic3.png';

const RightCard = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false); // Track if all images are loaded

  const imageSources = [
    pic1,
    pic2,
    pic3,
  ];

  useEffect(() => {
    // Preload all images
    const preloadImages = imageSources.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = resolve;
      });
    });

    // When all images are loaded, update the state
    Promise.all(preloadImages).then(() => setImagesLoaded(true));
  }, []);

  if (!imagesLoaded) {
    // Optionally show a loader or fallback while images are loading
    return <div>Loading images...</div>;
  }

  // Render the component once all images are preloaded
  return (
    <div className="card-right">
      <img className="fade-image" src={imageSources[0]} alt="Image 1" />
      <img className="fade-image" src={imageSources[1]} alt="Image 2" />
      <img className="fade-image" src={imageSources[2]} alt="Image 3" />
    </div>
  );
};

export default RightCard;
