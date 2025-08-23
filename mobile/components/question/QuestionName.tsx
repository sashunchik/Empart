import React from "react";
import { View, Button, TextInput } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

const generatedNames = ["Lunatra", "Soultrace", "Empulse", "Nocti", "Veru"];

export default function QuestionName({ value, onChange }: any) {
  const theme = useTheme();
  const handleRandom = () => {
    onChange(generatedNames[Math.floor(Math.random() * generatedNames.length)]);
  };

  return (
    <View>
      <Button title="Randomize" onPress={handleRandom} color={theme.primary} />
      <TextInput
        placeholder="Or enter your own..."
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
          marginTop: 10,
        }}
      />
    </View>
  );
}
