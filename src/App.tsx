import MapView from "./components/MapView";

export default function App() {
	return (
		<MapView
			// ship={{ lat: 32.0853, lng: 34.7818 }}
			sites={[
				{
					lat: 32.0853,
					lng: 34.7818,
					heading: 0,
				},
			]}
		/>
	);
}
