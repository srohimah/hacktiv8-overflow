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

  <span>{{countAnswer(answers)}} Answers</span>  
  <hr>
  <div>
  <div class="row" v-for="answer in answers" :key="answer._id" v-if="answer.questionId === $route.params.id">
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
          {{answer.content}}
				</p>
        <p>
          <span class="answered">answered by: {{answer.userId.name}}, </span>
          <span class="date">{{getDate(answer.userId.createdAt)}}</span>
        </p>
			</div>
		</div>
    <div class="col col-sm-12"><hr></div>
	</div>
	</div>
  <form>
  <div class="form-group">
    <label for="email">Your Answer:</label>
    <textarea class="form-control" v-model="objanswer.content"></textarea>
  </div>
  <button type="submit" class="btn btn-primary" @click="postAnswer(objanswer)">Post Your Answer</button>
</form>
  </div>
</template>

<script>
import moment from 'moment'
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
  created () {
    this.$store.dispatch('readQuestions')
    this.$store.dispatch('readAnswers')
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
      this.objanswer.content = ''
    },
    upVoteQuestion (question) {
      this.$store.dispatch('upVoteQuestion', question)
    },
    downVoteQuestion (question) {
      this.$store.dispatch('downVoteQuestion', question)
    },
    getDate (date) {
      return moment(date).startOf('day').fromNow()
    },
    countAnswer (answers) {
      let counter = 0
      answers.map(answer => {
        if (answer.questionId === this.$route.params.id) {
          counter++
        }
      })
      return counter
    }
  }

}
</script>

<style scoped>
  .title {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
	  color: royalblue;
	  font-size: 14pt;
    margin-bottom: 10px;
  }
  .answered {
    font-size: 12px;
    color:darkcyan;
  }
  .date {
    font-size: 11px;
    color:gray
  }
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
