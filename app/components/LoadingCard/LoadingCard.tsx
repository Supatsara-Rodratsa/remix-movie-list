import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { COLORS } from '~/constants/constants'

const LoadingCard = () => {
  const loading: Variants = {
    show: {
      backgroundColor: [COLORS.DARK, COLORS.DARKER, COLORS.DARK],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'linear',
      },
    },
  }
  return (
    <div className="flex w-full flex-col gap-2">
      <motion.div
        variants={loading}
        animate="show"
        className="h-[150px] w-full rounded-md"
      ></motion.div>
      <motion.div
        variants={loading}
        animate="show"
        className="h-[6px] w-[90%]"
      ></motion.div>
      <motion.div
        variants={loading}
        animate="show"
        className="h-[6px]  w-[85%]"
      ></motion.div>
      <motion.div
        variants={loading}
        animate="show"
        className="h-[6px]  w-[80%]"
      ></motion.div>
    </div>
  )
}

export default LoadingCard
