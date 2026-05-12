import React, { ReactNode } from "react";

export type ColumnType<T> = {
  key: keyof T | string;
  title: string | React.ReactNode;
  render?: (value: T[keyof T], row: T, data: T[], index : number) => ReactNode;
}[];

type Props<T> = {
  columns: ColumnType<T>;
  data?: T[];
};


const TableComponent = <T,>({ data = [], columns }: Props<T>) => {
  return (
    <div className="bg-white rounded-lg border text-black border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              {columns.map((x, i) => (
                <th
                  key={i}
                  className="px-6 py-4 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider"
                >
                  {x.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-slate-200 text-center hover:bg-slate-50 transition-colors"
                >
                  {columns.map((col, i2) => {
                    const value = col.render ? (
                      col.render(row[col.key as keyof T], row, data,i)
                    ) : (
                      <p>(row[col.key as keyof T])</p>
                    );
                    return (
                      <td key={i2} className="px-6 py-4">
                        {value}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td>No </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
