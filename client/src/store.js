import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    questions: [],
    answers: []
  },
  getters: {
    getQuestions (state) {
      return state.questions
    },
    getAnswers (state) {
      return state.answers
    }

  },
  mutations: {
    askQuestion (state, payload) {
      state.questions.push(payload)
    },
    readQuestions (state, payload) {
      state.questions = payload
    },
    upVoteQuestion (state, payload) {
      let index = state.questions.findIndex(q =>
        console.log(q)
      )
      let objQuestion = {
        id: payload.id,
        title: payload.title,
        description: payload.description,
        votes: payload.votes++,
        votesCount: payload.votesCount++,
        askBy: payload.askBy
      }
      state.questions[index] = objQuestion
    },
    downVoteQuestion (state, payload) {

    },
    postAnswer (state, payload) {
      state.answers.push(payload)
    }
  },
  actions: {
    askQuestion ({commit}, payload) {
      axios({
        method: 'post',
        url: 'http://localhost:3000/questions/',
        data: {
          title: payload.title,
          content: payload.content,
          userid: localStorage.userId
        },
        headers: {
          token: localStorage.tokenUser
        }
      }).then(question => {
        commit('askQuestion', question)
        console.log(question)
      }).catch(err => console.log(err))
    },
    readQuestions ({commit}, payload) {
      axios.get('http://localhost:3000/questions/').then(response => {
        commit('readQuestions', response.data.data)
      })
    },
    postAnswer ({commit}, payload) {
      axios({
        method: 'post',
        url: 'http://localhost:3000/answers',
        data: {
          content: payload.content,
          questionId: payload.questionId
        },
        headers: {
          token: localStorage.tokenUser
        }
      }).then(answer => {
        console.log('jaihhh', answer)
        commit('postAnswer', answer)
      })
    },
    upVoteQuestion ({commit}, payload) {
      commit('upVoteQuestion', payload)
    },
    downVoteQuestion ({commit}, payload) {
      commit('downVoteQuestion', payload)
    }
  }
})
