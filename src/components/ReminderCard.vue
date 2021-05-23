<template>
	<div>
		<h3>{{ name }}</h3>
		<p>{{ datetime }}</p>
		<p>{{ description }}</p>
	</div>
</template>

<script>

export default {
	props: {
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		datetime: {
			type: Date,
			required: true,
		},
	},
	mounted() {
	},
	methods: {
	}
}
</script>

<style scoped>
</style>
