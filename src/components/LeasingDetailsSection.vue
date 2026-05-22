<template>
    <section id="leasing" class="section">
        <div class="section-inner">
            <h2>Leasing details</h2>
            <div class="details-grid">
                <div class="detail">
                    <h3>Lease term</h3>
                    <p>Minimum 12-month lease.</p>
                </div>
                <div class="detail">
                    <h3>Security deposit</h3>
                    <p>Equal to one month's rent.</p>
                </div>
                <div class="detail">
                    <h3>Utilities</h3>
                    <p>Tenant is responsible for all utilities.</p>
                </div>
                <div class="detail">
                    <h3>Pets</h3>
                    <p>Allowed with fee; breed and size restrictions apply.</p>
                </div>
                <div class="detail">
                    <h3>Screening</h3>
                    <p>Income verification, background, and credit check required.</p>
                </div>
                <div class="detail">
                    <h3>Availability</h3>
                    <p v-if="property">{{ availabilityText }}</p>
                    <p v-else>
                        Phase II (12 homes) expected October 2026 — join the pre-leasing list now.
                        Pilot Station Place is fully leased.
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue';
import { getStatusLabel } from '../data/properties.js';

const props = defineProps({
    property: { type: Object, default: null },
});

const availabilityText = computed(() => {
    if (!props.property) return '';
    const label = getStatusLabel(props.property);
    if (props.property.status === 'available') {
        return `${props.property.availableUnits} of ${props.property.totalUnits} units available.`;
    }
    return label;
});
</script>
