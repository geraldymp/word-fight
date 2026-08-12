// SfxPlayer.tsx
import { SfxKey, useSfxStore } from '@store/useSFXStore';
import { Audio } from 'expo-av';
import { useEffect, useRef } from 'react';

const sfxSources: Record<SfxKey, any> = {
  playerHit: require('@assets/sounds/sfx/player_hit.mp3'),
  enemyBeaten: require('@assets/sounds/sfx/enemy_beaten.mp3'),
  windHit: require('@assets/sounds/sfx/wind_hit.mp3'),
  iceHit: require('@assets/sounds/sfx/ice_hit.mp3'),
  earthHit: require('@assets/sounds/sfx/earth_hit.mp3'),
  flameHit: require('@assets/sounds/sfx/flame_hit.mp3')
};

const sfxKeys = Object.keys(sfxSources) as SfxKey[];

export function SfxPlayer() {
  const muted = useSfxStore(s => s.muted);
  const registerPlaySfx = useSfxStore(s => s.registerPlaySfx);

  // one persistent Sound instance per key, preloaded once
  const soundsRef = useRef<Partial<Record<SfxKey, Audio.Sound>>>({});
  const mutedRef = useRef(muted);

  // keep mutedRef current, and mute any already-loaded sounds
  useEffect(() => {
    mutedRef.current = muted;
    Object.values(soundsRef.current).forEach(sound => {
      sound?.setIsMutedAsync(muted);
    });
  }, [muted]);

  // preload all sfx once on mount
  useEffect(() => {
    let cancelled = false;

    async function loadAll() {
      // await Audio.setAudioModeAsync({
      //   playsInSilentModeIOS: true,
      //   staysActiveInBackground: false
      // });

      for (const key of sfxKeys) {
        try {
          const { sound } = await Audio.Sound.createAsync(sfxSources[key], {
            isMuted: mutedRef.current
          });
          if (cancelled) {
            sound.unloadAsync();
          } else {
            soundsRef.current[key] = sound;
          }
        } catch (e) {
          console.warn(`Failed to load sfx ${key}`, e);
        }
      }
    }

    loadAll();

    return () => {
      cancelled = true;
      Object.values(soundsRef.current).forEach(sound => {
        sound?.unloadAsync();
      });
      soundsRef.current = {};
    };
  }, []);

  // register the imperative play function used by the store
  useEffect(() => {
    async function play(key: SfxKey) {
      const sound = soundsRef.current[key];
      if (!sound) return;
      try {
        await sound.setIsMutedAsync(mutedRef.current);
        await sound.setPositionAsync(0);
        await sound.playAsync();
      } catch (e) {
        console.warn(`Failed to play sfx ${key}`, e);
      }
    }
    registerPlaySfx(play);
  }, [registerPlaySfx]);

  return null;
}
