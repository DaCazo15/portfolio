<script setup>
</script>

<template>
    <div class="panel flex-row-center contenedor-tecnologias" > 
        <slot></slot>
    </div>
</template>

<style scoped>
    .contenedor-tecnologias {
        gap: .5rem;
        flex-wrap: wrap;
        margin: 1rem auto;
        padding: 0.8rem;
    }
</style>
