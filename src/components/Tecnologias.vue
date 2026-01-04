<script setup>
</script>

<template>
    <div class="contenedor-tecnologias" > 
        <slot></slot>
    </div>
</template>

<style scoped>
    .contenedor-tecnologias {
        align-items: center;
        display: flex;
        justify-content: center;
        flex-direction: row;
        gap: .5rem;
        flex-wrap: wrap;
        max-width: 1200px;
        background-color: rgba(var(--gris-oscuroRGB), 0.8);
        border-radius: 1rem;
        margin: 1rem auto 1rem auto;
        padding: 0.8rem;
    }
</style>
