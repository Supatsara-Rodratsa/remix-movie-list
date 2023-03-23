import * as React from 'react'
import type { SVGProps } from 'react'
const SvgCalendar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={800}
    height={800}
    viewBox="0 0 1920 1920"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1411.824 0c31.171 0 56.47 25.299 56.47 56.471v56.47h169.412c93.404 0 169.412 76.01 169.412 169.412V1920H113V282.353c0-93.402 76.009-169.412 169.412-169.412h169.411v-56.47c0-31.172 25.3-56.471 56.471-56.471 31.172 0 56.471 25.299 56.471 56.471v56.47h790.589v-56.47c0-31.172 25.299-56.471 56.47-56.471Zm169.413 1242.354h-338.823v338.823h338.823v-338.823Zm-451.766 0H790.647v338.823h338.824v-338.823Zm-451.765 0H338.882v338.823h338.824v-338.823Zm903.531-451.766h-338.823v338.824h338.823V790.588Zm-451.766 0H790.647v338.824h338.824V790.588Zm-451.765 0H338.882v338.824h338.824V790.588ZM451.823 225.882H282.412c-31.059 0-56.47 25.299-56.47 56.471v169.412h1468.234V282.353c0-31.172-25.411-56.471-56.47-56.471h-169.412v56.471c0 31.172-25.299 56.471-56.47 56.471s-56.47-25.299-56.47-56.471v-56.471H564.765v56.471c0 31.172-25.299 56.471-56.471 56.471-31.171 0-56.471-25.299-56.471-56.471v-56.471Z"
      fillRule="evenodd"
    />
  </svg>
)
export default SvgCalendar