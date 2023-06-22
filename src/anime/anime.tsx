import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface AnimeData {
  amineid: number;
  title: string;
  desc: string;
  related: string;
}

function AnimeComponent() {
  const [data, setData] = useState<AnimeData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/anime/api/anime/');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data.map((item) => (
        <div key={item.amineid}>
          <Link to={`/anime/${encodeURIComponent(item.title)}`}>
            <h1>{item.title}</h1>
          </Link>
          <h1>{item.title}</h1>
          <p>{item.desc}</p>
          <p>{item.related}</p>
        </div>
      ))}
    </div>
  );
}

export default AnimeComponent;
