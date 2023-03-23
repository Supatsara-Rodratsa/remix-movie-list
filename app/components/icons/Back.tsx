import * as React from 'react'
import type { SVGProps } from 'react'
const SvgBack = (props: SVGProps<SVGSVGElement>) => (
  <svg
    baseProfile="tiny"
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    viewBox="0 0 42 42"
    xmlSpace="preserve"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M31 38.32 13.391 21 31 3.68 28.279 1 8 21.01 28.279 41z"
    />
  </svg>
)
export default SvgBack
