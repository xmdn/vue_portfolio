<script setup>
import { Icon } from '@iconify/vue'
import { reactive, ref } from 'vue'

import MagneticButton from '@/components/ui/MagneticButton.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { profile } from '@/data/portfolio'

const form = reactive({ name: '', email: '', message: '' })
const sent = ref(false)

function submit() {
  // Demo handler — wire this up to your API / form service.
  sent.value = true
  form.name = ''
  form.email = ''
  form.message = ''
  setTimeout(() => {
    sent.value = false
  }, 5000)
}
</script>

<template>
  <section id="contact" class="section contact">
    <div class="container">
      <div class="contact__panel">
        <div class="contact__intro" v-reveal="{ y: 34 }">
          <SectionHeading index="05" eyebrow="Contact">
            Let's build something <span class="gradient-text gradient-text--warm">remarkable</span>
          </SectionHeading>

          <p class="lead contact__lead">
            Have a project, a role, or just an idea worth exploring? My inbox is always open —
            I usually reply within a day.
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
            <span>Name</span>
            <input v-model="form.name" type="text" placeholder="Jane Doe" required />
          </label>

          <label class="contact__field">
            <span>Email</span>
            <input v-model="form.email" type="email" placeholder="jane@company.com" required />
          </label>

          <label class="contact__field">
            <span>Message</span>
            <textarea
              v-model="form.message"
              rows="5"
              placeholder="Tell me about your project..."
              required
            />
          </label>

          <MagneticButton class="contact__submit">
            Send message
            <Icon icon="mdi:send" width="18" />
          </MagneticButton>

          <Transition name="fade">
            <p v-if="sent" class="contact__sent">
              <Icon icon="mdi:check-circle-outline" width="18" />
              Thanks! Your message is on its way.
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
