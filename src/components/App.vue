<template>
  <div class="my-2">
    <h1 class="text-3xl text-gray-800 font-medium m-3">
      Your reminders for a week from now:
    </h1>
    <reminder-card
      v-for="reminder in reminders"
      :key="reminder._id"
      :name="reminder.name"
      :description="reminder.description"
      :datetime="reminder.datetime"
      :reminder_color="reminder.reminder_color"
      :audio="reminder.audio"
    />
    <div class="flex">
      <button class="p-2 m-2 bg-gray-100 flex-1" @click="openReminderModal">
        Create
      </button>
    </div>
    <reminder-modal
      ref="reminderModal"
      @on-reminder-created="reloadReminders"
    />
  </div>
</template>

<script>
import ReminderModal from "./ReminderModal.vue";
import ReminderCard from "./ReminderCard.vue";

export default {
  components: {
    ReminderCard,
    ReminderModal,
  },
  data: () => ({
    reminders: [],
  }),
  async mounted() {
    await this.reloadReminders();
  },
  methods: {
    async reloadReminders() {
      const now = +new Date();
      const nowPlusWeek = now + 1000 * 60 * 60 * 24 * 7;

      const reminders = await (
        await fetch(`/reminder/get-range?from=${now}&to=${nowPlusWeek}`)
      ).json();

      console.log(reminders);

      // Convert date strings to Date
      reminders.forEach((r) => (r.datetime = new Date(r.datetime)));
      this.reminders = reminders;
    },
    openReminderModal() {
      this.$refs.reminderModal.open();
    },
  },
};
</script>

<style>
</style>
