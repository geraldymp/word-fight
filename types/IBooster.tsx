export interface IBooster {
  id: string;
  name: string;
  description: string;
  apply: () => void; // Wire this to modify state
}