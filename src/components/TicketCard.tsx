import type Tickets from "../type"
type TicketCardProps = {
    ticket : Tickets
    onDelete: (index: number) => void
    index: number
}

export default function TicketCard({ticket, onDelete, index}: TicketCardProps){
    return(
    <article key={index}>
          <h1>{ticket.title}</h1>
          <p>{ticket.description}</p>
          <button>Update</button>
          <button onClick={()=> onDelete(index)}>Delete</button>
        </article>)
}