import User from "../models/User";

import { Request, Response } from "express";
//Funcion encargada de traer todos los usuarios guardados en la coleccion "users" de la db

class UserController {
  async getUser(_req: Request, res: Response) {
    try {
      const users = await User.find();
      if (!users || users.length === 0) {
        throw new Error("No user registered");
      }
      return res.status(200).json({ data: users, error: false });
    } catch (error: any) {
      return res.status(404).json({ message: error.message, error: true });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userFounded = await User.findById(id);
      if (!userFounded) throw new Error("User with ID ${id} not found");
      return res.status(200).json({ data: userFounded, error: false });
    } catch (error: any) {
      return res.status(404).json({ message: error.message, error: true });
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const { userName, email, password, roles } = req.body;

      // const rolesIds = [];
      // for (let role of roles) {
      //   const roleFound = await Role.findOne({ name: role });
      //   if (roleFound) {
      //     rolesIds.push(roleFound);
      //   }
      // }

      const userCreated = await User.create({
        userName,
        email,
        password,
        //   roles: rolesIds,
      });

      if (!userCreated) throw new Error("User not created, ejecution failed");
      return res.status(201).json({ data: userCreated, error: false });
    } catch (error: any) {
      return res.status(404).json({ message: error.message, error: true });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { userName, email, password } = req.body;
      const userUpdated = await User.findByIdAndUpdate(
        id,
        {
          userName,
          email,
          password,
        },
        {
          new: true,
        }
      );
      if (!userUpdated) {
        throw new Error("User with ID ${id} not founded");
      }
      return res.status(201).json({ data: userUpdated, error: false });
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userDeleted = await User.findByIdAndDelete(id);
      if (!userDeleted) {
        throw new Error("User with ${id} not found");
      }
      return res.status(200).json({ message: "User deleted successfully!" });
    } catch (error: any) {
      res.status(404).json({ message: error.message, error: true });
    }
  }
}

export const userController = new UserController();
