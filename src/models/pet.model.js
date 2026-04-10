import mongoose from "mongoose"

const petSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true
      },
      type: {
         type: String,
         required: true
      },
      age: {
         type: Number,
         required: true
      },
      status: {
         type: String,
         enum: ["available", "adopted"],
         default: "available"
      }
   },
   {
      timestamps: true
   }
)

const PetModel = mongoose.model("pets", petSchema)

export default PetModel
