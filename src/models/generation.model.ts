//generation.model.ts

import { Schema, model } from 'mongoose'
import {
  Generation,
  GenerationMethods,
  GenerationModel
} from '../types/generation.type '
export const GENERATION_POKEMON_REFERENCE = 'Generation'

const Generations = new Schema<Generation, GenerationModel, GenerationMethods>({
  generation: {
    type: Number,
    required: true,
    unique: true,
    index: true
  }
})

Generations.methods.toClient = function () {
  return {
    id: this._id as unknown as string,
    generation: this.generation
  }
}

export default model(GENERATION_POKEMON_REFERENCE, Generations)
