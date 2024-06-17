/** @type { import("drizzle-kit").Config } */
export default {
  schema: './database/schema.js',
  dialect: 'sqlite',
  dbCredentials: {
    url: './database/sqlite.db',
  },
}
