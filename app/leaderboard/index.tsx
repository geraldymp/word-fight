// app/leaderboard.tsx
import SettingHeader from 'app/components/SettingHeader';
import Colors from 'app/foundation/colors';
import { getHighscore } from 'app/lib/highscoreFunctions';
import { scale, verticalScale } from 'app/utils/sizeScaling';
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
  submitted_by: string;
}

export default function LeaderboardScreen() {
  const [scores, setScores] = useState<HighScore[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchHighscore() {
    const data = await getHighscore();
    setScores(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchHighscore();
  }, []);

  const renderItem = ({ item, index }: { item: HighScore; index: number }) => (
    <View style={styles.item}>
      <Text style={styles.rank}>{index + 1}.</Text>
      <View style={styles.wordAndScoreWrapper}>
        <View>
          <Text style={styles.word}>{item.word}</Text>
          <Text style={styles.submitBy}>By: {item.submitted_by}</Text>
        </View>
        <Text style={styles.score}>{item.score}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.scrollContainer}>
      <SettingHeader title="Leaderboard" />
      {loading ? (
        <ActivityIndicator size="large" color="#ffe08a" />
      ) : (
        <FlatList
          data={scores}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ListEmptyComponent={() => <Text style={styles.noData}>No Data</Text>}
          contentContainerStyle={{
            paddingHorizontal: scale(20),
            paddingBottom: verticalScale(24),
            paddingTop: verticalScale(4)
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: Colors.deeperDark
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.shallowBlue,
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(10),
    borderRadius: scale(12),
    marginBottom: verticalScale(10),
    alignItems: 'center'
  },
  rank: {
    color: Colors.primary,
    fontSize: verticalScale(18),
    width: scale(30),
    fontWeight: 'bold',
    textAlign: 'center'
  },
  wordAndScoreWrapper: {
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: scale(12),
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  word: {
    color: Colors.textWhite,
    fontSize: verticalScale(18),
    flex: 1,
    textTransform: 'uppercase',
    fontWeight: '600'
  },
  submitBy: {
    color: Colors.borderBlue,
    fontSize: verticalScale(10),
    flex: 1,
    fontWeight: '500'
  },
  score: {
    color: Colors.accent,
    fontSize: verticalScale(24),
    fontWeight: 'bold'
  },
  noData: {
    color: Colors.primary,
    fontSize: verticalScale(16),
    textAlign: 'center',
    marginVertical: verticalScale(20)
  }
});
