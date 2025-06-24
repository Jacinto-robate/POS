"use client"

import { useState } from "react"
import { Search, Menu, ShoppingCart } from "lucide-react"
import { Input } from "@/components/ui/input"
import ProductGrid from "./components/product-grid"
import CartSidebar from "./components/cart-sidebar"
import CategorySidebar from "./components/category-sidebar"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export default function POSPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [openCategory, setOpenCategory] = useState(false)
  const [openCart, setOpenCart] = useState(false)

  return (
    <div className="flex flex-col h-screen bg-background md:flex-row">
      {/* Botões mobile para abrir sidebars */}
      <div className="flex items-center justify-between p-4 border-b md:hidden">
        <Button variant="ghost" size="icon" onClick={() => setOpenCategory(true)}>
          <Menu className="h-6 w-6" />
          <span className="sr-only">Abrir categorias</span>
        </Button>
        <h1 className="text-xl font-bold">Nexus JR</h1>
        <Button variant="ghost" size="icon" onClick={() => setOpenCart(true)}>
          <ShoppingCart className="h-6 w-6" />
          <span className="sr-only">Abrir carrinho</span>
        </Button>
      </div>

      {/* Drawer de categorias no mobile */}
      <Sheet open={openCategory} onOpenChange={setOpenCategory}>
        <SheetContent side="left" className="p-0 w-64 max-w-full">
          <CategorySidebar selectedCategory={selectedCategory} onSelectCategory={(cat) => { setSelectedCategory(cat); setOpenCategory(false); }} />
        </SheetContent>
      </Sheet>
      {/* Drawer do carrinho no mobile */}
      <Sheet open={openCart} onOpenChange={setOpenCart}>
        <SheetContent side="right" className="p-0 w-80 max-w-full">
          <CartSidebar />
        </SheetContent>
      </Sheet>

      {/* Sidebar de categorias fixa no desktop */}
      <div className="hidden md:block">
        <CategorySidebar selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
      </div>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="sticky top-0 z-10 bg-background p-4 border-b hidden md:block">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Nexus JR</h1>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar produtos..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* Barra de busca mobile */}
        <div className="p-4 border-b md:hidden">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Pesquisar produtos..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-1 overflow-auto p-2 sm:p-4">
          <ProductGrid category={selectedCategory} searchQuery={searchQuery} />
        </div>
      </main>

      {/* Sidebar do carrinho fixa no desktop */}
      <div className="hidden md:block">
        <CartSidebar />
      </div>
    </div>
  )
}
