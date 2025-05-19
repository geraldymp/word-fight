export interface INode {
  type: 'enemy' | 'booster' | 'other';
  name: string;
  chosen: boolean;
}