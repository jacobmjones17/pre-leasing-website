<template>
    <section id="preleasing" class="section section-form">
        <div class="section-inner form-layout">
            <div class="form-copy">
                <h2>Join the pre-leasing list</h2>
                <p>
                    Join the interest list for Pilot Station Place. You can also
                    optionally request a showing by checking the box below.
                </p>
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
                <input type="text" name="name" placeholder="Full name" required />
                <input type="email" name="email" placeholder="Email address" required />
                <input type="tel" name="phone" placeholder="Phone number" />
                <label class="showing-toggle">
                    <input type="checkbox" name="requestShowing" value="yes"
                        :checked="wantsShowing"
                        @change="$emit('update:wantsShowing', $event.target.checked)"
                    />
                    <span>Also request a showing</span>
                </label>
                <textarea name="details" placeholder="Move-in timeline or questions"></textarea>
                <textarea v-if="wantsShowing" name="showingDetails" placeholder="Preferred showing days / times and any questions"></textarea>
                <button type="submit" class="btn-primary" :disabled="isSubmitting">
                    {{ isSubmitting ? 'Submitting...' : 'Submit' }}
                </button>
            </form>
        </div>
    </section>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';
const props = defineProps({
    wantsShowing: Boolean,
    interestType: String,
    isSubmitting: Boolean,
    submitStatus: String,
    handleSubmit: Function,
});
const emit = defineEmits(['update:wantsShowing']);
</script>
