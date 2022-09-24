const tableName = 'userGreetings'

export default (knex) => {
  return {
    get: async (id) => {
      return await knex(tableName)
        .where({ id })
    },
    getForUser: async (user) => {
      let messageResults = await knex(tableName)
        .where({ user, type: 'text' })
      if (!messageResults.length) {
        messageResults = await knex(tableName)
          .where({ user: null })
      }
      const imageResults = await knex(tableName)
        .where({ user, type: 'image' })
      const messages = messageResults.map((message) => { return message.greeting })
      const images = imageResults.map((image) => { return image.greeting })
      if (images.length) return { messages, images }
      return { messages }
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
