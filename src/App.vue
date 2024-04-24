<template>
	<div class="fade show container-fluid p-0">
		<div id="content">
			<router-view></router-view>
			<vue-ins-progress-bar></vue-ins-progress-bar>
		</div>
	</div>
</template>

<script>
export default {
  name: 'app',
  components: {
  },
  mounted () {
    this.$insProgress.finish()
  },
	created() {
		this.$insProgress.start()
		
		this.$router.beforeEach((to, from, next) => {
			this.$insProgress.start()
			next()
		})
		this.$router.afterEach(() => {
			this.$insProgress.finish()
		})
	}
}
</script>
