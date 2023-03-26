import { sdk } from '~/libs/client'
import Button from '../Button'
import ModalDialog from '../Modal'
import { useEffect, useState } from 'react'
import { MY_EMAIL_KEY } from '~/constants/constants'

export type ListItemProps = {
  id: number
  name: string
  status: boolean
}

type UpdateMovieListModalProps = {
  isOpen: boolean
  onClose(val: string): void
  listItems: ListItemProps[]
  currentMovieId: string
}

const UpdateMovieListModal = ({
  isOpen,
  onClose,
  listItems,
  currentMovieId,
}: UpdateMovieListModalProps) => {
  const [open, setIsOpen] = useState<boolean>(isOpen)
  const [items, setItems] = useState([...listItems])
  const [showCreateNewList, setShowCreateNewList] = useState<boolean>(false)
  const [currentValue, setCurrentValue] = useState<string>('')
  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    setIsOpen(isOpen)
  }, [isOpen])

  const handleChange = (index: number) => {
    items[index] = {
      ...items[index],
      status: !items[index].status,
    }
    setItems([...items])
  }

  const onChangeHandler = (typingValue: string) => {
    const foundName = listItems
      .map((list) => list.name.toLowerCase())
      .some((name) => name === typingValue.toLowerCase())
    setIsError(foundName)
    setCurrentValue(typingValue)
  }

  const onAddMovieHandler = async ({
    listId,
    imdbId,
  }: {
    listId: number
    imdbId: string
  }) => {
    await sdk.AddMovie({
      listId,
      imdbId,
    })
  }

  const createNewMovieList = async () => {
    if (currentValue) {
      const { createList } = await sdk.createMovieList({
        input: {
          name: currentValue,
          email: MY_EMAIL_KEY,
        },
      })

      if (createList) {
        onAddMovieHandler({ listId: createList.id, imdbId: currentMovieId })
        setCurrentValue('')
      }
    }
  }

  const UpdateNewMovieList = () => {
    items.forEach(async (item) => {
      const oldValue = listItems.find((it) => it.id === item.id)
      if (!oldValue?.status && item.status) {
        onAddMovieHandler({ listId: item.id, imdbId: currentMovieId })
      }
    })
  }

  const onUpdateNewMovieListHandler = async () => {
    if (!isError) {
      UpdateNewMovieList()
      createNewMovieList()
      onClose('close')
    }
  }

  return (
    <ModalDialog isOpen={open} onClose={onClose}>
      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="text-xl font-bold">SELECT YOUR MOVIE LIST</h1>
        <div className="flex w-full flex-col items-start gap-4">
          {items.map((item, index) => (
            <div key={item.id}>
              <label className="flex items-center justify-center gap-2 text-base">
                <input
                  className="form-checkbox h-4 w-4 rounded-md accent-red"
                  type="checkbox"
                  name={item.name}
                  checked={item.status}
                  onChange={() => handleChange(index)}
                />
                {item.name}
              </label>
            </div>
          ))}
          {!showCreateNewList && (
            <div
              className="flex w-full cursor-pointer items-center gap-2 py-1 px-1 hover:bg-lightGrey"
              onClick={() => setShowCreateNewList(true)}
            >
              <p className="text-[22px] font-light">+</p>
              <p className="text-base">Create New Movie List</p>
            </div>
          )}
          {showCreateNewList && (
            <div className="flex w-full flex-col">
              <input
                className=" box-border w-full transform border-b border-black py-1 pt-3 placeholder-grey placeholder-opacity-100 outline-none transition duration-500 ease-in-out focus:border-b-2 focus:border-red focus:placeholder:absolute focus:placeholder:top-0 focus:placeholder:text-[12px] "
                placeholder="Enter your new movie list name"
                type="text"
                value={currentValue}
                onChange={(event) => onChangeHandler(event.target.value)}
              />
              {isError && (
                <p className="w-full text-start text-sm text-red">
                  This movie list name is already taken.
                </p>
              )}
            </div>
          )}
        </div>
        <div className="flex w-full justify-end">
          <Button label="Done" bg="red" onClick={onUpdateNewMovieListHandler} />
        </div>
      </div>
    </ModalDialog>
  )
}

export default UpdateMovieListModal
