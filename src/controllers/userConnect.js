import { usersDb } from '../models/index.js'

const durationUntilNextGreeting = (5 * 60) * 1000

export default async payload => {
  const user = await usersDb.get(payload.userId)
  const userLastWelcomed = user?.lastWelcomed
  if (userLastWelcomed) {
    if (new Date() - new Date(userLastWelcomed) < durationUntilNextGreeting) return
  }
  const userLastDisconnected = user?.lastDisconnected
  if (userLastDisconnected) {
    if (new Date() - new Date(userLastDisconnected) < durationUntilNextGreeting) return
  }

  usersDb.updateLastWelcomed(payload.userId, payload.userNickname)

  return [{
    topic: 'responseRead',
    payload: {
      key: payload.userId,
      nickname: payload.nickname,
      category: 'userGreeting'
    }
  }, {
    topic: 'responseRead',
    payload: {
      key: payload.room,
      room: payload.room,
      category: 'roomGreeting'
    }
  }]
}
