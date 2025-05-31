import { type LatLngLiteral, type LatLngTuple } from "leaflet";
import { useEffect, useState } from "react";
import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
import Ship, { type ShipPosition } from "./Ship";
import Site from "./Site";

const position: LatLngTuple = [32.0853, 34.7818]; // Default center position

export default function MapView() {
	const [sites, setSites] = useState<LatLngLiteral[]>([]);
	const [ship, setShip] = useState<ShipPosition>({ lat: 32.0853, lng: 34.7818, heading: 0 });

	useEffect(() => {
		// Simulate fetching sites from an API
		const fetchSites = async () => {
			// Replace with actual API call
			const fetchedSites: LatLngLiteral[] = [
				{ lat: 32.09, lng: 34.79 },
				{ lat: 32.1, lng: 34.8 },
			];
			setSites(fetchedSites);
		};
		fetchSites();
	}, []);

	return (
		<MapContainer center={position} zoom={10} style={{ height: "100vh" }}>
			<LayersControl position="topright">
				<LayersControl.BaseLayer name={"OpenStreetMap"}>
					<TileLayer url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"} />
				</LayersControl.BaseLayer>
				<LayersControl.BaseLayer name={"Google Maps"} checked>
					<TileLayer url="http://mt1.google.com/vt/x={x}&y={y}&z={z}" />
				</LayersControl.BaseLayer>
			</LayersControl>

			<Ship position={ship} onUpdate={setShip} />
			{sites.map(function (site, index) {
				return (
					<Site
						position={site}
						key={index}
						onUpdate={position => {
							const updatedSites = [...sites];
							updatedSites[index] = position;
							setSites(updatedSites);
						}}
					/>
				);
			})}
		</MapContainer>
	);
}
