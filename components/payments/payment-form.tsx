"use client"

import type React from "react"

import { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/components/auth/auth-provider"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface PaymentFormProps {
  amount: number
  description: string
  eventId?: string
  serviceId?: string
  onSuccess?: () => void
  onError?: (error: string) => void
}

function CheckoutForm({ amount, description, eventId, serviceId, onSuccess, onError }: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements || !user) {
      return
    }

    setLoading(true)
    setError("")

    try {
      // Crear Payment Intent
      const response = await fetch("/api/payments/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.access_token}`,
        },
        body: JSON.stringify({
          amount,
          eventId,
          serviceId,
        }),
      })

      const { clientSecret } = await response.json()

      // Confirmar pago
      const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: user.user_metadata?.full_name || user.email,
            email: user.email,
          },
        },
      })

      if (stripeError) {
        setError(stripeError.message || "Error en el pago")
        onError?.(stripeError.message || "Error en el pago")
      } else {
        onSuccess?.()
      }
    } catch (err) {
      const errorMessage = "Error procesando el pago"
      setError(errorMessage)
      onError?.(errorMessage)
    }

    setLoading(false)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Completar Pago</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="p-4 border rounded-md">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                },
              }}
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total: €{amount.toFixed(2)}</span>
          </div>

          <Button type="submit" className="w-full" disabled={!stripe || loading}>
            {loading ? "Procesando..." : `Pagar €${amount.toFixed(2)}`}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default function PaymentForm(props: PaymentFormProps) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm {...props} />
    </Elements>
  )
}
