import { Link } from 'react-router-dom'
import { ReactNode } from 'react'

interface NavItemProps {
  children: ReactNode
  to: string
}

const NavItem = ({ children, to }: NavItemProps) => (
  <li>
    <Link className="hover:underline" to={to}>
      {children}
    </Link>
  </li>
)

const Footer = () => {
  return (
    <footer className="border-t-border background-card bg-card border-t">
      <div className="container-with-px flex justify-between gap-6 py-4 text-xs font-light md:text-sm">
        <p>© 2025 CineWorld</p>
        <ul className="flex items-center gap-6">
          <NavItem to="#">Privacy Policy</NavItem>
          <NavItem to="#">Terms of Service</NavItem>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
