import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import MapView, { EventUserLocation, LatLng, MapEvent, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Button from './components/Button';
import { ILocation } from './Container';

interface Props {
	customMarkerData: LatLng[];
	userLocation: ILocation | undefined;
	onButtonPress: () => void;
	onMapPress: (event: MapEvent<{}>) => void;
	onUserLocationChange: (event: EventUserLocation) => Promise<void>;
}

function Screen({ customMarkerData, userLocation, onButtonPress, onMapPress, onUserLocationChange }: Props) {
	const [mapBugMargin, setMapBugMargin] = React.useState(0);

	const customMarkers = React.useMemo(
		() =>
			customMarkerData.map((customMarker, index) => (
				<Marker
					key={index.toString()}
					coordinate={{ latitude: customMarker.latitude, longitude: customMarker.longitude }}>
					<Image resizeMode="contain" source={require('./custom_marker.png')} style={styles.marker} />
				</Marker>
			)),
		[customMarkerData]
	);

	return (
		<View style={styles.container}>
			<Button
				buttonText="TAKE PHOTO"
				buttonAction={onButtonPress}
				wrapperStyle={styles.buttonWrapper}
				textStyle={styles.buttonText}
			/>
			<View>
				<Text>{`Latitude: ${userLocation?.latitude || ''}`}</Text>
				<Text>{`Longitude: ${userLocation?.longitude || ''}`}</Text>
				<Text>{`Country: ${userLocation?.country || ''}`}</Text>
				<Text>{`City: ${userLocation?.city || ''}`}</Text>
				<Text>{`Address: ${userLocation?.address || ''}`}</Text>
			</View>
			<MapView
				onPress={onMapPress}
				showsUserLocation
				showsMyLocationButton
				userLocationUpdateInterval={10000}
				userLocationFastestInterval={10000}
				onUserLocationChange={onUserLocationChange}
				onMapReady={() => {
					setMapBugMargin(1);
				}}
				provider={PROVIDER_GOOGLE}
				style={[styles.mapStyle, { marginBottom: mapBugMargin }]}>
				{customMarkers}
				{userLocation && (
					<Marker
						coordinate={{ latitude: userLocation.latitude, longitude: userLocation.longitude }}
						title="I am here"
						description="Wow! I finally know where I am"
					/>
				)}
			</MapView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 8,
	},
	buttonWrapper: {
		paddingVertical: 14,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'green',
	},
	buttonText: {
		color: 'white',
	},
	mapStyle: { flex: 1 },
	marker: { width: 35, height: 35 },
});

export default Screen;
