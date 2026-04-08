import petRepository from "../repositories/pet.repository.js"
import AppError from "../error/error.js"
import mongoose from "mongoose"

class PetService {
   async getAll() {
      try {
         return await petRepository.getAll()
      } catch (error) {
         throw new AppError("Database error", 500)
      }
   }

   async getById(id) {
      try {
         if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new AppError("Invalid pet ID format", 400)
         }

         const pet = await petRepository.getById(id)

         if (!pet) {
            throw new AppError("Pet not found", 404)
         }

         return pet
      } catch (error) {
         if (error instanceof AppError) throw error
         throw new AppError("Database error", 500)
      }
   }

   async create(pet) {
      try {
         const { name, type, age } = pet

         if (!name || !type || age == null) {
            throw new AppError("Missing values", 400)
         }

         const petToCreate = {
            name,
            type,
            age: Number(age)
         }

         const petCreate = await petRepository.create(petToCreate)
         return petCreate
      } catch (error) {
         if (error instanceof AppError) throw error
         throw new AppError("Database error", 500)
      }
   }

   async update(id, data) {
      try {
         if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new AppError("Invalid pet ID format", 400)
         }

         if (!data || Object.keys(data).length === 0) {
            throw new AppError("No data to update", 400)
         }

         // { new: true } para retornar el documento actualizado
         // { runValidators: true } para ejecutar las validaciones del esquema
         const updatedPet = await petRepository.update(id, data, {
            new: true,
            runValidators: true
         })

         if (!updatedPet) {
            throw new AppError("Pet not found", 404)
         }

         return updatedPet
      } catch (error) {
         console.log(error)
         if (error instanceof AppError) throw error
         throw new AppError("Database error", 500)
      }
   }

   async delete(id) {
      try {
         if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new AppError("Invalid pet ID format", 400)
         }

         const pet = await petRepository.delete(id)

         if (!pet) {
            throw new AppError("Pet not found", 404)
         }

         return pet
      } catch (error) {
         if (error instanceof AppError) throw error
         throw new AppError("Database error", 500)
      }
   }
}

export default new PetService()
