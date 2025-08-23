import React, { useState } from "react";
import { View, Button, TextInput } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

export default function QuestionChoices({ question, value, onChange }: any) {
  const [customValue, setCustomValue] = useState("");
  const theme = useTheme();

  return (
    <View>
      {question.choices.map((choice: any) => (
        <Button
          key={choice.key}
          title={`${choice.emoji || ""} ${choice.label}`}
          onPress={() => onChange(choice.key)}
          color={value === choice.key ? theme.primary : undefined}
        />
      ))}
      {question.choices.some((c: any) => c.allowsCustomInput) && (
        <TextInput
          placeholder="Other..."
          placeholderTextColor={theme.text + "88"}
          value={customValue}
          onChangeText={(txt) => { setCustomValue(txt); onChange(txt); }}
          style={{
            borderWidth: 1,
            borderColor: theme.inputBorder,
            backgroundColor: theme.inputBackground,
            color: theme.text,
            padding: 10,
            borderRadius: 5,
            marginTop: 10,
          }}
        />
      )}
    </View>
  );
}
