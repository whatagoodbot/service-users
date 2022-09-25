import { usersDb } from '../models/index.js'

export const add = async (payload) => {
  const results = await usersDb.add(payload.id, payload.name)
  if (results.length) {
    return await usersDb.get(payload.id)
  }
}

export const get = async (payload) => {
  return await usersDb.get(payload.id)
}

export const getAll = async (payload) => {
  return await usersDb.getAll()
}

export const getByName = async (payload) => {
  return await usersDb.getByName(payload.name)
}
