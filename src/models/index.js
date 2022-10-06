import { createRequire } from 'module'
import knexfile from '../../knexfile.js'

import usersModel from './users.js'

const require = createRequire(import.meta.url)
const { knex } = require('../libs/knex.cjs')(knexfile[process.env.NODE_ENV])

export const usersDb = usersModel(knex)
