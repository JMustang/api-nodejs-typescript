import express from "express";
import Users from "../models/users";
import usersRepository from "../repositories/users-repository";

const usersRouter = express.Router();

// CREATE USER
usersRouter.post("/users", (req, res) => {
  const user: Users = req.body;
  usersRepository.create(user, (id) => {
    if (id) {
      res
        .status(201)
        .send({ message: "User created successfully!" });
    } else {
      res.status(400).send({ message: "User not created!", error: true });
    }
  });
});

// GET USER
usersRouter.get("/users", (req, res) => {
  usersRepository.readAll((users) => res.json(users));
});

// GET USER BY ID
usersRouter.get("/users/:id", (req, res) => {
  const id: number = +req.params.id;
  usersRepository.readById(id, (user) => {
    if (user) {
      res.json(user);
    } else {
      res.status(404).send({ message: 'User not found', error: true });
    }
  });
});

// UPDATE USER BY ID
usersRouter.put("/users/:id", (req, res) => {
  const id: number = +req.params.id;
  usersRepository.update(id, req.body, (notFound) => {
    if (notFound) {
      res.status(404).send({ message: 'User not found', error: true });
    } else {
      res.status(200).send({
        message: 'User updated successfully',
        error: false
      });
    }
  });
});

// DELETE USER BY ID
usersRouter.delete("/users/:id", (req, res) => {
  const id: number = +req.params.id;
  usersRepository.delete(id, (notFound) => {
    if (notFound) {
      res.status(404).send({ message: 'User not found', error: true });
    } else {
      res.status(200).send({
        message: 'User deleted successfully',
        error: false
      });
    }
  });
});

export default usersRouter;
