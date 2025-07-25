import React from 'react'
import { cn } from '@/lib/utils'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export interface ScheduleTableProps {
  dates: string[]
  strongGrid?: boolean
}

export default function ScheduleTable({ dates, strongGrid = false }: ScheduleTableProps) {
  const cellBorder = strongGrid
    ? 'border-2 border-gray-400 dark:border-gray-500'
    : 'border grid-border'

  const cellBase = cn('min-w-[6rem] p-2 text-center', cellBorder)

  return (
    <div className="overflow-auto">
      <table className="border-collapse">
        <thead>
          <tr>
            {/* Top-left corner cell stays fixed */}
            <th className={cn(cellBase, 'sticky top-0 left-0 z-30 bg-background')} />
            {dates.map((date) => (
              <th
                key={date}
                role="columnheader"
                className={cn(cellBase, 'sticky top-0 z-20 bg-background')}
              >
                {date}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {DAYS.map((day) => (
            <tr key={day}>
              {/* Row label remains visible on horizontal scroll */}
              <th scope="row" className={cn(cellBase, 'sticky left-0 z-10 bg-background text-left font-medium')}>
                {day}
              </th>
              {dates.map((date) => (
                <td key={`${day}-${date}`} className={cellBase} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
