import petDAO from "../daos/pet.dao.js"

class PetRepository {
   async getAll() {
      return await petDAO.getAll()
   }

   async getById(id) {
      return await petDAO.getById(id)
   }

   async create(data) {
      return await petDAO.create(data)
   }

   async update(id, data, options) {
      return await petDAO.update(id, data, options)
   }

   async delete(id) {
      return petDAO.delete(id)
   }
}

export default new PetRepository()
