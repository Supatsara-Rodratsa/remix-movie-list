import clsx from 'clsx'
import { useState } from 'react'
import Icon from '../Icon'
import { ICON } from '~/constants/constants'
import { motion } from 'framer-motion'

type MovieListItemProps = {
  id: number
  name: string
  index: number
  isEdit?: boolean
  isLastItem?: boolean
  onRemoveItem(): void
}

const MovieListItem = ({
  id,
  name,
  index,
  isEdit = false,
  isLastItem = false,
  onRemoveItem,
}: MovieListItemProps) => {
  const [hover, setHover] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={clsx(
        'flex w-full items-center justify-between border-b border-white bg-black px-4 py-4 transition-all duration-[600ms] ease-in-out',
        hover ? 'bg-white' : 'bg-transparent',
        isEdit ? 'cursor-default' : 'cursor-pointer',
        isLastItem && isEdit && 'border-none'
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex items-center gap-8">
        <div
          className={clsx(
            hover ? 'bg-black text-white' : 'bg-white text-black',
            'flex h-[24px] w-[24px] items-center justify-center rounded-full'
          )}
        >
          {index}
        </div>
        <p className={clsx('text-lg', hover ? 'text-black' : 'text-white')}>
          {name}
        </p>
      </div>
      <div
        className={clsx(isEdit ? 'cursor-pointer' : 'cursor-grab')}
        onClick={onRemoveItem}
      >
        <Icon
          type={isEdit ? ICON.CLOSE : ICON.DRAG}
          color={hover ? 'black' : 'white'}
        />
      </div>
    </motion.div>
  )
}

export default MovieListItem
