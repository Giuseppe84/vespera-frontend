"use client"

import { useState } from "react"
import { FiSearch, FiUser, FiShoppingCart } from "react-icons/fi"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

interface HeaderProps {
  isAuthenticated?: boolean
  avatarUrl?: string
  user?: {
    firstName: string
    email: string
  } | null
}

export default function Header({ isAuthenticated = false, user = null }: HeaderProps) {
  const [search, setSearch] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching for:", search)
  }


  const handleLogout = async () => {
    await fetch("/api/proxy-logout", {
      method: "POST",
      credentials: "include",
    })

    router.replace("/login") // redirect dopo logout
  }

  const handleLogin = () => {
    router.push("/login")
  } 

  return (
<header className="bg-white shadow-md px-6 py-4 flex flex-col gap-2">
  {/* Riga principale: logo + ricerca + icone */}
  <div className="flex items-center justify-between w-full">
    {/* Logo più grande */}
    <div className="text-3xl font-extrabold text-sky-600">Vespera</div>

    {/* Barra di ricerca */}
    <form onSubmit={handleSearch} className="flex-1 mx-6 max-w-lg">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-1 text-sm"
        />
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
    </form>

    {/* Icone login / cart / avatar */}
    <div className="flex items-center gap-4 relative">
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="p-2">
              <FiUser size={20} />
              {user?.firstName && <span className="ml-2 hidden sm:inline">{user.firstName}</span>}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="start">
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem onSelect={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button variant="ghost" onClick={handleLogin}>
          <FiUser size={20} />
        </Button>
      )}
      <Button variant="ghost" className="p-2 relative">
        <FiShoppingCart size={20} />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
          3
        </span>
      </Button>
    </div>
  </div>

  {/* Riga link sotto la ricerca */}
   <nav className="flex justify-center gap-6 mt-2">
    <Button variant="link">Home</Button>
    <Button variant="link">Clients</Button>
    <Button variant="link">Services</Button>
    <Button variant="link">Payments</Button>
  </nav>
</header>
  )
}