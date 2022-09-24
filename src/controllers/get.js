import { usersDb } from '../models/index.js'

export default async (payload) => {
  return await usersDb.get(payload.id)
}
