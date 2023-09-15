import React from 'react'
import { Link, createSearchParams } from 'react-router-dom'
import { usePaginatedProjects } from '../../../../ReactKueries/PaginatedProjects'
import CustomButton from '../../../../components/CustomButton'
import DataGrid from '../../../../components/DataGrid'
import { DateTime } from 'luxon'
import {Cell} from 'react-table'

interface Project {
    _id: string,
    projectName: string,
    teamName: string,
    projectManager: {
      _id: string,
      firstName: string,
      lastName: string,
    },
    projectDescription: string,
    projectStartDate: string,
    projectEndDate: string,
    projectMembers:string[]
  }
interface BackendData{
    data:Project[],
    hasMore:boolean
    total:number
    page?:number
}
const dataColumns = [{
    header: 'ProjectName',
    accessorKey: 'projectName',
    cell: (row:Cell<Project>) => {
     return <Link to={`/company/evaluation/${row.row.original._id}`}>{row.row.original.projectName}</Link>
    },

},
    {
    header: 'TeamName',
    accessorKey: 'teamName',
    },
    {
    header: 'ProjectDescription',
    accessorKey: 'projectDescription',
    cell: (row:Cell<Project>) => {
        return <>{row.row.original.projectDescription.substring(0, 15)}...</>
    }
    },   
    {
    header: 'ProjectStatus',
    accessorKey: 'projectStatus',
    cell: (row:Cell<Project>) => {
        
        const endDate=DateTime.fromISO(row.row.original.projectEndDate)
        const now=DateTime.now()
        if(endDate<now){
            return <>Completed</>
        }else{
            return <>In Progress</>
        }

    }
    },   
    {
    header: 'ProjectStartDate',
    accessorKey: 'projectStartDate',
    cell: (row:Cell<Project>) => {
        return <>{DateTime.fromISO(row.row.original.projectStartDate).toFormat('dd/MM/yyyy')}</>
    }
    
},
    {
    header: 'ProjectEndDate',
    accessorKey: 'projectEndDate',
    cell: (row:Cell<Project>) => {
        return <>{DateTime.fromISO(row.row.original.projectEndDate).toFormat('dd/MM/yyyy')}</>
    }
    },
    {
    header: 'ProjectManager',
    accessorKey: 'projectManager',
    cell: (row:Cell<Project>) => {
        return <>{row.row.original.projectManager.firstName} {row.row.original.projectManager.lastName}</>

    }
    },
]
const Project = () => {
    const [page, setPage] = React.useState(0)
    const {data,isLoading,error,isError,isPreviousData}=usePaginatedProjects<BackendData>(page)
  return (
    <div>
        <div className='text-center text-3xl text-textDark p-4 font-bold '>Project</div>
         <div className='w-fit ml-auto mb-4'>
            <Link to="/company/evaluation/addProject" className='btn btn-secondary btn-sm'>Add Project</Link>
         </div>
        <div>             
        </div>
        <div className='flex flex-col '>
          <div className='flex flex-row min-h-[65vh]  justify-center'>
        {isLoading ? (
  <span className=' loading loading-dots w-28'></span>
) : isError ? (
  <div>Error: {error instanceof Error ? error.message : 'An error occurred'}</div>
) : (
    <DataGrid data={data.data} columns={dataColumns}></DataGrid>
)}
      </div>
      
      <div className='flex-grow-0 flex justify-center'>

      <CustomButton
        text={"<"}
        className='btn btn-secondary btn-sm disabled:bg-blue-300 '
        onClick={() => setPage(old => Math.max(old - 1, 0))}
        disabled={page === 0 }
      />
      {' '}
      <span className="mx-2">Page{page + 1}</span>{' '}
      <CustomButton
            text={">"}
            className='btn btn-secondary btn-sm disabled:bg-blue-300'
        onClick={() => {
          if (!isPreviousData && data?.hasMore) {
            setPage(old => old + 1)
          }
        }}
        
        disabled={isPreviousData || !data?.hasMore}
      />
    </div>
        </div>
    </div>
  )
}

export default Project