import { loadingTexts, tips } from '@constants/loading_text';
import { useGameStore } from '@store/useGameStore';
import { getRandomInt } from '@utils/getRandomInt';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

export default function UseLoading() {
    const router = useRouter();
    const resetGame = useGameStore(state => state.resetGame);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const getRandomText = (arr: string[]) =>
        arr[Math.floor(Math.random() * arr.length)];

    const randomizedTime = getRandomInt(1500, 4000)

    const [loadingText, setLoadingText] = useState('');
    const [tipText, setTipText] = useState('');

    useEffect(() => {
        setLoadingText(getRandomText(loadingTexts));
        setTipText(getRandomText(tips));
    }, []);

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true
                })
            ])
        ).start();

        const timeout = setTimeout(() => {
            resetGame();
            router.replace('/choose_area'); // Replace with your actual game screen route
        }, randomizedTime);

        return () => clearTimeout(timeout);
    }, [fadeAnim, resetGame, router, randomizedTime]); // dep from Copilot

    return {
        states: {
            fadeAnim,
            loadingText,
            tipText
        }
    }
}