import Leaflet, { Icon, type LatLngLiteral } from "leaflet";
import { useMemo, useRef, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import PositionEditor from "./PositionEditor";
import { decimalToDM, dmToDecimal } from "../utils/geo";

export interface ShipPosition extends LatLngLiteral {
	heading: number;
}

export interface ShipProps {
	position: ShipPosition;
	onUpdate: (position: ShipPosition) => void;
}

export default function Ship(props: ShipProps) {
	const map = useMap();
	const shipIcon = useMemo(() => new Icon({ iconUrl: "/ship.png", iconSize: [43, 43] }), []);
	const shipMarkerRef = useRef<Leaflet.Marker>(null);
	const [reinitialize, setReinitialize] = useState(false);

	return (
		<Marker
			ref={shipMarkerRef}
			position={props.position}
			icon={shipIcon}
			eventHandlers={{
				mouseover: () => {
					const icon = shipMarkerRef.current!.getIcon();
					icon.options.iconUrl = "/ship-color.png";
					shipMarkerRef.current!.setIcon(icon);
				},
				mouseout: () => {
					const icon = shipMarkerRef.current!.getIcon();
					icon.options.iconUrl = "/ship.png";
					shipMarkerRef.current!.setIcon(icon);
				},
			}}
		>
			<Popup
				maxWidth={500}
				eventHandlers={{
					remove: () => {
						setReinitialize(true);
					},
					add: () => {
						setReinitialize(false);
					},
				}}
			>
				<PositionEditor
					initialLat={decimalToDM(props.position.lat, "NS")}
					initialLng={decimalToDM(props.position.lng, "EW")}
					initialHeading={props.position.heading}
					showHeading
					reinitialize={reinitialize}
					onSubmit={(latDM, lngDM, heading) => {
						const lat = dmToDecimal(latDM.degrees, latDM.minutes, latDM.direction);
						const lng = dmToDecimal(lngDM.degrees, lngDM.minutes, lngDM.direction);
						props.onUpdate({ lat, lng, heading: heading ?? 0 });

						// close the popup after updating
						shipMarkerRef.current?.closePopup();

						// Center the map on the ship's new position
						map.panTo({ lat, lng });
					}}
				/>
			</Popup>
		</Marker>
	);
}
