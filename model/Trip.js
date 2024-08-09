import {Model} from '@nozbe/watermelondb';
import {field, text} from '@nozbe/watermelondb/decorators';

export default class Trip extends Model {
    static table = 'trips';
    static associations = {
        stores: { type: 'has_many', foreignKey: 'trip_id' },
    }

    @field('user_id') user_id;
    @field('group_id') group_id;
    @text('name') name;
    @field('date') date;
    @field('base64_image') base64_image;
    @field('time_stamp') time_stamp;
}