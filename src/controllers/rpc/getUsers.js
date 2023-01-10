import { logger, metrics } from '@whatagoodbot/utilities'
import { usersDb } from '../../models/index.js'

export const getUser = async (call, callback) => {
  const functionName = 'getUser'
  logger.debug({ event: functionName })
  metrics.count(functionName)

  if (call && call.request && call.request.id) {
    const user = await usersDb.get(call?.request?.id)
    if (!user) return callback(null, null)
    callback(null, user)
  } else {
    callback(null, null)
  }
}

export const getUserByName = async (call, callback) => {
  const functionName = 'getUserByName'
  logger.debug({ event: functionName })
  metrics.count(functionName)

  if (call && call.request && call.request.name) {
    const user = await usersDb.getByName(call?.request?.name)
    if (!user) return callback(null, null)
    callback(null, user)
  } else {
    callback(null, null)
  }
}
