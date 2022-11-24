
export const up = (knex) => {
  return knex.schema
    .createTable('greetings', function (table) {
      table.increments('id').notNullable().primary()
      table.string('user', 255)
      table.string('room', 255)
      table.string('greeting', 1000).notNullable()
      table.timestamps(true, true, true)
    })
    .createTable('users', function (table) {
      table.string('id', 255).notNullable().primary()
      table.string('name', 255)
      table.boolean('isAdmin', 255).notNullable().defaultTo(0)
      table.timestamp('lastWelcomed')
      table.timestamp('lastDisconnected')
      table.timestamps(true, true, true)
    })
}

export const down = (knex) => {
  return knex.schema
    .dropTable('greetings')
    .dropTable('users')
}
