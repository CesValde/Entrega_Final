import userServices from "../services/users.service.js"
import jwt from "jsonwebtoken"
import config from "../config/config.js"

// actua como un form de login, recibe email y password, si es correcto devuelve un token y lo guarda en una cookie
export const submitLogin = async (req, res) => {
   try {
      const { email, password } = req.body
      const user = await userServices.login(email, password)

      const token = jwt.sign(
         {
            id: user._id,
            first_name: user.first_name,
            email: user.email,
            role: user.role
         },
         config.jwtSecret,
         { expiresIn: "24h" }
      )

      res.cookie("currentUser", token, {
         httpOnly: true,
         signed: true,     // Para que no se pueda modificar desde el cliente
         maxAge: 24 * 60 * 60 * 1000
      })

      return res.status(200).json({
         message: "Login successful",
         payload: {
            id: user._id,
            email: user.email,
            role: user.role
         }
      })
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}

// Esto simula la vista del login, si el usuario ya tiene cookie lo redirige a su perfil, sino le muestra el formulario de login
export const login = async (req, res) => {
   try {
      return res.status(200).json({
         status: "success",
         message: "this is the login"
      })
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}

export const logout = async (req, res) => {
   try {
      res.clearCookie("currentUser")
      return res.status(200).json({
         status: "success",
         message: "logout succesfull"
      })
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}
