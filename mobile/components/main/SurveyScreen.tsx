import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

type Props = {
    onComplete?: () => void;
};

const questions = [
    ''
];

export default function SurveyScreen({ onComplete }: Props) {
    const [index, setIndex] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);

    const onNext = () => {
        if (index < questions.length - 1) {
            setIndex(index + 1);
        } else {
            onComplete?.();
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.question}>{questions[index]}</Text>
            <Button title={index === questions.length - 1 ? "Finish" : "Continue"} onPress={onNext} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    question: { fontSize: 20, marginBottom: 20 },
});
