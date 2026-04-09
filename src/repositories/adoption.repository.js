import AdoptionsDAO from "../DAO/adoption.dao.js"

class AdoptionRepository {
   async getAll() {
      return await AdoptionsDAO.getAll()
   }

   // only to show the user
   async getByIdByPopulated(id) {
      return await AdoptionsDAO.getByIdByPopulated(id)
   }

   async getById(id) {
      return await AdoptionsDAO.getById(id)
   }

   async create(adoptionData) {
      return await AdoptionsDAO.create(adoptionData)
   }

   async update(id, updateData) {
      return await AdoptionsDAO.update(id, updateData)
   }

   async delete(id) {
      return await AdoptionsDAO.delete(id)
   }
}

export default new AdoptionRepository()
