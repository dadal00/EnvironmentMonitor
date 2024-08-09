import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import migrations from "../../model/migrations";
import Trip from "../../model/Trip";
import appSchema from '../../model/schema';


const adapter = new SQLiteAdapter({
    schema: appSchema,
  
    migrations,
  
    onSetUpError: (error: any) => {
      console.log('db error', error);
    },
    dbName: 'User Data',
    jsi: true,
    // actionsEnabled: true,
})
  
const database = new Database({
    adapter,
    modelClasses: [Trip],
})
  
export default database;