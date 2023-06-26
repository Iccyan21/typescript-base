import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface AnimeData {
  amineid: number;
  title: string;
  desc: string;
  related: string;
}

interface PlaceData {
  PraceID: number;
  animeid: number;
  name: string;
  address: string;
  lat: string;
  lng: string;
}

interface AnimeDetailParams {
  title: string;
  [key: string]: string | undefined;
}

function AnimeDetail() {
  const { title } = useParams<AnimeDetailParams>();
  const [animeData, setAnimeData] = useState<AnimeData | null>(null);
  const [placeData, setPlaceData] = useState<PlaceData[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (title) {
          const animeResponse = await fetch(`http://127.0.0.1:8000/anime/api/${encodeURIComponent(title)}/`);
          const animeJsonData: AnimeData = await animeResponse.json();
          setAnimeData(animeJsonData);

          const placeResponse = await fetch(`http://127.0.0.1:8000/gmap/parace/int/${animeJsonData.amineid}/`);
          const placeJsonData: PlaceData[] = await placeResponse.json();
          setPlaceData(placeJsonData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [title]);

  if (!animeData || !placeData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{animeData.title}</h1>
      <p>{animeData.desc}</p>
      <p>{animeData.related}</p>
      <h2>Place</h2>
      {placeData.map((place) => (
        <div key={place.PraceID}>
          <h3>{place.name}</h3>
          <p>{place.address}</p>
          <Link to={`/gmap/parace/${place.name}`}>Go to Place</Link>
        </div>
      ))}
    </div>
  );
}

export default AnimeDetail;
