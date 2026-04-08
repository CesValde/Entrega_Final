import mongoose, { Schema } from "mongoose"

const adoptionSchema = new Schema(
   {
      user: {
         type: Schema.Types.ObjectId,
         ref: "users",
         required: true
      },
      pet: {
         type: Schema.Types.ObjectId,
         ref: "pets",
         required: true
      },
      status: {
         type: String,
         enum: ["pending", "approved", "rejected"],
         default: "pending"
      }
   },
   {
      timestamps: true // crea createdAt y updatedAt automáticamente
   }
)

// "adoptions" = nombre del model (y colección en MongoDB)
export const adoptionModel = mongoose.model("adoptions", adoptionSchema)
