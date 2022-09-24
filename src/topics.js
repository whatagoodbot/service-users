import { add, get, getAll, getByName } from './controllers/users.js'
import { addGreeting, getGreeting } from './controllers/greetings.js'

export const topicPrefix = `${process.env.NODE_ENV}/users/`

export const topics = {
  add: {
    responder: add,
    replyTopic: `${topicPrefix}addReply`
  },
  get: {
    responder: get,
    replyTopic: `${topicPrefix}getReply`
  },
  getAll: {
    responder: getAll,
    replyTopic: `${topicPrefix}getAllReply`
  },
  getByName: {
    responder: getByName,
    replyTopic: `${topicPrefix}getByNameReply`
  },
  getGreeting: {
    responder: getGreeting,
    replyTopic: `${topicPrefix}getGreetingReply`
  },
  addGreeting: {
    responder: addGreeting,
    replyTopic: `${topicPrefix}addGreetingReply`
  }
}
