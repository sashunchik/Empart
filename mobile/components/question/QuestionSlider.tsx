import React from "react";
import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";
import { useTheme } from "../theme/ThemeProvider";

export default function QuestionSlider({ value, onChange }: any) {
  const theme = useTheme();

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ color: theme.text }}>🌒 Shadow</Text>
      <Slider
        minimumValue={0}
        maximumValue={1}
        step={0.01}
        value={value || 0.5}
        onValueChange={onChange}
        minimumTrackTintColor={theme.primary}
        maximumTrackTintColor={theme.inputBorder}
      />
      <Text style={{ color: theme.text }}>☀️ Light</Text>
    </View>
  );
}
