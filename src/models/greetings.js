const tableName = 'greetings'

export default (knex) => {
  return {
    getForUser: async (user) => {
      return await knex(tableName)
        .where({ user })
    },
    getGeneric: async () => {
      return await knex(tableName)
        .whereNull('user')
    },
    add: async (user, greeting) => {
      return await knex(tableName)
        .insert({
          user,
          greeting
        })
    },
    delete: async (user) => {
      return await knex(tableName)
        .where({ user })
        .del()
    }
  }
}
