import React from 'react'


type Props = {

    handleSearch:(e:React.FormEvent<HTMLFormElement>)=>void
    isLoading:boolean
}

const Search = (props: Props) => {
  return (
    <div className='bg-neutral-100 p-4 shadow-md'>
        <div className='text-left pb-2 text-2xl text-textDark  font-semibold '>Members</div>
        <form onSubmit={props.handleSearch} className='flex gap-8 items-center'>
            <input
                type='text'
                name="searchinput"
                className='outline-none my-2  pl-2 py-1 rounded-lg ring-1 focus:ring-2 focus:ring-darkRed ring-darkRed w-full max-w-xs'
                placeholder='Search...' />
            {/* <select name="select" className="outline-none my-2 px-2 py-1 rounded-lg ring-1 focus:ring-2 focus:ring-darkRed ring-darkRed w-full max-w-xs ">
                <option value="All">All</option>
                <option value="Completed">Completed</option>
                <option value="Inprogress">Inprogress</option>
           </select>  */}
           <button type="submit" disabled={props.isLoading} className="btn btn-primary btn-sm disabled:btn-disabled">Submit</button> 
            
           {/* <Button text="Search" className="btn btn-secondary btn-sm" /> */}
           </form>  
    </div>
  )
}

export default Search