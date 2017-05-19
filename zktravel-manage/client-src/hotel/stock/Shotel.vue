<style lang="scss" scoped>

</style>

<template>
	<div>
	
	</div>
</template>

<script>
	export default {
		props: ['updates'],
		data() {
			return {
				isTrue: false
			}
		},
		methods: {
			update() {
				console.log(this.updates.isTrue.aisTrue);
				this.updates.isTrue.aisTrue = false;
				this.$store.commit('audit');
				console.log(this.updates.isTrue.aisTrue);
			}
		}
	}
</script>