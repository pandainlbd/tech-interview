<template>
  <div class="bg h-screen w-screen py-2 lg:px-96">
    <h1 class="text-3xl text-white font-medium m-3">
      Your reminders for a week from now:
    </h1>

    <div>
      <reminder-card
        v-for="(reminder, index) in reminders"
        :key="reminder._id"
        :index="index"
        :name="reminder.name"
        :description="reminder.description"
        :datetime="reminder.datetime"
        :reminder_color="reminder.reminder_color"
        :audio="reminder.audio"
        @edit-reminder="editReminder"
      />
    </div>

    <div class="flex">
      <button
        class="p-4 m-2 flex-1 bg-white font-medium"
        @click="
          () => {
            active_reminder = null;
            openReminderModal();
          }
        "
      >
        Create new task!
      </button>
    </div>
    <reminder-modal
      ref="reminderModal"
      :reminder="active_reminder"
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
    active_reminder: null,
  }),
  async mounted() {
    await this.reloadReminders();
  },
  methods: {
    async reloadReminders() {
      // this.active_reminder = null;
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
      setTimeout(() => {
        this.$refs.reminderModal.open();
      }, 500);
    },
    editReminder(index) {
      console.log(`Edit reminder fired with index: ${index}!`);
      this.active_reminder = this.reminders[index];
      this.openReminderModal();
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
