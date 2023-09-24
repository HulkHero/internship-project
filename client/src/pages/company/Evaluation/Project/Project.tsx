import React from 'react'
import { Link,} from 'react-router-dom'
import { usePaginatedProjects } from '../../../../ReactKueries/PaginatedProjects'
import CustomButton from '../../../../components/CustomButton'
import DataGrid from '../../../../components/DataGrid'
import { dataColumns } from './DataColumns'
import { AxiosError } from 'axios'
import { BackendData } from './types'
import SearchFilter from '../../../../components/SearchFilter'

const Project = () => {
    const [page, setPage] = React.useState(0)
    const [searchInputValue,setSearch]=React.useState('')
    const [selectValue,setFilter]=React.useState('All')
    const handleSearch=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        let searchInputValue= formData.get("searchinput") as string;
        let selectValue = formData.get("select") as string;
        setSearch(searchInputValue)
        setFilter(selectValue)
        setPage(0)
    }
    
    const {data,isLoading,error,isError,isPreviousData,refetch}=usePaginatedProjects<BackendData>({page,searchInputValue,selectValue})
    React.useEffect(() => {
      refetch();
  }, [searchInputValue, selectValue]);
  return (
    <div className='bg-white'>
        <div>
           <SearchFilter title={"Projects"} handleSearch={handleSearch} select={true} />
        </div>
        <div className='w-fit ml-auto my-2'>
            <Link to="/company/evaluation/addProject" className='btn btn-outline btn-primary btn-sm'>Add Project</Link>
        </div>
        <div className='flex flex-col '>
          <div className='flex flex-row min-h-[60vh]  justify-center'>
        {isLoading ? (
  <span className=' loading loading-dots w-28'></span>
) : isError ? (
  <div>Error: {error instanceof AxiosError ? error.message : 'An error occurred'}</div>
) : (
    <DataGrid data={data.data} columns={dataColumns}></DataGrid>
)}
      </div>
      
      <div className='flex-grow-0 flex justify-center'>

      <CustomButton
        text={"<"}
        className='btn btn-primary btn-sm  '
        onClick={() => setPage(old => Math.max(old - 1, 0))}
        disabled={page === 0 }
      />
      {' '}
      <span className="mx-2">Page{page + 1}</span>{' '}
      <CustomButton
            text={">"}
            className='btn btn-primary btn-sm '
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