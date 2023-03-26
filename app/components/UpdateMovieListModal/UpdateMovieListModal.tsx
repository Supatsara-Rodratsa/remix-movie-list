import { sdk } from '~/libs/client'
import Button from '../Button'
import ModalDialog from '../Modal'
import { useEffect, useState } from 'react'

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
  //   updateMovieListStatus: (listItems: ListItemProps[]) => void
}

const UpdateMovieListModal = ({
  isOpen,
  onClose,
  listItems,
  currentMovieId,
}: UpdateMovieListModalProps) => {
  const [open, setIsOpen] = useState<boolean>(isOpen)
  const [items, setItems] = useState([...listItems])

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

  const onUpdateNewMovieListHandler = async () => {
    console.log(listItems)
    items.forEach(async (item) => {
      const oldValue = listItems.find((it) => it.id === item.id)
      if (!oldValue?.status && item.status) {
        await sdk.AddMovie({
          listId: item.id,
          imdbId: currentMovieId,
        })
      }
    })

    onClose('close')
  }

  return (
    <ModalDialog isOpen={open} onClose={onClose}>
      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="text-2xl font-bold">Your Movie List</h1>
        <div className="flex w-full flex-col items-start gap-4">
          {items.map((item, index) => (
            <div key={item.id}>
              <label className="flex gap-2 text-base">
                <input
                  type="checkbox"
                  name={item.name}
                  checked={item.status}
                  onChange={() => handleChange(index)}
                />
                {item.name}
              </label>
            </div>
          ))}
        </div>
        <div className="flex w-full justify-end">
          <Button label="Done" bg="red" onClick={onUpdateNewMovieListHandler} />
        </div>
      </div>
    </ModalDialog>
  )
}

export default UpdateMovieListModal
