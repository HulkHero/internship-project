import React from 'react'
import { Link } from 'react-router-dom'
import { usePaginatedUsers } from '../../../ReactKueries/PaginatedUsers'
import  CustomButton  from '../../../components/CustomButton'

import DataGrid from '../../../components/DataGrid'
import { createColumnHelper } from '@tanstack/react-table'
import Search from './Search'
export interface User{
    firstName:string,
    lastName:string,
    systemRole:string,
    techRole:string,
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
        header: 'Email',
        accessorKey: 'email',
    }
  ]
const Member = () => {
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
    } = usePaginatedUsers({page,limit:6,searche:searche,filter:''})

   const handleSearch=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    let searchInputValue= formData.get("searchinput") as string;
    console.log(searchInputValue)
    setSearche(searchInputValue)
    setPage(0)
  
   }
   React.useEffect(() => {
    refetch();
}, [page,searche]);
 


  return (
    <div className='bg-white'>
       <Search isLoading={isLoading} handleSearch={handleSearch}/>
        <div >
            <div className='ml-auto w-fit m-2  '>
                <Link to="/company/member/addMember" className='btn btn-secondary btn-sm btn-outline'>Add Member</Link>
            </div>
        </div>
        <div className='flex flex-col '>
          <div className='flex flex-row min-h-[60vh]  justify-center'>
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
            className='btn btn-primary btn-sm'
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

export default Member