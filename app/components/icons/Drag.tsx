import * as React from 'react'
import type { SVGProps } from 'react'
const SvgDrag = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={800}
    height={800}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M16 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM16 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM8 18a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM16 18a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM8 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM8 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z"
    />
  </svg>
)
export default SvgDrag
