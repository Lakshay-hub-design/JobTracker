import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const AnimatedButton = ({ text }) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Button className="bg-primary text-white px-6 py-3 rounded-lg shadow-lg hover:opacity-90 transition-all">
      {text}
    </Button>
  </motion.div>
)
export default AnimatedButton