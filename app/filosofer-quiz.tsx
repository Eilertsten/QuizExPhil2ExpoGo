import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Import philosopher data from JSON file
import philosopherDataJson from "../content/json/ExPhil_Filosofer.json";

// Transform JSON data to match expected format
const PHILOSOPHER_DATA: Record<string, any> = {};
philosopherDataJson.filosofer.forEach((filosof: any) => {
  const nameParts = filosof.navn.split(" ");
  const lastName = nameParts[nameParts.length - 1];
  
  PHILOSOPHER_DATA[lastName] = {
    fullName: filosof.navn,
    lastName: lastName,
    viktigsteBidrag: filosof.viktigsteBidrag || [],
    kjenteSitater: filosof.kjenteSitaterKonsepter || [],
  };
});

// Liste over filosofer (etternavn)
const PHILOSOPHERS = Object.keys(PHILOSOPHER_DATA);

export default function FilosoferQuizScreen() {
  const router = useRouter();
  const [randomPhilosophers, setRandomPhilosophers] = useState<string[]>([]);
  const [selectedPhilosopher, setSelectedPhilosopher] = useState<string | null>(null);
  const [displayItems, setDisplayItems] = useState<string[]>([]);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  const loadNewQuestion = () => {
    // Velg 3 tilfeldige filosofer
    const shuffled = [...PHILOSOPHERS].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 3);
    setRandomPhilosophers(selected);
    
    // Velg én av de tre for å vise informasjon om
    const randomIndex = Math.floor(Math.random() * 3);
    const chosenPhilosopher = selected[randomIndex];
    setSelectedPhilosopher(chosenPhilosopher);
    
    // Hent enten viktigste bidrag eller kjente sitater
    const philosopherInfo = PHILOSOPHER_DATA[chosenPhilosopher];
    const useContributions = Math.random() > 0.5;
    
    if (useContributions && philosopherInfo.viktigsteBidrag.length > 0) {
      setDisplayItems(philosopherInfo.viktigsteBidrag);
    } else if (philosopherInfo.kjenteSitater.length > 0) {
      setDisplayItems(philosopherInfo.kjenteSitater);
    } else {
      setDisplayItems(philosopherInfo.viktigsteBidrag);
    }
    
    // Reset answered state
    setAnswered(false);
    setSelectedAnswer(null);
  };

  useEffect(() => {
    loadNewQuestion();
  }, []);

  const handleAnswer = (philosopher: string) => {
    if (answered) return; // Ikke tillat flere svar
    
    setAnswered(true);
    setSelectedAnswer(philosopher);
    
    if (philosopher === selectedPhilosopher) {
      setCorrectCount(prev => prev + 1);
    } else {
      setWrongCount(prev => prev + 1);
    }
  };

  const getButtonColor = (philosopher: string) => {
    if (!answered) return "#7c3aed";
    if (philosopher === selectedPhilosopher) return "green";
    if (philosopher === selectedAnswer) return "red";
    return "#7c3aed";
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#111" }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 20,
          paddingHorizontal: 16,
          paddingTop: 30,
          paddingBottom: 10,
          position: "relative",
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            position: "absolute",
            left: 16,
            top: 38,
            padding: 8,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 28 }}>←</Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 48,
            fontWeight: "bold",
            color: "#fff",
            textAlign: "center",
          }}
        >
          Filosofer Quiz
        </Text>
      </View>

      {/* Content */}
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 16 }}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Score display */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
            marginBottom: 20,
          }}
        >
          <View style={{ alignItems: "flex-start" }}>
            <Text style={{ color: "#ddd", fontSize: 16 }}>Korrekt:</Text>
            <Text style={{ color: "green", fontSize: 32, fontWeight: "900" }}>
              {correctCount}
            </Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={{ color: "#ddd", fontSize: 16 }}>Feil:</Text>
            <Text style={{ color: "red", fontSize: 32, fontWeight: "900" }}>
              {wrongCount}
            </Text>
          </View>
        </View>

        {/* Informasjon om valgt filosof */}
        {selectedPhilosopher && displayItems.length > 0 && (
          <View style={{ marginBottom: 20, backgroundColor: "#222", padding: 16, borderRadius: 12 }}>
            <Text style={{ color: "#7c3aed", fontSize: 18, fontWeight: "700", marginBottom: 12 }}>
              Hvem tilhører denne informasjonen?
            </Text>
            {displayItems.map((item, index) => (
              <View key={index} style={{ flexDirection: "row", marginBottom: 8 }}>
                <Text style={{ color: "#7c3aed", marginRight: 8 }}>•</Text>
                <Text style={{ color: "#ddd", fontSize: 15, flex: 1 }}>
                  {item}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Filosof knapper */}
        <View style={{ gap: 12 }}>
          {randomPhilosophers.map((philosopher, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleAnswer(philosopher)}
              disabled={answered}
              style={{
                backgroundColor: getButtonColor(philosopher),
                paddingHorizontal: 20,
                paddingVertical: 16,
                borderRadius: 12,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 20, fontWeight: "600" }}>
                {philosopher}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Neste-knapp */}
        {answered && (
          <TouchableOpacity
            onPress={loadNewQuestion}
            style={{
              marginTop: 20,
              backgroundColor: "#4da6ff",
              paddingHorizontal: 20,
              paddingVertical: 16,
              borderRadius: 12,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "700" }}>
              Neste spørsmål ➜
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
