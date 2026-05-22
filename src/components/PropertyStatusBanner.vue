<template>
    <div v-if="property" class="property-status-banner" :class="`property-status-banner--${property.status}`">
        <StatusBadge :property="property" large class="property-status-banner-badge" />
        <p class="property-status-banner-text">
            <template v-if="property.status === 'leased'">
                All {{ property.totalUnits }} units are leased and tenants have moved in.
                Join the waitlist if you would like to be notified when a unit opens up.
            </template>
            <template v-else-if="property.status === 'coming-soon'">
                {{ property.totalUnits }} homes are under construction, expected
                {{ property.expectedCompletion }}. Join the pre-leasing list for early access.
            </template>
            <template v-else-if="property.status === 'available'">
                Contact us or join the list to schedule a showing.
            </template>
        </p>
    </div>
</template>

<script setup>
import StatusBadge from './StatusBadge.vue';

defineProps({
    property: { type: Object, required: true },
});
</script>

<style scoped>
.property-status-banner {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px 20px;
    max-width: 1120px;
    margin: 0 auto;
    padding: 16px 24px;
    font-size: 0.95rem;
    line-height: 1.5;
    text-align: center;
    border-bottom: 2px solid rgba(148, 163, 184, 0.25);
}

.property-status-banner-text {
    margin: 0;
    max-width: 520px;
}

.property-status-banner--leased {
    background: linear-gradient(180deg, rgba(71, 85, 105, 0.35), rgba(71, 85, 105, 0.15));
    color: #f1f5f9;
}

.property-status-banner--coming-soon {
    background: linear-gradient(180deg, rgba(56, 189, 248, 0.28), rgba(56, 189, 248, 0.1));
    color: #e0f2fe;
}

.property-status-banner--available {
    background: linear-gradient(180deg, rgba(22, 163, 74, 0.28), rgba(22, 163, 74, 0.1));
    color: #dcfce7;
}
</style>
