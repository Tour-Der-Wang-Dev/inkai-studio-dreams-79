
'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'

interface ArtistAvailabilityCalendarProps {
  artistId: string
  isOwnProfile?: boolean
}

export const ArtistAvailabilityCalendar: React.FC<ArtistAvailabilityCalendarProps> = ({
  artistId,
  isOwnProfile = false
}) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Availability Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border border-gray-700"
            />
          </div>
          <div className="lg:w-80 space-y-4">
            <h3 className="text-white font-medium">Available Time Slots</h3>
            <div className="space-y-2">
              {['10:00 AM', '2:00 PM', '4:00 PM'].map((time) => (
                <Button
                  key={time}
                  variant="outline"
                  className="w-full justify-start border-gray-700 text-gray-300 hover:bg-electric-blue hover:text-white"
                >
                  {time} - Consultation ($50)
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
