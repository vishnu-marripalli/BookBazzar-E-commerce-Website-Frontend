/* eslint-disable react/jsx-key */

import React from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import Container from "./ui/Container";
import { useNavigate } from "react-router-dom";

const Table = ({
  columns,
  data,
  Heading,
  showEditButtons,
  showviewButtons,
  showviewallButton,
  showaddproduct,
  onEdit,
  onDelete,
  onView,
  openModal,
}) => {
  // Define the table instance using useTable and the additional hooks for sorting and pagination
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Only the rows for the active page
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex },
    gotoPage,
    pageCount,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }, // Start on the first page
    },
    useSortBy,
    usePagination
  );
  const navigate = useNavigate();

  return (
    <Container>
      <div className="lg:ml-3 py-2 px-4 flex flex-row justify-between items-center  bg">
        {Heading !== null || "" ? (
          <h1 className="text-2xl font-semibold">{Heading}</h1>
        ) : null}
        {showaddproduct && (
          <button
            onClick={() => {
              openModal();
            }}
            className="px-4 py-1 bg-blue-500 text-base text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            Add item
          </button>
        )}
        {showviewallButton && (
          <button
            onClick={() => {
              navigate("/orders");
            }}
            className="px-4 py-1 bg-blue-500 text-base text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            View all
          </button>
        )}
      </div>
      <div className="overflow-x-auto p-3">
        <table {...getTableProps()} className="w-full border-collapse  ">
          <thead className=" text-left">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="py-3 px-4 border-b border-gray-300 text-sm font-semibold text-gray-700"
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="hover:bg-gray-50 transition-all"
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="py-2 px-4 border-b border-gray-300 max-w-[200px] text-gray-600 text-sm"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                  {/* {showEditButtons && (
                      <td className="py-2 px-4 border-b border-t border-gray-300 text-gray-600 text-sm">
                        <button
                          onClick={() => onEdit(row.original)}
                          className="mr-2 "
                        >
                          <MdOutlineModeEdit size={30}/>
                        </button>
                        <button
                          onClick={() => onDelete(row.original)}
                          className="mr-2 "
                        >
                          <TiDeleteOutline size={30}/>
                        </button>
                      </td>
                    )} */}
                  {showviewButtons && (
                    <td className="py-2 px-4 border-b border-t border-gray-300 text-gray-600 text-sm">
                      <button
                        onClick={() => onView(row.original)}
                        className="mr-2 text-blue-500 text-center underline"
                      >
                        view
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default Table;
