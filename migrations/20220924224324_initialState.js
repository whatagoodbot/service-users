
export const up = (knex) => {
  return knex.schema
    .createTable('users', function (table) {
      table.string('id', 255).notNullable().primary()
      table.string('name', 255)
      table.timestamp('lastWelcomed')
      table.timestamp('lastDisconnected')
      table.timestamps(true, true, true)
    })
    .createTable('userGreetings', function (table) {
      table.increments('id').notNullable().primary()
      table.string('user', 255)
      table.string('greeting', 255).notNullable()
      table.enu('type', ['image', 'text']).notNullable()
      table.timestamps(true, true, true)
    })
}

export const down = (knex) => {
  return knex.schema
    .dropTable('users')
    .dropTable('greetings')
}
