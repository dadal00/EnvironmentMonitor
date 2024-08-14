import {Model} from '@nozbe/watermelondb';
import {field, text, relation} from '@nozbe/watermelondb/decorators';

export default class Store extends Model {
    static table = 'stores';
    static associations = {
        groceries: { type: 'has_many', foreignKey: 'store_id' },
        trips: { type: 'belong_to', foreignKey: 'trip_id' },
    }

    @field('trip_id') trip_id;
    @text('name') name;
    @relation('trips', 'trip_id') trip;
    @relation('groceries', 'store_id') groceries;
}