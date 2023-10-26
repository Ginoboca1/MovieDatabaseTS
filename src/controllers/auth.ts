import jwt from "jsonwebtoken"; // Importa la libreria jsonwebtoken
import User from '../models/User'; // Importa el modelo de usuario
import Role from "../models/Role"; // Importa el modelo de roles
import config from "../config"; // Importa la configuración de la aplicación
import { Request, Response } from "express";


class AuthController{
  async signup(req: Request, res: Response){
    try {
      // Extrae los datos del cuerpo de la solicitud
      const { userName, email, password, roles } = req.body;
      // Crea un nuevo usuario y encripta la contraseña
      const newUser = new User({
        userName,
        email,
        password: await User.encryptPassword(password),
        roles, // roles se asigna directamente si está presente, ya que se ha validado previamente
      });
  
      // Asigna roles al usuario
      if (roles && roles.length > 0) {
        const foundRoles = await Role.find({ name: { $in: roles } });
        newUser.roles = foundRoles.map((role: any) => role._id);
      } else {
        // Si no se proporcionan roles, asigna el rol "user" por defecto
        const defaultRole = await Role.findOne({ name: "user" });
        newUser.roles = [defaultRole._id];
      }
  
      // Guarda el usuario en la base de datos
      const savedUser = await newUser.save();
  
      if (!savedUser) {
        throw new Error("Error al crear el usuario");
      }
  
      // Genera un token JWT para el usuario
      const token = jwt.sign({ id: savedUser._id }, config.secret, {
        expiresIn: 86400, // 24 horas de validez
      });
  
      res.status(201).json({ data: savedUser, token, error: false });
    } catch (error:any) {
      // Manejo de errores y respuesta
      res.status(422).json({ message: error.message, error: true });
    }
  }

  async login(req: Request, res: Response){
    try {
      //extrae los valores de email y password del cuerpo de la peticion
      const { email, password } = req.body;
      //Busca que en la base datos un usuario con el mail provisto
      const userFound = await User.findOne({ email: email }).populate("roles");
      //Si no encuentra un usuario, retornara un error con un mensaje "Usuario no encontrado"
      if (!userFound) return res.status(400).json({ message: "User not found" });
  
      /*Si existe el usuario en la db, hara una comparacion de la contraseña extraida de la request y 
      del usuario encontrado en la db */
      const matchPassword = await User.comparePassword(
        password,
        userFound.password
      );
      //Si las contrañas no coinciden, lanzara un error y se ejecutara el bloque catch
      if (!matchPassword) throw new Error("Password Incorrect");
  
      //Se le asigna un token al usuario logeado
      const token = jwt.sign({ id: userFound._id }, config.secret, {
        expiresIn: 86400, // 24 horas de validez
      });
  
      return res
        .status(200)
        .json({ message: "Logged in!", token: token, error: false });
    } catch (error:any) {
      return res.status(400).json({ message: error.message, error: true });
    }
  }
}

export const authController = new AuthController()