import { useRouter } from "expo-router";
import React from "react";
import {
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const PHILOSOPHERS = [
  // TOPP 10 - ABSOLUTT VIKTIGST
  { id: 3, name: "Aristoteles", fullName: "Aristoteles", importance: "top10" },
  { id: 4, name: "Descartes", fullName: "René Descartes", importance: "top10" },
  { id: 9, name: "Hobbes", fullName: "Thomas Hobbes", importance: "top10" },
  { id: 5, name: "Hume", fullName: "David Hume", importance: "top10" },
  { id: 1, name: "Kant", fullName: "Immanuel Kant", importance: "top10" },
  { id: 10, name: "Locke", fullName: "John Locke", importance: "top10" },
  { id: 6, name: "Mill", fullName: "John Stuart Mill", importance: "top10" },
  { id: 2, name: "Platon", fullName: "Platon", importance: "top10" },
  { id: 7, name: "Rawls", fullName: "John Rawls", importance: "top10" },
  { id: 8, name: "Sartre", fullName: "Jean-Paul Sartre", importance: "top10" },
  
  // SVÆRT VIKTIGE (11-20)
  { id: 12, name: "Bentham", fullName: "Jeremy Bentham", importance: "important" },
  { id: 14, name: "Heidegger", fullName: "Martin Heidegger", importance: "important" },
  { id: 15, name: "Kierkegaard", fullName: "Søren Kierkegaard", importance: "important" },
  { id: 17, name: "Kuhn", fullName: "Thomas Kuhn", importance: "important" },
  { id: 19, name: "Leibniz", fullName: "Gottfried Wilhelm Leibniz", importance: "important" },
  { id: 18, name: "Marx", fullName: "Karl Marx", importance: "important" },
  { id: 13, name: "Nietzsche", fullName: "Friedrich Nietzsche", importance: "important" },
  { id: 16, name: "Popper", fullName: "Karl Popper", importance: "important" },
  { id: 11, name: "Sokrates", fullName: "Sokrates", importance: "important" },
  { id: 20, name: "Spinoza", fullName: "Baruch Spinoza", importance: "important" },
  
  // VIKTIGE (21-30)
  { id: 21, name: "Aquinas", fullName: "Thomas Aquinas", importance: "notable" },
  { id: 24, name: "Arendt", fullName: "Hannah Arendt", importance: "notable" },
  { id: 25, name: "Beauvoir", fullName: "Simone de Beauvoir", importance: "notable" },
  { id: 23, name: "Berkeley", fullName: "George Berkeley", importance: "notable" },
  { id: 27, name: "Foucault", fullName: "Michel Foucault", importance: "notable" },
  { id: 28, name: "Husserl", fullName: "Edmund Husserl", importance: "notable" },
  { id: 29, name: "Quine", fullName: "W.V.O. Quine", importance: "notable" },
  { id: 22, name: "Rousseau", fullName: "Jean-Jacques Rousseau", importance: "notable" },
  { id: 30, name: "Schopen-\nhauer", fullName: "Arthur Schopenhauer", importance: "notable" },
  { id: 26, name: "Singer", fullName: "Peter Singer", importance: "notable" },
];

export default function FilosoferScreen() {
  const router = useRouter();

  const getButtonColor = (importance: string) => {
    switch (importance) {
      case "top10":
        return "#a259ff"; // Purple for top 10
      case "important":
        return "#4da6ff"; // Blue for very important
      case "notable":
        return "#00d4aa"; // Teal for important
      default:
        return "#666";
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
          paddingBottom: 10,
          position: "relative",
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            position: "absolute",
            left: 16,
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
          FILOSOFER
        </Text>
      </View>

      {/* Philosopher Buttons */}
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 16 }}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "center",
          }}
        >
          {PHILOSOPHERS.map((philosopher) => (
            <TouchableOpacity
              key={philosopher.id}
              onPress={() => {
                // TODO: Navigate to philosopher detail page
                console.log(`Selected: ${philosopher.fullName}`);
              }}
              style={{
                backgroundColor: getButtonColor(philosopher.importance),
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderRadius: 8,
                width: 110,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: "600",
                }}
              >
                {philosopher.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Legend - moved to bottom */}
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: "#1a1a1a",
          marginHorizontal: 16,
          marginBottom: 16,
          borderRadius: 8,
        }}
      >
        <Text
          style={{
            color: "#ddd",
            fontSize: 14,
            fontWeight: "600",
            marginBottom: 8,
          }}
        >
          Fargekoder:
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
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
    </SafeAreaView>
  );
}
