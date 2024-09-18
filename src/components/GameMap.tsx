import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function GameMap({ conqueredCountries }) {
   return (
      <MapContainer center={[20, 0]} zoom={2} className="w-full h-96">
         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
         {/* Add GeoJSON data to highlight conquered countries */}
         <GeoJSON data={conqueredCountries} />
      </MapContainer>
   );
}
