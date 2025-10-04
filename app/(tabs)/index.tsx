import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Question = {
  question: string;
  options: string[];
  correctIndex: number;
  correctexplation?: string;
  category?: string;
};

const QUESTION_URLS: Record<string, string> = {
  "00": "https://gist.githubusercontent.com/Eilertsten/27e727be7d5dbb0301d4fe030673a673/raw/9f60f54896c27988e92777cc253cd54dfca7fef6/00VITEquestions"
  // "00": "https://gist.githubusercontent.com/Eilertsten/27e727be7d5dbb0301d4fe030673a673/raw/9f60f54896c27988e92777cc253cd54dfca7fef6/00VITEquestions",
  
};

function getQuestionsUrl(countyCode: string) {
  return QUESTION_URLS[countyCode] || QUESTION_URLS["00"];
}

const COUNTIES = [
  { code: "00", name: "VITE", desc: "epistemologi, vitenskapsteori, skeptisisme" },
  { code: "01", name: "VÆRE", desc: "ontologi, virkelighet, metafysikk" },
  { code: "02", name: "GJØRE", desc: "etikk, moral, samfunnsfilosofi" },
];

export default function App() {
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [remainingQuestions, setRemainingQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [progress, setProgress] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState(false);
  const [selectedCounty, setSelectedCounty] = useState("00");
  const [totalQuestions, setTotalQuestions] = useState(0);

  const [learnMode, setLearnMode] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [learnCount, setLearnCount] = useState(0);

  const fetchQuestionsForCounty = async (countyCode: string) => {
    setLoading(true);
    try {
      const url = getQuestionsUrl(countyCode);
      const res = await fetch(url);
      const raw = await res.json();

      let flat: Question[] = [];
      if (Array.isArray(raw)) {
        flat = raw;
      } else if (raw && typeof raw === "object") {
        Object.values(raw).forEach((v) => {
          if (Array.isArray(v)) flat = flat.concat(v as Question[]);
        });
      }

      flat = flat.filter(
        (q) =>
          q &&
          typeof q.question === "string" &&
          Array.isArray(q.options) &&
          typeof q.correctIndex === "number"
      );

      setAllQuestions(flat);
      setTotalQuestions(flat.length);
      resetGame(flat);
    } catch (err) {
      console.error("Kunne ikke hente spørsmål:", err);
      setAllQuestions([]);
      setTotalQuestions(0);
      setRemainingQuestions([]);
      setCurrentQuestion(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestionsForCounty(selectedCounty);
  }, [selectedCounty]);

  function shuffleArray<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const resetGame = (pool: Question[]) => {
    const shuffled = shuffleArray(pool);
    if (shuffled.length === 0) {
      setRemainingQuestions([]);
      setCurrentQuestion(null);
      setProgress(0);
      setAnswered(0);
      setSelectedIndex(null);
      setFinished(true);
      setLearnCount(0);
      return;
    }
    setRemainingQuestions(shuffled.slice(1));
    setCurrentQuestion(shuffled[0]);
    setProgress(0);
    setAnswered(0);
    setSelectedIndex(null);
    setFinished(false);
    setShowExplanation(false);
    setLearnCount(0);
  };

  const nextQuestion = (pool: Question[] = remainingQuestions) => {
    if (pool.length === 0) {
      setCurrentQuestion(null);
      setRemainingQuestions([]);
      setFinished(true);
      return;
    }
    const randomIndex = Math.floor(Math.random() * pool.length);
    const q = pool[randomIndex];
    setCurrentQuestion(q);
    setRemainingQuestions(pool.filter((_, i) => i !== randomIndex));
    setSelectedIndex(null);
    setShowExplanation(false);
  };

  const handleAnswer = (index: number) => {
    if (selectedIndex !== null) return;
    if (!currentQuestion) return;
    setSelectedIndex(index);
    const isCorrect = index === currentQuestion.correctIndex;
    if (isCorrect) setProgress((p) => p + 1);
    setAnswered((a) => a + 1);

    // Vis forklaring og vent på "Neste"-knapp
    setShowExplanation(true);
  };

  const goToNext = () => {
    setShowExplanation(false);
    if (remainingQuestions.length === 0) {
      setCurrentQuestion(null);
      setFinished(true);
      return;
    }
    nextQuestion();
  };

  const handleRestart = () => {
    resetGame(allQuestions);
  };

  const changeCounty = (code: string) => {
    setSelectedCounty(code);
  };

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Laster spørsmål...</Text>
      </SafeAreaView>
    );
  }

  if (finished) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#111",
          padding: 16,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 26, marginBottom: 12 }}>
          Spillet er ferdig!
        </Text>
        <Text
          style={{
            color: "#ddd",
            fontSize: 18,
            textAlign: "center",
            marginBottom: 18,
          }}
        >
          Du fikk {progress} av {totalQuestions} riktige 🎉
        </Text>

        <TouchableOpacity
          onPress={handleRestart}
          style={{
            backgroundColor: "#444",
            padding: 14,
            borderRadius: 12,
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18 }}>Start på nytt</Text>
        </TouchableOpacity>

        <Text style={{ color: "#aaa", marginVertical: 10 }}>eller</Text>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {COUNTIES.map((c) => (
            <TouchableOpacity
              key={c.code}
              onPress={() => changeCounty(c.code)}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 8,
                margin: 6,
                borderRadius: 8,
                backgroundColor: selectedCounty === c.code ? "#666" : "#333",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 14 }}>{c.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    );
  }

  if (!currentQuestion) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ color: "#fff" }}>
          Ingen spørsmål tilgjengelig for valgt kategori.
        </Text>
        <TouchableOpacity
          onPress={handleRestart}
          style={{
            marginTop: 12,
            backgroundColor: "#444",
            padding: 10,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#fff" }}>Prøv på nytt</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#111", padding: 16 }}>
      {/* Tittel + Lærefase-knapp */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 8,
        }}
      >
        <Text
          style={{
            fontSize: 34,
            fontWeight: "800",
            color: "#fff",
            textAlign: "center",
            marginRight: 12,
          }}
        >
          ExPhilQuiz
        </Text>

        <TouchableOpacity
          onPress={() => {
            setLearnMode((s) => {
              const newMode = !s;
              if (newMode) {
                setLearnCount((c) => c + 1);
              }
              return newMode;
            });
          }}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: learnMode ? "#4da6ff" : "#444",
            backgroundColor: learnMode ? "#17364a" : "#222",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: learnMode ? "#4da6ff" : "#fff",
              fontSize: 14,
              fontWeight: "700",
            }}
          >
            Lære
          </Text>
          <Text
            style={{
              color: "#4da6ff",
              fontSize: 18,
              fontWeight: "900",
              marginLeft: 8,
            }}
          >
            {learnCount}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Kategori-navn og beskrivelse */}
      <View style={{ marginBottom: 6 }}>
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontSize: 22,
            fontWeight: "700",
          }}
        >
          {COUNTIES.find((c) => c.code === selectedCounty)?.name}
        </Text>
        <Text
          style={{
            color: "#aaa",
            textAlign: "center",
            fontSize: 14,
            marginTop: 2,
          }}
        >
          {COUNTIES.find((c) => c.code === selectedCounty)?.desc}
        </Text>
      </View>

      {/* Besvart */}
      <View style={{ alignItems: "center", marginBottom: 16 }}>
        <Text style={{ color: "#ddd", fontSize: 16 }}>
          Besvart {answered}/{totalQuestions}
        </Text>
      </View>

      {/* Riktige / Lest / Feil */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
          width: "100%",
        }}
      >
        <View style={{ alignItems: "flex-start" }}>
          <Text style={{ color: "#ddd", fontSize: 18 }}>Riktige:</Text>
          <Text style={{ color: "green", fontSize: 40, fontWeight: "900" }}>
            {progress}
          </Text>
        </View>

        <View style={{ alignItems: "flex-end" }}>
          <Text style={{ color: "#ddd", fontSize: 18 }}>Feil:</Text>
          <Text style={{ color: "red", fontSize: 40, fontWeight: "900" }}>
            {answered - progress}
          </Text>
        </View>
      </View>

      {/* Spørsmål */}
      <Text style={{ color: "#fff", fontSize: 20, marginBottom: 12 }}>
        {currentQuestion.question}
      </Text>

      {/* Alternativer */}
      {currentQuestion.options.map((opt, idx) => {
        let backgroundColor = "#333";
        if (learnMode) {
          backgroundColor =
            idx === currentQuestion.correctIndex ? "green" : "#333";
        } else {
          if (selectedIndex !== null) {
            if (idx === currentQuestion.correctIndex) backgroundColor = "green";
            else if (idx === selectedIndex) backgroundColor = "red";
          }
        }

        return (
          <TouchableOpacity
            key={idx}
            onPress={() => {
              if (!learnMode && !showExplanation) handleAnswer(idx);
            }}
            activeOpacity={learnMode ? 1 : 0.7}
            style={{
              padding: 14,
              backgroundColor,
              borderRadius: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16 }}>{opt}</Text>
          </TouchableOpacity>
        );
      })}

      {/* Forklaring + Neste-knapp */}
      {(learnMode || showExplanation) && (
        <View
          style={{
            marginTop: 16,
            padding: 12,
            backgroundColor: "#222",
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              color: "#4da6ff",
              fontSize: 14,
              fontWeight: "600",
              marginBottom: 6,
            }}
          >
            Forklaring:
          </Text>
          <Text style={{ color: "#ddd", fontSize: 14, marginBottom: 12 }}>
            {currentQuestion.correctexplation || "Ingen forklaring tilgjengelig."}
          </Text>

          {!learnMode && showExplanation && (
            <TouchableOpacity
              onPress={goToNext}
              style={{
                padding: 12,
                backgroundColor: "#4da6ff",
                borderRadius: 8,
                alignSelf: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "700" }}>
                Neste spørsmål ➜
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Velg kategori */}
      <View style={{ marginTop: 14, alignItems: "center" }}>
        <Text style={{ color: "#aaa", marginBottom: 8 }}>
          Velg ExPhil kategori:
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {COUNTIES.map((county) => (
            <TouchableOpacity
              key={county.code}
              onPress={() => changeCounty(county.code)}
              style={{
                paddingHorizontal: 18,
                paddingVertical: 10,
                margin: 6,
                borderRadius: 8,
                backgroundColor:
                  selectedCounty === county.code ? "#666" : "#333",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>
                {county.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Footer tekst */}
      <View
        style={{ marginTop: "auto", alignItems: "center", marginBottom: 8 }}
      >
        <Text
          style={{
            color: "#888",
            fontSize: 12,
            fontStyle: "italic",
            textAlign: "center",
          }}
        >
          Spørsmål og svar er generert og oppdatert når feil oppdages.{"\n"}
          Send derfor mail til{" "}
          <Text
            style={{ color: "#4da6ff", textDecorationLine: "underline" }}
            onPress={() => Linking.openURL("mailto:post@aginor.no")}
          >
            Support
          </Text>
          , så oppdaterer vi.
        </Text>
      </View>
    </SafeAreaView>
  );
}