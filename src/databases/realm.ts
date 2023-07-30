import {TaskSchema} from './schemas/TaskSchema';
import {createRealmContext} from '@realm/react';

/* export const getRealm = async () =>  await Realm.open({
    path: "dsg-app",
    schema: [TaskSchema]
  })
 */

export const {RealmProvider, useRealm, useQuery, useObject} =
  createRealmContext({
    schema: [TaskSchema],
  });
