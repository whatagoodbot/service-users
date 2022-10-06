import broker from 'message-broker'
import controllers from './controllers/index.js'
import { logger } from './utils/logging.js'
import { metrics } from './utils/metrics.js'
import { performance } from 'perf_hooks'
import { delay } from './utils/timing.js'

const topicPrefix = `${process.env.NODE_ENV}/`

const subscribe = () => {
  Object.keys(controllers).forEach((topic) => {
    broker.client.subscribe(`${topicPrefix}${topic}`, (err) => {
      logger.info(`subscribed to ${topicPrefix}${topic}`)
      if (err) {
        logger.error({
          error: err.toString(),
          topic
        })
      }
    })
  })
}

const reshapeMeta = (requestPayload) => {
  const sentMeta = requestPayload?.meta
  delete requestPayload?.meta
  return { ...requestPayload, ...sentMeta }
}

if (broker.client.connected) {
  subscribe()
} else {
  broker.client.on('connect', subscribe)
}

broker.client.on('error', (err) => {
  logger.error({
    error: err.toString()
  })
})

broker.client.on('message', async (topic, data) => {
  const startTime = performance.now()
  const topicName = topic.substring(topicPrefix.length)
  let requestPayload
  let reshapedMeta
  try {
    metrics.count('receivedMessage', { topicName })
    requestPayload = JSON.parse(data.toString())
    reshapedMeta = reshapeMeta(requestPayload)
    const validatedRequest = broker[topicName].validate(requestPayload)
    if (validatedRequest.errors) throw { message: validatedRequest.errors } // eslint-disable-line
    const processedResponses = await controllers[topicName](requestPayload)
    if (!processedResponses || !processedResponses.length) return

    for (const current in processedResponses) {
      const processedResponse = processedResponses[current]
      const validatedResponse = broker[processedResponse.topic].validate({
        ...processedResponse.payload,
        meta: reshapedMeta
      })
      if (validatedResponse.errors) throw { message: validatedResponse.errors } // eslint-disable-line
      broker.client.publish(`${topicPrefix}${processedResponse.topic}`, JSON.stringify(validatedResponse))
      await delay(250)
    }

    metrics.timer('responseTime', performance.now() - startTime, { topic })
  } catch (error) {
    console.log(error.message)
    requestPayload.error = error.message
    const validatedResponse = broker.responseRead.validate({
      key: 'somethingWentWrong',
      category: 'system',
      meta: reshapedMeta
    })
    metrics.count('error', { topicName })
    broker.client.publish(`${topicPrefix}responseRead`, JSON.stringify(validatedResponse))
  }
})
