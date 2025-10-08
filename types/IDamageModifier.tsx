interface IDamageModifierContent {
  value: number;
  description: string;
}

export interface IDamageModifier {
  bonusDamage: IDamageModifierContent;
  vowelModifier: IDamageModifierContent;
  ABCDEModifier: IDamageModifierContent;
  VWXYZModifier: IDamageModifierContent;
  IngModifier: IDamageModifierContent;
  STModifier: IDamageModifierContent;
}
