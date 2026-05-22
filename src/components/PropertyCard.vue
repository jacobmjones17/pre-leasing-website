<template>
    <article class="property-card">
        <div class="property-card-image">
            <img :src="property.heroImage" :alt="property.name" />
            <StatusBadge :property="property" class="property-card-badge" />
        </div>
        <div class="property-card-body">
            <h3>{{ property.name }}</h3>
            <p class="property-card-address">{{ property.address }}</p>
            <p class="property-card-meta">
                {{ property.unitType }} · {{ property.totalUnits }} homes
                <template v-if="property.startingRent">
                    · from ${{ property.startingRent }}/mo
                </template>
            </p>
            <p v-if="property.status === 'coming-soon'" class="property-card-status-note property-card-status-note--coming-soon">
                Coming {{ property.expectedCompletion }}
            </p>
            <p v-else-if="property.status === 'leased'" class="property-card-status-note property-card-status-note--leased">
                Fully leased
            </p>
            <p v-if="property.status === 'coming-soon'" class="property-card-announcement">
                {{ property.description.slice(0, 120) }}…
            </p>
            <p v-else-if="property.status === 'available'" class="property-card-announcement">
                {{ property.availableUnits === 1 ? '1 unit' : `${property.availableUnits} units` }} available now. Join the list or request a showing.
            </p>
            <p v-else-if="property.status === 'leased'" class="property-card-announcement">
                All {{ property.totalUnits }} units are leased and occupied. Join the waitlist if a unit opens up.
            </p>
            <div class="property-card-actions">
                <RouterLink :to="`/properties/${property.slug}`" class="btn-primary">
                    View details
                </RouterLink>
                <RouterLink
                    v-if="property.status === 'coming-soon'"
                    :to="{ path: '/', hash: '#preleasing', query: { property: property.slug } }"
                    class="btn-ghost"
                >
                    Join pre-leasing list
                </RouterLink>
                <RouterLink
                    v-else-if="property.status === 'available'"
                    :to="{ path: '/', hash: '#preleasing', query: { property: property.slug } }"
                    class="btn-ghost"
                >
                    Show interest
                </RouterLink>
                <RouterLink
                    v-else-if="property.status === 'leased'"
                    :to="{ path: '/', hash: '#preleasing', query: { property: property.slug } }"
                    class="btn-ghost"
                >
                    Join waitlist
                </RouterLink>
            </div>
        </div>
    </article>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import StatusBadge from './StatusBadge.vue';

defineProps({
    property: { type: Object, required: true },
});
</script>

<style scoped>
.property-card {
    display: flex;
    flex-direction: column;
    border-radius: 16px;
    border: 1px solid rgba(148, 163, 184, 0.45);
    background: rgba(15, 23, 42, 0.6);
    overflow: hidden;
    transition: border-color 0.18s ease, box-shadow 0.18s ease;
}

.property-card:hover {
    border-color: rgba(56, 189, 248, 0.5);
    box-shadow: 0 18px 45px rgba(15, 23, 42, 0.8);
}

.property-card-image {
    position: relative;
    height: 180px;
    overflow: hidden;
}

.property-card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.property-card-badge {
    position: absolute;
    top: 12px;
    left: 12px;
    z-index: 2;
    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.6));
}

.property-card-body {
    padding: 16px 18px 18px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
}

.property-card-body h3 {
    margin: 0;
    font-size: 1.1rem;
}

.property-card-address {
    margin: 0;
    font-size: 0.86rem;
    color: var(--text-muted);
}

.property-card-meta {
    margin: 0;
    font-size: 0.84rem;
    color: var(--text-muted);
}

.property-card-status-note {
    margin: 6px 0 0;
    display: inline-block;
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 0.78rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
}

.property-card-status-note--leased {
    color: #ffffff;
    background: linear-gradient(135deg, #64748b, #475569);
    border: 2px solid #cbd5e1;
    box-shadow: 0 3px 14px rgba(100, 116, 139, 0.45);
}

.property-card-status-note--coming-soon {
    color: #ffffff;
    background: linear-gradient(135deg, #38bdf8, #0284c7);
    border: 2px solid #7dd3fc;
    box-shadow: 0 3px 16px rgba(56, 189, 248, 0.55);
}

.property-card-announcement {
    margin: 4px 0 0;
    font-size: 0.86rem;
    color: var(--text-muted);
    line-height: 1.5;
}

.property-card-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: auto;
    padding-top: 12px;
}
</style>
