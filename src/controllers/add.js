import { usersDb } from '../models/index.js'

export default async (payload) => {
  const results = await usersDb.add(payload.id, payload.name)
  if (results.length) {
    return await usersDb.get(payload.id)
  }
}
