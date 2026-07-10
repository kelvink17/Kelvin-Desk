import {Request, Response} from "express"
import Ticket from "../models/Ticket"
import { Server } from "node:http"

export const getTicket = async (req: Request , res: Response) => {
    try{
        const tickets = await Ticket.find()
        res.json(tickets)
    }catch(error){
        res.status(500).json({
            message: "Server Error"
        });
    }
}


export const createTicket = async (req: Request, res: Response) =>{
    try {
        const {title, description} = req.body
        const tickets = await Ticket.create({
            title,
            description,
        })
        res.status(201).json(tickets)
    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        })
    }
}

export const deleteTicket = async (req: Request, res:Response) =>{
    try {
        const {id} = req.params
        await Ticket.findByIdAndDelete(id)
        res.json({
            message: "Ticket deleted succesfully ",

        })
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        })
    }
}

export const updateTicket = async (req: Request, res: Response) => {
    try {
        const {id} = req.body
       const { title, description } = req.body;
        const updateTicket = await Ticket.findByIdAndUpdate(
            id, {title, description}, {new: true,}
        );
        res.json(updateTicket)
    } catch (error) {
          res.status(500).json({
            message: "Server error"
        })
    }
}