import { CircleIcon } from '@/components/Home/CircleIcon';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#777fa8', alignItems: 'center' }}>
      <Image source={require('../assets/title_logo2.png')} style={{ width: '80%', marginTop: 120 }} resizeMode='contain' />
      <LottieView
        source={require('../assets/lottie/home_sword.json')}
        autoPlay
        loop
        style={{ width: '80%', height: 200, marginTop: 20 }}
      />
      <TouchableOpacity
        style={{ width: '80%', height: 150, backgroundColor: '#777fa8', alignItems: 'center', paddingTop: 48 }}
        onPress={() => {
          router.push('/loading');
        }}
      >
        <Text style={styles.buttonText}>Tap to Start</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', position: 'absolute', bottom: 80, gap: 32 }}>
        <CircleIcon icon={require('../assets/icons/home/question_mark.png')} onPress={() => router.push('/help')}/>
        <CircleIcon icon={require('../assets/icons/home/achievement.png')} onPress={() => router.push('/leaderboard')}/>
        <CircleIcon icon={require('../assets/icons/home/setting.png')} onPress={() => router.push('/settings')}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)' // overlay for readability
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10
  },
  tagline: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 40
  },
  button: {
    backgroundColor: '#6C5CE7',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6
  },
  secondary: {
    backgroundColor: '#636e72'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    color: '#999'
  }
});
