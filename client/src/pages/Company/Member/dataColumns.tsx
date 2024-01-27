import { CellContext } from "@tanstack/react-table"
import { User } from "./types"
import React from "react"

import RadioInputs from "./RadioInputs";
import CustomButton from "../../../components/CustomButton";
import { useAppSelector } from "../../../state/redux/hooks";
import { authSelector } from "../../../state/redux/slices/authSlice";


const useColumns=({page}:{page:number})=>{

  const [open,setOpen]=React.useState<boolean>(false)
  const  systemRole=useAppSelector(authSelector).systemRole

  const [user,setUser]=React.useState<User>()

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
  },{
    header:"Edit",
    accessorKey:"edit",
    cell: (row:CellContext<User,unknown>) => {
      return (<CustomButton type={"button"} text="Edit" disabled={systemRole!=="admin"} onClick={()=>{setUser(row.row.original); setOpen(true)}} className="btn btn-primary btn-xs"></CustomButton>)
    }
    
  }
]



  return({
    dataColumns,
    open,
    setOpen,
    user,
    setUser
    
  }
  )
}

export default useColumns


