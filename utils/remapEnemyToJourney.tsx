import { IEnemy } from '@customTypes/IEnemy';
import { INode } from '@customTypes/INode';

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
