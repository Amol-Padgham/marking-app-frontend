import { flexRender } from "@tanstack/react-table";

const Table = ({ table }) => {
    return (
        <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="w-full border border-gray-300 bg-white rounded-lg">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id} className="bg-blue-500 text-white">
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    className="border p-4 text-left cursor-pointer hover:bg-blue-600 transition-all"
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {header.column.getIsSorted() === "asc" ? " ▲" : header.column.getIsSorted() === "desc" ? " ▼" : ""}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="border hover:bg-gray-100 transition-all">
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="border p-4 text-gray-700">
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

export default Table;
