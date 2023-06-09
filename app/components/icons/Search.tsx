import * as React from 'react'
import type { SVGProps } from 'react'
const SvgSearch = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={800}
    height={800}
    fill="#fff"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M10.77 18.3a7.53 7.53 0 1 1 0-15.06 7.53 7.53 0 0 1 0 15.06Zm0-13.55a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z" />
    <path d="M20 20.75a.741.741 0 0 1-.53-.22l-4.13-4.13a.75.75 0 0 1 1.06-1.06l4.13 4.13a.75.75 0 0 1-.53 1.28Z" />
  </svg>
)
export default SvgSearch
