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
        .location(`/users/${id}`)
        .send({ msg: "User created successfully!" });
    } else {
      res.status(400).send({ error: "User not created!" });
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
      res.status(404).send();
    }
  });
});

// UPDATE USER BY ID
usersRouter.put("/users/:id", (req, res) => {
  const id: number = +req.params.id;
  usersRepository.update(id, req.body, (notFound) => {
    if (notFound) {
      res.status(404).send();
    } else {
      res.status(204).send();
    }
  });
});

// DELETE USER BY ID
usersRouter.delete("/users/:id", (req, res) => {
  const id: number = +req.params.id;
  usersRepository.delete(id, (notFound) => {
    if (notFound) {
      res.status(404).send();
    } else {
      res.status(204).send();
    }
  });
});

export default usersRouter;
