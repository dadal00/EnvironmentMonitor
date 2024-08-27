import {Model} from '@nozbe/watermelondb';
import {field, text, relation} from '@nozbe/watermelondb/decorators';

export default class Grocery extends Model {
    static table = 'groceries';
    static associations = {
        stores: { type: 'belong_to', foreignKey: 'store_id' },
    }

    @field('store_id') store_id;
    @text('name') name;
}