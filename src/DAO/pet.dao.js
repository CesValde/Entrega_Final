import { petModel } from "../models/pet.model.js"

class PetsDAO {
   async getAll() {
      return await petModel.find()
   }

   async getById(id) {
      return await petModel.findById(id)
   }

   async create(data) {
      return await petModel.create(data)
   }

   async update(id, data, options) {
      return await petModel.findByIdAndUpdate(id, data, options)
   }

   async delete(id) {
      return await petModel.findByIdAndDelete(id)
   }
}

export default new PetsDAO()
