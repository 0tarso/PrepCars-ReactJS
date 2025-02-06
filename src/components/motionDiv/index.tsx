import { ReactNode } from 'react'
import { motion } from 'motion/react'

const MotionDiv = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      style={{
        width: 'auto',
        height: 'auto',
        // backgroundColor: 'blue',
        scale: 0.9
      }}
      whileInView={{
        opacity: 1,
        scale: 1 // Torna o conteúdo visível quando entra na tela
      }}
      initial={{ opacity: 0 }} // Inicialmente invisível
      viewport={{ once: false }} // Garante que o efeito será aplicado repetidamente
      transition={{ duration: 0.3 }} // Duração da transição
    >
      {children}
    </motion.div>
  )
}

export default MotionDiv