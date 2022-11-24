import { clients } from '@whatagoodbot/rpc'
import { logger, metrics, getRandom } from '@whatagoodbot/utilities'
import { usersDb, greetingsDb } from '../../models/index.js'
import { performance } from 'perf_hooks'

// const durationUntilNextGreeting = (5 * 60) * 1000

export default async payload => {
  const functionName = 'userConnect'
  const startTime = performance.now()
  logger.debug({ event: functionName })
  metrics.count(functionName)

  // const user = await usersDb.get(payload.user.id)
  // const userLastWelcomed = user?.lastWelcomed

  usersDb.updateLastWelcomed(payload.user.id, payload.user.nickname)

  // TODO we should track this per room and avoid bounce welcomes
  // if (userLastWelcomed) {
  //   if (new Date() - new Date(userLastWelcomed) < durationUntilNextGreeting) return
  // }
  // const userLastDisconnected = user?.lastDisconnected
  // if (userLastDisconnected) {
  //   if (new Date() - new Date(userLastDisconnected) < durationUntilNextGreeting) return
  // }

  const welcome = await clients.strings.get('userGreeting')
  let greetings = await greetingsDb.getForUser(payload.user.id)
  if (greetings.length === 0) greetings = await greetingsDb.getGeneric()
  if (greetings.length > 0) {
    const greetingRecord = getRandom.fromArray(greetings)
    const message = `@${payload.user.nickname} ${welcome.value} ${greetingRecord.greeting}`
    metrics.trackExecution(functionName, 'function', performance.now() - startTime, true)
    // TODO Make this configurable per room
    if (payload.room.id !== '_3_') {
      return [{
        topic: 'broadcast',
        payload: {
          message
        }
      }]
    }
  }
}
