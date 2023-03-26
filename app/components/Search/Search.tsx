import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Icon from '../Icon/Icon'
import { ICON } from '~/constants/constants'
import { useMovieList } from '~/contexts/movieListContext'
import { useNavigate } from '@remix-run/react'
import { useCombobox } from 'downshift'
import { cx } from '@emotion/css'
import { useDetectClickOutside } from 'react-detect-click-outside'

type SearchMovieProps = {
  placeholder?: string
}

const SearchMovie = ({ placeholder }: SearchMovieProps) => {
  const navigate = useNavigate()
  const { currentMovieSearch, setCurrentMovieSearch, currentAutoComplete } =
    useMovieList()
  const [items, setItems] = useState(currentAutoComplete)
  const [selectedItem, setSelectedItem] = useState('')
  const [expanded, setExpanded] = useState<boolean>(false)
  const ref = useDetectClickOutside({ onTriggered: closeSearch })
  const {
    isOpen,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    inputValue,
  } = useCombobox({
    id: 'lang-switcher',
    inputValue: currentMovieSearch,
    onInputValueChange({ inputValue }) {
      setItems(inputValue && inputValue.length >= 3 ? currentAutoComplete : [])
      onNavigateHandler(inputValue || '')
      setCurrentMovieSearch(inputValue || '')
      setCurrentMovieSearch(inputValue || '')
    },
    items,
    itemToString(item) {
      return item ? item : ''
    },
    selectedItem,
    onSelectedItemChange: ({ selectedItem: newSelectedItem }) => {
      if (newSelectedItem) setSelectedItem(newSelectedItem)
    },
  })

  useEffect(() => {
    if (currentMovieSearch && currentMovieSearch.length >= 3) {
      setItems(currentAutoComplete)
    }
  }, [currentAutoComplete, currentMovieSearch, inputValue])

  function closeSearch() {
    if (!currentMovieSearch) setExpanded(false)
  }

  const onClearInputHandler = () => {
    setCurrentMovieSearch('')
    onNavigateHandler('')
  }

  const onNavigateHandler = (typingValue: string) => {
    if (!typingValue) {
      navigate('../')
    } else {
      navigate('/search?q=' + typingValue)
    }
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
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="w-fit"
    >
      <div className="relative" ref={ref}>
        <div className="relative w-fit">
          <input
            {...getInputProps()}
            placeholder={placeholder || 'Search...'}
            value={inputValue}
            onMouseEnter={() => setExpanded(true)}
            onFocus={onFocusedHandler}
            onBlur={onBlurHandler}
            className={clsx(
              'rounded-[30px] px-5 py-2 text-white transition-all duration-1000 focus:outline-white',
              expanded
                ? 'h-[40px] w-[250px] bg-opacity-white pl-[40px]'
                : 'h-[40px] w-[40px] bg-red'
            )}
            autoComplete="off"
          />
          <span
            className="absolute left-2 top-2"
            onMouseEnter={() => setExpanded(true)}
          >
            <Icon type={ICON.SEARCH} color="white" />
          </span>
          {expanded && currentMovieSearch && (
            <span
              className="absolute right-2 top-2 cursor-pointer"
              onClick={onClearInputHandler}
            >
              <Icon type={ICON.CLOSE} color="white" />
            </span>
          )}
        </div>
        <ul
          className={`absolute top-[45px] mt-1 max-h-80 w-[250px] overflow-scroll rounded-lg bg-grey p-0 shadow-md ${
            !(isOpen && expanded && items.length) && 'hidden'
          }`}
          {...getMenuProps()}
        >
          {isOpen &&
            expanded &&
            items.map((item, index) => (
              <div key={`${item}${index}`}>
                {selectedItem !== item && (
                  <li
                    className={cx(
                      highlightedIndex === index && 'bg-lightGrey text-black',
                      'flex flex-col py-2 px-3 text-base shadow-sm'
                    )}
                    {...getItemProps({ item, index })}
                  >
                    <span>{item}</span>
                  </li>
                )}
              </div>
            ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default SearchMovie
