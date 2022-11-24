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
