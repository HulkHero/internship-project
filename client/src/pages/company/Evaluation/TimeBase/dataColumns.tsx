import { CellContext} from '@tanstack/react-table'
import { Link, createSearchParams } from 'react-router-dom';

export interface User{
  firstName:string,
  lastName:string,
  systemRole:string,
  techRole:string,
  has15DayEvaluation:boolean,
  has30DayEvaluation:boolean,
  _id:string,
  email:string,
}

export const dataColumns = [

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
    },
    {
        header: 'TechRole',
        accessorKey: 'techRole',
    },
    {
        header: '15Day',
        accessorKey: 'has15DayEvaluation',
        cell:(row:CellContext<User,unknown>)=>{
          const date=new Date()
          const now=date.getDay()
          let time= (now===15) ? true :false
         
          let disable= row.row.original.has15DayEvaluation===true || !time
          return(<Link to={{pathname:`/company/evaluation/timeBase/evaluate`,
          search:`?${createSearchParams({
              userId:row.row.original._id,
              techRole:row.row.original.techRole,
              type:'15Day'
          })}` }} className={`btn btn-primary ${ disable===true ?"pointer-events-none opacity-60 ":""} btn-xs px-4`}>Evaluate</Link>)
          }
    },
    {
        header: '30Day',
        accessorKey: 'has30DayEvaluation',
        cell:(row:CellContext<User,unknown>)=>{
          const date=new Date()
          const now=date.getDay()
          let time= (now===30 ) ? true :false
          let disable= row.row.original.has15DayEvaluation===true || !time
          return(<Link to={{pathname:`/company/evaluation/timeBase/evaluate`,
          search:`?${createSearchParams({
              employeeId:row.row.original._id,
              techRole:row.row.original.techRole,
              type:'30Day'
          })}` }} className={`btn btn-primary ${disable===true ?"pointer-events-none opacity-60 ":""} btn-xs px-4`}>Evaluate</Link>)
        }
    }

  ]