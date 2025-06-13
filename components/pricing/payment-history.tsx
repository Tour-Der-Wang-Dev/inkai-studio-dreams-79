
'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { usePricingStore } from '@/stores/pricing-store'
import { Download, Receipt } from 'lucide-react'

export const PaymentHistory: React.FC = () => {
  const { paymentHistory } = usePricingStore()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-900/20 text-green-400 border-green-700'
      case 'pending':
        return 'bg-yellow-900/20 text-yellow-400 border-yellow-700'
      case 'failed':
        return 'bg-red-900/20 text-red-400 border-red-700'
      case 'refunded':
        return 'bg-gray-900/20 text-gray-400 border-gray-700'
      default:
        return 'bg-gray-900/20 text-gray-400 border-gray-700'
    }
  }

  const handleDownloadInvoice = (payment: any) => {
    if (payment.invoiceUrl) {
      window.open(payment.invoiceUrl, '_blank')
    }
  }

  // Mock data for demonstration
  const mockPayments = [
    {
      id: '1',
      amount: 19.99,
      currency: 'USD',
      status: 'completed' as const,
      date: new Date('2024-01-15'),
      description: 'Premium Subscription - January',
      invoiceUrl: '#'
    },
    {
      id: '2',
      amount: 299.99,
      currency: 'USD',
      status: 'completed' as const,
      date: new Date('2024-01-10'),
      description: 'Custom Tattoo Design',
      invoiceUrl: '#'
    },
    {
      id: '3',
      amount: 19.99,
      currency: 'USD',
      status: 'pending' as const,
      date: new Date('2024-01-01'),
      description: 'Premium Subscription - December',
    }
  ]

  const payments = paymentHistory.length > 0 ? paymentHistory : mockPayments

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Receipt className="w-5 h-5" />
          Payment History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {payments.length === 0 ? (
          <div className="text-center py-8">
            <Receipt className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No payment history found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-4 bg-gray-800/50 border border-gray-700 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-white font-medium">{payment.description}</h4>
                    <Badge className={getStatusColor(payment.status)}>
                      {payment.status}
                    </Badge>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {payment.date.toLocaleDateString()} • ${payment.amount.toFixed(2)} {payment.currency}
                  </p>
                </div>
                
                {payment.invoiceUrl && payment.status === 'completed' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownloadInvoice(payment)}
                    className="ml-4"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Invoice
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
