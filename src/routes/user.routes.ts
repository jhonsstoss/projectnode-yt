import { Router } from "express";
import { login } from "../middleware/login";
import { UserRepository } from "../modules/user/repositories/UserRepository";



const userRoutes = Router();
const userRepository = new UserRepository();

userRoutes.post('/signup', (request, response) => {
  console.log("Requisição recebida em /signup:", request.body);
  userRepository.create(request, response)
})

userRoutes.post('/sign-in', (request, response) => {
  userRepository.login(request, response)
})

userRoutes.get('/get-user', (request, response) => {
  userRepository.getUser(request, response)
})

export { userRoutes };