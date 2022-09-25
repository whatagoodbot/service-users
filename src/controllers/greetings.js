import { greetingsDb } from '../models/index.js'

export const addGreeting = async (payload) => {
  const results = await greetingsDb.add(payload.userId, payload.greeting, payload.type)
  if (results.length) {
    return await greetingsDb.get(results[0])
  }
  // const failedMessage = { message: `${await stringsDb.get('greetingFailed')} ${options.type}` }
  // if (options.argument.length < 2) return failedMessage
  // const nickname = options.argument.shift()
  // const user = await usersDb.getByName(nickname)
  // const userUid = user.id
  // const greetingImage = options.argument.join(' ')
  // if (greetingsDb.add(userUid, greetingImage, options.type)) return { message: `${options.type} ${await stringsDb.get('greetingAdded')} ${nickname}` }
  // return failedMessage
}

export const getGreeting = async (payload) => {
  return await greetingsDb.getForUser(payload.userId)
}
