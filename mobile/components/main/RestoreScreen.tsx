import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import * as bip39 from 'bip39';
import * as SecureStore from 'expo-secure-store';

const SEED_KEY = 'user_seed';

type Props = {
    onRestoreSuccess?: () => void;
};

export default function RestoreScreen({ onRestoreSuccess }: Props) {
    const [mnemonic, setMnemonic] = useState('');

    const onRestore = async () => {
        const trimmedMnemonic = mnemonic.trim();
        if (!bip39.validateMnemonic(trimmedMnemonic)) {
            Alert.alert('Error', 'Incorrect seed');
            return;
        }

        try {
            try {
                await SecureStore.setItemAsync(SEED_KEY, trimmedMnemonic);
                onRestoreSuccess?.();
            } catch (error) {
                Alert.alert('Error', 'We cant save seed');
                console.error('SecureStore error:', error);
            }

        } catch (error) {
            Alert.alert('Error', 'We cant save seed');
            console.error('SecureStore error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                multiline
                numberOfLines={3}
                placeholder="Enter your seed"
                value={mnemonic}
                onChangeText={setMnemonic}
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Button title="Reset account" onPress={onRestore} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        marginBottom: 20,
        borderRadius: 6,
        textAlignVertical: 'top',
    },
});
