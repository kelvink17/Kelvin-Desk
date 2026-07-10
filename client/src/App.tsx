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

  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
    const {value, name} = event.target
    setForm({...form, [name]: value})
  }
  ///has for update if elsemto check if the button clicked is for update or add new item
  const handleSubmit = (event:FormEvent<HTMLFormElement> ) => {
     event.preventDefault()
     if (editingIndex === null){

       const newTicket :Tickets = {
         title: form.title,
         description: form.description
       }
       setTicket([
         ...tickets,
         newTicket
   
       ])
     }else{
      const updatedTicket = [...tickets]
      updatedTicket [editingIndex]= {
        title:form.title,
        description: form.description
      }
      setTicket(updatedTicket)
      setEditingIndex(null)

     }
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
const handleEdit = (index: number) =>{
  setEditingIndex(index)
  setForm(tickets[index])
  
}

  return(
    <div className=" flex flex-col justify-center items-center gap-4 min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-2xl">
      <Form handleChange={handleChange} handleSubmit={handleSubmit} form={form} editingIndex={editingIndex} />
      {tickets.map ((item, index)=>(
        <TicketCard key={index} ticket={item} onDelete={handleDelete} index={index} onEdit={handleEdit}/>
      ))}
      </div>
    </div>
  )
}