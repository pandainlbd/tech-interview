<template>
  <div class="bg h-screen w-screen py-2 lg:px-96">
    <h1 class="text-3xl text-white font-medium m-3">
      Your reminders for a week from now:
    </h1>

    <div>
      <reminder-card
        v-for="reminder in reminders"
        :key="reminder._id"
        :name="reminder.name"
        :description="reminder.description"
        :datetime="reminder.datetime"
        :reminder_color="reminder.reminder_color"
        :audio="reminder.audio"
      />
    </div>

    <div class="flex">
      <button
        class="p-4 m-2 flex-1 bg-white font-medium"
        @click="openReminderModal"
      >
        Create new task!
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
.bg {
  background: linear-gradient(
    60deg,
    rgb(142, 252, 233) 10%,
    rgb(88, 161, 230) 50%,
    rgb(185, 147, 243) 100%
  );
}
</style>
