import Realm from 'realm';
import { SavedGameSchema } from './SavedGameSchema';

export const openRealm = async () => {
  return await Realm.open({
    path: 'wordfight.realm',
    schema: [SavedGameSchema],
    schemaVersion: 6
  });
};
