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
    borderColor: Colors.borderBlack,
    bubbleText: ''
  },
  [WordEffectTiers.NORMAL]: {
    scaleTarget: 1,
    duration: 0,
    borderColor: Colors.borderBlue,
    bubbleText: ''
  },
  [WordEffectTiers.GOOD]: {
    scaleTarget: 1.06,
    duration: 700,
    borderColor: Colors.borderGreen,
    bubbleText: 'Pretty good'
  },
  [WordEffectTiers.GREAT]: {
    scaleTarget: 1.1,
    duration: 450,
    borderColor: Colors.primary,
    bubbleText: 'Great word!'
  },
  [WordEffectTiers.AMAZING]: {
    scaleTarget: 1.14,
    duration: 250,
    borderColor: Colors.danger,
    bubbleText: 'AMAZING!!'
  }
};

// tiers that should trigger the hero speech bubble
export const BUBBLE_ELIGIBLE_TIERS: string[] = [
  WordEffectTiers.GOOD,
  WordEffectTiers.GREAT,
  WordEffectTiers.AMAZING
];
