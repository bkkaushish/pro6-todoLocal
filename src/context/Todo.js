import { createContext, useContext } from "react";

export const TodoContext= createContext({
todos:[
   {
    id: 1,
    todo: "todo mssg",
    complete: false,
   },
],
addTodo:(todo)=>{},
updateTodo: (id,todo)=>{},
deleteTodo:(id)=>{},
toggleComplete:(id)=>{},//todo is completed,

})

export default function useTodo(){
    return useContext(TodoContext)
}

export const TodoProvider= TodoContext.Provider