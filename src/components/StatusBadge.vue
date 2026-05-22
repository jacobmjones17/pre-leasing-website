<template>
    <span class="status-badge" :class="[`status-badge--${property.status}`, { 'status-badge--large': large }]">
        {{ label }}
    </span>
</template>

<script setup>
import { computed } from 'vue';
import { getStatusLabel } from '../data/properties.js';

const props = defineProps({
    property: { type: Object, required: true },
    large: { type: Boolean, default: false },
});

const label = computed(() => getStatusLabel(props.property));
</script>

<style scoped>
.status-badge {
    display: inline-block;
    padding: 5px 14px;
    border-radius: 999px;
    font-size: 0.78rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    border: 2px solid transparent;
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.45);
    white-space: nowrap;
}

.status-badge--large {
    padding: 7px 18px;
    font-size: 0.85rem;
    letter-spacing: 0.14em;
}

.status-badge--available {
    color: #ffffff;
    background: linear-gradient(135deg, #16a34a, #15803d);
    border-color: #86efac;
    box-shadow: 0 4px 22px rgba(22, 163, 74, 0.55);
}

.status-badge--leased {
    color: #ffffff;
    background: linear-gradient(135deg, #64748b, #475569);
    border-color: #cbd5e1;
    box-shadow: 0 4px 22px rgba(100, 116, 139, 0.5);
}

.status-badge--coming-soon {
    color: #ffffff;
    background: linear-gradient(135deg, #38bdf8, #0284c7);
    border-color: #7dd3fc;
    box-shadow: 0 4px 24px rgba(56, 189, 248, 0.65);
}
</style>
