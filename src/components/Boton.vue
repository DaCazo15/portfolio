<script setup>
import { animate } from 'animejs';

const handleMouseEnter = (e) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  animate(e.currentTarget, {
    scale: 1.04,
    duration: 200,
    ease: 'outQuad'
  });
};

const handleMouseLeave = (e) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  animate(e.currentTarget, {
    scale: 1,
    duration: 200,
    ease: 'outQuad'
  });
};
</script>

<template>
  <div 
    class="btn"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <slot></slot>
  </div>
</template>

<style>
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--gris-oscuro);
    font-family: var(--font-titulo);
    color: var(--gris-claro);
    width: auto;
    height: 2.8rem;
    padding: .5rem 1rem;
    border-radius: 1rem;
    font-weight: 300;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
    will-change: transform;
  }
  .btn img {
    height: auto;
    width: 40px;
  }
  .btn:hover {
    font-weight: 400;
    background-color: var(--gris-claro);
    color: var(--gris-oscuro);
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    border: 4px solid var(--blanco);
  }
</style>