import { ImageSourcePropType } from "react-native";

export interface IEnemy {
    name: string;
    image: ImageSourcePropType | undefined
    baseHp: number
    minDmg: number
    maxDmg: number
    goldReward: number
    level: number
}