import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TripScreen from './screens/Trip';
import FridgeScreen from './screens/Fridge';
import { OverlayProvider, OverlayContext } from './components/OverlayManager';

export type RootStackParamList = {
  Trip: undefined;
  Fridge: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <OverlayProvider>
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
    </OverlayProvider>
  );
}
