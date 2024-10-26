import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ScrollText from "./ScrollText";
const scrollData = [
  {
    id: "1",
    heading1: "a full-stack",
    heading2: "developer",
    maskText: "Creative Side :)",
    description:
      "I'm a full-stack developer with experience in Next.js, Three.js, and more. I've honed my skills through books and YouTube tutorials, constantly pushing the boundaries of web development.",
    imgUrl: "/media/images/working.png",
  },
  {
    id: "2",
    heading1: "beyond",
    heading2: "the workspace",
    maskText: "Hobbies and Exploration :)",
    description:
      "In my spare time, I enjoy gaming, reading manga, creating animations and posters in Blender, and developing desktop applications in Python. These hobbies complement my professional interests, providing a balance between technology and creativity.",
    imgUrl: "/media/images/relaxing.png",
  },
];
const textVariants = {
  initial: {
    y: 100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.75,
      ease: "easeInOut",
    },
  },
};

const Scroll = () => {
  const containerRef = useRef(null);
  const [view, setView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setView(true);
          } else {
            setView(false);
          }
        });
      },
      {
        root: document.querySelector("parent"),
        threshold: 0.1,
        rootMargin: "0px 0px 0px 0px",
      }
    );

    observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);
  const [currentImage, setCurrentImage] = useState(0);
  return (
    <div
      ref={containerRef}
      className="relative flex w-full overflow-hidden border-0 border-red-500 lg:pt-40 parent"
    >
      <div className="overflow-hidden border-0 border-gray-500 lg:w-3/5 sm3:w-full">
        {scrollData.map((screen, i) => (
          <motion.div
            variants={textVariants}
            initial="initial"
            whileInView="animate"
            className="flex flex-col md:mb-[30em] sm1:mb-[4em] sm1:mt-16 sm2:mt-20 md:mt-40 2xl:mt-20"
            key={i}
          >
            <ScrollText
              screen={screen}
              i={i}
              setCurrentImage={setCurrentImage}
              className="border-0 border-pink"
            />
            <div className="rounded-lg">
              <Image
                src={screen.imgUrl}
                key={screen.imgUrl}
                alt=""
                height={200}
                width={300}
                className="h-64 m-auto transition grayscale transform sm3:w-72 sm3:h-72 box-shadow-out sm1:w-64 md:w-4/5 md:h-100 lg:hidden slide-right opacity-75"
              ></Image>
            </div>
          </motion.div>
        ))}
      </div>
      <div
        className={`sm1:hidden lg:flex fixed top-20 lg:right-0 md:right-2 w-2/5 border-0 border-green-500 h-fit flex justify-around ${
          view ? "visible" : "not-visible"
        }`}
      >
        <div className="h-full xl:w-80 lg:w-80 rounded-lg">
          {" "}
          <Image
            src={scrollData[currentImage].imgUrl}
            key={scrollData[currentImage].imgUrl}
            alt=""
            height={500}
            width={800}
            className="object-cover p-2 pt-0 transition transform duration-[1000ms] slide-right h-100 grayscale "
          ></Image>
        </div>
      </div>
    </div>
  );
};
export default Scroll;
