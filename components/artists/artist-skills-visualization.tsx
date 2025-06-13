
'use client'

import React from 'react'
import { ArtistSkill } from '@/types/artist'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

interface ArtistSkillsVisualizationProps {
  skills: ArtistSkill[]
  isOwnProfile?: boolean
}

export const ArtistSkillsVisualization: React.FC<ArtistSkillsVisualizationProps> = ({
  skills,
  isOwnProfile = false
}) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {skills.map((skill) => (
        <Card key={skill.id} className="bg-gray-900 border-gray-800">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-white text-lg">{skill.skill_name}</CardTitle>
              <Badge variant="outline">{skill.proficiency_level}%</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={skill.proficiency_level} className="mb-2" />
            {skill.years_experience && (
              <p className="text-gray-400 text-sm">
                {skill.years_experience} years experience
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
