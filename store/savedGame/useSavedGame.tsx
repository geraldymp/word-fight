import Realm from 'realm';
import { openRealm } from './openRealm';
import { ISavedGame } from './SavedGameType';

export const onSaveGame = async (snapshot: ISavedGame) => {
  const realm = await openRealm();
  realm.write(() => {
    realm.create(
      'SavedGame',
      {
        id: 'current',
        timestamp: new Date(), // use timestamp and Realm.UpdateMode.Modified to enable exact-same save
        ...snapshot
      },
      Realm.UpdateMode.Modified
    );
  });
  realm.close();
};

export const onLoadGame = async (): Promise<ISavedGame> => {
  const realm = await openRealm();
  const saved = realm.objectForPrimaryKey('SavedGame', 'current');
  const data = saved ? JSON.parse(JSON.stringify(saved)) : null;
  realm.close();
  return data;
};

export const onClearResume = async () => {
  const realm = await openRealm();
  realm.write(() => {
    const saved = realm.objectForPrimaryKey('SavedGame', 'current');
    if (saved) realm.delete(saved);
  });
  realm.close();
};
