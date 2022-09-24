import add from './controllers/add.js'
import get from './controllers/get.js'
import getAll from './controllers/getAll.js'
import getByName from './controllers/getByName.js'

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
  }
}
