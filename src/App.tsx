import { useRef, useState } from 'react';
import './App.css';
import { Table } from './components/Table';
import { MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

function App() {
  const [markerPosition, setMarkerPosition] = useState<[number, number]>([52.237, 21.02]);
  const markerRef = useRef<any>(null);

  const handleMarkerDragEnd = (e: any) => {
    const { lat, lng } = e.target.getLatLng();
    setMarkerPosition([lat, lng]);
  };

  const handleUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setMarkerPosition([latitude, longitude]);
        if (markerRef.current) {
          markerRef.current.setLatLng([latitude, longitude]); 
        }
      }, (error) => {
        console.error('Błąd pobierania lokalizacji:', error);
      });
    } else {
      console.error('Twoja przeglądarka nie obsługuje Geolokalizacji.');
    }
  };



  return (
    <>
      <div style={{ position: 'relative', height: '800px', width: '1000px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>To change the location, drag the marker</h1>
      <h2 style={{ textAlign: 'center', marginTop: '20px' }}>To check current position click on the marker</h2>
        <MapContainer
          center={markerPosition}
          zoom={5}
          style={{ height: '80%', width: '100%' }}
          maxBounds={[
            [90, -180],
            [-90, 180],
          ]}
          minZoom={2} 
          maxZoom={18} 
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker
            position={markerPosition}
            draggable={true}
            eventHandlers={{
              dragend: handleMarkerDragEnd 
            }}
            ref={markerRef}
          >
            <Popup>Latitude: {markerPosition[0]}, Longitude: {markerPosition[1]}</Popup>
          </Marker>
        </MapContainer>
      </div>
      <button onClick={handleUserLocation} style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1000 }}>
        Get data for my location
      </button>

      <div style={{ flex: 1, width: '100%', textAlign: 'center' }}>
        <Table longitude={markerPosition[1]} latitude={markerPosition[0]} />
      </div>
    </>
  );
}

export default App;
