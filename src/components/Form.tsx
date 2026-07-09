import {  type ChangeEvent } from "react"
import { type FormEvent } from "react"
import "../index.css"

  type FormProps = {
    form: {
      title: string
      description: string
    }
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    handleSubmit: (event: FormEvent<HTMLFormElement> ) => void
    editingIndex: number | null
    
  }

export default function Form({form, handleChange, handleSubmit, editingIndex}: FormProps  ){
    return  (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">KelvinDesk </h1>
      <form action="submit" onSubmit={handleSubmit} className=" bg-white p-6 rounded-xl shadow-md flex flex-col gap-4">
      <input name="title" placeholder="name"  value={form.title} onChange={handleChange} className="border rounded-lg p-3 w-full"/>
      <textarea name="description" value={form.description} onChange={handleChange} className="border rounded-lg p-3 w-full"/>
      <button className="bg-black w-full text-white p-3 rounded-lg" disabled={form.title.trim() === "" || form.description.trim() === ""}>{ editingIndex === null ? "Create Ticket": "Update Ticket"}  </button> 
      </form>
      </div>
      )
}