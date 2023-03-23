import type { MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import type { LinksFunction } from '@remix-run/react/dist/routeModules'
import stylesheet from '~/tailwind.css'
import Nav from './components/Nav'
import type { ReactNode } from 'react'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
]

export type LayoutProps = {
  children: ReactNode
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Movie List App',
  viewport: 'width=device-width,initial-scale=1',
})

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-black">
        <Layout>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export function Layout({ children }: LayoutProps) {
  return (
    <main>
      <Nav />
      <div className="mt-16">
        <div className="m-auto flex min-h-[calc(100vh_-_64px)] w-full items-center justify-center p-7 text-white">
          {children}
        </div>
      </div>
    </main>
  )
}
