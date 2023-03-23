import { useEffect, useState } from 'react'
import Button from '~/components/Button'
import ModalDialog from '~/components/Modal'
import { MY_EMAIL_KEY } from '~/constants/constants'
import { sdk } from '~/libs/client'

type CreateMoveListProp = {
  isOpen: boolean
  onClose(val: string): void
}

const CreateMoveList = ({ isOpen, onClose }: CreateMoveListProp) => {
  const [open, setIsOpen] = useState<boolean>(isOpen)
  const [currentValue, setCurrentValue] = useState<string>('')

  useEffect(() => {
    setIsOpen(isOpen)
  }, [isOpen])

  const onChangeHandler = (typingValue: string) => {
    setCurrentValue(typingValue)
  }

  const onCreateNewMovieListHandler = async () => {
    const { createList } = await sdk.createMovieList({
      input: {
        name: currentValue,
        email: MY_EMAIL_KEY,
      },
    })
    if (createList) {
      setIsOpen(false)
      onClose('close')
      setCurrentValue('')
    }
  }

  return (
    <ModalDialog isOpen={open} onClose={onClose}>
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="flex w-full flex-col items-center gap-4">
          <h1 className="text-2xl font-bold">Create New Movie List</h1>
          <div className="relative flex h-9 w-full items-end">
            <input
              className="absolute box-border w-full transform border-b border-black py-1 pt-3 placeholder-grey placeholder-opacity-100 outline-none transition duration-500 ease-in-out focus:border-b-2 focus:border-red focus:placeholder:absolute focus:placeholder:top-0 focus:placeholder:text-[12px] "
              placeholder="Enter your new movie list name"
              type="text"
              value={currentValue}
              onChange={(event) => onChangeHandler(event.target.value)}
            />
          </div>
        </div>
        <div className="flex w-full justify-end">
          <Button
            label="Create"
            customStyle="rounded-[30px] hover:bg-black hover:text-white text-[16px] py-[6px] px-4 min-w-[0]"
            onClick={onCreateNewMovieListHandler}
          />
        </div>
      </div>
    </ModalDialog>
  )
}

export default CreateMoveList
