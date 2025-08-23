import React from "react";
import QuestionChoices from "./QuestionChoices";
import QuestionText from "./QuestionText";
import QuestionName from "./QuestionName";
import QuestionSlider from "./QuestionSlider";
import QuestionShapes from "./QuestionShapes";

export default function QuestionRenderer({ question, value, onChange }: any) {
  switch (question.type) {
    case "choices": return <QuestionChoices question={question} value={value} onChange={onChange} />;
    case "text": return <QuestionText value={value} onChange={onChange} />;
    case "name": return <QuestionName value={value} onChange={onChange} />;
    case "slider": return <QuestionSlider value={value} onChange={onChange} />;
    case "shapes": return <QuestionShapes value={value} onChange={onChange} />;
    default: return null;
  }
}
