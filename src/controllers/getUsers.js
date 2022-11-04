import { usersDb } from '../models/index.js'

export const getUser = async (call, callback) => {
  if (call && call.request && call.request.id) {
    const user = await usersDb.get(call?.request?.id)
    if (!user) callback(null, null)
    callback(null, user)
  } else {
    callback(null, null)
  }
}
