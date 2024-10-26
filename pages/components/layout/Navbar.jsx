import Link from "next/link";
import { motion } from "framer-motion";

const MenuItems = [
  {
    id: 1,
    linkedSection: "#home",
    name: "Home",
  },
  {
    id: 2,
    linkedSection: "#about",
    name: "About",
  },
  {
    id: 3,
    linkedSection: "#projects",
    name: "Projects",
  },
  {
    id: 4,
    linkedSection: "#contact",
    name: "Contact",
  },
];

const containerVariants = {
  initial: {
    transition: {
      staggerDirection: -1,
      staggerChildren: 0.09,
    },
  },
  animate: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.09,
      staggerDirection: 1,
    },
  },
};

const linkVariants = {
  initial: {
    opacity: 0,
    y: "10vh",
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1],
    },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      duration: 0.7,
    },
  },
};

const Navbar = ({ toggleOpen, toggleClose, isOpen }) => {
  return (
    <div className="w-full overflow-auto border-0 border-red-500">
      <motion.div className="max-h-screen pt-20 text-black bg-white border-t-0 border-red-500">
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="initial"
          className="font-extrabold"
        >
          {MenuItems.map((item) => {
            return (
              <div
                key={item.id}
                className="m-auto text-center sm1:space-y-4 sm3:space-y-6 md:space-y-10 sm1:w-full sm1:text-3xl sm3:text-2xl md:text-5xl md:w-3/4"
              >
                <Link
                  className="transition delay-200 border-0 border-red-500"
                  href={`${item.linkedSection}`}
                  target={`${item.name == "Resume" ? "_blank" : ""}`}
                  scroll={false}
                >
                  <motion.button
                    variants={linkVariants}
                    onClick={isOpen ? toggleClose : toggleOpen}
                    className=""
                  >
                    <div className="text-4xl">{item.name}</div> &nbsp;
                  </motion.button>
                </Link>
              </div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Navbar;
