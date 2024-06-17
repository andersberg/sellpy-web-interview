import { database } from './db.js'

const getTodoLists = () => {
  return database.query.todoLists.findMany({
    with: {
      todos: true,
    },
  })
}

const todoLists = await getTodoLists()
console.log('todoLists', todoLists)
