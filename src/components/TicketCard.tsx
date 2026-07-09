import type Tickets from "../type"
type TicketCardProps = {
    ticket : Tickets
    onDelete: (index: number) => void
    onEdit: (index: number) => void
    index: number
}

export default function TicketCard({ticket, onDelete, index, onEdit}: TicketCardProps){
    return(
    <article  className="bg-white rounded-xl shadow-md p-4 mt-4">
          <h1>{ticket.title}</h1>
          <p>{ticket.description}</p>
          <div className="flex gap-2 mt-4">
          <button onClick={() => onEdit(index)} className="bg-blue-500 text-white px-3 py-2 rounded">Edit</button>
          <button onClick={()=> onDelete(index)} className="bg-red-500 text-white px-3 py-2 rounded">Delete</button>
          </div>
        </article>)
}