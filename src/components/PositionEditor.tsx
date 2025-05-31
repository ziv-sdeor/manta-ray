import { Button, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { dmToDecimal, type Direction, type DM } from "../utils/geo";

interface PositionEditorProps {
	initialLat?: DM<"NS">;
	initialLng?: DM<"EW">;
	initialHeading?: number;
	showHeading?: boolean;
	reinitialize?: boolean;
	onSubmit(lat: DM<"NS">, lng: DM<"EW">, heading?: number): void;
}

export default function PositionEditor(props: PositionEditorProps) {
	if (props.initialLat) {
		props.initialLat.degrees = Math.round(props.initialLat.degrees * 1000) / 1000;
		props.initialLat.minutes = Math.round(props.initialLat.minutes * 1000) / 1000;
	}

	if (props.initialLng) {
		props.initialLng.degrees = Math.round(props.initialLng.degrees * 1000) / 1000;
		props.initialLng.minutes = Math.round(props.initialLng.minutes * 1000) / 1000;
	}

	const initialHeading = props.initialHeading !== undefined ? Math.round(props.initialHeading) : 0;

	const [lat, setLat] = useState<DM<"NS">>(props.initialLat ?? { degrees: 0, minutes: 0, direction: "N" });
	const [lng, setLng] = useState<DM<"EW">>(props.initialLng ?? { degrees: 0, minutes: 0, direction: "E" });
	const [heading, setHeading] = useState(initialHeading);

	const latDec = dmToDecimal(lat.degrees, lat.minutes, lat.direction);
	const lngDec = dmToDecimal(lng.degrees, lng.minutes, lng.direction);
	const latValid = lat.degrees >= 0 && lat.degrees <= 180 && lat.minutes >= 0 && lat.minutes < 60 && latDec >= -90 && latDec <= 90;
	const lngValid = lng.degrees >= 0 && lng.degrees <= 180 && lng.minutes >= 0 && lng.minutes < 60 && lngDec >= -180 && lngDec <= 180;
	const headingValid = !props.showHeading || (heading >= 0 && heading <= 360);

	useEffect(() => {
		if (!props.reinitialize) {
			return;
		}

		if (props.initialLat) {
			props.initialLat.degrees = Math.round(props.initialLat.degrees * 1000) / 1000;
			props.initialLat.minutes = Math.round(props.initialLat.minutes * 1000) / 1000;
		}

		if (props.initialLng) {
			props.initialLng.degrees = Math.round(props.initialLng.degrees * 1000) / 1000;
			props.initialLng.minutes = Math.round(props.initialLng.minutes * 1000) / 1000;
		}

		const initialHeading = props.initialHeading !== undefined ? Math.round(props.initialHeading) : 0;

		setLat(props.initialLat ?? { degrees: 0, minutes: 0, direction: "N" });
		setLng(props.initialLng ?? { degrees: 0, minutes: 0, direction: "E" });
		setHeading(initialHeading);
	}, [props.reinitialize]);

	return (
		<div>
			<Table>
				<TableBody>
					<TableRow>
						<TableCell sx={{ border: "none", padding: 1 }}>
							<InputLabel>Latitude</InputLabel>
						</TableCell>
						<TableCell sx={{ border: "none", padding: 1 }}>
							<TextField
								type="number"
								size="small"
								label="Degrees"
								variant="outlined"
								error={!latValid}
								value={lat.degrees}
								onChange={e => setLat({ ...lat, degrees: +e.target.value })}
								onBlur={e => setLat({ ...lat, degrees: Math.round(+e.target.value * 1000) / 1000 })}
								slotProps={{ input: { endAdornment: "°" }, htmlInput: { min: 0, max: 180 } }}
								style={{ width: 80 }}
							/>
						</TableCell>
						<TableCell sx={{ border: "none", padding: 1 }}>
							<TextField
								type="number"
								size="small"
								label="Minutes"
								variant="outlined"
								error={!latValid}
								value={lat.minutes}
								onChange={e => setLat({ ...lat, minutes: +e.target.value })}
								onBlur={e => setLat({ ...lat, minutes: Math.round(+e.target.value * 1000) / 1000 })}
								slotProps={{ input: { endAdornment: "'" }, htmlInput: { min: 0, max: 59.999 } }}
								style={{ width: 100 }}
							/>
						</TableCell>
						<TableCell sx={{ border: "none", padding: 1 }}>
							<FormControl size="small" variant="outlined">
								<InputLabel id="lat-dir-label">Dir</InputLabel>
								<Select
									labelId="lat-dir-label"
									value={lat.direction}
									label="Dir"
									onChange={e => setLat({ ...lat, direction: e.target.value as Direction<"NS"> })}
									style={{ width: 70 }}
								>
									<MenuItem value="N">N</MenuItem>
									<MenuItem value="S">S</MenuItem>
								</Select>
							</FormControl>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell sx={{ border: "none", padding: 1 }}>
							<InputLabel>Longitude</InputLabel>
						</TableCell>
						<TableCell sx={{ border: "none", padding: 1 }}>
							<TextField
								type="number"
								size="small"
								label="Degrees"
								variant="outlined"
								error={!lngValid}
								value={lng.degrees}
								onChange={e => setLng({ ...lng, degrees: +e.target.value })}
								onBlur={e => setLng({ ...lng, degrees: Math.round(+e.target.value * 1000) / 1000 })}
								slotProps={{ input: { endAdornment: "°" }, htmlInput: { min: 0, max: 180 } }}
								style={{ width: 80 }}
							/>
						</TableCell>
						<TableCell sx={{ border: "none", padding: 1 }}>
							<TextField
								type="number"
								size="small"
								label="Minutes"
								variant="outlined"
								error={!lngValid}
								value={lng.minutes}
								onChange={e => setLng({ ...lng, minutes: +e.target.value })}
								onBlur={e => setLng({ ...lng, minutes: Math.round(+e.target.value * 1000) / 1000 })}
								slotProps={{ input: { endAdornment: "′" }, htmlInput: { min: 0, max: 59.999 } }}
								style={{ width: 100 }}
							/>
						</TableCell>
						<TableCell sx={{ border: "none", padding: 1 }}>
							<FormControl size="small" variant="outlined">
								<InputLabel id="lng-dir-label">Dir</InputLabel>
								<Select
									labelId="lng-dir-label"
									value={lng.direction}
									label="Dir"
									onChange={e => setLng({ ...lng, direction: e.target.value as Direction<"EW"> })}
									style={{ width: 70 }}
								>
									<MenuItem value="E">E</MenuItem>
									<MenuItem value="W">W</MenuItem>
								</Select>
							</FormControl>
						</TableCell>
					</TableRow>
					<TableRow>
						{props.showHeading && (
							<>
								<TableCell sx={{ border: "none", padding: 1 }}>
									<InputLabel>Heading</InputLabel>
								</TableCell>
								<TableCell sx={{ border: "none", padding: 1 }}>
									<TextField
										type="number"
										size="small"
										// label="Heading"
										variant="outlined"
										error={!headingValid}
										value={heading}
										onChange={e => setHeading(+e.target.value)}
										slotProps={{ input: { endAdornment: "°" }, htmlInput: { min: 0, max: 360, step: 1 } }}
										style={{ width: 80 }}
									/>
								</TableCell>
							</>
						)}
						<TableCell sx={{ border: "none", padding: 1 }} colSpan={props.showHeading ? 2 : 4} align="right">
							<Button variant="contained" color="primary" disabled={!latValid || !lngValid || !headingValid} onClick={() => props.onSubmit(lat, lng, heading % 360)} sx={{ width: 70 }}>
								Submit
							</Button>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	);
}
