<template>
    <div class="btn">
        <slot></slot>
    </div>
</template>

<style>
    .btn{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--gris-oscuro);
        font-family: var(--font-titulo);
        color: var(--gris-claro);
        width: auto;
        padding: 1rem;
        border-radius: 1rem;
        font-weight: 300;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
    }
    .btn:hover{
        font-weight: 400;
        background-color: var(--gris-claro);
        color: var(--gris-oscuro);
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
        border: 4px solid var(--blanco);
    }
</style>