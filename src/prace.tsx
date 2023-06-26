import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface CandidateData {
  PraceID: number;
  name: string;
  address: string;
  title: string;
  content: string;
  image: string; // 修正: 画像のパスを保持するために string 型を使用
}

function YourComponent(props: { PraceID: number }) {
  const { PraceID } = props;

  const [data, setData] = useState<CandidateData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/post/posts/api/${PraceID}/`);
        const jsonData = await response.json();
        setData(jsonData);

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [PraceID]);

  return (
    <div>
      {data.map((item) => (
        <div key={item.PraceID}>
          <h1>{item.name}</h1>
          <h1>{item.title}</h1>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
}

function CandidateDataComponent() {
  const [data, setData] = useState<CandidateData | null>(null);
  const { name }: { name?: string } = useParams();

  
  useEffect(() => {
    const fetchData = async () => {
      if (name) {
        try {
          const encodedName = encodeURIComponent(name);
          const response = await fetch(`http://127.0.0.1:8000/gmap/parace/${encodedName}/`);
          const jsonData: CandidateData = await response.json();
          setData(jsonData);
          console.log(jsonData)
          console.log(jsonData.image)
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [name]);
  
  return (
    <div>
      {data !== null ? (
        <div>
          <h1>{data.name}</h1>
          <p>{data.address}</p>
          {/* Image */}
          <img src={`http://127.0.0.1:8000${data.image}`} alt={data.name} width="380" height="230"/>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      {data !== null && <YourComponent PraceID={data.PraceID} />}
    </div>
  );
}

export default CandidateDataComponent;
