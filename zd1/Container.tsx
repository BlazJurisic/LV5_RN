import React from 'react';
import Screen from './Screen';
import Sound from 'react-native-sound';
import { data, ImageDataI } from './data';

function Container() {
	const [imageData, setImageData] = React.useState<ImageDataI[]>([]);

	React.useEffect(() => {
		setImageData(
			data.map((item) => ({
				...item,
				sound: new Sound(item.soundName, Sound.MAIN_BUNDLE, (err) => {
					if (err) console.error('failed to load the sound', err);
				}),
			}))
		);
	}, []);

	const playSound = React.useCallback(
		(item: ImageDataI) => {
			imageData.forEach(async (imageItem) => {
				await new Promise((res) => {
					imageItem.sound.stop(() => {
						res(true);
					});
				});
			});
			item.sound.play();
		},
		[imageData]
	);

	return <Screen onImageButtonPress={playSound} imageData={imageData} />;
}

export default Container;
