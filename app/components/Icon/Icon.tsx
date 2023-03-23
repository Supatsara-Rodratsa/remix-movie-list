import { ICON } from '~/constants/constants'
import type { IconCategory } from '~/types/types'
import {
  Back,
  Calendar,
  Close,
  EmptyHeart,
  EmptyStar,
  FillHeart,
  FullStar,
  HalfStar,
  Rating,
  Search,
  Drag,
  Edit,
} from '../icons'

type IconProps = {
  color?: string
  size?: string
  type: IconCategory
}

const Icon = ({ color, size, type }: IconProps) => {
  switch (type) {
    case ICON.CALENDAR: {
      return (
        <Calendar
          fill={color}
          stroke={color}
          width={size || '24px'}
          height={size || '24px'}
        />
      )
    }
    case ICON.RATING: {
      return (
        <Rating
          fill={color}
          stroke={color}
          width={size || '24px'}
          height={size || '24px'}
        />
      )
    }
    case ICON.SEARCH: {
      return (
        <Search
          fill={color}
          stroke={color}
          width={size || '24px'}
          height={size || '24px'}
        />
      )
    }
    case ICON.FULL_STAR: {
      return (
        <FullStar
          fill={color}
          stroke={color}
          width={size || '24px'}
          height={size || '24px'}
        />
      )
    }
    case ICON.HALF_STAR: {
      return (
        <HalfStar
          fill={color}
          stroke={color}
          width={size || '24px'}
          height={size || '24px'}
        />
      )
    }
    case ICON.EMPTY_STAR: {
      return (
        <EmptyStar
          fill={color}
          stroke={color}
          width={size || '24px'}
          height={size || '24px'}
        />
      )
    }
    case ICON.EMPTY_HEART: {
      return (
        <EmptyHeart
          fill={color}
          stroke={color}
          width={size || '24px'}
          height={size || '24px'}
        />
      )
    }
    case ICON.FILL_HEART: {
      return (
        <FillHeart
          fill={color}
          stroke={color}
          width={size || '24px'}
          height={size || '24px'}
        />
      )
    }
    case ICON.BACK: {
      return (
        <Back
          fill={color}
          stroke={color}
          width={size || '24px'}
          height={size || '24px'}
        />
      )
    }
    case ICON.CLOSE: {
      return (
        <Close
          fill={color}
          stroke={color}
          width={size || '24px'}
          height={size || '24px'}
        />
      )
    }
    case ICON.DRAG: {
      return (
        <Drag
          fill={color}
          stroke={color}
          width={size || '24px'}
          height={size || '24px'}
        />
      )
    }
    case ICON.EDIT: {
      return (
        <Edit
          fill={color}
          stroke={color}
          width={size || '24px'}
          height={size || '24px'}
        />
      )
    }
    default: {
      return <div></div>
    }
  }
}

export default Icon
