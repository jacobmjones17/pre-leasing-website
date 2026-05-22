<template>
    <template v-if="property">
        <PropertyStatusBanner :property="property" />
        <HeroSection :property="property" @setWantsShowing="val => wantsShowing = val" />
        <LivingDescriptionSection :property="property" />
        <MediaSection
            :photos="property.photos"
            :activePhotoIndex="activePhotoIndex"
            :activeLightboxPhoto="activeLightboxPhoto"
            @nextPhoto="nextPhoto"
            @prevPhoto="prevPhoto"
            @openLightbox="openLightbox"
            @closeLightbox="closeLightbox"
        />
        <LocationSection :property="property" />
        <LeasingDetailsSection :property="property" />
        <InterestFormSection
            v-model:wantsShowing="wantsShowing"
            :properties="[property]"
            :selectedPropertySlug="property.slug"
            :interestType="interestType"
            :isSubmitting="isSubmitting"
            :submitStatus="submitStatus"
            :handleSubmit="handleSubmit"
        />
        <ContactSection />
    </template>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { getPropertyBySlug } from '../data/properties.js';
import { useFormSubmit } from '../composables/useFormSubmit.js';
import PropertyStatusBanner from '../components/PropertyStatusBanner.vue';
import HeroSection from '../components/HeroSection.vue';
import LivingDescriptionSection from '../components/LivingDescriptionSection.vue';
import MediaSection from '../components/MediaSection.vue';
import LocationSection from '../components/LocationSection.vue';
import LeasingDetailsSection from '../components/LeasingDetailsSection.vue';
import InterestFormSection from '../components/InterestFormSection.vue';
import ContactSection from '../components/ContactSection.vue';

const props = defineProps({
    slug: { type: String, required: true },
});

const property = computed(() => getPropertyBySlug(props.slug));
const wantsShowing = ref(false);
const interestType = computed(() => (wantsShowing.value ? 'showing' : 'join'));
const { isSubmitting, submitStatus, handleSubmit } = useFormSubmit(interestType, () => {
    wantsShowing.value = false;
});

const activePhotoIndex = ref(0);
const lightboxIndex = ref(null);

const nextPhoto = () => {
    if (!property.value) return;
    activePhotoIndex.value = (activePhotoIndex.value + 1) % property.value.photos.length;
};
const prevPhoto = () => {
    if (!property.value) return;
    const len = property.value.photos.length;
    activePhotoIndex.value = (activePhotoIndex.value - 1 + len) % len;
};
const openLightbox = (index) => {
    lightboxIndex.value = index;
};
const closeLightbox = () => {
    lightboxIndex.value = null;
};
const activeLightboxPhoto = computed(() =>
    lightboxIndex.value === null || !property.value
        ? null
        : property.value.photos[lightboxIndex.value]
);

watch(
    () => props.slug,
    () => {
        activePhotoIndex.value = 0;
        lightboxIndex.value = null;
        wantsShowing.value = false;
    }
);

watch(property, (p) => {
    if (p) document.title = `${p.name} | FJPB Holdings`;
});

onMounted(() => {
    if (property.value) {
        document.title = `${property.value.name} | FJPB Holdings`;
    }
});
</script>
