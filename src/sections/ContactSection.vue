<script setup>
import { Icon } from '@iconify/vue'
import { reactive, ref } from 'vue'

import MagneticButton from '@/components/ui/MagneticButton.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { profile, sections } from '@/data/portfolio'

const form = reactive({ name: '', email: '', message: '' })

// idle → sending → success | error
const status = ref('idle')
const errorText = ref('')

async function submit() {
  if (status.value === 'sending')
    return

  status.value = 'sending'
  errorText.value = ''

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form }),
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok || !data.ok)
      throw new Error(data.error || sections.contact.errorMessage)

    status.value = 'success'
    form.name = ''
    form.email = ''
    form.message = ''

    setTimeout(() => {
      if (status.value === 'success')
        status.value = 'idle'
    }, 6000)
  }
  catch (error) {
    status.value = 'error'
    errorText.value = error.message || sections.contact.errorMessage
  }
}
</script>

<template>
  <section id="contact" class="section contact">
    <div class="container">
      <div class="contact__panel">
        <div class="contact__intro" v-reveal="{ y: 34 }">
          <SectionHeading
            :index="sections.contact.index"
            :eyebrow="sections.contact.eyebrow"
            :title="sections.contact.title"
            :accent="sections.contact.accent"
            :accent-warm="sections.contact.accentWarm"
          />

          <p class="lead contact__lead">
            {{ sections.contact.lead }}
          </p>

          <div class="contact__direct">
            <a class="contact__email" :href="`mailto:${profile.email}`" data-cursor="Mail">
              <Icon icon="mdi:email-outline" width="20" />
              {{ profile.email }}
            </a>

            <ul class="contact__socials">
              <li v-for="social in profile.socials" :key="social.name">
                <a
                  class="contact__social"
                  :href="social.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  :aria-label="social.name"
                >
                  <Icon :icon="social.icon" width="20" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <form class="contact__form" v-reveal="{ delay: 0.1, y: 34 }" @submit.prevent="submit">
          <label class="contact__field">
            <span>{{ sections.contact.fields.name.label }}</span>
            <input
              v-model="form.name"
              type="text"
              :placeholder="sections.contact.fields.name.placeholder"
              required
            />
          </label>

          <label class="contact__field">
            <span>{{ sections.contact.fields.email.label }}</span>
            <input
              v-model="form.email"
              type="email"
              :placeholder="sections.contact.fields.email.placeholder"
              required
            />
          </label>

          <label class="contact__field">
            <span>{{ sections.contact.fields.message.label }}</span>
            <textarea
              v-model="form.message"
              rows="5"
              :placeholder="sections.contact.fields.message.placeholder"
              required
            />
          </label>

          <MagneticButton class="contact__submit" :disabled="status === 'sending'">
            {{ status === 'sending' ? sections.contact.sendingLabel : sections.contact.submitLabel }}
            <Icon :icon="status === 'sending' ? 'mdi:loading' : 'mdi:send'" width="18" />
          </MagneticButton>

          <Transition name="fade">
            <p v-if="status === 'success'" class="contact__sent">
              <Icon icon="mdi:check-circle-outline" width="18" />
              {{ sections.contact.successMessage }}
            </p>
          </Transition>

          <Transition name="fade">
            <p v-if="status === 'error'" class="contact__error" role="alert">
              <Icon icon="mdi:alert-circle-outline" width="18" />
              {{ errorText }}
            </p>
          </Transition>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.contact__panel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(30px, 5vw, 64px);
  padding: clamp(28px, 4vw, 54px);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background:
    radial-gradient(600px 300px at 100% 0%, rgba(255, 45, 149, 0.12), transparent 60%),
    radial-gradient(600px 300px at 0% 100%, rgba(124, 92, 255, 0.14), transparent 60%),
    rgba(255, 255, 255, 0.02);
}

.contact__intro {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.contact__lead {
  max-width: 46ch;
}

.contact__direct {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: auto;
}

.contact__email {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  align-self: flex-start;
  font-family: var(--font-display);
  font-size: clamp(1.05rem, 2vw, 1.35rem);
  padding-bottom: 4px;
  border-bottom: 1px solid var(--border-strong);
  transition: color 0.3s var(--ease), border-color 0.3s var(--ease);
}

.contact__email:hover {
  color: var(--cyan);
  border-color: var(--cyan);
}

.contact__socials {
  display: flex;
  gap: 10px;
}

.contact__social {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  color: var(--text-muted);
  border: 1px solid var(--border);
  border-radius: 12px;
  transition: color 0.3s var(--ease), border-color 0.3s var(--ease), transform 0.3s var(--ease);
}

.contact__social:hover {
  color: #fff;
  border-color: var(--violet);
  transform: translateY(-3px);
}

.contact__form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contact__field {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.contact__field span {
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-dim);
}

.contact__field input,
.contact__field textarea {
  padding: 14px 16px;
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 14px;
  background: rgba(0, 0, 0, 0.25);
  outline: none;
  resize: vertical;
  transition: border-color 0.3s var(--ease), box-shadow 0.3s var(--ease);
}

.contact__field input::placeholder,
.contact__field textarea::placeholder {
  color: var(--text-dim);
}

.contact__field input:focus,
.contact__field textarea:focus {
  border-color: var(--violet);
  box-shadow: 0 0 0 4px rgba(124, 92, 255, 0.15);
}

.contact__submit {
  align-self: flex-start;
  margin-top: 4px;
}

.contact__sent {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.88rem;
  color: var(--lime);
}

.contact__error {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.88rem;
  color: #ff6b7d;
}

.contact__submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.contact__submit:disabled :deep(.iconify) {
  animation: contact-spin 0.9s linear infinite;
}

@keyframes contact-spin {
  to {
    transform: rotate(360deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s var(--ease);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 860px) {
  .contact__panel {
    grid-template-columns: 1fr;
  }
}
</style>
