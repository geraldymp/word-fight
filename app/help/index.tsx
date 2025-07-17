import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HelpScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.header}>How to Play Word Fight</Text>
      <View style={styles.card}>
        <Text style={styles.paragraph}>
          Welcome to <Text style={styles.bold}>Word Fight</Text> — a turn-based word battle game!
        </Text>

        <Text style={styles.heading}>Objective</Text>
        <Text style={styles.paragraph}>
          Create words from 20 random letters to deal damage to the enemy. The longer the word, the more damage you deal.
        </Text>

        <Text style={styles.heading}>Battle Mechanics</Text>
        <Text style={styles.paragraph}>
          • Select letters to form a word from the given set{"\n"}
          • Submit the word to attack the enemy{"\n"}
          • Enemy will counterattack after your turn{"\n"}
          • Your damage based on the word length and letter values
        </Text>

        <Text style={styles.heading}>Reshuffle</Text>
        <Text style={styles.paragraph}>
          You can reshuffle the letters up to <Text style={styles.bold}>2 times per battle</Text> in case you&apos;re stuck.
        </Text>

        <Text style={styles.heading}>Level Progression</Text>
        <Text style={styles.paragraph}>
          After defeating an enemy, you&apos;ll face a stronger one! Each level increases enemy health and damage range.
        </Text>

        <Text style={styles.heading}>Tips</Text>
        <Text style={styles.paragraph}>
          • Use high-value letters (like Z, Q, X) for stronger damage{"\n"}
          • Use longer words to deal more damage{"\n"}
          • Avoid short or weak words if possible
        </Text>

        <Text style={styles.heading}>Goal</Text>
        <Text style={styles.paragraph}>
          Survive as many levels as you can! How far can you go?
        </Text>

        <View style={styles.footer}>
          <Link href="/" style={styles.backLink}>
            {`<< Back to Home`}
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
    paddingBottom: 40,
  },
  header: {
    fontSize: 32,
    color: '#ffe08a',
    fontWeight: 'bold',
    marginBottom: 24,
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1e1e2f',
    borderRadius: 18,
    padding: 24,
    width: '90%',
    shadowColor: '#ffe08a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 32,
  },
  heading: {
    fontSize: 20,
    color: '#ffe08a',
    fontWeight: '600',
    marginTop: 18,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    color: '#ccc',
    lineHeight: 22,
    fontFamily: 'SpaceMono-Regular',
    marginBottom: 2,
  },
  bold: {
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'MightySouly',
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
  },
  backLink: {
    color: '#3eab5e',
    fontSize: 16,
    fontFamily: 'SpaceMono-Regular',
    fontWeight: 'bold',
  },
});
