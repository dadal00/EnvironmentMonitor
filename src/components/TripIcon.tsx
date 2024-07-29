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
         {/* <View style={styles.shadow}/> */}
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
    width: SCREEN_WIDTH * 0.24, // Set width and height according to your needs
    height: SCREEN_WIDTH * 0.24,
    ...Platform.select({
      ios: {
        shadowColor: '#D4D3CB',
        shadowOffset: { width: SCREEN_WIDTH * 0.01, height: SCREEN_WIDTH * 0.009 },
        shadowOpacity: 1,
        shadowRadius: 0, 
      }
    }), 
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: SCREEN_WIDTH * 0.12, // Make the image circular
    borderColor: 'transparent', // Optional: Remove any default border
    borderWidth: 0,
    backgroundColor: 'white',
    
  },
});

export default CircularImageWithShadow;