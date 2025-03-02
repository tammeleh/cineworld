import { Link } from 'react-router-dom'
import { ReactNode } from 'react'

interface NavItemProps {
  children: ReactNode
  to: string
}

const NavItem = ({ children, to }: NavItemProps) => (
  <li>
    <Link className="transition hover:text-yellow-500" to={to}>
      {children}
    </Link>
  </li>
)

const Header = () => {
  return (
    <header className="border-b-gray border-b">
      <div className="container-with-px flex justify-between py-3">
        <Link
          className="flex items-center gap-2"
          aria-label="Go to homepage"
          to="/"
        >
          <img
            className="fill- size-4 md:size-6"
            alt="CineWorld Logo"
            src="/film.svg"
          />
          <div className="text-lg font-bold md:text-xl" aria-label="Brand">
            Cine<span className="text-yellow-500">W</span>orld
          </div>
        </Link>
        <ul className="md:text-md flex items-center gap-4 text-sm">
          <NavItem to="/">Movies</NavItem>
        </ul>
      </div>
    </header>
  )
}

export default Header
