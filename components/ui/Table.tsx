import React from 'react'

interface TableProps {
  children: React.ReactNode
  className?: string
}

export const Table: React.FC<TableProps> = ({ children, className = '' }) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full border-collapse">
        {children}
      </table>
    </div>
  )
}

export const TableHeader: React.FC<TableProps> = ({ children, className = '' }) => {
  return (
    <thead className={className}>
      {children}
    </thead>
  )
}

export const TableBody: React.FC<TableProps> = ({ children, className = '' }) => {
  return (
    <tbody className={className}>
      {children}
    </tbody>
  )
}

export const TableRow: React.FC<TableProps> = ({ children, className = '' }) => {
  return (
    <tr className={`border-b border-gray-800 ${className}`}>
      {children}
    </tr>
  )
}

export const TableHead: React.FC<TableProps> = ({ children, className = '' }) => {
  return (
    <th className={`px-4 py-3 text-left text-sm font-medium text-gray-400 ${className}`}>
      {children}
    </th>
  )
}

export const TableCell: React.FC<TableProps> = ({ children, className = '' }) => {
  return (
    <td className={`px-4 py-3 text-sm text-white ${className}`}>
      {children}
    </td>
  )
}

