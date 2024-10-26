import React, { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import Scroll from "./Scroll";
import { Archivo_Black } from "next/font/google";

const archivo = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo",
  display: "swap",
  adjustFontFallback: false,
});

const boxVariants = {
  initial: {
    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
  },
  animate: {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
    transition: { duration: 0.7, delay: 1, type: "tween", ease: "linear" },
  },
};

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  return `${formattedDay}-${formattedMonth}-${year}`;
}

const About = () => {
  const imageRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const toLeft = useTransform(scrollYProgress, [0, 1], [0, -2000]);
  const toRight1 = useTransform(scrollYProgress, [0, 1], [-1000, 100]);
  const toRight2 = useTransform(scrollYProgress, [0, 1], [100, -1000]);
  const toUp = useTransform(scrollYProgress, [0, 1], [120, -800]);
  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);

  // Generate repeated "about me" text with alternating class names
  const aboutMeText = Array.from({ length: 16 }, (_, i) => (
    <span key={i} className={i % 2 === 0 ? "font-stencil-scroll" : ""}>
      about me{" "}
    </span>
  ));

  return (
    <div className="bg-[#000] text-white">
      <div className="w-2/3 m-auto border-0 border-red-500 md:text-sm sm1:text-xs fontwt">
        <div className="border-0 border-red-500 xl:w-1/5 sm1:w-4/5 md:w-2/5">
          Available for freelance & remote jobs/internships after
        </div>
        <div className="mt-2 font-bold text-pink border-0 border-red-500 sm1:text-sm md:text-lg">
          {formattedDate}
        </div>
      </div>
      <motion.div
        className="font-extrabold leading-[4rem] tracking-tighter text-10xl text-white mt-10 whitespace-nowrap uppercase"
        style={{ x: toLeft }}
      >
        <span className={`sm1:text-7xl md:text-10xl ${archivo.className}`}>
          {aboutMeText}
        </span>
      </motion.div>
      <motion.div
        className={`relative z-10 sm1:w-10/12 md:w-2/3 m-auto md:-mt-24 sm1:-mt-16 border-0 border-red-500`}
        style={{ y: toUp }}
        variants={boxVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        ref={imageRef}
      ></motion.div>
      <motion.div
        style={{ y: toUp }}
        className="w-2/3 m-auto border-0 border-red-500 md:mt-20 sm1:mt-10"
      >
        <div className="border-0 border-red-500 xl:w-1/3 sm1:w-full sm1:text-sm md:text-md md:w-2/3 mt-8">
          I am a self taught full stack web developer with experience in
          creating digital interfaces, websites and have the ability to bring
          those concepts to life.
        </div>
      </motion.div>

      <div className="lg:pb-80">
        <Scroll />
      </div>
    </div>
  );
};

export default About;
