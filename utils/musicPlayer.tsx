// MusicPlayer.tsx
import { useMusicStore } from '@store/useMusicStore';
import React, { useMemo } from 'react';
import Video from 'react-native-video';

const sources = {
  home: require('@assets/sounds/home_screen.mp3'),
  battle: require('@assets/sounds/battle_screen.mp3')
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
