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
    kategori: filosof.kategori || "VIKTIG",
  };
});

// Liste over filosofer (etternavn)
const ALL_PHILOSOPHERS = Object.keys(PHILOSOPHER_DATA);

export default function FilosoferQuizScreen() {
  const router = useRouter();
  const [randomPhilosophers, setRandomPhilosophers] = useState<string[]>([]);
  const [selectedPhilosopher, setSelectedPhilosopher] = useState<string | null>(null);
  const [displayItems, setDisplayItems] = useState<string[]>([]);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [showPhilosopher, setShowPhilosopher] = useState(false);
  const [showPhilosopherName, setShowPhilosopherName] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["TOPP 10"]);

  // Toggle kategori valg
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        // Fjern kategorien hvis den allerede er valgt
        const newCategories = prev.filter(c => c !== category);
        // Sørg for at minst én kategori er valgt
        return newCategories.length > 0 ? newCategories : prev;
      } else {
        // Legg til kategorien
        return [...prev, category];
      }
    });
  };

  // Filtrer filosofer basert på valgte kategorier
  const getFilteredPhilosophers = () => {
    return ALL_PHILOSOPHERS.filter(name => {
      const category = PHILOSOPHER_DATA[name].kategori;
      return selectedCategories.includes(category);
    });
  };

  const loadNewQuestion = () => {
    // Velg 3 tilfeldige filosofer fra filtrert liste
    const filteredPhilosophers = getFilteredPhilosophers();
    if (filteredPhilosophers.length < 3) {
      // Ikke nok filosofer i filteret
      return;
    }
    const shuffled = [...filteredPhilosophers].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 3);
    setRandomPhilosophers(selected);
    
    // Velg én av de tre for å vise informasjon om
    const randomIndex = Math.floor(Math.random() * 3);
    const chosenPhilosopher = selected[randomIndex];
    setSelectedPhilosopher(chosenPhilosopher);
    
    // Hent viktigste bidrag
    const philosopherInfo = PHILOSOPHER_DATA[chosenPhilosopher];
    setDisplayItems(philosopherInfo.viktigsteBidrag || []);
    
    // Reset answered state
    setAnswered(false);
    setSelectedAnswer(null);
    // Ikke reset showPhilosopher - behold tilstanden
    // Hvis Lære modus er på, oppdater navnet med delay
    if (showPhilosopher) {
      setShowPhilosopherName(false);
      setTimeout(() => {
        setShowPhilosopherName(true);
      }, 3000);
    }
  };

  useEffect(() => {
    loadNewQuestion();
  }, [selectedCategories]);

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
    if (!answered) return "#333";
    if (philosopher === selectedAnswer && philosopher === selectedPhilosopher) return "green";
    if (philosopher === selectedAnswer) return "red";
    if (philosopher === selectedPhilosopher) return getCategoryColor(selectedPhilosopher); // Kategorifargen for korrekt svar
    return "#333";
  };

  const getButtonBorderColor = (philosopher: string) => {
    if (!answered) return "#555";
    if (philosopher === selectedAnswer && philosopher === selectedPhilosopher) return "green";
    if (philosopher === selectedAnswer) return "red";
    if (philosopher === selectedPhilosopher) return getCategoryColor(selectedPhilosopher); // Kategorifargen for korrekt svar
    return "#555";
  };

  // Få farge basert på kategori
  const getCategoryColor = (philosopherName: string | null) => {
    if (!philosopherName) return "#fff";
    const category = PHILOSOPHER_DATA[philosopherName]?.kategori;
    switch (category) {
      case "TOPP 10":
        return "#a259ff";
      case "SVÆRT VIKTIG":
        return "#4da6ff";
      case "VIKTIG":
        return "#00d4aa";
      default:
        return "#fff";
    }
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
          Filosof Quiz
        </Text>
      </View>

      {/* Content */}
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 16 }}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Kategori filter */}
        <View style={{ marginTop: 10, marginBottom: 20 }}>
          <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
            {[
              { label: "Topp 10", value: "TOPP 10", color: "#a259ff" },
              { label: "Svært viktige", value: "SVÆRT VIKTIG", color: "#4da6ff" },
              { label: "Viktige", value: "VIKTIG", color: "#00d4aa" }
            ].map((category) => {
              // Beregn antall filosofer i denne kategorien
              const count = ALL_PHILOSOPHERS.filter(name => 
                PHILOSOPHER_DATA[name].kategori === category.value
              ).length;
              
              const isSelected = selectedCategories.includes(category.value);
              
              return (
                <TouchableOpacity
                  key={category.value}
                  onPress={() => toggleCategory(category.value)}
                  style={{
                    backgroundColor: isSelected ? category.color : "#333",
                    paddingHorizontal: 8,
                    paddingVertical: 6,
                    borderRadius: 8,
                    borderWidth: 2,
                    borderColor: isSelected ? category.color : "#555",
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 13, fontWeight: "600" }}>
                    {category.label} - {isSelected ? count : 0}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Score display */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
            marginBottom: 0,
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

        {/* Filosofen tekst */}
        {selectedPhilosopher && (
          <Text style={{ color: "#fff", fontSize: 24, fontWeight: "700", marginBottom: 12, marginTop: 0, textAlign: "center" }}>
            Hvilken person har bidratt{"\n"}med dette til filosofien?
          </Text>
        )}

        {/* Filosof knapper */}
        <View style={{ flexDirection: "row", gap: 12, marginBottom: 20 }}>
          {randomPhilosophers.map((philosopher, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleAnswer(philosopher)}
              disabled={answered}
              style={{
                flex: 1,
                backgroundColor: answered ? getButtonColor(philosopher) : "#8B7BA8",
                paddingHorizontal: 10,
                paddingVertical: 12,
                borderRadius: 8,
                borderWidth: 2,
                borderColor: answered ? getButtonBorderColor(philosopher) : "#6B5B88",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600", textAlign: "center" }}>
                {philosopher}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Informasjon om valgt filosof */}
        {selectedPhilosopher && displayItems.length > 0 && (
          <View style={{ marginBottom: 20, backgroundColor: "#222", padding: 16, borderRadius: 12 }}>
            {displayItems.map((item, index) => (
              <View key={index} style={{ flexDirection: "row", marginBottom: 8 }}>
                <Text style={{ color: "#7c3aed", marginRight: 8 }}>•</Text>
                <Text style={{ color: "#ddd", fontSize: 17, flex: 1 }}>
                  {item}
                </Text>
              </View>
            ))}
            
            {/* Checkbox for å vise filosof */}
            <TouchableOpacity
              onPress={() => {
                // Ikke tillat endring hvis checkboxen er på og navnet ikke er vist ennå
                if (showPhilosopher && !showPhilosopherName) {
                  return;
                }
                
                console.log('Checkbox clicked. Current state:', showPhilosopher, 'Selected philosopher:', selectedPhilosopher);
                const newState = !showPhilosopher;
                setShowPhilosopher(newState);
                
                if (newState) {
                  // Når checkboxen krysses av, vent 3 sekunder før navnet vises
                  setShowPhilosopherName(false);
                  setTimeout(() => {
                    setShowPhilosopherName(true);
                  }, 3000);
                } else {
                  // Når checkboxen fjernes, skjul navnet umiddelbart
                  setShowPhilosopherName(false);
                }
              }}
              disabled={showPhilosopher && !showPhilosopherName}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 16,
                paddingTop: 12,
                borderTopWidth: 1,
                borderTopColor: "#444",
                opacity: (showPhilosopher && !showPhilosopherName) ? 0.5 : 1,
              }}
            >
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderWidth: 2,
                  borderColor: "#888",
                  borderRadius: 4,
                  marginRight: 12,
                  backgroundColor: showPhilosopher ? "#888" : "transparent",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {showPhilosopher && (
                  <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
                    ✓
                  </Text>
                )}
              </View>
              <Text style={{ color: "#ddd", fontSize: 16 }}>
                Læremodus
              </Text>
              {showPhilosopher && showPhilosopherName && (
                <Text style={{ 
                  color: "#fff", 
                  backgroundColor: getCategoryColor(selectedPhilosopher), 
                  fontSize: 16, 
                  fontWeight: "700",
                  paddingHorizontal: 12, 
                  paddingVertical: 4, 
                  borderRadius: 6,
                  marginLeft: 12
                }}>
                  {selectedPhilosopher}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        {/* Neste-knapp */}
        {answered && (
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <View style={{ alignItems: "flex-end" }}>
              <TouchableOpacity
                onPress={loadNewQuestion}
                style={{
                  marginTop: 0,
                  paddingHorizontal: 23,
                  paddingVertical: 12,
                  backgroundColor: "#4da6ff",
                  borderRadius: 8,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#fff", fontSize: 18, fontWeight: "700" }}>
                  Neste ➜
                </Text>
              </TouchableOpacity>
              
              {selectedPhilosopher && (showPhilosopher || answered) && (
                <TouchableOpacity 
                  onPress={() => router.push({ 
                    pathname: "/filosof-detalj", 
                    params: { lastName: selectedPhilosopher, fromQuiz: "true" } 
                  })}
                  style={{ marginTop: 8 }}
                >
                  <Text style={{ color: "#4da6ff", fontSize: 14, textDecorationLine: "underline" }}>
                    Lære mer om {selectedPhilosopher}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}

        {/* Legend */}
        <View
          style={{
            marginTop: 30,
            paddingHorizontal: 16,
            paddingVertical: 12,
            backgroundColor: "#1a1a1a",
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              color: "#ddd",
              fontSize: 14,
              fontWeight: "600",
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            Fargekoder:
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 16,
                  height: 16,
                  backgroundColor: "#a259ff",
                  borderRadius: 4,
                  marginRight: 6,
                }}
              />
              <Text style={{ color: "#aaa", fontSize: 12 }}>Topp 10</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 16,
                  height: 16,
                  backgroundColor: "#4da6ff",
                  borderRadius: 4,
                  marginRight: 6,
                }}
              />
              <Text style={{ color: "#aaa", fontSize: 12 }}>Svært viktige</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 16,
                  height: 16,
                  backgroundColor: "#00d4aa",
                  borderRadius: 4,
                  marginRight: 6,
                }}
              />
              <Text style={{ color: "#aaa", fontSize: 12 }}>Viktige</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
