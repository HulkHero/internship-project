import React from 'react'
import { useEvaluationUsers } from '../../../../ReactKueries/PaginatedEUsers'
import  CustomButton  from '../../../../components/CustomButton'
import DataGrid from '../../../../components/DataGrid'
import { User, dataColumns} from './dataColumns'
import SearchFilter from '../../../../components/SearchFilter'
import { AxiosError } from 'axios'
import TimeCounter from './TimeCounter'


const TimeBase = () => {
    const [page, setPage] = React.useState(0)
    const [searche,setSearche]=React.useState('')

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
   }
   React.useEffect(() => {
    refetch();
}, [searche]);
 


  return (
    <div className='pb-5'>
       <SearchFilter title='Members' select={false} handleSearch={handleSearch}/>
       <div className='flex  flex-col sm:flex-row justify-around my-2'>
          <div>
            <div>
              15 Day Evaluation:
            </div>
           <TimeCounter time={15}/>
          </div>
          <div>
            <div>
              30 Day Evaluation:
            </div>
            <TimeCounter time={30}/>
          </div>
        
       </div>

        <div className='flex flex-col '>
          <div className='flex flex-row min-h-[65vh]  justify-center'>
        {isLoading ? (
  <span className=' loading loading-dots w-28'></span>
) : isError ? (
  <div>Error: {error instanceof AxiosError? error.response?.data.msg ? error.response.data.msg:error.message  :"something went wrong" }</div>
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