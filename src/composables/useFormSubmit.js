import { ref } from 'vue';

export function useFormSubmit(interestType, onSuccess) {
    const isSubmitting = ref(false);
    const submitStatus = ref(null);

    const handleSubmit = async (event) => {
        const form = event.target;
        if (isSubmitting.value) return;
        isSubmitting.value = true;
        submitStatus.value = null;
        try {
            const formData = new FormData(form);
            if (!formData.get('interestType')) {
                formData.append('interestType', interestType.value);
            }
            formData.append('site_url', window.location.href);
            const functionUrl =
                import.meta.env.VITE_SUBMISSION_FUNCTION_URL ||
                '/.netlify/functions/form-handler';
            const response = await fetch(functionUrl, {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) throw new Error('Form submission failed');
            submitStatus.value = 'success';
            form.reset();
            onSuccess?.();
        } catch (error) {
            console.error(error);
            submitStatus.value = 'error';
        } finally {
            isSubmitting.value = false;
        }
    };

    return { isSubmitting, submitStatus, handleSubmit };
}
