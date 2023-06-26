import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function YourComponent() {
  const [data, setData] = useState<any[]>([]);
  const { prace_id } = useParams<{ prace_id: string | undefined }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (prace_id !== undefined) {
          const encodedPraceID = encodeURIComponent(prace_id);
          const response = await fetch(`http://127.0.0.1:8000/post/posts/api/${encodedPraceID}/`);
          const jsonData = await response.json();
          setData(jsonData);
          console.log(jsonData);
        }
      } catch (error) {
        console.error(error);
        // エラー処理を追加する
      }
    };

    fetchData();
  }, [prace_id]);

  console.log(data);
  console.log(prace_id);

  return (
    <div>
      {data.length > 0 && data.map((item) => (
        <div key={item.PraceID}>
            <h1>{item.title}</h1>
            <p>{item.content}</p>
        </div>
    ))}

    </div>
  );
}

export default YourComponent;
