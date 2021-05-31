import Sound from 'react-native-sound';

export interface DataI {
	image: number;
	soundName: string;
}

export interface ImageDataI extends DataI {
	sound: Sound;
}

export const data: DataI[] = [
	{
		image: require('./assets/images/zdravko_mamic.jpeg'),
		soundName: 'zdravko_mamic_ajmo.mp3',
	},
	{
		image: require('./assets/images/elon_musk.jpeg'),
		soundName: 'elon_musk.mp3',
	},
	{
		image: require('./assets/images/mark_zuckerberg.jpeg'),
		soundName: 'mark_zuckerberg.mp3',
	},
];
