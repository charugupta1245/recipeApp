"use client";
import { motion, useInView } from "framer-motion";
import Head from "next/head";
import { useRef } from "react";

export default function Homethree() {
  const topLeftRef = useRef(null);
  const bottomLeftRef = useRef(null);
  const rightRef = useRef(null);

  const topLeftInView = useInView(topLeftRef, { once: false });
  const bottomLeftInView = useInView(bottomLeftRef, { once: false });
  const rightInView = useInView(rightRef, { once: false });

  return (
    <div className="bg-gray-100 font-roboto min-h-screen flex items-center justify-center">
      <Head>
        <title>Recipe Manager App</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-white">
        <motion.div
          ref={topLeftRef}
          className="absolute top-0 left-0 w-1/3 h-1/3"
          initial={{ opacity: 0, x: -100 }}
          animate={
            topLeftInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }
          }
          transition={{ duration: 1 }}
        >
          <img
            src="https://storage.googleapis.com/a1aa/image/MUO9XcwLjYFyLD6KFL6varbKj9fwh1lc8h3QSuj0-fg.jpg"
            alt="A bowl of green pasta"
            className="rounded-full"
            width="300"
            height="300"
          />
        </motion.div>
        <motion.div
          ref={bottomLeftRef}
          className="absolute bottom-0 left-0 w-1/3 h-1/3"
          initial={{ opacity: 0, x: -100 }}
          animate={
            bottomLeftInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }
          }
          transition={{ duration: 1, delay: 0.5 }}
        >
          <img
            src="https://storage.googleapis.com/a1aa/image/t8ncwRau2ZoQ8C1tN466On1l6Y78hW2X6c1mByd3jQ0.jpg"
            alt="A bowl of chopped vegetables"
            className="rounded-full"
            width="300"
            height="300"
          />
        </motion.div>
        <div className="text-center z-10 p-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            All-in-one recipe manager &amp; planner app
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            The ultimate recipe organiser for easy access to all of your recipes
            on all of your devices
          </p>
          <div className="mt-8 flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <a
              className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              href="#"
            >
              <i className="fab fa-apple"></i>
              <span>Download on the App Store</span>
            </a>
            <a
              className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              href="#"
            >
              <i className="fab fa-google-play"></i>
              <span>Get it on Google Play</span>
            </a>
            <a
              className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              href="#"
            >
              <i className="fas fa-globe"></i>
              <span>Login to the Web App</span>
            </a>
          </div>
        </div>
        <motion.div
          ref={rightRef}
          className="absolute right-0 bottom-0 w-1/3 h-1/3"
          initial={{ opacity: 0, x: 100 }}
          animate={rightInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <img
            src="https://storage.googleapis.com/a1aa/image/cwNk5REljwnQKx22PhhRMaD_qS_LxPXtlYGJfI6v3uU.jpg"
            alt="A smartphone displaying the CookBook app"
            className="rounded-lg"
            width="300"
            height="600"
          />
        </motion.div>
      </div>
    </div>
  );
}
