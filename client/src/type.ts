
export  interface CreateTicket{

  title: string,
  description:string;
}
export interface Ticket extends CreateTicket{
  _id: string;
}