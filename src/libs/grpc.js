
import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import { usersDb } from '../models/index.js'

const packageDefinition = protoLoader.loadSync('./src/protos/user.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})

const userProto = grpc.loadPackageDefinition(packageDefinition)

const getUserDetails = async (call, callback) => {
  const user = await usersDb.get(call.request.id)

  callback(null, user)
}

export default () => {
  const server = new grpc.Server()
  server.addService(userProto.Users.service, { getUserDetails })
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start()
  })
}
