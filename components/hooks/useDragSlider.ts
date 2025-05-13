// hooks/useDragSlider.ts

import { useState, useRef, useEffect } from "react";

const useDragSlider = (initialProjectsLength: number, speedFactor = 0.3) => {
  // State to track the drag position
  const [dragPosition, setDragPosition] = useState(0);
  // State to track if the user is dragging
  const [isDragging, setIsDragging] = useState(false);
  // Ref for the inner slider (for DOM manipulation)
  const innerSliderRef = useRef<HTMLDivElement | null>(null);
  // Ref for the last mouse position to track movement
  const lastPositionRef = useRef(0);
  // Ref for storing the animation frame ID
  const animationRef = useRef<number | null>(null);

  // Function to update the position of the slider during dragging
  const updateSliderPosition = (position: number) => {
    if (innerSliderRef.current) {
      innerSliderRef.current.style.transition = "transform 0.3s ease-out"; // Smooth transition when drag stops
      innerSliderRef.current.style.transform = `translateX(${position}px)`;
    }
  };

  // Function to handle mouse move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const delta = e.clientX - lastPositionRef.current;
    const slowedDelta = delta * speedFactor; // Slow down the dragging

    lastPositionRef.current = e.clientX;

    // Use requestAnimationFrame for smoother animation
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
    }

    animationRef.current = requestAnimationFrame(() => {
      const newPosition = dragPosition + slowedDelta;
      setDragPosition(newPosition);
      updateSliderPosition(newPosition);
    });

    e.preventDefault();
  };

  // Function to handle mouse down
  const handleMouseDown = (e: React.MouseEvent) => {
    // Remove the transition for smooth dragging
    if (innerSliderRef.current) {
      innerSliderRef.current.style.transition = "none"; // Disable transition while dragging
    }

    setIsDragging(true);
    lastPositionRef.current = e.clientX;
    e.preventDefault();
  };

  // Function to handle mouse up
  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;

    setIsDragging(false);

    // Enable smooth transition once dragging stops
    if (innerSliderRef.current) {
      innerSliderRef.current.style.transition = "transform 0.3s ease-out"; // Smooth transition after drag
    }

    e.preventDefault();
  };

  // Function to handle mouse leave (for better drag behavior)
  const handleMouseLeave = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMouseUp(e);
    }
  };

  // Function to handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;

    // Remove transition for smoother dragging
    if (innerSliderRef.current) {
      innerSliderRef.current.style.transition = "none";
    }

    setIsDragging(true);
    lastPositionRef.current = e.touches[0].clientX;
  };

  // Function to handle touch move
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;

    const touch = e.touches[0];
    const delta = touch.clientX - lastPositionRef.current;
    const slowedDelta = delta * speedFactor; // Slow down the dragging

    lastPositionRef.current = touch.clientX;

    // Use requestAnimationFrame for smoother animation
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
    }

    animationRef.current = requestAnimationFrame(() => {
      const newPosition = dragPosition + slowedDelta;
      setDragPosition(newPosition);
      updateSliderPosition(newPosition);
    });
  };

  // Function to handle touch end
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;

    setIsDragging(false);

    // Enable transition once dragging stops
    if (innerSliderRef.current) {
      innerSliderRef.current.style.transition = "transform 0.3s ease-out";
    }
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return {
    dragPosition,
    innerSliderRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};

export default useDragSlider;
