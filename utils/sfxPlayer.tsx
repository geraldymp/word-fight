// SfxPlayer.tsx
import { useSfxStore } from '@store/useSFXStore';
import React from 'react';
import Video from 'react-native-video';

const sfxSources = {
  playerHit: require('@assets/sounds/player_hit.mp3'),
  enemyHit: require('@assets/sounds/enemy_hit.mp3'),
  enemyBeaten: require('@assets/sounds/enemy_beaten.mp3')
};

export function SfxPlayer() {
  const { currentSfx, muted, clearSfx } = useSfxStore();

  if (!currentSfx) return null;

  return (
    <Video
      key={currentSfx.id} // ensures remount each play
      source={sfxSources[currentSfx.key]}
      paused={false}
      repeat={false}
      muted={muted}
      style={{ width: 0, height: 0 }}
      onEnd={clearSfx}
    />
  );
}
