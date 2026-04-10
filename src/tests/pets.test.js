import request from "supertest"
import { expect } from "chai"
import app from "../app.js"

const requester = request(app)

describe("Testing Pets Router", function () {
   this.timeout(7000)
   let cookie
   let petId

   const userMock = {
      first_name: "Test",
      last_name: "User",
      email: `pet${Date.now()}@gmail.com`,
      password: "123456"
   }

   before(async () => {
      // 1. Crear usuario
      const createRes = await requester.post("/api/users").send(userMock)

      if (createRes.status !== 200 && createRes.status !== 201) {
         throw new Error("Error creando usuario en test")
      }

      // 2. Login
      const loginRes = await requester.post("/api/authUser/login").send({
         email: userMock.email,
         password: userMock.password
      })

      if (loginRes.status !== 200) {
         console.log(loginRes.body)
         throw new Error("Login falló en test")
      }

      // 3. Validar cookie antes de usarla
      const cookies = loginRes.headers["set-cookie"]

      if (!cookies) {
         console.log(loginRes.headers)
         throw new Error("No se recibió cookie en login")
      }

      cookie = cookies[0]
   })

   // security test 
   it("debe fallar sin autenticación", async () => {
      const res = await requester.get("/api/pets")

      expect(res.status).to.equal(401)
   })

   // create a pet
   it("POST /api/pets - crea mascota", async () => {
      const pet = {
         name: "Firulais",
         type: "dog",
         age: "4"
      }

      const res = await requester
         .post("/api/pets")
         .set("Cookie", cookie)
         .send(pet)

      expect(res.status).to.equal(201)
      expect(res.body.payload).to.have.property("id")

      petId = res.body.payload.id
   })

   // validation test
   it("POST /api/pets - falla sin datos", async () => {
      const res = await requester
         .post("/api/pets")
         .set("Cookie", cookie)
         .send({})

      expect(res.status).to.equal(400)
   })

   // get all pets
   it("GET /api/pets - lista mascotas", async () => {
      const res = await requester.get("/api/pets").set("Cookie", cookie)

      expect(res.status).to.equal(200)
      expect(res.body.payload).to.be.an("array")
   })

   // get pet by id
   it("GET /api/pets/:id", async () => {
      const res = await requester
         .get(`/api/pets/${petId}`)
         .set("Cookie", cookie)

      expect(res.status).to.equal(200)
      expect(res.body.payload.id.toString()).to.equal(petId)
   })

   // invalid id test
   it("GET /api/pets/:id - ID inválido", async () => {
      const res = await requester.get("/api/pets/123").set("Cookie", cookie)

      expect(res.status).to.equal(400)
   })

   // update pet
   it("PUT /api/pets/:id", async () => {
      const res = await requester
         .put(`/api/pets/${petId}`)
         .set("Cookie", cookie)
         .send({ name: "FirulaisNuevo" })

      expect(res.status).to.equal(200)
      expect(res.body.payload.name).to.equal("FirulaisNuevo")
   })

   // empty update test
   it("PUT /api/pets/:id - sin datos", async () => {
      const res = await requester
         .put(`/api/pets/${petId}`)
         .set("Cookie", cookie)
         .send({})

      expect(res.status).to.equal(400)
   })

   // delete pet 
   it("DELETE /api/pets/:id", async () => {
      const res = await requester
         .delete(`/api/pets/${petId}`)
         .set("Cookie", cookie)

      expect(res.status).to.equal(200)
   })

   // inexistent delete test
   it("DELETE /api/pets/:id - inexistente", async () => {
      const res = await requester
         .delete(`/api/pets/${petId}`)
         .set("Cookie", cookie)

      expect(res.status).to.equal(404)
   })
})
