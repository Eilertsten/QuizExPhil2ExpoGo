import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

// Philosopher data extracted from the markdown file
const PHILOSOPHER_DATA: Record<string, any> = {
  "René Descartes": {
    name: "René Descartes",
    years: "1596-1650",
    epoke: "Tidlig moderne filosofi (1600-tallet)",
    fagfelt: "Epistemologi, Metafysikk, Rasjonalisme",
    representerer: "Moderne filosofis grunnlegger, Substansdualisme",
    omFilosofen: `René Descartes kalles ofte "moderne filosofis far" fordi han brøt radikalt med middelalderens tankesett og innførte en ny metode for å søke sikker kunnskap. Som ung soldat hadde han en serie drømmer som inspirerte ham til å vie sitt liv til filosofi og matematikk. Descartes var ikke bare filosof, men også en strålende matematiker som oppfant det koordinatsystemet vi bruker i dag. Hans mest kjente innsikt kom gjennom radikal tvil: ved å tvile på alt - sansene, matematikken, til og med om han var våken eller sov - fant han ett uomtvistelig punkt: "Jeg tenker, altså er jeg" (cogito ergo sum). Dette ble fundamentet for hans filosofi. Descartes hevdet at mennesket består av to helt forskjellige substanser: kropp (materie) og sjel (tanke), noe som skapte det berømte kropp-sjel-problemet som filosofer fremdeles diskuterer.`,
    viktigsteBidrag: [
      "Cogito ergo sum (\"Jeg tenker, altså er jeg\")",
      "Metodisk tvil",
      "Substansdualisme (kropp og sjel)",
      "Res cogitans og res extensa",
      "Gudsbevis"
    ],
    kjenteSitater: [
      "\"Cogito ergo sum\"",
      "\"Jeg tviler, derfor tenker jeg, derfor er jeg\"",
      "Den onde demon som tankeeksperiment",
      "Drømmeargumentet"
    ],
    viktigForEksamen: [
      "Radikal tvil som metode",
      "Første filosofi og sikker kunnskap",
      "Interaksjonsproblem mellom kropp og sjel",
      "Meditasjonene"
    ]
  },
  // Add more philosophers as needed
};

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

  const philosopher = PHILOSOPHER_DATA[philosopherName];

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
          alignItems: "center",
          paddingVertical: 16,
          paddingHorizontal: 16,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ padding: 8, marginRight: 8 }}
        >
          <Text style={{ color: "#fff", fontSize: 28 }}>←</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, paddingTop: 0 }}
      >
        {/* Main Info */}
        <View style={{ marginBottom: 24 }}>
          <Text
            style={{
              color: "#fff",
              fontSize: 28,
              fontWeight: "bold",
              marginBottom: 8,
            }}
          >
            {philosopher.name}
          </Text>
          <Text style={{ color: "#aaa", fontSize: 18, marginBottom: 16 }}>
            ({philosopher.years})
          </Text>

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
        <CollapsibleSection title="Om filosofen" defaultExpanded={true}>
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
      </ScrollView>
    </SafeAreaView>
  );
}
