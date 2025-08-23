import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../app/(auth)/AuthScreen';
import { useTheme } from '../theme/ThemeProvider';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Welcome'>;

export default function WelcomeScreen() {
    const navigation = useNavigation<NavigationProp>();
    const theme = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={[styles.title, { color: theme.text }]}>Let's start our way</Text>

            <Button
                title="Start"
                onPress={() => navigation.navigate('Survey')}
                color={theme.primary}
            />

            <View style={{ flex: 1 }} />

            <Button
                title="Restore account"
                onPress={() => navigation.navigate('Restore')}
                color={theme.primary}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 40,
        textAlign: 'center',
    },
});
