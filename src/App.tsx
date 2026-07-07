import {  useState, type ChangeEvent } from "react"
import { type FormEvent } from "react"
import TicketCard from "./components/TicketCard"
import type Tickets from "./type"
import Form from "./components/Form"
export default function App(){
  const [form, setForm] = useState({
    title:"",
    description:""
  })
  const [tickets, setTicket] = useState<Tickets[]>([])

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
    const {value, name} = event.target
    setForm({...form, [name]: value})
  }
  const handleSubmit = (event:FormEvent<HTMLFormElement> ) => {
     event.preventDefault()
    const newTicket :Tickets = {
      title: form.title,
      description: form.description
    }
    setTicket([
      ...tickets,
      newTicket

    ])
    setForm({
      title:"",
      description:""
    })
  }
const handleDelete = (id: number) => {

  setTicket((oldTicket)=>{
    return oldTicket.filter((_, index)=> index !== id)
    

  })
}
  return(
    <div className="border grid justify-center item-center gap-4 min-h-screen ">
      <Form handleChange={handleChange} handleSubmit={handleSubmit} form={form} />
      {tickets.map ((item, index)=>(
        <TicketCard key={index} ticket={item} onDelete={handleDelete} index={index} />
      ))}
    </div>
  )
}