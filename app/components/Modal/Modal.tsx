import clsx from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { ICON } from '~/constants/constants'
import Icon from '../Icon'

type ModalDialogProps = {
  isOpen: boolean
  onClose(val: string): void
  children: ReactNode
}
const ModalDialog = ({ isOpen, onClose, children }: ModalDialogProps) => {
  const [open, setOpen] = useState(isOpen)

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  const handleClose = () => {
    setOpen(false)
    onClose('close')
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className={clsx(
            'fixed inset-0 z-10 overflow-y-auto',
            open ? 'block' : 'hidden'
          )}
        >
          <div className="flex min-h-screen items-center justify-center">
            <div className="relative z-20 m-10 rounded-lg bg-white p-6 text-black">
              <div className="absolute top-[50%] left-[50%] z-[999] h-fit min-w-[400px] -translate-x-[50%] -translate-y-[50%] rounded-lg bg-white p-[35px] pb-[30px] text-center focus:outline-none">
                <div
                  className="absolute top-[16px] right-[16px] cursor-pointer"
                  onClick={() => handleClose()}
                >
                  <Icon type={ICON.CLOSE} size="20px" />
                </div>
                {children}
              </div>
            </div>
            <div className="fixed inset-0 z-10 bg-black opacity-75"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ModalDialog
