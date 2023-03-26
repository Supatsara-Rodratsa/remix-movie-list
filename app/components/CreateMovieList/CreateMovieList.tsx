import clsx from 'clsx'
import { useEffect, useState } from 'react'
import Button from '~/components/Button'
import ModalDialog from '~/components/Modal'
import { MY_EMAIL_KEY } from '~/constants/constants'
import { useMovieList } from '~/contexts/movieListContext'
import type { MovieList } from '~/generated/graphql'
import { sdk } from '~/libs/client'

type CreateMoveListProp = {
  isOpen: boolean
  onClose(val: string): void
  updateNewMovieListValue: (newValue: Pick<MovieList, 'id' | 'name'>) => void
  movieList: string[]
}

const CreateMoveList = ({
  isOpen,
  onClose,
  updateNewMovieListValue,
  movieList,
}: CreateMoveListProp) => {
  const { setCurrentStatus } = useMovieList()
  const [open, setIsOpen] = useState<boolean>(isOpen)
  const [currentValue, setCurrentValue] = useState<string>('')
  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    setIsOpen(isOpen)
  }, [isOpen])

  const onChangeHandler = (typingValue: string) => {
    const foundName = movieList.some(
      (name) => name === typingValue.toLowerCase()
    )
    setIsError(foundName)
    setCurrentValue(typingValue)
  }

  const onCreateNewMovieListHandler = async () => {
    if (!isError) {
      const { createList } = await sdk.createMovieList({
        input: {
          name: currentValue,
          email: MY_EMAIL_KEY,
        },
      })
      if (createList) {
        updateNewMovieListValue(createList)
        setIsOpen(false)
        onClose('close')
        setCurrentValue('')
        setCurrentStatus('CREATE')
      }
    }
  }

  return (
    <ModalDialog isOpen={open} onClose={onClose}>
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex w-full flex-col items-center gap-4">
          <h1 className="text-2xl font-bold">Create New Movie List</h1>
          <div className="relative flex h-9 w-full flex-col items-end">
            <input
              className="absolute box-border w-full transform border-b border-black py-1 pt-3 placeholder-grey placeholder-opacity-100 outline-none transition duration-500 ease-in-out focus:border-b-2 focus:border-red focus:placeholder:absolute focus:placeholder:top-0 focus:placeholder:text-[12px] "
              placeholder="Enter your new movie list name"
              type="text"
              value={currentValue}
              onChange={(event) => onChangeHandler(event.target.value)}
            />
          </div>
          <p
            className={clsx(
              'w-full text-start text-sm text-red',
              isError ? 'opacity-100' : 'opacity-0'
            )}
          >
            This movie list name is already taken.
          </p>
        </div>
        <div className="flex w-full justify-end">
          <Button
            label="Create"
            bg="red"
            onClick={onCreateNewMovieListHandler}
          />
        </div>
      </div>
    </ModalDialog>
  )
}

export default CreateMoveList
