<template>
    <section id="overview" class="hero" :style="heroBackground">
        <div class="hero-inner">
            <div class="hero-copy">
                <p class="eyebrow">Now pre-leasing • New construction</p>
                <h1>Brand new duplex homes in Goldsboro</h1>
                <p>
                    Thoughtfully designed 2-bedroom, 2-bath duplex homes with modern
                    finishes, low-maintenance living, and quick access to Seymour
                    Johnson Air Force Base.
                </p>
                <div class="hero-actions">
                    <a href="#preleasing" class="btn-primary" @click="$emit('setWantsShowing', false)">
                        Join pre-leasing list
                    </a>
                    <a href="#preleasing" class="btn-primary" @click="$emit('setWantsShowing', true)">
                        Request a showing
                    </a>
                </div>
                <div class="hero-stats">
                    <div class="stat">
                        <span class="stat-label">Starting at</span>
                        <span class="stat-value">$1,400 / mo</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Early-bird</span>
                        <span class="stat-value">$1,350 / mo</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Availability</span>
                        <span class="stat-value">8 homes</span>
                    </div>
                </div>
            </div>
            <aside class="hero-panel" aria-label="Quick leasing snapshot">
                <div class="hero-panel-card">
                    <p class="panel-label">Pilot Station Place</p>
                    <p class="panel-heading">2 bed / 2 bath duplexes</p>
                    <div class="panel-row">
                        <span>Approx. 900 sq ft heated</span>
                        <span class="pill">New for 2025</span>
                    </div>
                    <ul class="panel-list">
                        <li>Large covered front porch</li>
                        <li>Private exterior storage room</li>
                        <li>Energy-efficient construction</li>
                    </ul>
                    <div class="panel-footer">
                        <span class="panel-price">From $1,400 / mo</span>
                        <span class="panel-note">Ask about early-bird pricing</span>
                    </div>
                </div>
            </aside>
        </div>
    </section>
</template>
<script setup>
import { computed } from 'vue';
import heroImage from '../../images/Render.png';
const heroBackground = computed(() => ({
    backgroundImage: `linear-gradient(135deg, rgba(2, 6, 23, 0.78), rgba(2, 6, 23, 0.7)), url(${heroImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center 65%',
    backgroundRepeat: 'no-repeat',
}));
</script>
