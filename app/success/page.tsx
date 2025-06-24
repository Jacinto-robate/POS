"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Check, Printer } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "../context/cart-context"
import { formatCurrency } from "@/lib/utils"

export default function SuccessPage() {
  const router = useRouter()
  const { cart, cartTotal, clearCart } = useCart()

  const tax = cartTotal * 0.50
  const grandTotal = cartTotal + tax
  const receiptNumber = Math.floor(100000 + Math.random() * 900000)
  const date = new Date().toLocaleDateString('pt-MZ', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })

  useEffect(() => {
    // If there's no cart data, redirect to POS
    if (cart.length === 0) {
      router.push("/")
    }
  }, [cart, router])

  const handleBackToPOS = () => {
    clearCart()
    router.push("/")
  }

  const handlePrint = () => {
    window.print()
  }

  if (cart.length === 0) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto max-w-md py-8">
      <div className="rounded-lg border p-6 print:border-none bg-white">
        <div className="mb-6 flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <Check className="h-6 w-6 text-green-600" />
          </div>
        </div>

        <h1 className="mb-2 text-center text-2xl font-bold">Pagamento bem-sucedido</h1>
        <p className="mb-6 text-center text-muted-foreground">Obrigado pela sua compra!</p>

        <div className="mb-6 text-center">
          <p className="font-medium">Recibo nº {receiptNumber}</p>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>

        <Separator className="my-4" />

        <div className="space-y-3">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between">
              <div>
                <p>
                  {item.name} × {item.quantity}
                </p>
              </div>
              <p>{formatCurrency(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="space-y-2">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>{formatCurrency(cartTotal)}</p>
          </div>
          <div className="flex justify-between">
            <p>Entrega </p>
            <p>{formatCurrency(tax)}</p>
          </div>
          <div className="flex justify-between font-bold">
            <p>Total</p>
            <p>{formatCurrency(grandTotal)}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 print:hidden">
          <Button onClick={handlePrint} variant="outline" className="w-full">
            <Printer className="mr-2 h-4 w-4" />
            Imprimir Recibo
          </Button>
          <Button onClick={handleBackToPOS} className="w-full">
            Voltar
          </Button>
        </div>
      </div>
    </div>
  )
}
