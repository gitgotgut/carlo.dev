"use client"

import { useMemo, useState } from "react"
import type { ContributionDay } from "@/lib/github"

interface ContributionGraphProps {
  days: ContributionDay[]
  totalContributions: number
}

const CELL_SIZE = 13
const CELL_GAP = 3
const TOTAL = CELL_SIZE + CELL_GAP
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""]
const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]

function getContributionLevel(count: number, max: number): number {
  if (count === 0) return 0
  if (max === 0) return 0
  const ratio = count / max
  if (ratio <= 0.25) return 1
  if (ratio <= 0.5) return 2
  if (ratio <= 0.75) return 3
  return 4
}

// Classes that work in both light and dark mode
const LEVEL_CLASSES = [
  "bg-[#ebedf0] dark:bg-[#161b22]",
  "bg-emerald-200 dark:bg-emerald-900/70",
  "bg-emerald-400 dark:bg-emerald-700/80",
  "bg-emerald-500 dark:bg-emerald-500",
  "bg-emerald-700 dark:bg-emerald-400",
]

export function ContributionGraph({
  days,
  totalContributions,
}: ContributionGraphProps) {
  const [tooltip, setTooltip] = useState<{
    date: string
    count: number
    x: number
    y: number
  } | null>(null)

  const { grid, monthHeaders, maxCount } = useMemo(() => {
    const dayMap = new Map(days.map((d) => [d.date, d.count]))

    const today = new Date()
    const todayDay = today.getDay()
    const endDate = new Date(today)
    const startDate = new Date(today)
    startDate.setDate(startDate.getDate() - (52 * 7 + todayDay))

    const weeks: { date: string; count: number }[][] = []
    const months: { label: string; col: number }[] = []
    let lastMonth = -1
    let weekIndex = -1

    const cursor = new Date(startDate)

    while (cursor <= endDate) {
      const dayOfWeek = cursor.getDay()
      if (dayOfWeek === 0) {
        weekIndex++
        weeks.push([])

        const month = cursor.getMonth()
        if (month !== lastMonth) {
          months.push({ label: MONTH_LABELS[month], col: weekIndex })
          lastMonth = month
        }
      }

      const dateStr = cursor.toISOString().split("T")[0]
      const count = dayMap.get(dateStr) || 0

      if (weeks[weekIndex]) {
        weeks[weekIndex].push({ date: dateStr, count })
      }

      cursor.setDate(cursor.getDate() + 1)
    }

    const allCounts = days.map((d) => d.count)
    const max = allCounts.length > 0 ? Math.max(...allCounts) : 0

    return { grid: weeks, monthHeaders: months, maxCount: max }
  }, [days])

  const graphWidth = 53 * TOTAL + 32

  return (
    <div className="w-full overflow-x-auto">
      <div className="mb-3">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">
            {totalContributions}
          </span>{" "}
          contributions in the last year
        </p>
      </div>

      <div
        className="relative rounded-lg border border-border bg-card p-4"
        style={{ minWidth: graphWidth }}
      >
        {/* Month headers */}
        <div className="relative h-4">
          {monthHeaders.map((m, i) => (
            <span
              key={`${m.label}-${i}`}
              className="absolute text-xs text-muted-foreground"
              style={{ left: 32 + m.col * TOTAL }}
            >
              {m.label}
            </span>
          ))}
        </div>

        <div className="mt-1 flex">
          {/* Day labels */}
          <div className="mr-2 flex flex-col" style={{ gap: CELL_GAP }}>
            {DAY_LABELS.map((label, i) => (
              <span
                key={i}
                className="flex items-center text-xs leading-none text-muted-foreground"
                style={{ height: CELL_SIZE }}
              >
                {label}
              </span>
            ))}
          </div>

          {/* Grid */}
          <div className="flex" style={{ gap: CELL_GAP }}>
            {grid.map((week, weekIdx) => (
              <div
                key={weekIdx}
                className="flex flex-col"
                style={{ gap: CELL_GAP }}
              >
                {week.map((day) => {
                  const level = getContributionLevel(day.count, maxCount)
                  return (
                    <div
                      key={day.date}
                      className={`rounded-sm ${LEVEL_CLASSES[level]} cursor-pointer transition-all hover:ring-1 hover:ring-foreground/30`}
                      style={{ width: CELL_SIZE, height: CELL_SIZE }}
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect()
                        setTooltip({
                          date: day.date,
                          count: day.count,
                          x: rect.left + rect.width / 2,
                          y: rect.top,
                        })
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-3 flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
          <span>Less</span>
          {LEVEL_CLASSES.map((cls, i) => (
            <div
              key={i}
              className={`rounded-sm ${cls}`}
              style={{ width: CELL_SIZE - 2, height: CELL_SIZE - 2 }}
            />
          ))}
          <span>More</span>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full rounded-md bg-foreground px-2.5 py-1.5 text-xs font-medium text-background shadow-lg"
          style={{ left: tooltip.x, top: tooltip.y - 8 }}
        >
          <span className="font-semibold">
            {tooltip.count === 0
              ? "No contributions"
              : `${tooltip.count} contribution${tooltip.count !== 1 ? "s" : ""}`}
          </span>{" "}
          on{" "}
          {new Date(tooltip.date + "T12:00:00").toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      )}
    </div>
  )
}
