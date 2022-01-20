import React, { useEffect, useState } from 'react';

import './App.css';

const accessKey = process.env.REACT_APP_UNSLASH_ACCESS_KEY;

export const App = () => {
  const [images, setImages] = useState([]);
  console.log('App ~ data', images);

  useEffect(() => {
    const fetchFunction = async () => {
      const res = await fetch(
        `https://api.unsplash.com/photos/?client_id=${accessKey}`
      );
      const data = await res.json();

      setImages(data);
    };
    fetchFunction();
  }, []);

  if (!accessKey) {
    return (
      <a href="https://unsplash.com/oauth/applications" className="error">
        Required: Get Your Unsplash API Key First
      </a>
    );
  }

  return (
    <div className="app">
      <h1>Unsplash Image Gallery!</h1>

      <form>
        <input type="text" placeholder="Search Unsplash..." />
        <button>Search</button>
      </form>

      <div className="image-grid">
        {images.map((image, index) => (
          <div className="image" key={index}>
            <img src={image.urls.regular} alt={image.alt_description} />
          </div>
        ))}
      </div>
    </div>
  );
};
