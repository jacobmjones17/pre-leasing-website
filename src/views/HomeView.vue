<template>
    <HomeHeroSection :properties="properties" />
    <PropertiesListingSection :properties="properties" />
    <LeasingDetailsSection />
    <InterestFormSection
        v-model:wantsShowing="wantsShowing"
        :properties="properties"
        :selectedPropertySlug="formPropertySlug"
        :interestType="interestType"
        :isSubmitting="isSubmitting"
        :submitStatus="submitStatus"
        :handleSubmit="handleSubmit"
    />
    <ContactSection />
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import HomeHeroSection from '../components/HomeHeroSection.vue';
import PropertiesListingSection from '../components/PropertiesListingSection.vue';
import LeasingDetailsSection from '../components/LeasingDetailsSection.vue';
import InterestFormSection from '../components/InterestFormSection.vue';
import ContactSection from '../components/ContactSection.vue';
import { properties, getPropertyBySlug } from '../data/properties.js';
import { useFormSubmit } from '../composables/useFormSubmit.js';

const route = useRoute();

const formPropertySlug = computed(() => {
    const slug = route.query.property;
    if (typeof slug !== 'string') return '';
    return getPropertyBySlug(slug) ? slug : '';
});

const wantsShowing = ref(false);
const interestType = computed(() => (wantsShowing.value ? 'showing' : 'join'));
const { isSubmitting, submitStatus, handleSubmit } = useFormSubmit(interestType, () => {
    wantsShowing.value = false;
});

watch(formPropertySlug, () => {
    wantsShowing.value = false;
});

onMounted(() => {
    document.title = 'Pilot Station Phase II | Coming October 2026 · FJPB Holdings';
});
</script>
