// ANIMATION VARIANTS (lib/animations.js)
export const FADE_IN_UP_STAGGER_CHILDREN = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export const FADE_IN_UP_ITEM = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

export const FADE_IN_DOWN_ITEM = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

export const SCALE_UP_HOVER = {
  hover: {
    scale: 1.05,
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: { scale: 0.98 },
};

export const TEXT_REVEAL_CONTAINER = {
  hidden: { opacity: 1 }, // Container itself is visible
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: i * 0.1 },
  }),
};

export const TEXT_REVEAL_CHAR = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
  hidden: {
    opacity: 0,
    y: 20,
    // For truly invisible before animation:
    // transition: { duration: 0 } // Ensure it's hidden instantly
  },
};
