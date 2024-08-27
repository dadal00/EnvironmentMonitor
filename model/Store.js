import {Model} from '@nozbe/watermelondb';
import {field, text, relation, children} from '@nozbe/watermelondb/decorators';

export default class Store extends Model {
    static table = 'stores';
    static associations = {
        trips: { type: 'belong_to', foreignKey: 'trip_id' },
        groceries: { type: 'has_many', foreignKey: 'store_id' },
    }

    @field('trip_id') trip_id;
    @text('name') name;
    @field('touched') touched;
    @relation('trips', 'trip_id') trip;
    @children('groceries') groceries;
}