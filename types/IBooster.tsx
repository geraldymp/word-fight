import { ImageSourcePropType } from "react-native";

export interface IBooster {
  id: string;
  name: string;
  description: string;
  image: ImageSourcePropType | undefined;
}
