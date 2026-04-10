import AdoptionRepository from "../repositories/adoption.repository.js"
import AppError from "../error/error.js"
import mongoose from "mongoose"

import UserService from "../services/users.service.js"
import PetService from "../services/pets.service.js"

class AdoptionService {
   async getAll() {
      try {
         return await AdoptionRepository.getAll()
      } catch (error) {
         throw new AppError("Database error", 500)
      }
   }

   // with populated to show who adopted the pet and the pet was adopted
   async getByIdByPopulated(id) {
      try {
         if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new AppError("Invalid adoption ID format", 400)
         }

         const adoption = await AdoptionRepository.getByIdByPopulated(id)

         if (!adoption) {
            throw new AppError("Adoption not found", 404)
         }

         return adoption
      } catch (error) {
         if (error instanceof AppError) throw error
         throw new AppError("Database error", 500)
      }
   }

   // without populate
   async getById(id) {
      try {
         if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new AppError("Invalid adoption ID format", 400)
         }

         const adoption = await AdoptionRepository.getById(id)

         if (!adoption) {
            throw new AppError("Adoption not found", 404)
         }

         return adoption
      } catch (error) {
         if (error instanceof AppError) throw error
         throw new AppError("Database error", 500)
      }
   }

   async create(adoption) {
      try {
         const { user, pet, status } = adoption

         if (!user || !pet) {
            throw new AppError("Missing values", 400)
         }

         if (status && !["pending", "approved", "rejected"].includes(status)) {
            throw new AppError("Invalid status value", 400)
         }

         const userExists = await UserService.getById(user)
         if (!userExists) {
            throw new AppError("User not found", 404)
         }

         const petExists = await PetService.getById(pet)
         if (!petExists) {
            throw new AppError("Pet not found", 404)
         }

         if (petExists.status === "adopted") {
            throw new AppError("Pet is already adopted", 400)
         }

         const adoptionToCreate = {
            user,
            pet,
            status: status || "pending"
         }

         let adoptionResult = await AdoptionRepository.create(adoptionToCreate)

         // update the user to add the adopted pet to their list of pets
         UserService.update(user, { $push: { pets: pet } })
         adoptionResult = await this.completeAdoption(adoptionResult._id, pet)

         return adoptionResult
      } catch (error) {
         if (error instanceof AppError) throw error
         throw new AppError("Database error", 500)
      }
   }

   async update(id, data) {
      try {
         if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new AppError("Invalid adoption ID format", 400)
         }

         if (!data || Object.keys(data).length === 0) {
            throw new AppError("No data to update", 400)
         }

         const updatedAdoption = await AdoptionRepository.update(id, data, {
            new: true,
            runValidators: true
         })

         if (!updatedAdoption) {
            throw new AppError("Adoption not found", 404)
         }

         return updatedAdoption
      } catch (error) {
         if (error instanceof AppError) throw error
         throw new AppError("Database error", 500)
      }
   }

   async completeAdoption(aid, pid) {
      const adoption = await AdoptionRepository.getById(aid)

      if (!adoption) {
         throw new AppError("Adoption not found", 404)
      }

      adoption.status = "approved"

      // update the pet status to adopted
      await PetService.update(pid, { status: "adopted" })

      return await adoption.save()
   }

   async delete(id) {
      try {
         if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new AppError("Invalid adoption ID format", 400)
         }

         const adoption = await AdoptionRepository.delete(id)

         if (!adoption) {
            throw new AppError("Adoption not found", 404)
         }

         return adoption
      } catch (error) {
         if (error instanceof AppError) throw error
         throw new AppError("Database error", 500)
      }
   }
}

export default new AdoptionService()
