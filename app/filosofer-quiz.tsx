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
import philosopherDataJson from "../NotaterOgJSON/Filosofer/ExPhil_Filosofer.json";

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

  useEffect(() => {
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
  }, []);

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
        {/* Filosof knapper */}
        <View style={{ marginTop: 20, gap: 12 }}>
          {randomPhilosophers.map((philosopher, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                // TODO: Implementer quiz logikk
                console.log(`Valgt: ${philosopher}`);
              }}
              style={{
                backgroundColor: "#7c3aed",
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

        {/* Informasjon om valgt filosof */}
        {selectedPhilosopher && displayItems.length > 0 && (
          <View style={{ marginTop: 30, backgroundColor: "#222", padding: 16, borderRadius: 12 }}>
            <Text style={{ color: "#7c3aed", fontSize: 18, fontWeight: "700", marginBottom: 12 }}>
              Viktig informasjon om {PHILOSOPHER_DATA[selectedPhilosopher].fullName}:
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

        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 50 }}>
          <Text style={{ color: "#ddd", fontSize: 18, textAlign: "center" }}>
            Filosofer Quiz kommer snart!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
