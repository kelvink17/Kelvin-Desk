import {Router} from "express"
import { getTicket, createTicket, deleteTicket, updateTicket } from "../controllers/ticketController";

const router = Router();


router.get("/", getTicket ) 
router.post("/", createTicket )
router.delete("/:id", deleteTicket)
router.put("/:id", updateTicket)
export default router