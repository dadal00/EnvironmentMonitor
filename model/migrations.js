import { createTable, schemaMigrations } from '@nozbe/watermelondb/Schema/migrations'

export default schemaMigrations({
  migrations: [
    {
      toVersion: 2,
      steps: [
        // See "Migrations API" for more details
        createTable({
          name: 'groceries',
          columns: [
            { name: 'store_id', type: 'string', isIndexed: true },
            { name: 'name', type: 'string' },
          ],
        }),
      ],
    }
  ],
})