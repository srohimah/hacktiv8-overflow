<template>
  <div class="container question" >
    <div class="row" v-for="question in questions" :key="question._id" v-if="question._id == $route.params.id">
    <div class="col col-sm-2 left-content">
			<ul>
				<li><span @click="upVoteQuestion(question)" class="fa fa-caret-up fa-3x"></span></li>
				<li><h4>{{question.votes}}</h4></li>
				<li><span @click="downVoteQuestion(question)" class="fa fa-caret-down fa-3x"></span></li>
			</ul>
		</div>
		<div class="col col-sm-10">
			<div class="title">{{question.title}}</div>
			<div class="content">
				<p>
          {{question.content}}
				</p>
			</div>
		</div>
	</div>

  <span>3 Answers</span>  
  <hr>
  <div>
  <div class="row" v-for="answer in answers" :key="answer._id" v-if="question._id == $route.params.id">
		<div class="col col-sm-2 left-content">
			<ul>
				<li><span class="fa fa-caret-up fa-3x"></span></li>
				<li><h4></h4></li>
				<li><span class="fa fa-caret-down fa-3x"></span></li>
			</ul>
		</div>
		<div class="col col-sm-10">
			<div class="title"></div>
			<div class="content">
				<p>
					We are running jobmanager and task manager on the same machine and during the run in some scenario's we notice that jobmanager hold more memory than it should hold according to configuration from Top:...
				</p>
			</div>
		</div>
	</div>
	</div>
  <form>
  <div class="form-group">
    <label for="email">Your Answer:</label>
    <textarea class="form-control" v-model="objanswer.content"></textarea>
  </div>
  <button type="submit" class="btn btn-primary" @click="postAnswer(answers)">Post Your Answer</button>
</form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      objanswer: {
        content: '',
        userId: localStorage.userId,
        questionId: this.$route.params.id
      },
      votes: 0
    }
  },
  computed: {
    questions () {
      return this.$store.getters.getQuestions
    },
    answers () {
      return this.$store.getters.getAnswers
    }
  },
  methods: {
    postAnswer (answer) {
      this.$store.dispatch('postAnswer', answer)
    },
    upVoteQuestion (question) {
      this.$store.dispatch('upVoteQuestion', question)
    },
    downVoteQuestion (question) {
      this.$store.dispatch('downVoteQuestion', question)
    }
  }

}
</script>

<style scoped>
  .question {
    padding-top: 90px;
  }
  ul {
	  list-style: none;
  }
  textarea{
   height: 150px;
}
</style>
