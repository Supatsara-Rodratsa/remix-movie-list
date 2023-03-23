import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Icon from '../Icon/Icon'
import { ICON } from '~/constants/constants'
import { useMovieList } from '~/contexts/movieListContext'

type SearchMovieProps = {
  placeholder?: string
}

const SearchMovie = ({ placeholder }: SearchMovieProps) => {
  const { currentMovieSearch, setCurrentMovieSearch } = useMovieList()
  const [expanded, setExpanded] = useState<boolean>(false)

  const onChangeHandler = (typingValue: string) => {
    console.log(typingValue)
    setCurrentMovieSearch(typingValue)
    setCurrentMovieSearch(typingValue)
  }

  const onMouseLeaveHandler = () => {
    setExpanded(!!currentMovieSearch)
  }

  const onFocusedHandler = () => {
    setExpanded(true)
  }

  const onBlurHandler = () => {
    setExpanded(!!currentMovieSearch)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2 }}
      className="w-fit"
    >
      <div className="relative w-fit">
        <input
          placeholder={placeholder || (expanded && 'Search...') || ''}
          id="search"
          value={currentMovieSearch}
          onMouseEnter={() => setExpanded(true)}
          onFocus={onFocusedHandler}
          onBlur={onBlurHandler}
          onMouseLeave={onMouseLeaveHandler}
          onChange={(event) => onChangeHandler(event.target.value)}
          className={clsx(
            'rounded-[30px] px-5 py-2 text-white transition-all duration-1000 focus:outline-white',
            expanded
              ? 'h-[40px] w-[250px] bg-opacity-white pl-[40px]'
              : 'h-[40px] w-[40px] bg-red'
          )}
        />
        <span className="absolute left-2 top-2">
          <Icon type={ICON.SEARCH} color="white" />
        </span>
        {expanded && currentMovieSearch && (
          <span
            className="absolute right-2 top-2 cursor-pointer"
            onClick={() => setCurrentMovieSearch('')}
          >
            <Icon type={ICON.CLOSE} color="white" />
          </span>
        )}
      </div>
    </motion.div>
  )
}

export default SearchMovie
