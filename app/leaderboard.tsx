// app/leaderboard.tsx
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../lib/supabase';

interface HighScore {
  id: string;
  word: string;
  score: number;
  created_at: string;
}

export default function LeaderboardScreen() {
  const [scores, setScores] = useState<HighScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      const { data, error } = await supabase
        .from('high_scores')
        .select('*')
        .order('score', { ascending: false })
        .limit(10);
      if (error) {
        console.error('Error fetching scores:', error);
      } else {
        setScores(data);
      }
      setLoading(false);
    };

    fetchScores();
  }, []);

  const renderItem = ({ item, index }: { item: HighScore; index: number }) => (
    <View style={styles.item}>
      <Text style={styles.rank}>{index + 1}.</Text>
      <Text style={styles.word}>{item.word}</Text>
      <Text style={styles.score}>{item.score}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🏆 Leaderboard</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <FlatList
          data={scores}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={() => <Text style={{ color: 'white' }}>No Data</Text>}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  rank: {
    color: '#aaa',
    fontSize: 18,
    width: 30,
  },
  word: {
    color: '#fff',
    fontSize: 18,
    flex: 1,
    textTransform: 'uppercase',
  },
  score: {
    color: '#ffd700',
    fontSize: 18,
    fontWeight: 'bold',
    width: 50,
    textAlign: 'right',
  },
});
