import { CellContext } from "@tanstack/react-table"
import { User } from "./types"
import React from "react"

import RadioInputs from "./RadioInputs";


const useColumns=({page}:{page:number})=>{



   const dataColumns = [
  {
    header: 'FirstName',
    accessorKey: 'firstName',
  },
  {
    header: 'LastName',
    accessorKey: 'lastName',
  },
  {
    header: 'SystemRole',
    accessorKey: 'systemRole', 
    cell: (row:CellContext<User,unknown>) => {
      return (<RadioInputs page={page} systemRole={row.row.original.systemRole} _id={row.row.original._id} cellId={row.cell.id} />) 
    }
  },
  {
      header: 'TechRole',
      accessorKey: 'techRole',
      
  },
  {
      header: 'Email',
      accessorKey: 'email',
  }
]



  return(
    dataColumns
  )
}

export default useColumns


