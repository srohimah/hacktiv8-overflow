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
					<div class="total-vote text-center">
					<span>0</span><br>
					<span>Votes</span>
					</div>
				</li>
				<li>
					<div class="total-answer text-center">
					<span>{{countAnswer(questions)}}</span><br>
					<span>Answers</span>
					</div>
				</li>
			</ul>
		</div>
		<div class="col col-sm-10">
			<div class="title"><router-link :to="'/question/'+question._id">{{question.title}}</router-link></div>
			<div class="content">
				<p>
					{{question.content.substring(0,300)}}...
				</p>
				<p>
          <span class="answered">asked by: {{question.userId.name}},</span>
          <span class="date">{{getDate(question.userId.createdAt)}}</span>
        </p>
			</div>
		</div>
		<div class="col col-sm-12"><hr></div>
	</div>
</div>
</template>

<script>
import moment from 'moment'
export default {
  computed: {
    questions () {
      return this.$store.getters.getQuestions
    }
  },
  created () {
    this.$store.dispatch('readQuestions')
    this.$store.dispatch('readAnswers')
  },
  methods: {
    countAnswer (answers) {
      let counter = 0
      answers.map(answer => {
        if (answer.questionId) {
          counter++
        }
      })
      return counter
    },
    getDate (date) {
      return moment(date).startOf('day').fromNow()
    }
  }
}
</script>

<style scoped>
.title {
	margin-top: 20px;
	font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
	color: royalblue;
	font-size: 14pt;
}
.content {
	font-size: 13px;
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
.total-answer {
  background-color:lavender;
	font-size: 14px;
	margin: 0px 15px 0px 15px;
}
.total-vote {
  background-color:honeydew;
	font-size: 14px;
	margin: 0px 15px 5px 15px;
}
.answered {
    font-size: 12px;
    color:darkcyan;
  }
.date {
	font-size: 11px;
	color:gray
}

</style>
