import { relations } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const todoLists = sqliteTable('todo_list', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  title: text('title'),
})

export const todoListRelations = relations(todoLists, ({ many }) => ({
  todos: many(todos),
}))

export const todos = sqliteTable('todos', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  text: text('text'),
  status: text('text', { enum: ['done', 'in-progress'] }),
  dueDate: text('due_date'),
  todoListId: integer('todo_list_id').references(() => todoLists.id),
})
