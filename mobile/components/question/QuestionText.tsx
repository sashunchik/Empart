import React from "react";
import { TextInput } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

export default function QuestionText({ value, onChange }: any) {
  const theme = useTheme();

  return (
    <TextInput
      placeholder="Enter your answer"
      placeholderTextColor={theme.text + "88"}
      value={value || ""}
      onChangeText={onChange}
      style={{
        borderWidth: 1,
        borderColor: theme.inputBorder,
        backgroundColor: theme.inputBackground,
        color: theme.text,
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
      }}
    />
  );
}
