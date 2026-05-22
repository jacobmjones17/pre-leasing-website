<template>
    <section id="overview" class="hero home-hero" :style="heroBackground">
        <div class="hero-inner">
            <div class="hero-copy">
                <p class="eyebrow">
                    <StatusBadge v-if="phaseII" :property="phaseII" large />
                </p>
                <h1>12 new duplex homes coming to Goldsboro</h1>
                <p>
                    <strong>Pilot Station Phase II</strong> — six duplex buildings currently under
                    construction, expected to finish <strong>October 2026</strong>.
                    Pilot Station Place is <strong>fully leased</strong> with all 8 homes occupied.
                    Join the pre-leasing list for early access to Phase II.
                </p>
                <div class="hero-actions">
                    <a href="#preleasing" class="btn-primary">Join pre-leasing list</a>
                    <a href="#properties" class="btn-ghost">View all properties</a>
                </div>
                <div class="hero-stats">
                    <div class="stat">
                        <span class="stat-label">Phase II</span>
                        <span class="stat-value">12 homes · Oct 2026</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Pilot Station Place</span>
                        <span class="stat-value">{{ placeStatusLabel }}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Available now</span>
                        <span class="stat-value">{{ availableCount }}</span>
                    </div>
                </div>
            </div>
            <aside class="hero-panel" aria-label="Phase II snapshot">
                <div class="hero-panel-card hero-panel-card--highlight">
                    <p class="panel-label">Now announcing</p>
                    <p class="panel-heading">Pilot Station Phase II</p>
                    <div class="panel-row">
                        <span>6 duplexes · 12 homes</span>
                        <span class="pill">Oct 2026</span>
                    </div>
                    <ul class="panel-list">
                        <li>Same 2 bed / 2 bath layout as Phase I</li>
                        <li>Modern finishes & energy-efficient build</li>
                        <li>Near Seymour Johnson AFB</li>
                    </ul>
                    <div class="panel-footer">
                        <span class="panel-price">From $1,400 / mo</span>
                        <span class="panel-note">Pre-leasing opens before move-in</span>
                    </div>
                </div>
            </aside>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue';
import StatusBadge from './StatusBadge.vue';
import { getStatusLabel } from '../data/properties.js';

const props = defineProps({
    properties: { type: Array, required: true },
});

const phaseII = computed(() =>
    props.properties.find((p) => p.slug === 'pilot-station-phase-ii') ?? null
);
const pilotStation = computed(() =>
    props.properties.find((p) => p.slug === 'pilot-station-place') ?? null
);
const placeStatusLabel = computed(() =>
    pilotStation.value ? getStatusLabel(pilotStation.value) : 'Fully leased'
);
const availableCount = computed(() =>
    props.properties
        .filter((p) => p.status === 'available')
        .reduce((sum, p) => sum + p.availableUnits, 0)
);

const heroBackground = computed(() => {
    const image = phaseII.value?.heroImage ?? pilotStation.value?.heroImage;
    if (!image) return {};
    return {
        backgroundImage: `linear-gradient(135deg, rgba(2, 6, 23, 0.78), rgba(2, 6, 23, 0.7)), url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 65%',
        backgroundRepeat: 'no-repeat',
    };
});
</script>

<style scoped>
.hero-panel-card--highlight {
    border-color: rgba(56, 189, 248, 0.75);
    box-shadow:
        0 18px 55px rgba(15, 23, 42, 0.95),
        0 0 40px rgba(56, 189, 248, 0.15);
}
</style>
