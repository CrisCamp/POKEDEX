// generation.type.ts

import type { Model } from 'mongoose'

export type Generation = ToClientUser & {
  createdAt?: Date
  lastModified?: Date
}

export type ToClientUser = {
  id?: string
  generation: number
}

export type GenerationMethods = {
  toClient: () => ToClientUser
}

export type GenerationModel = Model<Generation, {}, GenerationMethods>
