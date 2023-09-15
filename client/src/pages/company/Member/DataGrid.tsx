import { Row, useReactTable } from '@tanstack/react-table'
import React, { useState } from 'react'
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    HeaderGroup

  } from '@tanstack/react-table'
import {User} from './Member'


interface ColumnDef {
    header: string
    accessorKey: string
    
}
type Props = {
    data:User[],
    columns:ColumnDef[]
}
// import React, { useState } from 'react';
// import {
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   SortingState,
//   HeaderGroup
  
// } from '@tanstack/react-table';
// import { User } from './Member';

// // Import Daisy UI and Tailwind CSS classes
// import 'daisyui/dist/full.css';

// Rest of your code...

const DataGrid = ({ data, columns }: Props) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState('');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div className='w-full'>
      <input
        type='text'
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
        className='outline-none my-2 px-2 py-1 rounded-lg ring-1 focus:ring-2 focus:ring-darkRed ring-darkRed w-full max-w-xs'
        placeholder='Filter...'
      />
      <table className='w-full border-collapse'>
        <thead className='bg-darkRed text-white'>
          {table.getHeaderGroups().map((headerGroup:HeaderGroup<User>) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className='px-2 py-1 cursor-pointer bg-darkRed '
                  >
                    {header.isPlaceholder ? null : (
                      <div className='bg-darkRed'>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row:Row<User>) => (
            <tr key={row.id} className=''>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className='border px-2 py-1'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataGrid;




// const DataGrid = ({data,columns}: Props) => {
//     const [sorting, setSorting] = useState<SortingState>([])
//     const [filtering, setFiltering] = useState('')
//     const 
//       table
//     = useReactTable({
//       data,
//       columns,
//       getCoreRowModel: getCoreRowModel(),
//       getPaginationRowModel: getPaginationRowModel(),
//       getSortedRowModel: getSortedRowModel(),
//       getFilteredRowModel: getFilteredRowModel(),
//       state: {
//         sorting: sorting,
//         globalFilter: filtering,
//       },
//       onSortingChange: setSorting ,
//       onGlobalFilterChange: setFiltering,
//     })
//   return (
//     <div className='w3-container'>
//     <input
//       type='text'
//       value={filtering}
//       onChange={e => setFiltering(e.target.value)}
//     />
//     <table className='w3-table-all'>
//       <thead>
//         {table.getHeaderGroups().map(headerGroup => (
//           <tr key={headerGroup.id}>
//             {headerGroup.headers.map(header =>{
//               return (
//               <th
//                 key={header.id}
//                 onClick={header.column.getToggleSortingHandler()}
                
//               >
//                 {header.isPlaceholder ? null : (
//                   <div className='bg-blue-500'>
//                     {flexRender(
//                       header.column.columnDef.header,
//                       header.getContext()
//                     )}
//                     {
          
                     
//                     }
//                   </div>
//                 )}
//               </th>
// )})}
//           </tr>
//                   ))}
//       </thead>

//       <tbody>
//         {table.getRowModel().rows.map(row => (
//           <tr key={row.id} className=''>
//             {row.getVisibleCells().map(cell => (
//               <td key={cell.id} className=''>
//                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
//               </td>
//             ))}
//           </tr>
//         ))}
//       </tbody>

//     </table>
//   </div>
//   )
// }

// export default DataGrid