import { motion, AnimatePresence } from "framer-motion";

const modal = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "200px",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const backdrop = {
  visible: { opacity: 1},
  hidden: { opacity: 0}
}

const CloseIcon = () => {
  return (
    <svg width="35" height="35" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fillOpacity="0.01"/><path d="M14 14L34 34" stroke="#333" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 34L34 14" stroke="#333" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>
  )
}

const Modal = ({ title, isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
          <motion.div className="fixed top-0 left-0 w-full h-full backdrop z-40"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          >
            <motion.div className="max-w-md rounded-lg p-5 bg-white shadow-lg mx-auto"
              variants={modal}
            >
              <div className="flex justify-between mb-2">
                <h1 className="text-2xl font-bold mb-4">{title}</h1>
                <div style={{padding: '2px', cursor: 'pointer'}} onClick={onClose}><CloseIcon className="hover:bg-gray-700" /></div>
              </div>
              {children}
            </motion.div>
          </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;