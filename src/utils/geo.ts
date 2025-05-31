import Leaflet from "leaflet";

export type Direction<D extends "NS" | "EW"> = D extends "NS" ? "N" | "S" : "E" | "W";
export type DM<D extends "NS" | "EW"> = { degrees: number; minutes: number; direction: Direction<D> };

/**
 * Converts a range and bearing from a given origin point to a new geographic coordinate.
 * @param origin - The starting point
 * @param range - The distance to move from the starting point (in nautical miles)
 * @param bearingDegrees - The direction to move from the starting point, in degrees
 * @returns The new geographic coordinate
 */
export function fromRangeBearing(origin: Leaflet.LatLngLiteral, range: number, bearingDegrees: number): Leaflet.LatLngLiteral {
	const R = 3443.8; // Radius of the Earth in nautical miles
	const bearingRad = (bearingDegrees * Math.PI) / 180;

	const lat1 = (origin.lat * Math.PI) / 180;
	const lon1 = (origin.lng * Math.PI) / 180;

	const lat2 = Math.asin(Math.sin(lat1) * Math.cos(range / R) + Math.cos(lat1) * Math.sin(range / R) * Math.cos(bearingRad));

	const lon2 = lon1 + Math.atan2(Math.sin(bearingRad) * Math.sin(range / R) * Math.cos(lat1), Math.cos(range / R) - Math.sin(lat1) * Math.sin(lat2));

	return {
		lat: (lat2 * 180) / Math.PI,
		lng: (lon2 * 180) / Math.PI,
	};
}

/**
 * Converts degrees and minutes to decimal format.
 * @param degrees - The degrees part of the coordinate
 * @param minutes - The minutes part of the coordinate
 * @param direction - The direction of the coordinate (N, S, E, W)
 * @return The coordinate in decimal format
 */
export function dmToDecimal(degrees: number, minutes: number, direction: "N" | "S" | "E" | "W"): number {
	const sign = direction === "S" || direction === "W" ? -1 : 1;
	return sign * (Math.abs(degrees) + minutes / 60);
}

/**
 * Converts a decimal coordinate to degrees and minutes format.
 * @param decimal - The coordinate in decimal format
 * @param direction - The direction of the coordinate ("NS" for latitude, "EW" for longitude)
 * @return An object containing degrees, minutes, and direction
 */
// export function decimalToDM(decimal: number, direction: "NS"): DM<"NS">;
// export function decimalToDM(decimal: number, direction: "EW"): DM<"EW">;
export function decimalToDM<D extends "NS" | "EW">(decimal: number, direction: D): DM<D> {
	const absolute = Math.abs(decimal);
	const degrees = Math.floor(absolute);
	const minutes = (absolute - degrees) * 60;
	const dir = (direction === "NS" ? (decimal < 0 ? "S" : "N") : decimal < 0 ? "W" : "E") as Direction<D>;
	return { degrees, minutes, direction: dir };
}
