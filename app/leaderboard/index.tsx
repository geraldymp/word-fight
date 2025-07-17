// app/leaderboard.tsx
import { supabase } from '@lib/supabase';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native';

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
        .limit(20);
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
      <View style={styles.wordAndScoreWrapper}>
        <Text style={styles.word}>{item.word}</Text>
        <Text style={styles.score}>{item.score}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.scrollContainer}>
      <Text style={styles.header}>Leaderboard</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#ffe08a" />
      ) : (
        <FlatList
          data={scores}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ListEmptyComponent={() => (
            <Text style={styles.noData}>No Data</Text>
          )}
          contentContainerStyle={{ paddingHorizontal: 2, paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContainer: {
    paddingVertical: 48,
    paddingHorizontal: 16,
    backgroundColor: '#121212',
  },
  header: {
    fontSize: 32,
    color: '#ffe08a',
    fontWeight: 'bold',
    marginBottom: 24,
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#23233a',
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#ffe08a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    
  },
  rank: {
    color: '#ffe08a',
    fontSize: 18,
    width: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  wordAndScoreWrapper: {
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: 'space-between'
  },
  word: {
    color: '#fff',
    fontSize: 18,
    flex: 1,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  score: {
    color: '#3eab5e',
    fontSize: 18,
    fontWeight: 'bold',
  },
  noData: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
});
