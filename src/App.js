import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import './App.css';

const accessKey = process.env.REACT_APP_UNSLASH_ACCESS_KEY;

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  const fetchImages = async () => {
    const res = await fetch(
      `https://api.unsplash.com/photos/?client_id=${accessKey}&page=${page}`
    );
    const data = await res.json();

    setImages((prevImages) => [...prevImages, ...data]);
  };

  useEffect(() => {
    fetchImages();
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

      <form>
        <input type="text" placeholder="Search Unsplash..." />
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
