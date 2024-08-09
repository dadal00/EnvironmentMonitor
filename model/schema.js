import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'config',
      columns: [
        {name: 'user_name', type: 'string', isOptional: true},
        {name: 'phone_number', type: 'string', isOptional: true},
        {name: 'password', type: 'string', isOptional: true},
      ],
    }),
    tableSchema({
      name: 'trips',
      columns: [
        {name: 'user_id', type: 'string', isIndexed: true, isOptional: true}, // Optional foreign key to 'users'
        {name: 'group_id', type: 'string', isIndexed: true, isOptional: true},
        {name: 'name', type: 'string'},
        {name: 'date', type: 'string'},
        {name: 'base64_image', type: 'string', isOptional: true},
        // {name: 'time_stamp', type:'string'},
      ],
    }),
    tableSchema({
      name: 'stores',
      columns: [
        { name: 'trip_id', type: 'string', isIndexed: true },
        { name: 'name', type: 'string' },
      ],
    }),
    tableSchema({
      name: 'groceries',
      columns: [
        { name: 'store_id', type: 'string', isIndexed: true },
        { name: 'name', type: 'string' },
      ],
    }),
    tableSchema({
      name: 'receipts',
      columns: [
        { name: 'store_id', type: 'string', isIndexed: true },
        { name: 'base64_image', type: 'string' },
        { name: 'total', type: 'number', isOptional: true },
        { name: 'date', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'groups',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'creator_id', type: 'string', isIndexed: true },
      ],
    }),
    tableSchema({
      name: 'group_memberships',
      columns: [
        { name: 'group_id', type: 'string', isIndexed: true },
        { name: 'user_id', type: 'string', isIndexed: true },
      ],
    }),
  ]
})