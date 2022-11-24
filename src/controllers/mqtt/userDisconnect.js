import { logger, metrics } from '@whatagoodbot/utilities'
import { usersDb } from '../../models/index.js'

export default async payload => {
  const functionName = 'userDisconnect'
  logger.debug({ event: functionName })
  metrics.count(functionName)
  usersDb.updateLastDisconnected(payload.user.id)
}
