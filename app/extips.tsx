import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Modal,
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
  const [showTooltip, setShowTooltip] = useState(false);
  const [showUvitenhetTooltip, setShowUvitenhetTooltip] = useState(false);
  const [showCogitoTooltip, setShowCogitoTooltip] = useState(false);
  const [showKantMillTooltip, setShowKantMillTooltip] = useState(false);

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
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                <Text style={{ color: "#ddd", fontSize: 14 }}>• Kant vs. Mill (</Text>
                <TouchableOpacity onPress={() => setShowKantMillTooltip(true)}>
                  <Text style={{ color: "#4da6ff", fontSize: 14, textDecorationLine: "underline" }}>
                    pliktetikk vs. utilitarisme
                  </Text>
                </TouchableOpacity>
                <Text style={{ color: "#ddd", fontSize: 14 }}>)</Text>
              </View>
              <Text style={{ color: "#ddd", fontSize: 14, lineHeight: 22 }}>
                • Hobbes vs. Locke vs. Rousseau (samfunnskontrakt){"\n"}
                • Platon vs. Aristoteles (idealisme vs. realisme){"\n"}
                • Descartes vs. Hume (rasjonalisme vs. empirisme){"\n"}
                • Popper vs. Kuhn (vitenskapsteori)
              </Text>
            </View>
          </View>

          <View>
            <Text style={{ color: "#4da6ff", fontSize: 16, fontWeight: "700", marginBottom: 8 }}>
              Nøkkelbegreper å kunne forklare:
            </Text>
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                <Text style={{ color: "#ddd", fontSize: 14 }}>• </Text>
                <TouchableOpacity onPress={() => setShowTooltip(true)}>
                  <Text style={{ color: "#4da6ff", fontSize: 14, textDecorationLine: "underline" }}>
                    Kategorisk imperativ
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                <Text style={{ color: "#ddd", fontSize: 14 }}>• </Text>
                <TouchableOpacity onPress={() => setShowUvitenhetTooltip(true)}>
                  <Text style={{ color: "#4da6ff", fontSize: 14, textDecorationLine: "underline" }}>
                    Uvitenhetens slør
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                <Text style={{ color: "#ddd", fontSize: 14 }}>• </Text>
                <TouchableOpacity onPress={() => setShowCogitoTooltip(true)}>
                  <Text style={{ color: "#4da6ff", fontSize: 14, textDecorationLine: "underline" }}>
                    Cogito ergo sum
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={{ color: "#ddd", fontSize: 14, lineHeight: 22 }}>
                • Tabula rasa{"\n"}
                • Paradigmeskifte{"\n"}
                • Eksistensen før essensen{"\n"}
                • Eudaimonia{"\n"}
                • Naturtilstanden
              </Text>
            </View>
          </View>
        </CollapsibleSection>

        {/* Tooltip Modal */}
        <Modal
          transparent={true}
          visible={showTooltip}
          animationType="fade"
          onRequestClose={() => setShowTooltip(false)}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
            activeOpacity={1}
            onPress={() => setShowTooltip(false)}
          >
            <View
              style={{
                backgroundColor: "#222",
                padding: 20,
                borderRadius: 12,
                maxWidth: "90%",
                borderWidth: 2,
                borderColor: "#4da6ff",
              }}
            >
              <Text style={{ color: "#4da6ff", fontSize: 18, fontWeight: "700", marginBottom: 12 }}>
                Kategorisk imperativ (Kant)
              </Text>
              <Text style={{ color: "#ddd", fontSize: 15, lineHeight: 24 }}>
                Det er et moralsk prinsipp (moralfilosofi) som sier at du skal handle kun etter den regel du ønsker skal gjelde som en universell lov for alle.
              </Text>
              <TouchableOpacity
                onPress={() => setShowTooltip(false)}
                style={{
                  marginTop: 16,
                  backgroundColor: "#4da6ff",
                  padding: 12,
                  borderRadius: 8,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#fff", fontSize: 14, fontWeight: "600" }}>
                  Lukk
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Tooltip Modal for Uvitenhetens slør */}
        <Modal
          transparent={true}
          visible={showUvitenhetTooltip}
          animationType="fade"
          onRequestClose={() => setShowUvitenhetTooltip(false)}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
            activeOpacity={1}
            onPress={() => setShowUvitenhetTooltip(false)}
          >
            <View
              style={{
                backgroundColor: "#222",
                padding: 20,
                borderRadius: 12,
                maxWidth: "90%",
                borderWidth: 2,
                borderColor: "#4da6ff",
              }}
            >
              <Text style={{ color: "#4da6ff", fontSize: 18, fontWeight: "700", marginBottom: 12 }}>
                Uvitenhetens slør (Rawls)
              </Text>
              <Text style={{ color: "#ddd", fontSize: 15, lineHeight: 24 }}>
                Forestill deg at du skal designe et rettferdig samfunn, men du vet ingenting om din egen posisjon i det samfunnet.{"\n\n"}
                Når du ikke vet hvor du havner, vil du lage regler som er rettferdige for alle, ikke bare for de priviligerte. Du vil beskytte de svakeste, fordi du selv kan ende opp der. {"\n\n"}
                Praktisk eksempel: Tenk deg at du skal dele en kake, men du vet ikke hvilken bit du får. Da vil du sørge for at bitene er mest mulig like store!
              </Text>
              <TouchableOpacity
                onPress={() => setShowUvitenhetTooltip(false)}
                style={{
                  marginTop: 16,
                  backgroundColor: "#4da6ff",
                  padding: 12,
                  borderRadius: 8,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#fff", fontSize: 14, fontWeight: "600" }}>
                  Lukk
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Tooltip Modal for Cogito ergo sum */}
        <Modal
          transparent={true}
          visible={showCogitoTooltip}
          animationType="fade"
          onRequestClose={() => setShowCogitoTooltip(false)}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
            activeOpacity={1}
            onPress={() => setShowCogitoTooltip(false)}
          >
            <View
              style={{
                backgroundColor: "#222",
                padding: 20,
                borderRadius: 12,
                maxWidth: "90%",
                borderWidth: 2,
                borderColor: "#4da6ff",
              }}
            >
              <Text style={{ color: "#4da6ff", fontSize: 18, fontWeight: "700", marginBottom: 12 }}>
                Cogito ergo sum (Descartes)
              </Text>
              <Text style={{ color: "#ddd", fontSize: 15, lineHeight: 24 }}>
                "Cogito ergo sum" er Latin for "Jeg tenker, derfor er jeg" - det mest kjente sitatet fra René Descartes.{"\n\n"}
                Descartes ville finne noe han kunne være helt sikker på. Han tviler på alt: Kanskje sansene lurer meg? Kanskje jeg drømmer? Kanskje et ondt vesen lurer meg til å tro alt er virkelig?{"\n\n"}
                Men så innser han: Selv om jeg tviler på alt, kan jeg ikke tvile på at JEG tviler. For å tvile, må jeg tenke. Og for å tenke, må jeg eksistere.
              </Text>
              <TouchableOpacity
                onPress={() => setShowCogitoTooltip(false)}
                style={{
                  marginTop: 16,
                  backgroundColor: "#4da6ff",
                  padding: 12,
                  borderRadius: 8,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#fff", fontSize: 14, fontWeight: "600" }}>
                  Lukk
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Tooltip Modal for Kant vs Mill */}
        <Modal
          transparent={true}
          visible={showKantMillTooltip}
          animationType="fade"
          onRequestClose={() => setShowKantMillTooltip(false)}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
            activeOpacity={1}
            onPress={() => setShowKantMillTooltip(false)}
          >
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
              }}
            >
              <View
                style={{
                  backgroundColor: "#222",
                  padding: 20,
                  borderRadius: 12,
                  maxWidth: "90%",
                  borderWidth: 2,
                  borderColor: "#4da6ff",
                }}
              >
                <Text style={{ color: "#4da6ff", fontSize: 18, fontWeight: "700", marginBottom: 12 }}>
                  Kant vs. Mill: Pliktetikk vs. Utilitarisme
                </Text>
                
                <Text style={{ color: "#ffcc00", fontSize: 16, fontWeight: "700", marginTop: 12, marginBottom: 8 }}>
                  Kants pliktetikk:
                </Text>
                <Text style={{ color: "#ddd", fontSize: 14, lineHeight: 22 }}>
                  • <Text style={{ fontWeight: "600" }}>Fokus:</Text> Handlingens intensjon og plikt{"\n"}
                  • <Text style={{ fontWeight: "600" }}>Nøkkelspørsmål:</Text> "Er handlingen i seg selv riktig?"{"\n"}
                  • <Text style={{ fontWeight: "600" }}>Prinsipp:</Text> Det kategoriske imperativ - "Handle kun etter den maksime som du samtidig kan ville skal bli en allmenn lov"{"\n"}
                  • <Text style={{ fontWeight: "600" }}>Eksempel:</Text> Du skal aldri lyve, uansett konsekvenser, fordi løgn i seg selv er galt{"\n"}
                  • <Text style={{ fontWeight: "600" }}>Logikk:</Text> Hvis alle løy, ville tillit og kommunikasjon bryte sammen - derfor er løgn alltid galt{"\n"}
                  • <Text style={{ fontWeight: "600" }}>Menneskets verdi:</Text> Mennesker er mål i seg selv, aldri bare midler
                </Text>

                <Text style={{ color: "#ffcc00", fontSize: 16, fontWeight: "700", marginTop: 16, marginBottom: 8 }}>
                  Mills utilitarisme:
                </Text>
                <Text style={{ color: "#ddd", fontSize: 14, lineHeight: 22 }}>
                  • <Text style={{ fontWeight: "600" }}>Fokus:</Text> Handlingens konsekvenser og nytte{"\n"}
                  • <Text style={{ fontWeight: "600" }}>Nøkkelspørsmål:</Text> "Hva skaper mest lykke for flest mulig?"{"\n"}
                  • <Text style={{ fontWeight: "600" }}>Prinsipp:</Text> "Den største lykke for det største antall"{"\n"}
                  • <Text style={{ fontWeight: "600" }}>Eksempel:</Text> Du kan lyve hvis det skaper mer lykke/mindre lidelse totalt sett{"\n"}
                  • <Text style={{ fontWeight: "600" }}>Logikk:</Text> Hvis en løgn redder liv eller forhindrer stor smerte, er den moralsk riktig{"\n"}
                  • <Text style={{ fontWeight: "600" }}>Fleksibilitet:</Text> Samme handling kan være riktig i én situasjon, gal i en annen
                </Text>

                <Text style={{ color: "#ff6666", fontSize: 16, fontWeight: "700", marginTop: 16, marginBottom: 8 }}>
                  Kjernekonflikten:
                </Text>
                <Text style={{ color: "#ddd", fontSize: 14, lineHeight: 22 }}>
                  <Text style={{ fontWeight: "600" }}>Scenario:</Text> En morder banker på døren og spør hvor vennen din er.{"\n\n"}
                  • <Text style={{ fontWeight: "600" }}>Kant:</Text> Du må si sannheten (eller i det minste ikke lyve), fordi løgn er alltid galt{"\n"}
                  • <Text style={{ fontWeight: "600" }}>Mill:</Text> Du bør lyve for å redde vennens liv, fordi det skaper mest lykke/minst lidelse{"\n\n"}
                  <Text style={{ fontWeight: "700", color: "#4da6ff" }}>Essensen:</Text>{"\n"}
                  • Kant: "Gjør det rette, uansett konsekvenser"{"\n"}
                  • Mill: "Gjør det som gir best resultat"
                </Text>

                <TouchableOpacity
                  onPress={() => setShowKantMillTooltip(false)}
                  style={{
                    marginTop: 16,
                    backgroundColor: "#4da6ff",
                    padding: 12,
                    borderRadius: 8,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 14, fontWeight: "600" }}>
                    Lukk
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </TouchableOpacity>
        </Modal>

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
