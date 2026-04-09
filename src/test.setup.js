import mongoose from "mongoose"
import app from "../src/app.js" // tu express app
import request from "supertest"

export const requester = request(app)

before(async () => {
   await mongoose.connect(process.env.ATLAS_URL_TEST)
})

after(async () => {
   await mongoose.connection.close()
})
