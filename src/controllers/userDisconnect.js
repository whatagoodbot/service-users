import { usersDb } from '../models/index.js'

export default async payload => {
  usersDb.updateLastDisconnected(payload.userId)
}
