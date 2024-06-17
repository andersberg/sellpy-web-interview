import { database } from './db.js'
import { todoLists, todos } from './schema.js'

await database
  .transaction(async (trx) => {
    const result = await trx
      .insert(todoLists)
      .values([
        {
          title: 'First List',
        },
        {
          title: 'Second List',
        },
      ])
      .returning({ id: todoLists.id })

    await trx.insert(todos).values([
      {
        text: 'First todo of first list!',
        status: 'done',
        dueDate: new Date('2024-06-18:23:59:59Z').toISOString(),
        todoListId: result.at(0).id,
      },
      {
        text: 'Second todo of first list!',
        status: 'in-progress',
        dueDate: new Date('2024-06-01:23:59:59Z').toISOString(),
        todoListId: result.at(0).id,
      },
      {
        text: 'First todo of second list!',
        status: 'in-progress',
        dueDate: new Date('2024-06-01:23:59:59Z').toISOString(),
        todoListId: result.at(1).id,
      },
    ])
  })
  .then(() => {
    console.log('Seed data created')
  })
  .catch((error) => {
    console.error('Error creating seed data', error)
  })
