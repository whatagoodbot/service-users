import { logger, metrics } from '@whatagoodbot/utilities'
import { server, serverCreds, users } from '@whatagoodbot/rpc'
import { getUser, getUserByName } from '../controllers/rpc/getUsers.js'

export default () => {
  server.addService(users.Users.service, { getUser, getUserByName })
  server.bindAsync('0.0.0.0:50000', serverCreds, () => {
    const functionName = 'startGrpcServer'
    logger.debug({ event: functionName })
    metrics.count(functionName)
    server.start()
  })
}
