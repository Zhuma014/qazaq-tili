import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'

const useScrollTopOnNavigate = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])
}

export const Layout = () => {
  useScrollTopOnNavigate()
  return (
    <>
      <SiteHeader />
      <main className="container main">
        <Outlet />
      </main>
      <SiteFooter />
    </>
  )
}
