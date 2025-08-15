import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert, TextInput } from "react-native";
import { generateSeedAndKeys, restoreKeys, authenticateUser, updateUserProfile } from "../../services/authService";

type Props = { onComplete?: () => void; };

const questions = [
    ''
];

export default function SurveyScreen({ onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));
  const [loading, setLoading] = useState(true);
  const [pubKeyHex, setPubKeyHex] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let keys = await restoreKeys();
      if (!keys) keys = await generateSeedAndKeys();
      setPubKeyHex(keys.pubKeyHex);

      const ok = await authenticateUser();
      if (!ok) Alert.alert("Error", "You cant auth");
      setLoading(false);
    })();
  }, []);

  const onNext = () => {
    if (index < questions.length - 1) setIndex(index + 1);
    else finishSurvey();
  };

  const onChangeAnswer = (text: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = text;
    setAnswers(newAnswers);
  };

  const finishSurvey = async () => {
    if (!pubKeyHex) return;
    setLoading(true);
    const nickname = answers[0] || "User";
    const surveyData = JSON.stringify(answers);
    const avatarBase64 = "";

    const success = await updateUserProfile(pubKeyHex, nickname, avatarBase64, surveyData);
    setLoading(false);

    if (success) {
      Alert.alert("Thanks", "Your data saved");
      onComplete?.();
    } else {
      Alert.alert("Error", "We can not save you data");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{questions[index]}</Text>
      <TextInput
        style={styles.input}
        value={answers[index]}
        onChangeText={onChangeAnswer}
        placeholder="Enter your answer"
      />
      <Button title={index === questions.length - 1 ? "Done" : "Next"} onPress={onNext} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  question: { fontSize: 20, marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 20, borderRadius: 5 }
});
