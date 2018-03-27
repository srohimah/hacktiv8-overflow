<template>
<div class="container navtop">
  <ul class="nav nav-tabs justify-content-end">
  <li class="nav-item">
    <a class="nav-link active" href="#">All Questions</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Link</a>
  </li>
</ul>
	<div class="row" v-for="question in questions" :key="question.id">
		<div class="col col-sm-2 left-content">
			<ul>
				<li>
					<div>
					<span>0</span><br>
					<span>votes</span>
					</div>
				</li>
				<li>
					<div>
					<span>0</span><br>
					<span>Answers</span>
					</div>
				</li>
			</ul>
		</div>
		<div class="col col-sm-10">
			<div class="title"><router-link :to="'/question/'+question._id">{{question.title}}</router-link></div>
			<div class="content">
				<p>
					{{question.content.substring(0,150)}}
				</p>
			</div>
		</div>
	</div>
	<hr>
	<div class="row">
		<div class="col col-sm-2 left-content">
			<ul>
				<li>
					<div>
					<span>0</span><br>
					<span>votes</span>
					</div>
				</li>
				<li><span></span></li>
			</ul>
		</div>
		<div class="col col-sm-10">
			<div class="title">Flink:jobmanager hold more memory than configure</div>
			<div class="content">
				<p>
					We are running jobmanager and task manager on the same machine and during the run in some scenario's we notice that jobmanager hold more memory than it should hold according to configuration from Top:...
				</p>
			</div>
		</div>
	</div>
	<hr>
</div>
</template>

<script>
export default {
  computed: {
    questions () {
      return this.$store.getters.getQuestions
    }
  },
  beforeCreate () {
    this.$store.dispatch('readQuestions')
  }
}
</script>

<style scoped>
.title {
	margin-top: 20px;
	font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
	color: royalblue;
	font-size: 12pt;
}
.content {
	font-size: 12px;
}
ul {
	list-style: none;
}
.navtop {
	padding-top: 90px;
}
.left-content {
	margin-top: 20px;
}
</style>
