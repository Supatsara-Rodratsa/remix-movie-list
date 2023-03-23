import { motion } from 'framer-motion'
import SearchMovie from '../Search/Search'
import { Link } from '@remix-run/react'

const Nav = () => {
  return (
    <motion.div
      key="nav"
      initial={{ opacity: 1, y: -80 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 1.5 } }}
      className="fixed top-0 z-[99] flex w-full bg-black px-10 py-5 text-lg text-white"
    >
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex gap-10 mobile:gap-4">
          <Link to="/" className="hover:text-red">
            Your Movie List
          </Link>
        </div>
        <SearchMovie />
      </div>
    </motion.div>
  )
}

export default Nav
