import React from 'react'
import { Link } from 'react-router-dom'
import { usePaginatedUsers } from '../../../ReactKueries/PaginatedUsers'
import  CustomButton  from '../../../components/CustomButton'
import DataGrid from '../../../components/DataGrid'
import { dataColumns } from './dataColumns'
import { User } from './types'
import SearchFilter from '../../../components/SearchFilter'
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
    setSearche(searchInputValue)
    setPage(0)
  
   }
   React.useEffect(() => {
    refetch();
}, [searche]);
 


  return (
    <div className='bg-white'>
       <SearchFilter title='Members' select={false}  handleSearch={handleSearch}/>
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
  <div>Error: {error instanceof Error ? error.message : 'Something went wrong'}</div>
) : (
    <DataGrid<User> data={data.data} columns={dataColumns}></DataGrid>
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