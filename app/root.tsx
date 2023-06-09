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
import { MovieListProvider, useMovieList } from './contexts/movieListContext'
import Toast from './components/Toast'

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
        <MovieListProvider>
          <Layout>
            <Outlet />
          </Layout>
        </MovieListProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export function Layout({ children }: LayoutProps) {
  const { currentStatus } = useMovieList()
  return (
    <main>
      <Nav />
      <div className="mt-16">
        <div className="m-auto flex min-h-[calc(100vh_-_80px)] w-full p-7 pt-10 text-white">
          {children}
        </div>
      </div>
      <Toast statusKey={currentStatus} />
    </main>
  )
}
