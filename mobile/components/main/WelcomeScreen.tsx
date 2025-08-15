import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../app/(auth)/AuthScreen';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Welcome'>;

export default function WelcomeScreen() {
    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lets start our way</Text>
            <Button title="Start" onPress={() => navigation.navigate('Survey')} />
            <View style={{ flex: 1 }} />
            <Button title="Restore account" onPress={() => navigation.navigate('Restore')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 40,
        textAlign: 'center',
    },
});
