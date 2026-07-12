import {  useState, type ChangeEvent } from "react"
import { type FormEvent } from "react"
import TicketCard from "./components/TicketCard"
import  type { Ticket, CreateTicket } from "./type";
// import type Ticket from "./type"
import Form from "./components/Form"
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";



const fetchTicket = async (): Promise<Ticket[]> =>{
  const response = await fetch("http://localhost:5000/api/tickets")

  if (!response.ok) {
    throw new Error("failed to fetch")
  }

 return response.json()
}
const createTicket = async(tickets: CreateTicket): Promise<Ticket> => {
  const response = await fetch("http://localhost:5000/api/tickets", {
    method:"POST",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify(tickets)
  });
  if (!response.ok) {
    throw new Error("failed to create ")
  }
  
 return response.json()
}
const deleteTicket = async (id: string) => {
  const response = await fetch(`http://localhost:5000/api/tickets/${id}`,{method: "DELETE",})
   if (!response.ok) {
    throw new Error("failed to delete ")
  }
}

const updateTicket = async ({
  id,
  ticket,
}: {
  id: string;
  ticket: CreateTicket;
}): Promise<Ticket> => {
  const response = await fetch(
    `http://localhost:5000/api/tickets/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticket),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update ticket");
  }

  return response.json();
};

export default function App(){
 const queryClient = useQueryClient()

const createMutation = useMutation ({
  mutationFn: createTicket,
  onSuccess: () =>{
    queryClient.invalidateQueries({
      queryKey:["tickets"]
    })
  }
})
const deleteMutation = useMutation ({
  mutationFn:deleteTicket,
  onSuccess: () =>{
    queryClient.invalidateQueries({
      queryKey:["tickets"]
    })
  }
})
const updateMutation = useMutation({
  mutationFn: updateTicket,

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["tickets"],
    });
  },
});
 
  const [form, setForm] = useState<CreateTicket>({
    title:"",
    description:""
  })
    const [editingId, setEditingId] = useState<string | null>(null)
  const {
    data:tickets = [],
    isLoading,
    error,
    //staleTime: 1000 *60 *1,
  } = useQuery({
    queryKey: ["tickets", ],
    queryFn: fetchTicket
  })
  if (isLoading) {
    return<h1>loading... </h1>
  }
  if (error) {
    return <h2>something went wrong </h2>
  }



  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
    const {value, name} = event.target
    setForm({...form, [name]: value})
  }
  ///has for update if else to check if the button clicked is for update or add new item
  const handleSubmit = (event:FormEvent<HTMLFormElement> ) => {
     event.preventDefault()
     if (editingId === null){
        createMutation.mutate(form)
    //    const newTicket = {
    //   title: form.title,
    //   description: form.description,
    // };
    // setTicket((oldTicket) => [...oldTicket, newTicket]);
   
     }else{
       updateMutation.mutate({
        id: editingId,
          ticket: form,
    });

    setEditingId(null);
      // const updatedTicket = [...tickets]
      // updatedTicket [editingIndex]= {
      //   title:form.title,
      //   description: form.description
      // }
      // setTicket(updatedTicket)
      // setEditingIndex(null)

     }
    setForm({
      title:"",
      description:""
    })
  }
const handleDelete = (id: string) => {

    deleteMutation.mutate(id)

  //  setTicket((oldTicket)=>{
  //    return oldTicket.filter((_, index)=> index !== id)
    

  // })
}
const handleEdit = (ticket: Ticket) =>{
  // setEditingId(index)
  // setForm(tickets[index])
  
   setEditingId(ticket._id)
   setForm(
  {  title: ticket.title,
  description: ticket.description,
}
)

}

  return(
    <div className=" flex flex-col justify-center items-center gap-4 min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-2xl">
      <Form handleChange={handleChange} handleSubmit={handleSubmit} form={form} editingId={editingId} />
      {tickets.map ((item)=>(
        <TicketCard key={item._id} ticket={item} onDelete={handleDelete}  onEdit={handleEdit }/>
      ))}
      </div>
    </div>
  )
}