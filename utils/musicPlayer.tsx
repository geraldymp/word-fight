// MusicPlayer.tsx
import { useMusicStore } from '@store/useMusicStore';
import { Audio, AVPlaybackSource } from 'expo-av';
import { useEffect, useRef } from 'react';

const sources: Record<string, AVPlaybackSource> = {
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

  const soundRef = useRef<Audio.Sound | null>(null);
  const loadedTrackRef = useRef<string | null>(null);
  const mutedRef = useRef(muted);

  // keep mutedRef current + apply to whatever is currently loaded
  useEffect(() => {
    mutedRef.current = muted;
    soundRef.current?.setIsMutedAsync(muted);
  }, [muted]);

  useEffect(() => {
    let cancelled = false;

    async function switchTrack() {
      // unload previous track first
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
        loadedTrackRef.current = null;
      }

      if (!currentTrack) return;

      const source = sources[currentTrack];
      if (!source) return;

      try {
        const { sound } = await Audio.Sound.createAsync(source, {
          isLooping: true,
          isMuted: mutedRef.current,
          shouldPlay: true
        });
        if (cancelled) {
          sound.unloadAsync();
          return;
        }
        soundRef.current = sound;
        loadedTrackRef.current = currentTrack;
      } catch (e) {
        console.warn(`Failed to load music track ${currentTrack}`, e);
      }
    }

    switchTrack();

    return () => {
      cancelled = true;
    };
  }, [currentTrack]);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      soundRef.current?.unloadAsync();
    };
  }, []);

  return null;
}
