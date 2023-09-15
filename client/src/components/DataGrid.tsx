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



interface ColumnDef {
    header: string
    accessorKey: string
    
}
type Props<T> = {
    data:T[],
    columns:ColumnDef[]
}


const DataGrid =<T extends {}>({ data, columns }: Props<T>) => {
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
        className='outline-none my-2 px-2 py-1 rounded-lg ring-1 focus:ring-2 focus:ring-blue-500 ring-blue-400 w-full max-w-xs'
        placeholder='Filter...'
      />
      <table className='w-full border-collapse'>
        <thead className='bg-blue-500 text-white'>
          {table.getHeaderGroups().map((headerGroup:HeaderGroup<T>) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className='px-2 py-1 cursor-pointer'
                  >
                    {header.isPlaceholder ? null : (
                      <div className='bg-blue-500'>
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
          {table.getRowModel().rows.map((row:Row<T>) => (
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

