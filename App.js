import {createNativeStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Details from './screens/details';
import Home from './screens/home';

const Stack = createNativeStackNavigator();

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
        name='Home'
        component={Home}></Stack.Screen>
        <Stack.Screen
        name='Details'
        component={Details}
        >
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}