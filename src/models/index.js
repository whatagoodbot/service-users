import { createRequire } from 'module'
import knexfile from '../../knexfile.js'

import usersModel from './users.js'
import greetingsModel from './greetings.js'

const require = createRequire(import.meta.url)
const { knex } = require('../libs/knex.cjs')(knexfile[process.env.NODE_ENV])

export const usersDb = usersModel(knex)
export const greetingsDb = greetingsModel(knex)
