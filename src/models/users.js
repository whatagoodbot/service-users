const tableName = 'users'

export default (knex) => {
  return {
    add: async (id, name) => {
      return await knex(tableName)
        .insert({
          id,
          name,
          lastWelcomed: new Date()
        })
    },
    get: async (id) => {
      return await knex(tableName)
        .where({ id })
        .first()
    },
    getAll: async () => {
      return await knex(tableName)
    },
    getByName: async (name) => {
      return await knex(tableName)
        .where({ name })
        .first()
    },
    updateLastWelcomed: async (id, name) => {
      const existingUser = await knex(tableName)
        .where({ id })
        .first()
      if (existingUser) {
        await knex(tableName)
          .where({ id })
          .update({ name, lastWelcomed: new Date() })
      } else {
        await knex(tableName)
          .insert({
            id,
            name,
            lastWelcomed: new Date()
          })
      }
    },
    updateLastDisconnected: async (id, name) => {
      await knex(tableName)
        .where({ id })
        .update({ name, lastDisconnected: new Date() })
    }
  }
}
