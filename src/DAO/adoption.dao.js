import adoptionsModel from "../models/adoption.model.js"

class AdoptionRepository {
   async getAll() {
      return await adoptionsModel.find()
   }

   // to show the user who adopted the pet and which pet was adopted
   async getByIdByPopulated(id) {
      return await adoptionsModel.findById(id).populate("pet").populate("user")
   }

   async getById(id) {
      return await adoptionsModel.findById(id)
   }

   async create(adoptionData) {
      return await adoptionsModel.create(adoptionData)
   }

   async update(id, updateData) {
      return await adoptionsModel.findByIdAndUpdate(id, updateData)
   }

   async delete(id) {
      return await adoptionsModel.findByIdAndDelete(id)
   }
}

export default new AdoptionRepository()
