import { Router } from "express";
import { savePet, getPets, searchPet, deletePet, updatePet } from "./pet.controller.js";
import { createPetValidator, getPetByIdValidator, updatePetValidator, deletePetValidator } from "../middlewares/pet-validator.js";

const router = Router();

router.post("/addPet", createPetValidator, savePet);

router.get("/findPet/:id", getPetByIdValidator, searchPet);

router.get("/", getPets);

router.put("/updatePet/:id", updatePetValidator, updatePet);

router.delete("/deletePet/:id", deletePetValidator, deletePet);

export default router;