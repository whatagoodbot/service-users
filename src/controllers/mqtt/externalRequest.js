import { clients } from '@whatagoodbot/rpc'
import { logger, metrics } from '@whatagoodbot/utilities'
import { greetingsDb } from '../../models/index.js'

export default payload => {
  if (payload.service !== process.env.npm_package_name) return
  const functionName = 'externalRequest'
  logger.debug({ event: functionName })
  metrics.count(functionName)

  return commands[payload.command](payload)
}

const commands = {
  addusergreeting: async payload => {
    const functionName = 'addUserGreeting'
    logger.debug({ event: functionName })
    metrics.count(functionName)

    if (payload.arguments) {
      logger.debug({ event: functionName })
      metrics.count(functionName)
      greetingsDb.add(payload.user.id, payload.arguments)
      const string = await clients.strings.get('userGreetingAdded')
      return [{
        topic: 'broadcast',
        payload: {
          message: `${string.value} @${payload.user.nickname}`
        }
      }]
    }
    const response = await clients.strings.get('addGreetingError')
    logger.error({ event: functionName })
    return [{
      topic: 'broadcast',
      payload: {
        message: response.value
      }
    }]
  },
  deleteusergreetings: async payload => {
    const functionName = 'deleteUserGreetings'
    logger.debug({ event: functionName })
    metrics.count(functionName)
    const result = await greetingsDb.delete(payload.user.id)
    if (result) {
      const string = await clients.strings.get('userGreetingDeleted')
      return [{
        topic: 'broadcast',
        payload: {
          message: `${string.value} @${payload.user.nickname}`
        }
      }]
    } else {
      const string = await clients.strings.get('userGreetingNoneToDelete')
      return [{
        topic: 'broadcast',
        payload: {
          message: string.value
        }
      }]
    }
  }
}
