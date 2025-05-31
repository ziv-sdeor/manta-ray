import { Icon, type LatLngLiteral, type LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { LayersControl, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const position: LatLngTuple = [32.0853, 34.7818]; // Default location

interface Site extends LatLngLiteral {
	heading: number;
}

export default function MapView(props: { sites: Site[]; ship?: LatLngLiteral }) {
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

			{props.sites.map(function (site, index) {
				return (
					<Marker key={index} position={site}>
						<Popup>Site</Popup>
					</Marker>
				);
			})}
			{props.ship && (
				<Marker
					position={[props.ship.lat, props.ship.lng]}
					icon={
						new Icon({
							iconUrl: "/ship.png",
							iconSize: [43, 43],
						})
					}
				>
					<Popup>Ship</Popup>
				</Marker>
			)}
		</MapContainer>
	);
}
