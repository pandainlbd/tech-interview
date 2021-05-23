<template>
	<div>
		<h1 class="text-3xl text-gray-800 font-bold mb-4">Your reminders for this week:</h1>
		<reminder-card
			v-for="reminder in reminders"
			:name="reminder"
			:key="reminder"
			:description="reminder"
			:datetime="new Date()"
			/>
		<div>
			<button class="p-2 my-2 bg-gray-100" @click="openReminderModal">Create</button>
		</div>
		<reminder-modal ref="reminderModal" />
	</div>
</template>

<script>
import ReminderModal from './ReminderModal.vue';
import ReminderCard from './ReminderCard.vue';

export default {
	components: {
		ReminderCard,
		ReminderModal,
	},
	data: () => ({
		reminders: ['asda', 'asdasd'],
	}),
	mounted() {
	},
	methods: {
		openReminderModal() {
			this.$refs.reminderModal.open();
		}
	}
}
</script>

<style>
</style>
