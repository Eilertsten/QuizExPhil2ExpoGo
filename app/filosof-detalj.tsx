import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
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
  const firstName = nameParts.slice(0, -1).join(" ");
  const lastName = nameParts[nameParts.length - 1];
  
  PHILOSOPHER_DATA[filosof.navn] = {
    name: filosof.navn,
    firstName: firstName,
    lastName: lastName,
    years: filosof.årstall,
    epoke: filosof.epoke,
    fagfelt: Array.isArray(filosof.fagfelt) ? filosof.fagfelt.join(", ") : filosof.fagfelt,
    representerer: Array.isArray(filosof.representerer) ? filosof.representerer.join(", ") : filosof.representerer,
    omFilosofen: filosof.omFilosofen,
    viktigsteBidrag: filosof.viktigsteBidrag || [],
    kjenteSitater: filosof.kjenteSitaterKonsepter || [],
    viktigForEksamen: filosof.viktigForEksamen || []
  };
});

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

function CollapsibleSection({ title, children, defaultExpanded = false }: CollapsibleSectionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <View style={{ marginBottom: 12 }}>
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        style={{
          backgroundColor: "#222",
          padding: 16,
          borderRadius: 8,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600", flex: 1 }}>
          {title}
        </Text>
        <Text style={{ color: "#fff", fontSize: 24 }}>
          {expanded ? "−" : "+"}
        </Text>
      </TouchableOpacity>
      {expanded && (
        <View
          style={{
            backgroundColor: "#1a1a1a",
            padding: 16,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            marginTop: 2,
          }}
        >
          {children}
        </View>
      )}
    </View>
  );
}

export default function FilosofDetaljScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const philosopherName = params.name as string;
  const lastName = params.lastName as string;
  const fromQuiz = params.fromQuiz as string;

  // Find philosopher by full name or by lastName
  let philosopher = PHILOSOPHER_DATA[philosopherName];
  
  if (!philosopher && lastName) {
    // Search by lastName
    philosopher = Object.values(PHILOSOPHER_DATA).find(
      (p: any) => p.lastName === lastName
    );
  }

  if (!philosopher) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#111", padding: 16 }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: "#fff", fontSize: 28 }}>←</Text>
        </TouchableOpacity>
        <Text style={{ color: "#fff", fontSize: 18, marginTop: 20 }}>
          Filosof ikke funnet
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#111" }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          paddingVertical: 16,
          paddingHorizontal: 16,
          paddingTop: 60,
          marginTop: 20,
          position: "relative",
        }}
      >
        {fromQuiz !== "true" && (
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ padding: 8, position: "absolute", left: 16, top: 98, zIndex: 1 }}
          >
            <Text style={{ color: "#fff", fontSize: 28 }}>←</Text>
          </TouchableOpacity>
        )}
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "400",
              textAlign: "center",
            }}
          >
            {philosopher.firstName}
          </Text>
          <Text
            style={{
              color: "#fff",
              fontSize: 34,
              fontWeight: "bold",
              textAlign: "center",
              letterSpacing: 1,
            }}
          >
            {philosopher.lastName.toUpperCase()}
          </Text>
          <Text style={{ color: "#aaa", fontSize: 18, marginTop: 4, textAlign: "center" }}>
            ({philosopher.years})
          </Text>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, paddingTop: 0 }}
      >
        {/* Main Info */}
        <View style={{ marginBottom: 24 }}>

          <View style={{ marginBottom: 8 }}>
            <Text style={{ color: "#4da6ff", fontSize: 16, fontWeight: "600" }}>
              Epoke:
            </Text>
            <Text style={{ color: "#ddd", fontSize: 16, marginTop: 4 }}>
              {philosopher.epoke}
            </Text>
          </View>

          <View style={{ marginBottom: 8 }}>
            <Text style={{ color: "#4da6ff", fontSize: 16, fontWeight: "600" }}>
              Fagfelt:
            </Text>
            <Text style={{ color: "#ddd", fontSize: 16, marginTop: 4 }}>
              {philosopher.fagfelt}
            </Text>
          </View>

          <View style={{ marginBottom: 8 }}>
            <Text style={{ color: "#4da6ff", fontSize: 16, fontWeight: "600" }}>
              Representerer:
            </Text>
            <Text style={{ color: "#ddd", fontSize: 16, marginTop: 4 }}>
              {philosopher.representerer}
            </Text>
          </View>
        </View>

        {/* Collapsible Sections */}
        <CollapsibleSection title="Om filosofen" defaultExpanded={false}>
          <Text style={{ color: "#ddd", fontSize: 15, lineHeight: 24 }}>
            {philosopher.omFilosofen}
          </Text>
        </CollapsibleSection>

        <CollapsibleSection title="Viktigste bidrag">
          {philosopher.viktigsteBidrag.map((bidrag: string, index: number) => (
            <View
              key={index}
              style={{ flexDirection: "row", marginBottom: 8 }}
            >
              <Text style={{ color: "#4da6ff", marginRight: 8 }}>•</Text>
              <Text style={{ color: "#ddd", fontSize: 15, flex: 1 }}>
                {bidrag}
              </Text>
            </View>
          ))}
        </CollapsibleSection>

        <CollapsibleSection title="Kjente sitater/konsepter">
          {philosopher.kjenteSitater.map((sitat: string, index: number) => (
            <View
              key={index}
              style={{ flexDirection: "row", marginBottom: 8 }}
            >
              <Text style={{ color: "#4da6ff", marginRight: 8 }}>•</Text>
              <Text style={{ color: "#ddd", fontSize: 15, flex: 1 }}>
                {sitat}
              </Text>
            </View>
          ))}
        </CollapsibleSection>

        <CollapsibleSection title="Viktig for eksamen">
          {philosopher.viktigForEksamen.map((punkt: string, index: number) => (
            <View
              key={index}
              style={{ flexDirection: "row", marginBottom: 8 }}
            >
              <Text style={{ color: "#4da6ff", marginRight: 8 }}>•</Text>
              <Text style={{ color: "#ddd", fontSize: 15, flex: 1 }}>
                {punkt}
              </Text>
            </View>
          ))}
        </CollapsibleSection>

        {/* Link tilbake til filosofer-quiz hvis brukeren kom derfra */}
        {fromQuiz === "true" && (
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              marginTop: 24,
              marginBottom: 16,
              padding: 16,
              backgroundColor: "#4da6ff",
              borderRadius: 8,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
              Tilbake
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
