import Leaflet, { type LatLngLiteral } from "leaflet";
import { useRef } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { decimalToDM, dmToDecimal } from "../utils/geo";
import PositionEditor from "./PositionEditor";

export interface SitePosition extends LatLngLiteral {}

export interface SiteProps {
	position: SitePosition;
	onUpdate: (position: SitePosition) => void;
}

export default function Site(props: SiteProps) {
	const map = useMap();
	const siteMarkerRef = useRef<Leaflet.Marker>(null);

	return (
		<Marker ref={siteMarkerRef} position={props.position}>
			<Popup maxWidth={500}>
				<PositionEditor
					initialLat={decimalToDM(props.position.lat, "NS")}
					initialLng={decimalToDM(props.position.lng, "EW")}
					// showHeading
					onSubmit={(latDM, lngDM) => {
						const lat = dmToDecimal(latDM.degrees, latDM.minutes, latDM.direction);
						const lng = dmToDecimal(lngDM.degrees, lngDM.minutes, lngDM.direction);
						props.onUpdate({ lat, lng });

						// close the popup after updating
						siteMarkerRef.current?.closePopup();

						// Center the map on the site's new position
						map.panTo({ lat, lng });
					}}
				/>
			</Popup>
		</Marker>
	);
}
