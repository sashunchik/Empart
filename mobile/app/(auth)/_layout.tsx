import 'react-native-get-random-values';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../../components/main/WelcomeScreen';
import SurveyScreen from '../../components/main/SurveyScreen';
import RestoreScreen from '../../components/main//RestoreScreen';

const Stack = createStackNavigator();

export default function AuthLayout() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Survey" component={SurveyScreen} />
            <Stack.Screen name="Restore" component={RestoreScreen} />
        </Stack.Navigator>
    );
}
