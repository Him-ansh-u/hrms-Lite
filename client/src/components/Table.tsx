import { FiTrash2 } from "react-icons/fi";
import React from "react";

type Column<T> = {
  header: string;
  accessor?: string;
  render?: (row: T) => React.ReactNode;
};

type TableProps<T> = {
  title:string;
  columns: Column<T>[];
  data: T[];
  onDelete?: (row: T) => void;
};

const Table = <T,>({ columns, data, onDelete }: TableProps<T>) => {
  const hasActions = typeof onDelete === "function";

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  {column.header}
                </th>
              ))}

              {hasActions && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Action
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 text-sm">
                      {column.render
                        ? column.render(row)
                        : column.accessor
                        ? String((row as Record<string, unknown>)[column.accessor])
                        : null}
                    </td>
                  ))}

                  {hasActions && (
                    <td className="px-6 py-4 text-sm text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete?.(row);
                        }}
                        className="text-red-600 hover:text-red-800 font-medium cursor-pointer"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (hasActions ? 1 : 0)}
                  className="px-6 py-4 text-sm text-gray-500 text-center"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
