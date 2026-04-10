import { expect } from "chai"
import request from "supertest"
import app from "../app.js"

const requester = request(app)

describe("Testing Users Router", function () {
   this.timeout(7000)
   let cookie
   let userId

   const userMock = {
      first_name: "Test",
      last_name: "User",
      email: `user${Date.now()}@gmail.com`,
      password: "123456"
   }

   // global login before tests
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

   // without cookie test
   it("debe fallar sin autenticación", async () => {
      const res = await requester.get("/api/users")

      expect(res.status).to.equal(401)
   })

   // get all users
   it("GET /api/users - debe traer usuarios", async () => {
      const res = await requester.get("/api/users").set("Cookie", cookie)

      expect(res.status).to.equal(200)
      expect(res.body.payload).to.be.an("array")
   })

   // create user test
   it("POST /api/users - crea usuario", async () => {
      const newUser = {
         first_name: "Otro",
         last_name: "User",
         email: "abcdefg@gmail.com",
         password: "123456"
      }

      const res = await requester
         .post("/api/users")
         .set("Cookie", cookie)
         .send(newUser)

      expect(res.status).to.equal(201)
      expect(res.body.payload).to.have.property("id")

      userId = res.body.payload.id
   })

   // create user with duplicate email test
   it("POST /api/users - email duplicado debe fallar", async () => {
      const duplicateUser = {
         first_name: "Otro",
         last_name: "User",
         email: "abcdefg@gmail.com",
         password: "123456"
      }

      const res = await requester
         .post("/api/users")
         .set("Cookie", cookie)
         .send(duplicateUser)

      expect(res.status).to.equal(400)
      expect(res.body).to.have.property("error") // o message según tu API
   })

   // validation test
   it("POST /api/users - falla si faltan datos", async () => {
      const res = await requester
         .post("/api/users")
         .set("Cookie", cookie)
         .send({})

      expect(res.status).to.equal(400)
   })

   // get by id test
   it("GET /api/users/:id", async () => {
      const res = await requester
         .get(`/api/users/${userId}`)
         .set("Cookie", cookie)

      expect(res.status).to.equal(200)
      expect(res.body.payload.id).to.equal(userId)
   })

   // invalid id test
   it("GET /api/users/:id - ID inválido", async () => {
      const res = await requester.get(`/api/users/123`).set("Cookie", cookie)

      expect(res.status).to.equal(400)
   })

   // update user test
   it("PUT /api/users/:id", async () => {
      const res = await requester
         .put(`/api/users/${userId}`)
         .set("Cookie", cookie)
         .send({ first_name: "Updated" })

      expect(res.status).to.equal(200)
      expect(res.body.payload.first_name).to.equal("Updated")
   })

   // delete user test
   it("DELETE /api/users/:id", async () => {
      const res = await requester
         .delete(`/api/users/${userId}`)
         .set("Cookie", cookie)

      expect(res.status).to.equal(200)
   })
})
