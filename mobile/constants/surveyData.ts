export const surveyData = [
  {
    id: 1,
    type: "choices",
    text: "What image comes to mind when you think of yourself? Your metaphor: I am...",
    choices: [
      { key: "wind", label: "Wind", emoji: "🌬️" },
      { key: "road", label: "Road", emoji: "🛤️" },
      { key: "roots", label: "Roots", emoji: "🌳" },
      { key: "water", label: "Water", emoji: "🌊" },
      { key: "fire", label: "Fire", emoji: "🔥" },
      { key: "other", label: "Other", allowsCustomInput: true }
    ],
    usedFor: "profile visualization style"
  },
  {
    id: 2,
    type: "choices",
    text: "What sound would be your background? What resonates within you?",
    choices: [
      { key: "leaves", label: "Rustling leaves", emoji: "🍃" },
      { key: "echoes", label: "Echoes in a cave", emoji: "🪨" },
      { key: "silence", label: "Silence", emoji: "🫧" },
      { key: "rhythm", label: "Light electronic rhythm", emoji: "🎶" },
      { key: "notSure", label: "Not sure yet" }
    ],
    usedFor: "internal tone of interface / future sound theme"
  },
  {
    id: 3,
    type: "choices",
    text: "What does sharing mean to you? When you open up to others — what are you passing on?",
    choices: [
      { key: "light", label: "Light" },
      { key: "vulnerability", label: "Vulnerability" },
      { key: "strength", label: "Strength" },
      { key: "contradictions", label: "A mix of contradictions" },
      { key: "question", label: "A question" }
    ],
    usedFor: "styling your first post/profile"
  },
  {
    id: 4,
    type: "choices",
    text: "What was your last significant feeling? What did you feel the last time something truly touched you?",
    choices: [
      { key: "relief", label: "Relief" },
      { key: "pain", label: "Pain" },
      { key: "inspiration", label: "Inspiration" },
      { key: "nostalgia", label: "Nostalgia" },
      { key: "love", label: "Love" },
      { key: "confusion", label: "Confusion" },
      { key: "own", label: "Your own answer", allowsCustomInput: true }
    ],
    usedFor: "first content recommendation"
  },
  {
    id: 5,
    type: "slider",
    text: "Choose your shadow and light. Which part of you feels closer right now?",
    usedFor: "avatar color balance / theme"
  },
  {
    id: 6,
    type: "shapes",
    text: "What shape best represents you?",
    usedFor: "base geometry of avatar"
  },
  {
    id: 7,
    type: "choices",
    text: "What holds you? What do you believe in or what supports you?",
    choices: [
      { key: "people", label: "People" },
      { key: "universe", label: "The universe" },
      { key: "art", label: "Art" },
      { key: "body", label: "The body" },
      { key: "memory", label: "Memory" },
      { key: "unknown", label: "I don’t know..." },
      { key: "custom", label: "Other", allowsCustomInput: true }
    ],
    usedFor: "reflections / future AI content"
  },
  {
    id: 8,
    type: "name",
    text: "What would you like to be called here? We can help generate a name, or you can create your own.",
    usedFor: "user nickname"
  },
  {
    id: 9,
    type: "text",
    text: "What do you want to leave behind here?",
    usedFor: "first message or profile header"
  }
];