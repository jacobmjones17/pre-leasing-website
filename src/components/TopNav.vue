<template>
    <header class="top-nav">
        <div class="top-nav-inner">
            <RouterLink to="/" class="brand">
                <span class="brand-mark">FJ</span>
                <span class="brand-text">
                    <span class="brand-name">FJPB Holdings</span>
                    <span class="brand-location">Goldsboro, NC</span>
                </span>
            </RouterLink>
            <nav class="nav-links">
                <RouterLink to="/#properties">Properties</RouterLink>
                <RouterLink to="/#leasing">Leasing</RouterLink>
                <RouterLink to="/#contact">Contact</RouterLink>
                <RouterLink to="/#preleasing" class="nav-cta">Pre-leasing</RouterLink>
            </nav>
        </div>
    </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.nav-links a {
    color: var(--text-muted);
    text-decoration: none;
    padding: 4px 8px;
    border-radius: 999px;
    transition: background-color 0.18s ease, color 0.18s ease,
        box-shadow 0.18s ease;
}

.nav-links a:hover,
.nav-links a.router-link-active {
    color: #e5e7eb;
    background-color: rgba(15, 23, 42, 0.7);
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.9);
}

.nav-cta {
    padding: 5px 12px;
    border-radius: 999px;
    border: 1px solid rgba(148, 163, 184, 0.6);
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: #e5e7eb !important;
    background: radial-gradient(circle at 30% 20%, #38bdf8, #0ea5e9);
    box-shadow: 0 12px 35px rgba(56, 189, 248, 0.45);
}
</style>
