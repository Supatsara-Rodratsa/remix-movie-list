import { motion } from 'framer-motion'
import { STATUS } from '~/constants/constants'
import type { Status } from '~/types/types'

const Toast = ({ statusKey }: { statusKey: Status | null }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: statusKey ? '280px' : '280px' }}
      animate={{ opacity: 1, x: statusKey ? '0' : '300px' }}
      transition={{
        type: 'spring',
        damping: 60,
        mass: 1,
        stiffness: 200,
      }}
      className="fixed right-[20px] top-[100px] z-[99] min-h-[50px] min-w-[240px] rounded-lg bg-white p-4 text-black"
    >
      <p className="text-base">{statusKey && STATUS[statusKey]}</p>
    </motion.div>
  )
}

export default Toast
