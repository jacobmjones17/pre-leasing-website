<template>
    <section id="overview" class="hero" :style="heroBackground">
        <div class="hero-inner">
            <div class="hero-copy">
                <div class="hero-status">
                    <StatusBadge :property="property" large />
                </div>
                <h1>{{ property.tagline }}</h1>
                <p>{{ property.description }}</p>
                <div class="hero-actions">
                    <a
                        v-if="property.status === 'coming-soon'"
                        href="#preleasing"
                        class="btn-primary"
                        @click="$emit('setWantsShowing', false)"
                    >
                        Join pre-leasing list
                    </a>
                    <a
                        v-else-if="property.status === 'leased'"
                        href="#preleasing"
                        class="btn-primary"
                        @click="$emit('setWantsShowing', false)"
                    >
                        Join waitlist
                    </a>
                    <a
                        v-if="property.status === 'coming-soon'"
                        href="#preleasing"
                        class="btn-primary"
                        @click="$emit('setWantsShowing', true)"
                    >
                        Request a showing
                    </a>
                    <a
                        v-else-if="property.status === 'available'"
                        href="#preleasing"
                        class="btn-primary"
                        @click="$emit('setWantsShowing', true)"
                    >
                        Request a showing
                    </a>
                    <RouterLink
                        v-if="property.status !== 'available'"
                        to="/#properties"
                        class="btn-ghost"
                    >
                        View all properties
                    </RouterLink>
                </div>
                <div class="hero-stats">
                    <div v-if="property.startingRent" class="stat">
                        <span class="stat-label">Starting at</span>
                        <span class="stat-value">${{ property.startingRent }} / mo</span>
                    </div>
                    <div v-if="property.earlyBirdRent && property.status !== 'leased'" class="stat">
                        <span class="stat-label">Early-bird</span>
                        <span class="stat-value">${{ property.earlyBirdRent }} / mo</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Homes</span>
                        <span class="stat-value">{{ property.totalUnits }} total</span>
                    </div>
                </div>
            </div>
            <aside class="hero-panel" aria-label="Quick leasing snapshot">
                <div class="hero-panel-card">
                    <p class="panel-label">{{ property.name }}</p>
                    <p class="panel-heading">{{ property.unitType }}</p>
                    <div class="panel-row">
                        <span>Approx. {{ property.sqft }} sq ft heated</span>
                        <span v-if="property.yearBuilt" class="pill">New for {{ property.yearBuilt }}</span>
                        <span v-else-if="property.expectedCompletion" class="pill">{{ property.expectedCompletion }}</span>
                    </div>
                    <ul class="panel-list">
                        <li v-for="feature in property.features" :key="feature">{{ feature }}</li>
                    </ul>
                    <div class="panel-footer">
                        <span v-if="property.startingRent" class="panel-price">
                            From ${{ property.startingRent }} / mo
                        </span>
                        <span class="panel-note">{{ getStatusLabel(property) }}</span>
                    </div>
                </div>
            </aside>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import StatusBadge from './StatusBadge.vue';
import { getStatusLabel } from '../data/properties.js';

const props = defineProps({
    property: { type: Object, required: true },
});

defineEmits(['setWantsShowing']);

const heroBackground = computed(() => ({
    backgroundImage: `linear-gradient(135deg, rgba(2, 6, 23, 0.78), rgba(2, 6, 23, 0.7)), url(${props.property.heroImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center 65%',
    backgroundRepeat: 'no-repeat',
}));
</script>

<style scoped>
.hero-status {
    margin-bottom: 4px;
}
</style>
