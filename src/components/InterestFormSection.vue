<template>
    <section id="preleasing" class="section section-form">
        <div class="section-inner form-layout">
            <div class="form-copy">
                <h2>{{ heading }}</h2>
                <p>{{ description }}</p>
                <div class="form-status" aria-live="polite">
                    <div v-if="submitStatus === 'success'" class="form-banner form-banner-success">
                        Thank you! Your information has been received. We'll be in touch soon.
                    </div>
                    <div v-else-if="submitStatus === 'error'" class="form-banner form-banner-error">
                        Something went wrong submitting the form. Please try again in a moment.
                    </div>
                </div>
            </div>
            <form name="interest" method="POST" data-netlify="true" @submit.prevent="handleSubmit">
                <input type="hidden" name="form-name" value="interest" />
                <input type="hidden" name="interestType" :value="interestType" />
                <input type="hidden" name="listType" :value="listType" />
                <input type="hidden" name="propertyName" :value="selectedProperty?.name || ''" />
                <select
                    v-if="showPropertySelect"
                    :key="selectedSlug"
                    name="property"
                    required
                    :value="selectedSlug"
                    @change="onPropertyChange"
                >
                    <option value="" disabled>Select a property</option>
                    <option
                        v-for="prop in selectableProperties"
                        :key="prop.slug"
                        :value="prop.slug"
                    >
                        {{ prop.name }} — {{ getStatusLabel(prop) }}
                    </option>
                </select>
                <input v-else type="hidden" name="property" :value="selectedSlug" />
                <input type="text" name="name" placeholder="Full name" required />
                <input type="email" name="email" placeholder="Email address" required />
                <input type="tel" name="phone" placeholder="Phone number" />
                <label v-if="canRequestShowing" class="showing-toggle">
                    <input
                        type="checkbox"
                        name="requestShowing"
                        value="yes"
                        :checked="wantsShowing"
                        @change="$emit('update:wantsShowing', $event.target.checked)"
                    />
                    <span>Also request a showing</span>
                </label>
                <textarea name="details" placeholder="Move-in timeline or questions"></textarea>
                <textarea
                    v-if="wantsShowing && canRequestShowing"
                    name="showingDetails"
                    placeholder="Preferred showing days / times and any questions"
                ></textarea>
                <button type="submit" class="btn-primary" :disabled="isSubmitting">
                    {{ isSubmitting ? 'Submitting...' : 'Submit' }}
                </button>
            </form>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue';
import { acceptsInterest, getStatusLabel } from '../data/properties.js';

const props = defineProps({
    properties: { type: Array, required: true },
    selectedPropertySlug: { type: String, default: '' },
    wantsShowing: Boolean,
    interestType: String,
    isSubmitting: Boolean,
    submitStatus: String,
    handleSubmit: Function,
});

const emit = defineEmits(['update:wantsShowing']);

const selectableProperties = computed(() =>
    props.properties.filter((p) => acceptsInterest(p) || p.status === 'leased')
);

const showPropertySelect = computed(() => props.properties.length > 1);

const selectedSlug = computed(
    () =>
        props.selectedPropertySlug ||
        selectableProperties.value.find((p) => p.status === 'coming-soon')?.slug ||
        selectableProperties.value.find((p) => p.status === 'available')?.slug ||
        selectableProperties.value[0]?.slug ||
        ''
);

const selectedProperty = computed(() =>
    props.properties.find((p) => p.slug === selectedSlug.value) ?? props.properties[0] ?? null
);

const canRequestShowing = computed(
    () =>
        selectedProperty.value?.status === 'available' ||
        selectedProperty.value?.status === 'coming-soon'
);

const listType = computed(() => {
    if (props.wantsShowing && canRequestShowing.value) return 'showing';
    if (selectedProperty.value?.status === 'leased') return 'waitlist';
    return 'pre-leasing';
});

const heading = computed(() => {
    if (selectedProperty.value?.status === 'coming-soon') return 'Join the pre-leasing list';
    if (selectedProperty.value?.status === 'leased') return 'Join the waitlist';
    return 'Join the pre-leasing list';
});

const description = computed(() => {
    if (showPropertySelect.value) {
        return 'Pilot Station Place is fully leased. Join the Phase II pre-leasing list or the Phase I waitlist — we will follow up when pre-leasing opens or a unit becomes available.';
    }
    if (selectedProperty.value?.status === 'coming-soon') {
        return `Join the pre-leasing list for ${selectedProperty.value.name}. You can also optionally request a showing when tours become available.`;
    }
    if (selectedProperty.value?.status === 'leased') {
        return `All units at ${selectedProperty.value.name} are leased. Join the waitlist and we will contact you if a unit opens up.`;
    }
    return 'Tell us a bit about yourself and optionally request a showing.';
});

const onPropertyChange = (event) => {
    const prop = props.properties.find((p) => p.slug === event.target.value);
    if (prop?.status !== 'available') {
        emit('update:wantsShowing', false);
    }
};
</script>

<style scoped>
select {
    width: 100%;
    padding: 9px 10px;
    margin-bottom: 10px;
    border-radius: 6px;
    border: 1px solid var(--border-subtle);
    font-size: 0.95rem;
    font-family: inherit;
    background-color: rgba(15, 23, 42, 0.9);
    color: var(--text-main);
}
</style>
