"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Fake calendar widget - UI only, non-functional
export default function CalendarWidget() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  
  // Generate calendar days (simplified - always shows current month view)
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const days: (number | null)[] = []
    
    // Fill in empty slots for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }
    
    // Add all days in the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    
    return days
  }
  
  const days = getDaysInMonth(currentMonth)
  const today = new Date()
  const isCurrentMonth = currentMonth.getMonth() === today.getMonth() && 
                        currentMonth.getFullYear() === today.getFullYear()
  
  // Mock available dates (for demo purposes)
  const availableDates = [5, 7, 8, 12, 14, 15, 19, 21, 22, 26, 28]
  
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }
  
  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }
  
  return (
    <Card className="glass card-shadow border-emerald/20 w-full max-w-full overflow-hidden">
      <CardHeader className="p-3 sm:p-4 md:p-6">
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevMonth}
            className="p-1 hover:bg-emerald/10 rounded-lg transition-colors flex-shrink-0"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-midnight/70" />
          </button>
          <CardTitle className="text-base sm:text-lg md:text-xl font-heading text-midnight px-2 text-center">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </CardTitle>
          <button
            onClick={handleNextMonth}
            className="p-1 hover:bg-emerald/10 rounded-lg transition-colors flex-shrink-0"
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-midnight/70" />
          </button>
        </div>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 md:p-6 pt-0">
        {/* Week day headers */}
        <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-1 sm:mb-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center text-[10px] sm:text-xs font-semibold text-midnight/60 py-1 sm:py-2"
            >
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
          {days.map((day, index) => {
            if (day === null) {
              return <div key={index} className="aspect-square" />
            }
            
            const isToday = isCurrentMonth && day === today.getDate()
            const isAvailable = availableDates.includes(day)
            const isPast = isCurrentMonth && day < today.getDate()
            
            return (
              <button
                key={day}
                disabled={isPast || !isAvailable}
                className={`
                  aspect-square rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-all
                  ${isPast 
                    ? 'text-midnight/30 cursor-not-allowed' 
                    : isAvailable
                      ? 'text-midnight hover:bg-emerald/10 hover:border hover:border-emerald/30 cursor-pointer'
                      : 'text-midnight/40 cursor-not-allowed'
                  }
                  ${isToday ? 'bg-emerald/20 border-2 border-emerald font-bold' : ''}
                `}
              >
                {day}
              </button>
            )
          })}
        </div>
        
        {/* Legend */}
        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-midnight/10">
          <div className="flex items-center justify-center space-x-4 sm:space-x-6 text-[10px] sm:text-xs text-midnight/60 flex-wrap gap-2">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded bg-emerald/20 border border-emerald/30" />
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded bg-midnight/10" />
              <span>Unavailable</span>
            </div>
          </div>
          <p className="text-[10px] sm:text-xs text-center text-midnight/50 mt-2 sm:mt-3 px-2">
            Select a date to schedule your consultation
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

