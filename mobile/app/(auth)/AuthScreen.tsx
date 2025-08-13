import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../../components/main/WelcomeScreen';
import SurveyScreen from '../../components/main/SurveyScreen';
import RestoreScreen from '../../components/main/RestoreScreen';

export type AuthStackParamList = {
    Welcome: undefined;
    Survey: undefined;
    Restore: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Survey" component={SurveyScreen} />
            <Stack.Screen name="Restore" component={RestoreScreen} />
        </Stack.Navigator>
    );
}
