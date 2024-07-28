import { Image, Platform, StyleSheet, TouchableOpacity, View } from "react-native";

interface CircularImageButtonProps {
    imageUri: string; // Type for the image URI
    onPress?: () => void; // Optional press handler
}

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
    position: 'absolute',
    width: 100, // Set width and height according to your needs
    height: 100,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50, // Make the image circular
    borderColor: 'transparent', // Optional: Remove any default border
    borderWidth: 0,
    backgroundColor: 'blue',
  },
  shadow: {
    // ...Platform.select({
    //   ios: {
    //     shadowColor: '#000',
    //     shadowOffset: { width: 4, height: 4},
    //     shadowOpacity: 0.3,
    //     shadowRadius: 6,
    //   },
    //   android: {
    //     elevation: 8,
    //   },
    // }),
    position: 'absolute',
    bottom: -4,
    right: -5,
    width: '100%', // Adjust as needed
    height: '100%', // Adjust as needed
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Shadow color
    opacity: 0.5,
  },
});

export default CircularImageWithShadow;