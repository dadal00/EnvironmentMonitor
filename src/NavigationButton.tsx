import React from 'react';
import { TouchableOpacity, Image, StyleSheet, ImageSourcePropType, ViewStyle, ImageStyle } from 'react-native';

interface ImageButtonProps {
  onPress: () => void;
  imageUri: string;
  buttonStyle?: ViewStyle;
  imageStyle?: ImageStyle;
}

const ImageButton: React.FC<ImageButtonProps> = ({ onPress, imageUri, buttonStyle, imageStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle ? buttonStyle: styles.button]}>
      <Image source={{uri: imageUri}}
        style={[imageStyle ? imageStyle : styles.image]} 
        resizeMode='contain'
        />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
  image: {
    width: 50,
    height: 50,
  },
});

export default ImageButton;
