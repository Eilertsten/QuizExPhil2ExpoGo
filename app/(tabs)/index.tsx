import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
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
  "00": "https://gist.githubusercontent.com/Eilertsten/08dcc97a97b9aaf12227eabe093d6c93/raw/be79d9d6526f6fdb03d9dfec8ba90331b9c71900/00VITEquestions",
  "01": "https://gist.githubusercontent.com/Eilertsten/3a8761beb3662ebde9cbfaf2832f4d2a/raw/9ddfc133baac7d79b7c320d755804fa17cc29d9f/01VEAREquestions",
  "02": "https://gist.githubusercontent.com/Eilertsten/d96d0697cffd04d87ab0876287452c02/raw/0cb5065aa280357d6bbe207e042aa67b3d9c9c1f/02GJOREquestions",
};

//Ta alltid å slett JSON filen og lag den på nytt hver endringer og deretter klikk på knappen Raw og henter dennye linken. :)

function getQuestionsUrl(countyCode: string) {
  return QUESTION_URLS[countyCode] || QUESTION_URLS["00"];
}

const COUNTIES = [
  { code: "00", name: "VITE", desc: "epistemologi, vitenskapsteori, skeptisisme" },
  { code: "01", name: "VÆRE", desc: "ontologi, virkelighet, metafysikk" },
  { code: "02", name: "GJØRE", desc: "etikk, moral, samfunnsfilosofi" },
];

// Legg til en farge for valgt kategori
const SELECTED_COLOR = "#a259ff"; // Lilla
const UNSELECTED_COLOR = "#bbb";

// Normaliserer og validerer correctIndex fra datasettet
function normalizeQuestions(raw: any[]): Question[] {
  const prelim = (raw || []).map((q) => {
    const options: string[] = Array.isArray(q?.options) ? q.options : [];
    let idx = Number.isFinite(q?.correctIndex)
      ? Number(q.correctIndex)
      : parseInt(String(q?.correctIndex ?? ""), 10);

    return {
      question: String(q?.question ?? ""),
      options,
      idx,
      correctexplation:
        q?.correctexplation ?? q?.correctExplanation ?? q?.explanation ?? "",
      category: q?.category,
    };
  });

  // Heuristikk: noen datasett kan være 1-basert (1..n)
  const hasZero = prelim.some((p) => p.idx === 0);
  const allWithinOneBasedRange = prelim.every(
    (p) =>
      Number.isInteger(p.idx) &&
      p.idx >= 1 &&
      p.idx <= (p.options?.length ?? 0)
  );

  const normalized = prelim.map((p) => {
    let idx = p.idx;

    // Dersom alt ser 1-basert ut, flytt til 0-basert
    if (!hasZero && allWithinOneBasedRange) {
      idx = idx - 1;
    }

    // Rett opp spesialtilfeller: idx === options.length (klart 1-basert på siste element)
    if (p.options && idx === p.options.length) {
      idx = Math.max(0, p.options.length - 1);
    }

    // Klem innen rekkevidde
    if (!Number.isInteger(idx)) idx = 0;
    if (idx < 0) idx = 0;
    if (p.options && idx > p.options.length - 1) {
      idx = Math.max(0, p.options.length - 1);
    }

    return {
      question: p.question,
      options: p.options,
      correctIndex: idx,
      correctexplation: p.correctexplation,
      category: p.category,
    } as Question;
  });

  // Filtrer bort ugyldige
  return normalized.filter(
    (q) =>
      q &&
      q.question &&
      Array.isArray(q.options) &&
      q.options.length > 0 &&
      Number.isInteger(q.correctIndex) &&
      q.correctIndex >= 0 &&
      q.correctIndex < q.options.length
  );
}

export default function App() {
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [isQuizMode, setIsQuizMode] = useState(true); // true = Quiz-modus, false = Lære-modus
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [remainingQuestions, setRemainingQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [progress, setProgress] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
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

      let flatAny: any[] = [];
      if (Array.isArray(raw)) {
        flatAny = raw;
      } else if (raw && typeof raw === "object") {
        Object.values(raw).forEach((v) => {
          if (Array.isArray(v)) flatAny = flatAny.concat(v as any[]);
        });
      }

      const normalized = normalizeQuestions(flatAny);

      setAllQuestions(normalized);
      setTotalQuestions(normalized.length);
      resetGame(normalized);

      // Enkel verifikasjon i loggen
      console.log(
        `Loaded ${countyCode} questions: ${normalized.length}. Sample correctIndex:`,
        normalized[0]?.correctIndex
      );
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

  const startQuizMode = () => {
    setIsQuizMode(true);
    setLearnMode(false);
    setShowStartScreen(false);
    if (allQuestions.length === 0) {
      fetchQuestionsForCounty(selectedCounty);
    }
  };

  const startLearnMode = () => {
    setIsQuizMode(false);
    setLearnMode(false); // Lære-modus skal ikke ha learnMode aktivt automatisk
    setShowStartScreen(false);
    if (allQuestions.length === 0) {
      fetchQuestionsForCounty(selectedCounty);
    }
  };

  useEffect(() => {
    // Ikke last inn spørsmål automatisk ved oppstart
  }, []);

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

  const goToStartScreen = () => {
    setShowStartScreen(true);
    setFinished(false);
    setProgress(0);
    setAnswered(0);
    setSelectedIndex(null);
    setCurrentQuestion(null);
    setRemainingQuestions([]);
    setShowExplanation(false);
  };

  const changeCounty = (code: string) => {
    // Nullstill alt relevant slik at gammel question/correctIndex ikke henger igjen
    setSelectedCounty(code);
    setCurrentQuestion(null);
    setRemainingQuestions([]);
    setTotalQuestions(0);

    setProgress(0);
    setAnswered(0);
    setSelectedIndex(null);
    setFinished(false);
    setShowExplanation(false);
    setLearnCount(0);
    
    // Last inn nye spørsmål for valgt kategori
    fetchQuestionsForCounty(code);
  };

  // Ny funksjon for å håndtere kategori-bytte med bekreftelse
  const confirmAndChangeCounty = (code: string) => {
    if (answered > 0 || progress > 0) {
      Alert.alert(
        "Bytt kategori",
        "Ved å endre kategori mister du all informasjon i den pågående quizen. Vil du fortsette?",
        [
          { text: "Avbryt", style: "cancel" },
          {
            text: "Bytt kategori",
            style: "destructive",
            onPress: () => changeCounty(code),
          },
        ]
      );
    } else {
      changeCounty(code);
    }
  };

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#111" }}
      >
        <ActivityIndicator size="large" color="#fff" />
        <Text style={{ marginTop: 10, color: "#fff" }}>Laster spørsmål...</Text>
      </SafeAreaView>
    );
  }

  if (showStartScreen) {
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
        <Text
          style={{
            fontSize: 48,
            fontWeight: "bold",
            textAlign: "center",
            letterSpacing: 2,
            color: "#fff",
            textShadowColor: "#222",
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 8,
            marginBottom: 80,
          }}
        >
          ExPhil Quiz
        </Text>

        <TouchableOpacity
          onPress={startQuizMode}
          style={{
            backgroundColor: "#a259ff",
            paddingHorizontal: 60,
            paddingVertical: 20,
            borderRadius: 12,
            marginBottom: 20,
            width: "80%",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 24, fontWeight: "700" }}>
            Quiz
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={startLearnMode}
          style={{
            backgroundColor: "#4da6ff",
            paddingHorizontal: 60,
            paddingVertical: 20,
            borderRadius: 12,
            width: "80%",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 24, fontWeight: "700" }}>
            Lære
          </Text>
        </TouchableOpacity>
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

        <TouchableOpacity
          onPress={goToStartScreen}
          style={{
            backgroundColor: "#a259ff",
            padding: 14,
            borderRadius: 12,
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18 }}>Tilbake til startsiden</Text>
        </TouchableOpacity>

        <Text style={{ color: "#aaa", marginVertical: 10 }}>eller bytt kategori</Text>

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
      {/* Helt enkel hvit tittel uten bakgrunn eller gradient */}
      <View style={{ marginTop: 10, marginBottom: 0, alignSelf: "center" }}>
        <Text
          style={{
            fontSize: 48,
            fontWeight: "bold",
            textAlign: "center",
            letterSpacing: 2,
            color: "#fff",
            textShadowColor: "#222",
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 8,
          }}
        >
          ExPhil Quiz
        </Text>
      </View>

      {/* Kategori-knapper og beskrivelse */}
      <View style={{ marginBottom: 6, alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: 2,
          }}
        >
          {COUNTIES.map((county) => (
            <TouchableOpacity
              key={county.code}
              onPress={() => confirmAndChangeCounty(county.code)}
              style={{
                paddingHorizontal: 10, // mindre bredde
                paddingVertical: 6,    // mindre høyde
                margin: 4,             // litt mindre margin
                borderRadius: 8,
                backgroundColor: "#222",
                borderWidth: selectedCounty === county.code ? 2 : 0,
                borderColor: selectedCounty === county.code ? SELECTED_COLOR : "transparent",
              }}
            >
              <Text
                style={{
                  color:
                    selectedCounty === county.code
                      ? SELECTED_COLOR
                      : UNSELECTED_COLOR,
                  fontSize: 16, // mindre tekst
                  fontWeight: "700",
                }}
              >
                {county.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text
          style={{
            color: SELECTED_COLOR,
            textAlign: "center",
            fontSize: 16, // ett punkt større
            marginTop: 2,
            fontStyle: "italic",
          }}
        >
          {COUNTIES.find((c) => c.code === selectedCounty)?.desc}
        </Text>
      </View>

      {/* Besvart + Svartips-checkbox på samme linje eller correctIndex i Lære-modus */} 
      <View style={{ alignItems: "center", marginBottom: 16, marginTop: 18, flexDirection: "row", justifyContent: "center" }}>
        <Text style={{ color: "#ddd", fontSize: 17 }}>
          {answered} av {totalQuestions}
        </Text>
        
        {/* I Quiz-modus: Svartips-checkbox */}
        {isQuizMode && (
          <TouchableOpacity
            onPress={() => {
              setLearnMode((s) => !s);
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 14,
            }}
            activeOpacity={0.8}
          >
            <View
              style={{
                width: 22,
                height: 22,
                borderRadius: 4,
                borderWidth: 2,
                borderColor: "#4da6ff",
                backgroundColor: learnMode ? "#4da6ff" : "#222",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 6,
              }}
            >
              {learnMode && (
                <View
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor: "#fff",
                    borderRadius: 2,
                  }}
                />
              )}
            </View>
            <Text
              style={{
                color: "#4da6ff",
                fontSize: 12,
                fontWeight: "700",
              }}
            >
              {learnMode ? "Fjerne svartips" : "Svartips"}
            </Text>
          </TouchableOpacity>
        )}
        
        {/* I Lære-modus: Vis correctIndex-verdien */}
        {!isQuizMode && currentQuestion && (
          <View
            style={{
              marginLeft: 14,
              backgroundColor: "#4da6ff",
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 14,
                fontWeight: "700",
              }}
            >
              Korrekt svar: {currentQuestion.correctIndex}
            </Text>
          </View>
        )}
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
          <Text style={{ color: "#ddd", fontSize: 18 }}>Korrekt:</Text>
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
        // Beskyttelse dersom correctIndex skulle være utenfor range
        const safeCorrectIndex = Math.min(
          Math.max(currentQuestion.correctIndex, 0),
          currentQuestion.options.length - 1
        );

        let backgroundColor = "#333";
        if (!learnMode) {
          if (selectedIndex !== null) {
            if (idx === safeCorrectIndex) backgroundColor = "green";
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
        {/* Testfelt for antall poster i JSON-filen
        <Text
          style={{
            color: "#4da6ff",
            fontSize: 13,
            marginTop: 8,
            fontWeight: "bold",
          }}
        >
          Antall poster i JSON: {allQuestions.length}
        </Text> */}
      </View>
    </SafeAreaView>
  );
}