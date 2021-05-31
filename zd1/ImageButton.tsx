import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
	image: number;
	onImagePress: () => void;
}

function ImageButton({ image, onImagePress }: Props) {
	return (
		<TouchableOpacity onPress={onImagePress} style={styles.wrapper}>
			<Image source={image} style={styles.image} />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		width: '80%',
		height: 200,
	},
	image: {
		height: '100%',
		width: '100%',
	},
});

export default ImageButton;
