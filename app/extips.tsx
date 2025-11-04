import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

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

export default function ExTipsScreen() {
  const router = useRouter();

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
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              color: "#fff",
              textAlign: "center",
              lineHeight: 38,
            }}
          >
            EX PHIL
          </Text>
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              color: "#fff",
              textAlign: "center",
              lineHeight: 38,
            }}
          >
            FORBEREDELSER
          </Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 16 }}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* EKSAMENTIPS */}
        <CollapsibleSection title="EKSAMENSTIPS">
          <View style={{ marginBottom: 16 }}>
            <Text style={{ color: "#4da6ff", fontSize: 16, fontWeight: "700", marginBottom: 8 }}>
              Mest siterte/diskuterte i spørsmålene:
            </Text>
            <Text style={{ color: "#ddd", fontSize: 14, lineHeight: 22 }}>
              1. Kant (kategorisk imperativ){"\n"}
              2. Platon (idélære, hulelignelsen){"\n"}
              3. Aristoteles (dydsetikk, gyldne middelvei){"\n"}
              4. Descartes (cogito, metodisk tvil){"\n"}
              5. Rawls (uvitenhetens slør)
            </Text>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={{ color: "#4da6ff", fontSize: 16, fontWeight: "700", marginBottom: 8 }}>
              Viktige motsetninger å kunne:
            </Text>
            <Text style={{ color: "#ddd", fontSize: 14, lineHeight: 22 }}>
              • Kant vs. Mill (pliktetikk vs. utilitarisme){"\n"}
              • Hobbes vs. Locke vs. Rousseau (samfunnskontrakt){"\n"}
              • Platon vs. Aristoteles (idealisme vs. realisme){"\n"}
              • Descartes vs. Hume (rasjonalisme vs. empirisme){"\n"}
              • Popper vs. Kuhn (vitenskapsteori)
            </Text>
          </View>

          <View>
            <Text style={{ color: "#4da6ff", fontSize: 16, fontWeight: "700", marginBottom: 8 }}>
              Nøkkelbegreper å kunne forklare:
            </Text>
            <Text style={{ color: "#ddd", fontSize: 14, lineHeight: 22 }}>
              • Kategorisk imperativ{"\n"}
              • Uvitenhetens slør{"\n"}
              • Cogito ergo sum{"\n"}
              • Tabula rasa{"\n"}
              • Paradigmeskifte{"\n"}
              • Eksistensen før essensen{"\n"}
              • Eudaimonia{"\n"}
              • Naturtilstanden
            </Text>
          </View>
        </CollapsibleSection>

        {/* TIDSLINJE */}
        <CollapsibleSection title="TIDSLINJE">
          <View style={{ marginBottom: 12 }}>
            <Text style={{ color: "#4da6ff", fontSize: 16, fontWeight: "700", marginBottom: 4 }}>
              ANTIKKEN (ca. 500 f.Kr. - 500 e.Kr.):
            </Text>
            <Text style={{ color: "#ddd", fontSize: 14, lineHeight: 22 }}>
              Sokrates, Platon, Aristoteles, Epikur
            </Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text style={{ color: "#4da6ff", fontSize: 16, fontWeight: "700", marginBottom: 4 }}>
              MIDDELALDEREN (500-1500):
            </Text>
            <Text style={{ color: "#ddd", fontSize: 14, lineHeight: 22 }}>
              Thomas Aquinas
            </Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text style={{ color: "#4da6ff", fontSize: 16, fontWeight: "700", marginBottom: 4 }}>
              TIDLIG MODERNE (1600-1700):
            </Text>
            <Text style={{ color: "#ddd", fontSize: 14, lineHeight: 22 }}>
              Hobbes, Descartes, Spinoza, Locke, Leibniz, Berkeley
            </Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text style={{ color: "#4da6ff", fontSize: 16, fontWeight: "700", marginBottom: 4 }}>
              OPPLYSNINGSTIDEN (1700-tall):
            </Text>
            <Text style={{ color: "#ddd", fontSize: 14, lineHeight: 22 }}>
              Hume, Rousseau, Kant, Bentham
            </Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text style={{ color: "#4da6ff", fontSize: 16, fontWeight: "700", marginBottom: 4 }}>
              1800-TALLET:
            </Text>
            <Text style={{ color: "#ddd", fontSize: 14, lineHeight: 22 }}>
              Schopenhauer, Kierkegaard, Mill, Marx, Nietzsche
            </Text>
          </View>

          <View>
            <Text style={{ color: "#4da6ff", fontSize: 16, fontWeight: "700", marginBottom: 4 }}>
              1900-TALLET:
            </Text>
            <Text style={{ color: "#ddd", fontSize: 14, lineHeight: 22 }}>
              Husserl, Heidegger, Sartre, Arendt, Beauvoir, Popper, Kuhn, Rawls, Foucault, Quine, Singer
            </Text>
          </View>
        </CollapsibleSection>

        {/* ETIKK */}
        <CollapsibleSection title="ETIKK">
          <View style={{ marginBottom: 12 }}>
            <Text style={{ color: "#4da6ff", fontSize: 16, fontWeight: "700", marginBottom: 4 }}>
              Konsekvensetikk:
            </Text>
            <Text style={{ color: "#ddd", fontSize: 14, lineHeight: 22 }}>
              • Jeremy Bentham (kvantitativ utilitarisme){"\n"}
              • John Stuart Mill (kvalitativ utilitarisme){"\n"}
              • Peter Singer (preferanseutilitarisme)
            </Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text style={{ color: "#4da6ff", fontSize: 16, fontWeight: "700", marginBottom: 4 }}>
              Pliktetikk:
            </Text>
            <Text style={{ color: "#ddd", fontSize: 14, lineHeight: 22 }}>
              • Immanuel Kant (kategorisk imperativ)
            </Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text style={{ color: "#4da6ff", fontSize: 16, fontWeight: "700", marginBottom: 4 }}>
              Dydsetikk:
            </Text>
            <Text style={{ color: "#ddd", fontSize: 14, lineHeight: 22 }}>
              • Aristoteles (eudaimonia, gyldne middelvei){"\n"}
              • Alasdair MacIntyre (praksis)
            </Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text style={{ color: "#4da6ff", fontSize: 16, fontWeight: "700", marginBottom: 4 }}>
              Naturrett:
            </Text>
            <Text style={{ color: "#ddd", fontSize: 14, lineHeight: 22 }}>
              • Thomas Aquinas (evig lov){"\n"}
              • John Locke (naturrettigheter)
            </Text>
          </View>

          <View>
            <Text style={{ color: "#4da6ff", fontSize: 16, fontWeight: "700", marginBottom: 4 }}>
              Omsorgsetikk:
            </Text>
            <Text style={{ color: "#ddd", fontSize: 14, lineHeight: 22 }}>
              • Carol Gilligan (relasjoner)
            </Text>
          </View>
        </CollapsibleSection>

        {/* POLITISK FILOSOFI */}
        <CollapsibleSection title="POLITISK FILOSOFI">
          <View style={{ marginBottom: 12 }}>
            <Text style={{ color: "#4da6ff", fontSize: 16, fontWeight: "700", marginBottom: 4 }}>
              Samfunnskontrakt:
            </Text>
            <Text style={{ color: "#ddd", fontSize: 14, lineHeight: 22 }}>
              • Thomas Hobbes (autoritær){"\n"}
              • John Locke (liberal){"\n"}
              • Jean-Jacques Rousseau (demokratisk)
            </Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text style={{ color: "#4da6ff", fontSize: 16, fontWeight: "700", marginBottom: 4 }}>
              Rettferdighetsteori:
            </Text>
            <Text style={{ color: "#ddd", fontSize: 14, lineHeight: 22 }}>
              • John Rawls (liberal egalitarianisme){"\n"}
              • Robert Nozick (libertarianisme)
            </Text>
          </View>

          <View>
            <Text style={{ color: "#4da6ff", fontSize: 16, fontWeight: "700", marginBottom: 4 }}>
              Maktteori:
            </Text>
            <Text style={{ color: "#ddd", fontSize: 14, lineHeight: 22 }}>
              • Michel Foucault (biomakt){"\n"}
              • Hannah Arendt (totalitarisme)
            </Text>
          </View>
        </CollapsibleSection>

        {/* METAFYSIKK/ONTOLOGI */}
        <CollapsibleSection title="METAFYSIKK/ONTOLOGI">
          <View style={{ marginBottom: 12 }}>
            <Text style={{ color: "#4da6ff", fontSize: 16, fontWeight: "700", marginBottom: 4 }}>
              Idealisme:
            </Text>
            <Text style={{ color: "#ddd", fontSize: 14, lineHeight: 22 }}>
              • Platon (idélære){"\n"}
              • George Berkeley (immaterialisme)
            </Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text style={{ color: "#4da6ff", fontSize: 16, fontWeight: "700", marginBottom: 4 }}>
              Materialisme:
            </Text>
            <Text style={{ color: "#ddd", fontSize: 14, lineHeight: 22 }}>
              • Karl Marx (historisk materialisme)
            </Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text style={{ color: "#4da6ff", fontSize: 16, fontWeight: "700", marginBottom: 4 }}>
              Dualisme:
            </Text>
            <Text style={{ color: "#ddd", fontSize: 14, lineHeight: 22 }}>
              • René Descartes (substansdualisme)
            </Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text style={{ color: "#4da6ff", fontSize: 16, fontWeight: "700", marginBottom: 4 }}>
              Monisme:
            </Text>
            <Text style={{ color: "#ddd", fontSize: 14, lineHeight: 22 }}>
              • Baruch Spinoza (substansmonisme){"\n"}
              • Gottfried Leibniz (monadologi)
            </Text>
          </View>

          <View>
            <Text style={{ color: "#4da6ff", fontSize: 16, fontWeight: "700", marginBottom: 4 }}>
              Eksistensialisme:
            </Text>
            <Text style={{ color: "#ddd", fontSize: 14, lineHeight: 22 }}>
              • Søren Kierkegaard (kristen){"\n"}
              • Martin Heidegger (ontologisk){"\n"}
              • Jean-Paul Sartre (ateistisk)
            </Text>
          </View>
        </CollapsibleSection>

        {/* EPISTEMOLOGI */}
        <CollapsibleSection title="EPISTEMOLOGI">
          <View style={{ marginBottom: 12 }}>
            <Text style={{ color: "#4da6ff", fontSize: 16, fontWeight: "700", marginBottom: 4 }}>
              Rasjonalisme:
            </Text>
            <Text style={{ color: "#ddd", fontSize: 14, lineHeight: 22 }}>
              • René Descartes (medfødte ideer){"\n"}
              • Baruch Spinoza (geometrisk metode){"\n"}
              • Gottfried Leibniz (tilstrekkelig grunn)
            </Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text style={{ color: "#4da6ff", fontSize: 16, fontWeight: "700", marginBottom: 4 }}>
              Empirisme:
            </Text>
            <Text style={{ color: "#ddd", fontSize: 14, lineHeight: 22 }}>
              • John Locke (tabula rasa){"\n"}
              • David Hume (radikal empirisme){"\n"}
              • George Berkeley (immaterialisme)
            </Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text style={{ color: "#4da6ff", fontSize: 16, fontWeight: "700", marginBottom: 4 }}>
              Skeptisisme:
            </Text>
            <Text style={{ color: "#ddd", fontSize: 14, lineHeight: 22 }}>
              • Sokrates (sokratisk uvitenhet){"\n"}
              • David Hume (induksjonsproblemet){"\n"}
              • René Descartes (metodisk tvil)
            </Text>
          </View>

          <View>
            <Text style={{ color: "#4da6ff", fontSize: 16, fontWeight: "700", marginBottom: 4 }}>
              Fenomenologi:
            </Text>
            <Text style={{ color: "#ddd", fontSize: 14, lineHeight: 22 }}>
              • Edmund Husserl (fenomenologisk reduksjon){"\n"}
              • Martin Heidegger (Dasein)
            </Text>
          </View>
        </CollapsibleSection>

        {/* VITENSKAPSTEORI */}
        <CollapsibleSection title="VITENSKAPSTEORI">
          <Text style={{ color: "#ddd", fontSize: 14, lineHeight: 22 }}>
            • Karl Popper (falsifikasjon){"\n"}
            • Thomas Kuhn (paradigmeskifter){"\n"}
            • W.V.O. Quine (holisme)
          </Text>
        </CollapsibleSection>
      </ScrollView>
    </SafeAreaView>
  );
}
