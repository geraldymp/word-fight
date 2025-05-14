import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HelpScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>📖 How to Play Word Fight</Text>

        <Text style={styles.paragraph}>
          Welcome to <Text style={styles.bold}>Word Fight</Text> — a turn-based word battle game!
        </Text>

        <Text style={styles.heading}>🧠 Objective</Text>
        <Text style={styles.paragraph}>
          Create words from 12 random letters to deal damage to the enemy. The longer the word, the more damage you deal.
        </Text>

        <Text style={styles.heading}>⚔️ Battle Mechanics</Text>
        <Text style={styles.paragraph}>
          • Select letters to form a word from the given set{'\n'}
          • Submit the word to attack the enemy{'\n'}
          • Enemy will counterattack after your turn{'\n'}
          • You will get a little HP after beating the enemy{'\n'}
          • Your damage based on the word length and letter values
        </Text>

        <Text style={styles.heading}>🔁 Reshuffle</Text>
        <Text style={styles.paragraph}>
          You can reshuffle the letters up to <Text style={styles.bold}>2 times per battle</Text> in case you're stuck.
        </Text>

        <Text style={styles.heading}>🏆 Level Progression</Text>
        <Text style={styles.paragraph}>
          After defeating an enemy, you'll face a stronger one! Each level increases enemy health and damage range.
        </Text>

        <Text style={styles.heading}>💡 Tips</Text>
        <Text style={styles.paragraph}>
          • Use high-value letters (like Z, Q, X) for stronger damage{'\n'}
          • Use longer words to deal more damage{'\n'}
          • Avoid short or weak words if possible
        </Text>

        <Text style={styles.heading}>🎯 Goal</Text>
        <Text style={styles.paragraph}>
          Survive as many levels as you can! How far can you go?
        </Text>

        <View style={styles.footer}>
          <Link href="/" style={styles.backLink}>
            {`<< Back to Home`}
          </Link>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginTop: 16,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 16,
    color: '#ccc',
    lineHeight: 22,
  },
  bold: {
    fontWeight: 'bold',
    color: '#fff',
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
  },
  backLink: {
    color: '#00BFFF',
    fontSize: 16,
  },
});
