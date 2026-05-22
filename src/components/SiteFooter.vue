<template>
    <footer class="site-footer">
        <p>{{ company.name }} · {{ company.location }}</p>
        <p>Professionally managed rental homes in Wayne County</p>
    </footer>
</template>

<script setup>
import { company } from '../data/properties.js';
</script>
