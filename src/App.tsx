import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TripScreen from './screens/Trip';
import FridgeScreen from './screens/Fridge';
import { OverlayProvider } from './components/OverlayManager';
import { DatabaseProvider } from './components/DatabaseContext';
import NewTripScreen from './screens/NewTrip';

export type RootStackParamList = {
  Trip: undefined;
  Fridge: undefined;
  NewTrip: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <DatabaseProvider>
      <OverlayProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Trip"
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen name="Trip" component={TripScreen} />
            <Stack.Screen name="Fridge" component={FridgeScreen} />
            <Stack.Screen name="NewTrip" component={NewTripScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </OverlayProvider>
    </DatabaseProvider>
  );
}
