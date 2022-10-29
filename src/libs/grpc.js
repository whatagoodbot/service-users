import { server, serverCreds, users } from '@whatagoodbot/rpc'
import { getUser } from '../controllers/getUsers.js'

export default () => {
  server.addService(users.Users.service, { getUser })
  server.bindAsync('0.0.0.0:50051', serverCreds, () => {
    server.start()
  })
}
