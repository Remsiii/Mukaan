import { cn } from "../../../lib/utils";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

export interface AnimatedDockItem {
  title: string;
  icon: React.ReactNode;
  href?: string; // href ist nun optional
  onClick?: () => void;
}

export interface AnimatedDockProps {
  items: AnimatedDockItem[];
  largeClassName?: string;
}

export function AnimatedDock({ items, largeClassName }: AnimatedDockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        // Erhöhte Höhe und zentrierte Items
        "mx-auto flex h-14 md:h-20 items-center gap-2 md:gap-4 rounded-2xl bg-white/10 px-4 dark:bg-black/10",
        "border border-gray-200/30 backdrop-blur-sm dark:border-gray-800/30"
      )}
    >
      {items.map((item, index) => (
        <DockIcon key={index} mouseX={mouseX} {...item} />
      ))}
    </motion.div>
  );
}

function DockIcon({
  mouseX,
  title,
  icon,
  href,
  onClick,
}: {
  mouseX: any;
  title: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const distanceFromMouse = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distanceFromMouse, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distanceFromMouse, [-150, 0, 150], [40, 80, 40]);
  const iconWidthTransform = useTransform(distanceFromMouse, [-150, 0, 150], [20, 40, 20]);
  const iconHeightTransform = useTransform(distanceFromMouse, [-150, 0, 150], [20, 40, 20]);

  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const iconWidth = useSpring(iconWidthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const iconHeight = useSpring(iconHeightTransform, { mass: 0.1, stiffness: 150, damping: 12 });

  const [isHovered, setIsHovered] = useState(false);

  const content = (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex aspect-square items-center justify-center rounded-full bg-white/20 text-black shadow-lg backdrop-blur-md dark:bg-black/20 dark:text-white"
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className="absolute -top-8 left-1/2 w-fit -translate-x-1/2 whitespace-pre rounded-md border border-gray-200 bg-white/80 px-2 py-0.5 text-xs text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        style={{ width: iconWidth, height: iconHeight }}
        className="flex items-center justify-center"
      >
        {icon}
      </motion.div>
    </motion.div>
  );

  if (onClick) {
    return (
      <button onClick={onClick} type="button">
        {content}
      </button>
    );
  } else if (href) {
    return <Link to={href}>{content}</Link>;
  } else {
    return <>{content}</>;
  }
}
