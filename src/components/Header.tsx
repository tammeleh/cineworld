import { Link } from 'react-router-dom'
import { ReactNode } from 'react'

export const Header = () => {
  const NavItem = ({ children, to }: { children: ReactNode; to: string }) => (
    <li>
      <Link className="transition hover:text-yellow-500" to={to}>
        {children}
      </Link>
    </li>
  )

  return (
    <header className="border-b-border flex justify-between border-b px-2 py-3 md:px-4">
      <Link
        className="flex items-center gap-2"
        aria-label="Go to homepage"
        to="/"
      >
        <img
          className="size-4 md:size-6"
          alt="CineWorld Logo"
          src="/film.svg"
        />
        <h1 className="text-lg font-bold md:text-xl">CineWorld</h1>
      </Link>
      <ul className="md:text-md flex items-center gap-4 text-sm">
        <NavItem to="/">Home</NavItem>
        <NavItem to="/movies">Movies</NavItem>
        <NavItem to="/contact">Contact</NavItem>
      </ul>
    </header>
  )
}
