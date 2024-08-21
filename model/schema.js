import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 1,
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
  ]
})