import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TripScreen from './Trip';
import FridgeScreen from './Fridge';

export type RootStackParamList = {
  Trip: undefined;
  Fridge: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Trip"
        screenOptions={{
          headerShown: false
        }}
        >
        <Stack.Screen name="Trip" component={TripScreen} />
        <Stack.Screen name="Fridge" component={FridgeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
