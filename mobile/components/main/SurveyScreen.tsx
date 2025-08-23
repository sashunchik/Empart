import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { surveyData } from "../../constants/surveyData";
import QuestionRenderer from "../question/QuestionRenderer";

export default function SurveyScreen({ onComplete }: any) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const theme = useTheme();

  const onNext = () => {
    if (index < surveyData.length - 1) setIndex(index + 1);
    else onComplete?.();
  };

  const onChangeAnswer = (val: any) => {
    setAnswers((prev: any) => ({ ...prev, [surveyData[index].id]: val }));
  };

  const question = surveyData[index];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.question, { color: theme.text }]}>{question.text}</Text>
      <QuestionRenderer question={question} value={answers[question.id]} onChange={onChangeAnswer} />
      <Button
        title={index === surveyData.length - 1 ? "Done" : "Next"}
        onPress={onNext}
        color={theme.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  question: { fontSize: 20, marginBottom: 20 },
});
