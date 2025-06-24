"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useCart } from "../context/cart-context"
import { formatCurrency } from "@/lib/utils"

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, cartTotal, clearCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState("card")

  const tax = cartTotal * 0.50
  const grandTotal = cartTotal + tax

  const handlePayment = () => {
    // In a real app, you would process payment here
    router.push("/success")
  }

  if (cart.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">O carrinho está vazio</h1>
          <p className="mt-2 text-muted-foreground">Adicione alguns itens ao carrinho antes de finalizar a compra</p>
          <Button className="mt-4" onClick={() => router.push("/")}>Voltar ao PDV</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <Button variant="ghost" className="mb-6" onClick={() => router.push("/")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>

      <h1 className="mb-6 text-3xl font-bold">Finalizar compra</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-xl font-semibold">Resumo do Pedido</h2>
          <div className="rounded-lg border p-4 bg-white">
            {cart.map((item) => (
              <div key={item.id} className="mb-3 flex justify-between">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(item.price)} × {item.quantity}
                  </p>
                </div>
                <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
              </div>
            ))}

            <Separator className="my-4" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>{formatCurrency(cartTotal)}</p>
              </div>
              <div className="flex justify-between">
                <p>Entrega</p>
                <p>{formatCurrency(tax)}</p>
              </div>
              <div className="flex justify-between font-bold">
                <p>Total</p>
                <p>{formatCurrency(grandTotal)}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">Método de Pagamento</h2>
          <div className="rounded-lg border p-4 bg-white">
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2 rounded-md border p-3">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Cartão de Crédito/Débito
                </Label>
              </div>

              <div className="mt-3 flex items-center space-x-2 rounded-md border p-3">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash" className="flex items-center">
                  <Wallet className="mr-2 h-4 w-4" />
                  Dinheiro
                </Label>
              </div>
            </RadioGroup>

            <Button className="mt-6 w-full" size="lg" onClick={handlePayment}>
              Concluir Pagamento
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
