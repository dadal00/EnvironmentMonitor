import { Dimensions, Image, Platform, StyleSheet, TouchableOpacity, View } from "react-native";

interface CircularImageButtonProps {
    imageUri: string; // Type for the image URI
    onPress?: () => void; // Optional press handler
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const CircularImageWithShadow: React.FC<CircularImageButtonProps> =  ({ imageUri, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
         <View style={styles.shadow}/>
         <Image
            source={{ uri: imageUri }}
            style={styles.image}
            resizeMode="cover"
          />
        </TouchableOpacity>
      );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: SCREEN_WIDTH * 0.26, // Set width and height according to your needs
    height: SCREEN_WIDTH * 0.26,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: SCREEN_WIDTH * 0.13, // Make the image circular
    borderColor: 'transparent', // Optional: Remove any default border
    borderWidth: 0,
    backgroundColor: 'white',
  },
  shadow: {
    position: 'absolute',
    bottom: -SCREEN_WIDTH * 0.01,
    right: -SCREEN_WIDTH * 0.01,
    width: '100%', // Adjust as needed
    height: '100%', // Adjust as needed
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Shadow color
    opacity: 0.5,
  },
});

export default CircularImageWithShadow;