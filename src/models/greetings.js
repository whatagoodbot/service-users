const tableName = 'userGreetings'

export default (knex) => {
  return {
    get: async (id) => {
      return await knex(tableName)
        .where({ id })
    },
    getForUser: async (user) => {
      return await knex(tableName)
        .whereNull('user')
        .orWhere({ user })
    },
    add: async (user, greeting, type) => {
      return await knex(tableName)
        .insert({
          user,
          type,
          greeting
        })
    }
  }
}
