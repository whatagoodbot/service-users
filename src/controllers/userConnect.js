import { usersDb } from '../models/index.js'

const durationUntilNextGreeting = (5 * 60) * 1000

export default async (payload) => {
  const user = await usersDb.get(payload.user.id)
  const userLastWelcomed = user?.lastWelcomed

  usersDb.updateLastWelcomed(payload.user.id, payload.user.nickname)

  if (userLastWelcomed) {
    if (new Date() - new Date(userLastWelcomed) < durationUntilNextGreeting) return
  }
  const userLastDisconnected = user?.lastDisconnected
  if (userLastDisconnected) {
    if (new Date() - new Date(userLastDisconnected) < durationUntilNextGreeting) return
  }

  return [{
    topic: 'responseRead',
    payload: {
      key: payload.user.id,
      nickname: payload.user.nickname,
      category: 'userGreeting'
    }
  }, {
    topic: 'responseRead',
    payload: {
      key: payload.room.slug,
      category: 'roomGreeting'
    }
  }]
}
