import { IEnemy } from '../types/IEnemy';
import { INode } from '../types/INode';

interface IEnemyChosen extends IEnemy {
  chosen: boolean;
}

export const remapEnemyToJourney = (enemies: IEnemyChosen[]): INode[] => {
  return enemies.map(enemy => ({
    name: enemy.name,
    chosen: enemy.chosen,
    type: 'enemy'
  }));
};
