import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import './App.css';

const accessKey = process.env.REACT_APP_UNSLASH_ACCESS_KEY;

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const getPhotos = async () => {
    let apiUrl = `https://api.unsplash.com/photos?`;
    if (query) apiUrl = `https://api.unsplash.com/search/photos?query=${query}`;

    apiUrl += `&page=${page}`;
    apiUrl += `&client_id=${accessKey}`;

    const res = await fetch(apiUrl);
    const data = await res.json();

    const imagesFromApi = data.results ?? data;

    // if page is 1, then we need a whole new array of images
    if (page === 1) setImages(imagesFromApi);

    // if page > 1, then we are adding for our infinite scroll
    setImages((prevImages) => [...prevImages, ...imagesFromApi]);
  };

  const searchPhotos = async (e) => {
    e.preventDefault();
    setPage(1);
    getPhotos();
  };

  useEffect(() => {
    getPhotos();
    // may use useCallback
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

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

      <form onSubmit={searchPhotos}>
        <input
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search Unsplash..."
        />
        <button>Search</button>
      </form>

      <InfiniteScroll
        dataLength={images.length}
        next={() => {
          setPage((prevPage) => prevPage + 1);
        }}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <div className="image-grid">
          {images.map((image, index) => (
            <a
              className="image"
              key={index}
              href={image.links.html}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={image.urls.regular} alt={image.alt_description} />
            </a>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};
