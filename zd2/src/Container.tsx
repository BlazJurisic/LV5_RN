import React from 'react';
import { CameraOptions, launchCamera } from 'react-native-image-picker';
import { EventUserLocation, LatLng, MapEvent } from 'react-native-maps';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import Geocoder from '@timwangdev/react-native-geocoder';

import Screen from './Screen';

const optionsAndroid: CameraOptions = {
	maxWidth: 1600,
	maxHeight: 1600,
	quality: 1,
	mediaType: 'photo',
	saveToPhotos: true,
};

export interface ILocation {
	latitude: number;
	longitude: number;
	country: string;
	city: string;
	address: string;
}

function Container() {
	const [customMarkerData, setCustomMarkerData] = React.useState<LatLng[]>([]);
	const [userLocation, setUserLocation] = React.useState<ILocation>();

	const displayCameraModal = React.useCallback(async () => {
		const res = await check(PERMISSIONS.ANDROID.CAMERA);
		if (res !== RESULTS.GRANTED) {
			const newRes = await request(PERMISSIONS.ANDROID.CAMERA);
			if (newRes === RESULTS.GRANTED) {
				launchCamera(optionsAndroid, (response) => {
					if (!response.didCancel) {
					}
				});
			}
		} else {
			launchCamera(optionsAndroid, (response) => {
				if (!response.didCancel) {
				}
			});
		}
	}, []);

	const addNewCustomMarker = React.useCallback((event: MapEvent<{}>) => {
		const eventCopy = { ...event };
		setCustomMarkerData((prev) => [...prev, eventCopy.nativeEvent.coordinate]);
	}, []);

	const findUserLocation = React.useCallback(async (event: EventUserLocation) => {
		const eventCopy = { ...event };
		const location = await Geocoder.geocodePosition({
			lat: eventCopy.nativeEvent.coordinate.latitude,
			lng: eventCopy.nativeEvent.coordinate.longitude,
		}).catch(console.log);
		if (location)
			setUserLocation({
				city: location[0].locality || '',
				country: location[0].country,
				latitude: eventCopy.nativeEvent.coordinate.latitude,
				longitude: eventCopy.nativeEvent.coordinate.longitude,
				address: `${location[0].streetName} ${location[0].streetNumber}`,
			});
	}, []);

	return (
		<Screen
			customMarkerData={customMarkerData}
			userLocation={userLocation}
			onButtonPress={displayCameraModal}
			onMapPress={addNewCustomMarker}
			onUserLocationChange={findUserLocation}
		/>
	);
}

export default Container;
