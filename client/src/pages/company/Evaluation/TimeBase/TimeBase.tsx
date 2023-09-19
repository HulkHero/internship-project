import React from 'react'
import { useEvaluationUsers } from '../../../../ReactKueries/PaginatedEUsers'
import  CustomButton  from '../../../../components/CustomButton'

import DataGrid from '../../../../components/DataGrid'
import { CellContext, createColumnHelper } from '@tanstack/react-table'
import Search from '../../Member/Search'
import Day15Evaluation from './15DayEvaluation'
import Day30Evaluation from './Day30Evaluation'
import { Link, createSearchParams } from 'react-router-dom'

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
const columnHelper = createColumnHelper<User>()
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
          // row.row.original.has15DayEvaluation||!time 
      
          return(<Link to={{pathname:`/company/evaluation/timeBase/evaluate`,
          search:`?${createSearchParams({
              userId:row.row.original._id,
              techRole:row.row.original.techRole,
              type:'15Day'
          })}` }} className={`btn btn-primary ${disable===false ?"pointer-events-none opacity-60 ":""} btn-xs px-4`}>Evaluate</Link>)
          

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
          // row.row.original.has15DayEvaluation||!time 
      
          return(<Link to={{pathname:`/company/evaluation/timeBase/evaluate`,
          search:`?${createSearchParams({
              employeeId:row.row.original._id,
              techRole:row.row.original.techRole,
              type:'30Day'
          })}` }} className={`btn btn-primary ${disable===true ?"pointer-events-none opacity-60 ":""} btn-xs px-4`}>Evaluate</Link>)
        }
    }

  ]
const TimeBase = () => {
    const [page, setPage] = React.useState(0)
    const [searche,setSearche]=React.useState('')

     console.log(page)
    const {
      isLoading,
      isError,
      error,
      data,
      isPreviousData,
      refetch
    } = useEvaluationUsers({page,limit:6,searche:searche,filter:''})

   const handleSearch=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    let searchInputValue= formData.get("searchinput") as string;
    console.log(searchInputValue)
    setSearche(searchInputValue)
    setPage(0)
    refetch()
   }
   React.useEffect(() => {
    refetch();
}, [page]);
 


  return (
    <div className='pb-5'>
       <Search isLoading={isLoading} handleSearch={handleSearch}/>
       <div className='flex flex-row justify-around my-2'>
          <div>
            <div>
              15 Day Evaluation:
            </div>
           <Day15Evaluation/>
          </div>
          <div>
            <div>
              30 Day Evaluation:
            </div>
            <Day30Evaluation/>
          </div>
        
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
        className='btn btn-primary btn-sm'
        onClick={() => setPage(old => Math.max(old - 1, 0))}
        disabled={page === 0 }
      />
      {' '}
      <span className="mx-2">Page{page + 1}</span>{' '}
      <CustomButton
            text={">"}
            className='btn btn-primary btn-sm '
        onClick={() => {
          if (!isPreviousData && data.hasMore) {
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

export default TimeBase