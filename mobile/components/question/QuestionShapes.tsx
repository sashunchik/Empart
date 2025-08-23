import React from "react";
import { View, Button } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

const shapes = ["Circle ⭕", "Wave ~~~", "Shard ✦", "Line ─", "Dissolve ⋯"];

export default function QuestionShapes({ value, onChange }: any) {
  const theme = useTheme();

  return (
    <View style={{ marginBottom: 20 }}>
      {shapes.map((shape) => (
        <Button
          key={shape}
          title={shape}
          onPress={() => onChange(shape)}
          color={value === shape ? theme.primary : undefined}
        />
      ))}
    </View>
  );
}
