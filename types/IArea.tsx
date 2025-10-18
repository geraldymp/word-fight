export interface IContent {
  id: string;
  name: string;
  description: string;
}

export interface IArea {
  step: number;
  type: 'dungeon' | 'rest' | 'boss';
  content: IContent[];
}
