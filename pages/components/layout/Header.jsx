import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import { Twirl as Hamburger } from "hamburger-react";

// Вынесем варианты анимации в отдельный файл или выше в коде, чтобы они не создавались заново при каждом рендере
const sliderVariants = {
  initial: {
    scaleY: 0,
    opacity: 0,
  },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: [0.12, 0, 0.39, 0],
    },
  },
  exit: {
    scaleY: 0,
    opacity: 0,
    transition: {
      delay: 1,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Header = ({ isOpen, toggleClose, toggleOpen }) => {
  const LinkItem = ({ href, scroll, children }) => (
    <div className="mr-4 last:mr-0">
      {" "}
      {/* Добавление правого отступа и удаление его у последнего элемента */}
      <Link href={href} scroll={scroll} className="hover:text-pink">
        {children}
      </Link>
    </div>
  );

  return (
    <div>
      <div className="fixed z-50 flex justify-between text-white bg-red-400 sm1:hidden md:block">
        <div className="fixed mt-12 ml-20 text-sm tracking-tighter border-0 w-fit">
          <div>{process.env.name}</div>
          <div>Full Stack Developer</div>
        </div>
        <div className="fixed right-0 flex justify-between mt-12 mr-20 border-0 w-fit">
          <div className="text-sm flex">
            <LinkItem href="#about">About</LinkItem>
            <LinkItem href="#projects">Projects</LinkItem>
            <LinkItem href="#contact" scroll={false}>
              Contact
            </LinkItem>
          </div>
        </div>
      </div>
      <div>
        <div className="fixed z-50 mt-12 text-sm tracking-tighter text-white border-0 sm1:ml-4 md:ml-20 w-fit">
          <div>{process.env.name}</div>
          <div>Full Stack Developer</div>
        </div>
        <div className="fixed right-0 z-50 mt-12 mr-2 text-white">
          <div className="sm1:block md:hidden">
            <div className="p-0 -mt-2 bg-[#fff] border-0 w-fit rounded-4xl">
              <Hamburger
                color="#0D0D0D"
                toggled={isOpen}
                toggle={isOpen ? toggleClose : toggleOpen}
                size={20}
              />
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={sliderVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="origin-top bg-black border-0"
          >
            <Navbar
              toggleOpen={toggleOpen}
              toggleClose={toggleClose}
              isOpen={isOpen}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
