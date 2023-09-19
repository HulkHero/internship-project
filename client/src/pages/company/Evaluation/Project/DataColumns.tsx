import { CellContext, SortingFn,  } from '@tanstack/react-table'
import { DateTime } from 'luxon'
import { Project } from './Project'
import { Link } from 'react-router-dom'
const MySort:SortingFn<Project>=(rowA,rowB)=>{
    // Compare the project statuses for sorting
    const endDate=DateTime.fromISO(rowA.original.projectEndDate)
    const now=DateTime.now()
    if(endDate<now){
        return -1
    }
    if(endDate>now){
        return 1
    }
    return 0; 
  }

export  const dataColumns = [
    {
      header: 'Name',
      accessorKey: 'projectName',
      cell:(props:CellContext<Project,unknown>)=>(
        <Link to={`/company/evaluation/${props.row.original._id}`}>{props.row.original.projectName}</Link>
      ),
      enablePinning:true,
  },
      {
      header: 'Team',
      accessorKey: 'teamName',
      },
      {
      header: 'Description',
      accessorKey: 'projectDescription',
      cell: (props:CellContext<Project,unknown>) => {
          return <>{props.row.original.projectDescription.substring(0, 15)}...</>
      }
      },   
      {
      header: 'Status',
      accessorKey: 'projectStatus',
      sortingFn:MySort,
      cell: (row:CellContext<Project,unknown>) => {
          
          const endDate=DateTime.fromISO(row.row.original.projectEndDate)
          const now=DateTime.now()
          if(endDate<now){
              return <span>{"Completed"}</span>
          }else{
              return <span>{"Inprogress"}</span>
          }
  
      },
      },   
      {
      header: 'StartDate',
      accessorKey: 'projectStartDate',
      cell: (row:CellContext<Project,unknown>) => {
          return <>{DateTime.fromISO(row.row.original.projectStartDate).toFormat('dd/MM/yyyy')}</>
      }
     },
      {
      header: 'EndDate',
      accessorKey: 'projectEndDate',
      cell: (row:CellContext<Project,unknown>) => {
          return <>{DateTime.fromISO(row.row.original.projectEndDate).toFormat('dd/MM/yyyy')}</>
      }
      },
      {
      header: 'Manager',
      accessorKey: 'projectManager',
      cell: (row:CellContext<Project,unknown>) => {
          return <>{row.row.original.projectManager.firstName} {row.row.original.projectManager.lastName}</>
  
      }
      },
  ]