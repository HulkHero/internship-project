import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Link } from 'react-router-dom'
import { usePaginatedUsers } from '../../../ReactKueries/PaginatedUsers'
import  CustomButton  from '../../../components/CustomButton'

import DataGrid from './DataGrid'
export interface User{
    firstName:string,
    lastName:string,
    systemRole:string,
    techRole:string,
    _id:string,
    email:string,
}
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

     console.log(page)
    const {
      isLoading,
      isError,
      error,
      data,
      isFetching,
      isPreviousData,
    } = usePaginatedUsers(page)


 


  return (
    <div>
        <div className='text-textGray pt-2 font-semibold text-center text-3xl'>
            Members
        </div>
        <div >
            <div className='ml-auto w-fit m-2  '>
                <Link to="/company/member/addMember" className='btn btn-secondary btn-sm btn-outline'>Add Member</Link>
            </div>
        </div>
        <div className='flex flex-col '>
          <div className='flex-grow-[10]'>
        {isLoading ? (
  <div>Loading...</div>
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