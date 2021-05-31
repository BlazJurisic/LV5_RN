import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ImageDataI } from './data';
import ImageButton from './ImageButton';

interface Props {
	imageData: ImageDataI[];
	onImageButtonPress: (item: ImageDataI) => void;
}

function Screen({ imageData, onImageButtonPress }: Props) {
	return (
		<View>
			<FlatList
				data={imageData}
				keyExtractor={(_, index) => index.toString()}
				renderItem={({ item }) => (
					<View style={styles.imageWrapper}>
						<ImageButton
							image={item.image}
							onImagePress={() => {
								onImageButtonPress(item);
							}}
						/>
					</View>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	imageWrapper: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 16,
	},
});

export default Screen;
