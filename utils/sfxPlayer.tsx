// SfxPlayer.tsx
import { SfxKey, useSfxStore } from '@store/useSFXStore';
import React, { useEffect, useRef, useState } from 'react';
import Video from 'react-native-video';

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

  // one persistent ref per sound — mounted once, never recreated
  const refs = useRef<Record<string, any>>({});

  // tracks paused state per sound; drives the `paused` prop
  const [pausedMap, setPausedMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(sfxKeys.map(k => [k, true]))
  );

  useEffect(() => {
    function play(key: SfxKey) {
      const player = refs.current[key];
      if (!player) return;
      player.seek(0); // rewind instantly, asset is already loaded
      setPausedMap(prev => ({ ...prev, [key]: false }));
    }
    registerPlaySfx(play);
  }, [registerPlaySfx]);

  function handleEnd(key: SfxKey) {
    setPausedMap(prev => ({ ...prev, [key]: true }));
  }

  return (
    <>
      {sfxKeys.map(key => (
        <Video
          key={key} // STABLE key — never changes, so this never remounts
          ref={ref => {
            refs.current[key] = ref;
          }}
          source={sfxSources[key]}
          paused={pausedMap[key]}
          muted={muted}
          repeat={false}
          style={{ width: 0, height: 0 }}
          onEnd={() => handleEnd(key)}
        />
      ))}
    </>
  );
}
