<template>
    <section id="properties" class="section">
        <div class="section-inner">
            <h2>Our properties</h2>
            <p>
                Pilot Station Place is fully leased. Phase II is under construction now —
                join the pre-leasing list to hear first when spots open.
            </p>
            <div class="properties-grid">
                <PropertyCard
                    v-for="property in sortedProperties"
                    :key="property.id"
                    :property="property"
                />
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue';
import PropertyCard from './PropertyCard.vue';

const props = defineProps({
    properties: { type: Array, required: true },
});

const sortedProperties = computed(() =>
    [...props.properties].sort((a, b) => {
        if (a.status === 'coming-soon') return -1;
        if (b.status === 'coming-soon') return 1;
        if (a.status === 'available') return -1;
        if (b.status === 'available') return 1;
        return 0;
    })
);
</script>

<style scoped>
.properties-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.sync-note {
    margin-top: 8px;
    font-size: 0.84rem;
    color: var(--text-muted);
    font-style: italic;
}
</style>
