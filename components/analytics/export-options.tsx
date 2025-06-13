
'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { useAnalyticsStore } from '@/stores/analytics-store'
import { Download, FileText, Table } from 'lucide-react'

export const ExportOptions: React.FC = () => {
  const { generateReport, isGeneratingReport } = useAnalyticsStore()

  const handleExport = async (format: 'pdf' | 'csv' | 'excel') => {
    try {
      await generateReport('dashboard-summary', format)
    } catch (error) {
      console.error('Failed to export report:', error)
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        size="sm"
        variant="outline"
        onClick={() => handleExport('pdf')}
        disabled={isGeneratingReport}
        className="border-gray-600"
      >
        <FileText className="w-4 h-4 mr-2" />
        PDF
      </Button>
      
      <Button
        size="sm"
        variant="outline"
        onClick={() => handleExport('csv')}
        disabled={isGeneratingReport}
        className="border-gray-600"
      >
        <Table className="w-4 h-4 mr-2" />
        CSV
      </Button>
      
      <Button
        size="sm"
        variant="outline"
        onClick={() => handleExport('excel')}
        disabled={isGeneratingReport}
        className="border-gray-600"
      >
        <Download className="w-4 h-4 mr-2" />
        Excel
      </Button>
    </div>
  )
}
