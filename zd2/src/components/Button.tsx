import React from 'react';
import { Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

interface Props {
	buttonText: string;
	buttonAction: () => void;
	wrapperStyle: ViewStyle;
	textStyle: TextStyle;
}

function Button({ buttonText, wrapperStyle, textStyle, buttonAction }: Props) {
	return (
		<TouchableOpacity onPress={buttonAction} style={wrapperStyle}>
			<Text style={textStyle}>{buttonText}</Text>
		</TouchableOpacity>
	);
}

export default Button;
