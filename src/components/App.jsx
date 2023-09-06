import React, { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import SearchBar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import { searchImages } from './Service/PixabayAPI';

export function App() {
  const [topic, setTopic] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (topic === '') {
      return;
    }

    const fetchData = async () => {
      setStatus('pending');

      try {
        const data = await searchImages(topic, page);

        if (data.hits.length === 0) {
          Notiflix.Notify.warning(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          setStatus('idle');
          return;
        }

        setImages((prevImages) => [...prevImages, ...data.hits]);
        setStatus('resolved');
        setTotalHits(data.totalHits);
      } catch (error) {
        setStatus('rejected');
        setError('Something wrong');
      }
    };

    fetchData();
  }, [topic, page]);

  const handleFormSubmit = (query) => {
    setTopic(query);
    setImages([]);
    setPage(1);
    setTotalHits(0);
    setError(null);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <SearchBar onSubmit={handleFormSubmit} />
      {status === 'pending' && <Loader />}
      {error && <p>{error}</p>}
      {images.length > 0 && <ImageGallery images={images} />}
      {images.length !== totalHits && status === 'resolved' && (
        <Button onClick={handleLoadMore} />
      )}
    </>
  );
}

export default App;
