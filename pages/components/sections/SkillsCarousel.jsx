import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Archivo_Black } from "next/font/google";
import { FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiPython,
  SiBlender,
  SiBun,
} from "react-icons/si";

const archivo = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo",
  display: "swap",
});

const Skills = [
  {
    id: 1,
    name: "React.js",
    icon: <FaReact size={100} />,
  },
  {
    id: 2,
    name: "Node.js",
    icon: <FaNodeJs size={100} />,
  },
  {
    id: 3,
    name: "Next.js",
    icon: <SiNextdotjs size={100} />,
  },
  {
    id: 4,
    name: "Tailwind",
    icon: <SiTailwindcss size={100} />,
  },
  {
    id: 5,
    name: "Python",
    icon: <SiPython size={100} />,
  },
  {
    id: 6,
    name: "Blender",
    icon: <SiBlender size={100} />,
  },
  {
    id: 7,
    name: "Bun",
    icon: <SiBun size={100} />,
  },
];

const SkillsCarousel = () => {
  const { scrollYProgress } = useScroll();
  const toRight = useTransform(scrollYProgress, [0, 1], [-500, 100]);
  const toLeft = useTransform(scrollYProgress, [0, 1], [10, -1000]);

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="font-extrabold tracking-tighter text-white border-0 border-red-500 font-mine2 md:text-10xl sm1:text-8xl"
        style={{ x: toRight }}
      >
        <span className={archivo.className}>
          {Array.from({ length: 10 }).map((_, index) => (
            <span key={index} className="font-stencil-scrollnew">
              LANGUAGES
            </span>
          ))}
        </span>
      </motion.div>
      <motion.div
        style={{ x: toLeft }}
        className="tracking-tight text-white border-0 border-red-500 sm1:mt-0 md:mt-4 md:text-10xl sm1:text-8xl"
      >
        <span className={archivo.className}>
          {Array.from({ length: 10 }).map((_, index) => (
            <span key={index}>FRAMEWORKS</span>
          ))}
        </span>
      </motion.div>
      <div className="mt-4 text-xl font-bold tracking-tighter text-center text-pink">
        Technical Proficiency
      </div>
      <div className="flex m-auto overflow-x-auto whitespace-nowrap mt-6">
        <div className="flex justify-center items-center space-x-8">
          {Skills.map((skill) => (
            <div key={skill.id} className="flex flex-col items-center">
              <div className="p-2 rounded-0 aspect-square">{skill.icon}</div>
              <div className="w-3/5 p-2 m-auto mt-2 font-normal tracking-tighter text-center text-white bg-white/20 rounded-xl">
                {skill.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsCarousel;
