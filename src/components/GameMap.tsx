// components/GameMap.tsx
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { GeoJsonObject } from "geojson"; // Import GeoJSON type

interface GameMapProps {
   conqueredCountries: GeoJsonObject; // Explicitly define the type
}

export default function GameMap({ conqueredCountries }: GameMapProps) {
   return (
      <MapContainer center={[20, 0]} zoom={2} className="w-full h-96">
         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
         <GeoJSON data={conqueredCountries} />{" "}
         {/* Use conqueredCountries here */}
      </MapContainer>
   );
}
