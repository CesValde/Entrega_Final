import { Router } from "express"
import { passportCall } from "../middleware/auth.middleware.js"
import * as petController from "../controllers/pets.controller.js"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Pets
 *   description: Gestión de mascotas
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: currentUser
 */

/**
 * @swagger
 * /api/pets:
 *   get:
 *     summary: Obtener todas las mascotas
 *     tags: [Pets]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de mascotas
 *       401:
 *         description: No autorizado
 */
router.get("/", passportCall("current"), petController.getAllPets)

/**
 * @swagger
 * /api/pets/{pid}:
 *   get:
 *     summary: Obtener mascota por ID
 *     tags: [Pets]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       -name: pid
 *         in: path
 *         required: true
 *         description: ID de la mascota
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mascota encontrada
 *       404:
 *         description: Mascota no encontrada
 */
router.get("/:pid", passportCall("current"), petController.getPetById)

/**
 * @swagger
 * /api/pets:
 *   post:
 *     summary: Crear una mascota
 *     tags: [Pets]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               age:
 *                 type: number
 *     responses:
 *       201:
 *         description: Mascota creada
 *       400:
 *         description: Error en datos
 */
router.post("/", passportCall("current"), petController.savePet)

/**
 * @swagger
 * /api/pets/{pid}:
 *   put:
 *     summary: Actualizar una mascota
 *     tags: [Pets]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       -name: pid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Mascota actualizada
 */
router.put("/:pid", passportCall("current"), petController.updatePet)

/**
 * @swagger
 * /api/pets/{pid}:
 *   delete:
 *     summary: Eliminar una mascota
 *     tags: [Pets]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       -name: pid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mascota eliminada
 */
router.delete("/:pid", passportCall("current"), petController.deletePet)

export default router
