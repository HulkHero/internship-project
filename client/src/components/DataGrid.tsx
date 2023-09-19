import { ColumnDef, Row, useReactTable } from '@tanstack/react-table'
import React, { useState } from 'react'
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    HeaderGroup,
    ColumnPinningState,
  

  } from '@tanstack/react-table'




type Props<T> = {
    data:T[],
    columns:ColumnDef<T>[]
}


const DataGrid =<T extends {}>({ data, columns }: Props<T>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState('');
  const [pinnedColumns, setPinnedColumns] = useState<ColumnPinningState>({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  
    state: {
      sorting: sorting,
      columnPinning: pinnedColumns,
      globalFilter: filtering,
    },
    onColumnPinningChange: setPinnedColumns,
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div className='w-full'>
      <input
        type='text'
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
        className='outline-none my-2 mx-4 px-2 py-1 rounded-lg ring-1 focus:ring-2 focus:ring-darkRed ring-darkRed w-full max-w-xs'
        placeholder='Search in current data...'
      />
      <div className='overflow-x-auto'>
      <table className='table'>
        <thead className=' bg-neutral-100 shadow-md select-none text-black'>
          {table.getHeaderGroups().map((headerGroup:HeaderGroup<T>) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className='cursor-pointer'
                  >
                    {header.isPlaceholder ? null : (
                      <div className=''>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                            {header.column.getIsSorted() === 'asc' && '🔼'}
                            {header.column.getIsSorted() === 'desc' && '🔽'}
                      </div>
                    )}
                    {/* {!header.isPlaceholder && header.column.getCanPin() && (
                      <div className=''>
                        <button
                          onClick={()=>header.column.pin("left")}
                          className={`${header.column.getIsPinned()?"table-pin-cols ":""} btn btn-secondary btn-sm`}
                        >
                          {header.column.getIsPinned() ? 'Unpin' : 'Pin'}
                        </button>
                      </div>
                    )} */}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody className='bg-white'>
          {table.getRowModel().rows.map((row:Row<T>) => (
            <tr key={row.id} className='hover'>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className=''>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default DataGrid;

