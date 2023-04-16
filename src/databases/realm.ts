import Realm from "realm";
import { TaskSchema } from "./schemas/TaskSchema";


export const getRealm = async () =>  await Realm.open({
    path: "dsg-app",
    schema: [TaskSchema]
  })
