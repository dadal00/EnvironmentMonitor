import {Model} from '@nozbe/watermelondb';
import {field, relation, text, children} from '@nozbe/watermelondb/decorators';

export default class Trip extends Model {
    static table = 'trips';
    static associations = {
        stores: { type: 'has_many', foreignKey: 'trip_id' },
    }

    @text('name') name;
    @field('date') date;
    @field('touched') touched;
    @children('stores') stores;
}