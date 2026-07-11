// MusicPlayer.tsx
import { useMusicStore } from '@store/useMusicStore';
import React, { useMemo } from 'react';
import Video from 'react-native-video';

const sources = {
  home: require('@assets/sounds/bg_music/home_screen.mp3'),
  battle: require('@assets/sounds/bg_music/battle_screen.mp3'),
  victory: require('@assets/sounds/bg_music/victory.mp3'),
  game_over: require('@assets/sounds/bg_music/game_over.mp3'),
  boss: require('@assets/sounds/bg_music/boss_battle.mp3'),
  magic_hut: require('@assets/sounds/bg_music/magic_hut.mp3')
};

export function MusicPlayer() {
  const currentTrack = useMusicStore(s => s.currentTrack);
  const muted = useMusicStore(s => s.muted);

  const source = useMemo(
    () => (currentTrack ? sources[currentTrack] : null),
    [currentTrack]
  );
  if (!source) return null;

  return (
    <Video
      source={source}
      repeat
      paused={muted}
      disableFocus={true}
      style={{ width: 0, height: 0 }}
    />
  );
}
