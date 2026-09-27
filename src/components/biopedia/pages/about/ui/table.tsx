export function AboutTable({ columns, rows }: { columns: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-secondary text-foreground">
          <tr>
            {columns.map((column) => (
              <th key={column} scope="col" className="px-4 py-3 font-semibold">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row, index) => (
            <tr key={`${row[0] ?? "row"}-${index}`}>
              {row.map((cell, cellIndex) => (
                <td key={`${index}-${cellIndex}`} className="px-4 py-3 text-muted-foreground">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
