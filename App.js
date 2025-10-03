import { useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

const questions = [
  {
    category: "Geografi",
    question: "Hva er hovedstaden i Norge?",
    options: ["Oslo", "Bergen", "Trondheim"],
    correctIndex: 0,
  },
  {
    category: "Kunst",
    question: "Hvem malte Mona Lisa?",
    options: ["Picasso", "Da Vinci", "Van Gogh"],
    correctIndex: 1,
  },
  {
    category: "Geografi",
    question: "Hvor mange kontinenter finnes det?",
    options: ["5", "6", "7"],
    correctIndex: 2,
  },
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (index) => {
    const question = questions[currentIndex];

    if (index === question.correctIndex) {
      const nextIndex = currentIndex + 1;
      setScore(score + 1);

      if (nextIndex < questions.length) {
        setCurrentIndex(nextIndex);
      } else {
        Alert.alert("Gratulerer!", `Du klarte alle spørsmålene! Poeng: ${score + 1}`, [
          { text: "Start på nytt", onPress: resetQuiz },
        ]);
      }
    } else {
      Alert.alert("Feil svar!", `Du fikk ${score} poeng.`, [
        { text: "Prøv igjen", onPress: resetQuiz },
      ]);
    }
  };

  const resetQuiz = () => {
    setScore(0);
    setCurrentIndex(0);
  };

  const question = questions[currentIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.category}>Kategori: {question.category}</Text>
      <Text style={styles.question}>{question.question}</Text>
      {question.options.map((option, i) => (
        <View key={i} style={styles.button}>
          <Button title={option} onPress={() => handleAnswer(i)} />
        </View>
      ))}
      <Text style={styles.score}>Poeng: {score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  category: { fontSize: 18, marginBottom: 10 },
  question: { fontSize: 22, marginBottom: 20 },
  button: { marginVertical: 5 },
  score: { fontSize: 18, marginTop: 20, textAlign: "center" },
});
