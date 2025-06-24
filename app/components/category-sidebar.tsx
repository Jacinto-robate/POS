"use client"

import type React from "react"

import { Coffee, IceCream, LayoutGrid, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CategorySidebarProps {
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

interface CategoryItem {
  id: string
  name: string
  icon: React.ElementType
}

const categories: CategoryItem[] = [
  {
    id: "all",
    name: "Todos Produtos",
    icon: LayoutGrid,
  },
  {
    id: "food",
    name: "Comidas",
    icon: Utensils,
  },
  {
    id: "drinks",
    name: "Bebidas",
    icon: Coffee,
  },
  {
    id: "desserts",
    name: "Sobremesas",
    icon: IceCream,
  },
]

export default function CategorySidebar({ selectedCategory, onSelectCategory }: CategorySidebarProps) {
  return (
    <div className="w-full md:w-56 border-r bg-background p-2 md:p-4">
      <h2 className="mb-2 md:mb-4 text-base md:text-lg font-semibold">Categorias</h2>
      <div className="grid gap-2 md:gap-3">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <Button
              key={category.id}
              variant="ghost"
              className={cn(
                "flex h-auto flex-col items-center justify-center py-3 md:py-4 border bg-transparent text-xs md:text-sm",
                selectedCategory === category.id
                  ? "border-2 border-primary text-foreground font-medium"
                  : "border-muted text-muted-foreground hover:border-muted-foreground hover:text-foreground",
                "hover:bg-transparent",
              )}
              onClick={() => onSelectCategory(category.id)}
            >
              <Icon className="mb-1 md:mb-2 h-5 w-5 md:h-6 md:w-6" />
              <span>{category.name}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
