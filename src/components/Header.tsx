import { motion } from "framer-motion";

type HeaderProps = {
  isScrolled: boolean;
};

const headerVariants = {
  initial: {
    height: "80px",
  },
  expanded: {
    height: "80px",
  },
  collapsed: {
    height: "48px",
  },
} as const;

const decorativeElementVariants = {
  initial: {
    opacity: 1,
    scale: 1,
  },
  expanded: {
    opacity: 1,
    scale: 1,
  },
  collapsed: {
    opacity: 0,
    scale: 0.8,
  },
} as const;

export function Header({ isScrolled }: HeaderProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <motion.div
        className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-lg relative overflow-hidden"
        variants={headerVariants}
        initial="initial"
        animate={isScrolled ? "collapsed" : "expanded"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-4 -right-4 w-16 h-16 sm:w-24 sm:h-24 bg-white/10 rounded-full blur-2xl transform rotate-45"
            initial="initial"
            animate={isScrolled ? "collapsed" : "expanded"}
            variants={decorativeElementVariants}
          />
          <motion.div
            className="absolute -bottom-4 -left-4 w-16 h-16 sm:w-24 sm:h-24 bg-white/10 rounded-full blur-2xl transform -rotate-45"
            initial="initial"
            animate={isScrolled ? "collapsed" : "expanded"}
            variants={decorativeElementVariants}
          />
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative h-full">
          <motion.div
            className="h-full flex flex-col justify-center"
            initial={{ alignItems: "center" }}
            animate={{
              alignItems: isScrolled ? "flex-start" : "center",
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="flex items-center gap-2"
              initial={{ scale: 1 }}
              animate={{
                scale: isScrolled ? 0.9 : 1,
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-blue-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                initial={{ width: "20px", height: "20px" }}
                animate={{
                  width: isScrolled ? "16px" : "20px",
                  height: isScrolled ? "16px" : "20px",
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </motion.svg>
              <motion.h1
                className="font-bold text-white font-sans tracking-tight text-base sm:text-lg md:text-xl"
                initial={{ fontSize: "1.25rem" }}
                animate={{
                  fontSize: isScrolled ? "1rem" : "1.25rem",
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
              >
                AI Trend Predictor
              </motion.h1>
            </motion.div>

            <motion.div
              className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 rounded-full opacity-60"
              initial={{
                width: "48px",
                opacity: 0.6,
                marginTop: "4px",
                marginBottom: "4px",
              }}
              animate={{
                width: isScrolled ? "0px" : "48px",
                opacity: isScrolled ? 0 : 0.6,
                marginTop: isScrolled ? "0px" : "4px",
                marginBottom: isScrolled ? "0px" : "4px",
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
            />

            <motion.p
              className="text-blue-100 text-xs sm:text-sm max-w-2xl text-center px-2 sm:px-0"
              initial={{
                height: "auto",
                opacity: 1,
                marginTop: 2,
              }}
              animate={{
                height: isScrolled ? 0 : "auto",
                opacity: isScrolled ? 0 : 1,
                marginTop: isScrolled ? 0 : 2,
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
            >
              Discover future trends, analyze market potential, and explore
              growth opportunities
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
