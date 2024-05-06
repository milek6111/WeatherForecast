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
    if (!navigator.geolocation){
      console.error('Twoja przeglądarka nie obsługuje Geolokalizacji.');

    }
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setMarkerPosition([latitude, longitude]);
        if (markerRef.current) {
          markerRef.current.setLatLng([latitude, longitude]); 
        }
      }, (error) => {
        console.error('Błąd pobierania lokalizacji:', error);
      });

  };

  return (
    <>
      <div className='container'>
      <h1 className='text'>To change the location, drag the marker</h1>
      <h2 className='text'>To check current position click on the marker</h2>
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
      <button onClick={handleUserLocation} className='button'>
        Get data for my location
      </button>

      <div className='table-container'>
        <Table longitude={markerPosition[1]} latitude={markerPosition[0]} />
      </div>
    </>
  );
}

export default App;
