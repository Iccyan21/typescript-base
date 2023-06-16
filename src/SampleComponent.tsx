import React, { useEffect, useState, useRef } from "react";
import GoogleMapReact from "google-map-react";

async function fetchLocations(query: string): Promise<any[]> {
  const response = await fetch(`http://127.0.0.1:8000/gmap/api/customer/?q=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data;
}

const MapComponent: React.FC = () => {
  const [locations, setLocations] = useState<any[]>([]);
  const mapRef = useRef<any>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLocations("");
        setLocations(data);
      } catch (error) {
        console.error("データの取得に失敗しました:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchRef.current?.value || "";
    console.log(query);
    try {
      const data = await fetchLocations(query);
      console.log(data);
      setLocations(data);
      if (data.length > 0) {
        moveToMarker(data[0]);
      }
    } catch (error) {
      console.error("データの取得に失敗しました:", error);
    }
  };

  const moveToMarker = (location: any) => {
    if (mapRef.current && location) {
      const maps = mapRef.current.maps;
      //緯度経度の移動
      const position = { lat: parseFloat(location.lat), lng: parseFloat(location.lng) };
      mapRef.current.map.panTo(position);
      const marker = new maps.Marker({ position });
      marker.setMap(mapRef.current.map);

      marker.addListener("click", function() {
        const url = `gmap/parace/${encodeURIComponent(location.name)}/`;
        window.location.href = url;
      });
    }
  };
  const renderMarkers = (map: any, maps: any) => {
    locations.forEach((location: any) => {
      const marker = new maps.Marker({
        position: { lat: parseFloat(location.lat), lng: parseFloat(location.lng) },
        map,
      });
      const infowindow = new maps.InfoWindow({
        content: `
          <div class="custom-infowindow">
            <h3>${location.name}</h3>
            <p>${location.address}</p>
          </div>
        `,
      });
  
      marker.addListener("click", function(this: google.maps.Marker) {
        infowindow.open(map, this);
        const url = `gmap/parace/${encodeURIComponent(location.name)}/`;
        window.location.href = url;
      });
      
      
  
      // マーカーをクリックせずに常時表示
      infowindow.open(map, marker);
    });
  };
  
  
  

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="検索キーワード" ref={searchRef} />
        <button type="submit">検索</button>
      </form>

      <div style={{ height: "400px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyANo-MndvZ0THsRxGEaTBHUfRCUXLv3w2g" }} // TODO: 自分のAPIキーを指定
          defaultCenter={{ lat: 35.39, lng: 139.44 }}
          defaultZoom={18}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => {
            mapRef.current = { map, maps }; // マップとマップの参照を保存
            renderMarkers(map, maps);
          }}
        ></GoogleMapReact>
      </div>
    </div>
  );
};

export default MapComponent;
