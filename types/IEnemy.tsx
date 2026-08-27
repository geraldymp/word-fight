export interface IEnemy {
  id: string;
  name: string;
  baseHp: number;
  minDmg: number;
  maxDmg: number;
  minManaBounty: number;
  maxManaBounty: number;
  exp: number;
  defenseType?:
    | 'normal'
    | 'lengthOnly'
    | 'vowelOnly'
    | 'consonantOnly'
    | 'minThreeLetters'
    | 'minFourLetters';
}
