import Colors from 'app/foundation/colors';

export const WordEffectTiers = {
  NOTHING: 'NOTHING',
  NORMAL: 'NORMAL',
  GOOD: 'GOOD',
  GREAT: 'GREAT',
  AMAZING: 'AMAZING'
};

export const WordEffectConfig = {
  [WordEffectTiers.NOTHING]: {
    scaleTarget: 1,
    duration: 0,
    borderColor: Colors.borderBlack
  },
  [WordEffectTiers.NORMAL]: {
    scaleTarget: 1,
    duration: 0,
    borderColor: Colors.borderBlue
  },
  [WordEffectTiers.GOOD]: {
    scaleTarget: 1.06,
    duration: 700,
    borderColor: Colors.borderGreen
  },
  [WordEffectTiers.GREAT]: {
    scaleTarget: 1.1,
    duration: 450,
    borderColor: Colors.primary
  },
  [WordEffectTiers.AMAZING]: {
    scaleTarget: 1.14,
    duration: 250,
    borderColor: Colors.danger
  }
};
