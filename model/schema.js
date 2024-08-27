import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: 'trips',
      columns: [
        {name: 'name', type: 'string'},
        {name: 'date', type: 'string'},
        { name: 'touched', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'stores',
      columns: [
        { name: 'trip_id', type: 'string', isIndexed: true },
        { name: 'name', type: 'string' },
        { name: 'touched', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'groceries',
      columns: [
        { name: 'store_id', type: 'string', isIndexed: true },
        { name: 'name', type: 'string' },
      ],
    }),
  ]
})