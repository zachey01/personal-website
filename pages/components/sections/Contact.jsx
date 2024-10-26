import React, { useState } from "react";
import Lottie from "lottie-react";
import { MdAlternateEmail } from "react-icons/md";
import sendTick from "../../../public/media/lotties/SendTick.json";

const Contact = () => {
  const [isSubmitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/formHandler", {
        method: "POST",
        body: JSON.stringify({ name, email, message }),
        headers: { "content-type": "application/json" },
      });
      if (res.status === 200) {
        setSubmitted(true);
      }
    } catch (error) {
      console.log("Error occurred: ", error);
    }
    setName("");
    setEmail("");
    setMessage("");
  };

  const handleSubmitReset = () => {
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div>
      {isSubmitted ? (
        <div className="border-0 border-red-500">
          <div>
            <Lottie
              animationData={sendTick}
              className="sm1:h-[10rem] md:h-[20rem] grayscale-0 border-0 border-red-500"
              loop={true}
            />
          </div>
          <div className="m-auto font-normal text-pink border-0 border-red-500 sm1:w-4/5 lg:w-3/5 xl:w-full md:text-center sm1:text-3xl md:text-5xl">
            Thanks for reaching out, I&apos;ll contact you soon
          </div>
        </div>
      ) : (
        <>
          <div className="relative z-10 flex w-10/12 m-auto text-white border-0 border-red-500 lg:flex-row sm1:flex-col">
            <div className="sm1:w-full lg:w-3/5">
              <div className="border-0 border-pink sm1:text-5xl md:text-9xl sm2:text-6xl sm3:text-7xl lg:text-8xl xl:text-10xl">
                <div className="font-extrabold leading-tight tracking-tighter">
                  Let<span className="text-pink">&apos;</span>s{" "}
                  <span className="font-archivo">work</span>
                </div>
                <div className="font-extrabold leading-tight tracking-tighter sm1:-mt-4 md:-mt-12 lg:-mt-12">
                  <span className="sm1:text-5xl md:text-8xl">— </span>
                  <span className="font-archivo text-pink">together</span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative z-10 flex w-10/12 m-auto text-white lg:flex-row sm1:flex-col lg:space-x-12">
            <div className="sm1:w-full lg:w-4/5 lg:-mt-20 xl:mt-10">
              <div className="p-10 m-auto border-0 xl:-mt-14 sm1:mt-12 md:mt-20 lg:mt-72 border-white/30 rounded-xl bg-pink/0 box-shadow-outForm">
                <form
                  onSubmit={submitForm}
                  className="sm1:space-y-8 md:space-y-16 rounded-2xl"
                >
                  <div className="font-light tracking-tighter sm1:text-3xl md:text-6xl">
                    Get <span className="text-white">in</span> touch
                  </div>
                  <div className="flex flex-col space-y-0 xl:space-y-2">
                    <label className="flex flex-row text-white">
                      <span className="mt-0 font-normal sm1:text-lg md:text-2xl lg:text-xl">
                        What&apos;s your name?
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="p-2 text-white bg-transparent pl-0 focus:pl-2 border-b-[0.01rem] border-pink focus:ring focus:rounded-xl focus:border-pink focus:outline-none md:w-full lg:w-full"
                    />
                  </div>
                  <div className="flex flex-col space-y-0 xl:space-y-2">
                    <label className="flex flex-row text-white">
                      <span className="mt-0 font-normal sm1:text-lg md:text-2xl lg:text-xl">
                        What&apos;s your email?
                      </span>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="p-2 text-white bg-transparent pl-0 focus:pl-2 border-b-[0.01rem] border-pink focus:ring focus:rounded-xl focus:border-pink focus:outline-none md:w-full lg:w-full"
                    />
                  </div>
                  <div className="flex flex-col space-y-0 xl:space-y-2">
                    <label className="flex flex-row text-white">
                      <span className="mt-0 font-normal sm1:text-md md:text-2xl lg:text-xl">
                        Type in your message
                      </span>
                    </label>
                    <textarea
                      placeholder="Enter your message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      className="p-2 text-white bg-transparent pl-0 focus:pl-2 border-b-[0.01rem] border-pink focus:ring focus:rounded-xl focus:border-pink focus:outline-none md:w-full lg:w-full"
                    />
                  </div>
                  <div className="flex flex-row md:space-x-10 sm1:space-x-4">
                    <button
                      type="submit"
                      className="font-extrabold text-black bg-pink transform transition ease-in-out duration-300 hover:scale-[1.05] sm1:p-1 md:text-2xl sm1:w-full lg:w-3/4 md:p-4 rounded-xl"
                    >
                      Send
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmitReset}
                      className="font-extrabold text-black bg-pink transform transition ease-in-out duration-300 hover:scale-[1.05] sm1:p-1 md:text-2xl sm1:w-full lg:w-3/4 md:p-4 rounded-xl"
                    >
                      Reset All
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Contact;
