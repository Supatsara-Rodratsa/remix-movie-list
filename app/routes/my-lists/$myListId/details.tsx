import type { MetaFunction } from '@remix-run/node'
import { Outlet } from '@remix-run/react'

export const meta: MetaFunction = () => {
  return {
    title: 'Movie Detail',
  }
}

export default function Detail() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Outlet />
    </div>
  )
}
