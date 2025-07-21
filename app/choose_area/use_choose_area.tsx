import { areas } from "app/constants/areas";
import { enemies } from "app/constants/enemies";
import { useGameStore } from "app/store/useGameStore";
import { IArea } from "app/types/IArea";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { BackHandler } from "react-native";

export default function UseChooseArea() {
    const { step, setSelectedEnemies } = useGameStore();
    const router = useRouter();
    const [choices, setChoices] = useState<IArea['content']>([]);

    function getEnemiesByArea(area: string) {
        return enemies.find(entry => entry.area === area)?.content || [];
    }

    useEffect(() => {
        const backAction = () => {
            router.replace('/');
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
        return () => backHandler.remove();
    }, [router]);

    useEffect(() => {
        const filtered = areas.find(e => e.step === step)?.content || [];
        setChoices(filtered);
    }, [step]);

    function onPress(option: string) {
        if (step === 3 || step === 5) {
            if (option === 'shop') {
                router.replace('/choose_safe_zone');
            } else if (option === 'fire_camp') {
                router.replace('/fire_camp');
            }
        } else {
            setSelectedEnemies(getEnemiesByArea(option));
            router.replace('/battle');
        }
    }

    return {
        actions: {
            onPress
        },
        states: {
            choices
        }
    }
}