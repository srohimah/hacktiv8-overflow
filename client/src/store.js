import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert'

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
      console.log('mutation', payload)
      state.answers.push(payload)
    },
    readAnswers (state, payload) {
      state.answers = payload
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
      if (!localStorage.tokenUser) {
        swal('Tidak memiliki akses!', 'harap login terlebih dahulu!', 'warning')
      } else {
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
          // console.log('action---', answer)
          commit('postAnswer', answer.data.data)
        })
      }
    },
    readAnswers ({commit}, payload) {
      axios.get('http://localhost:3000/answers').then(response => {
        commit('readAnswers', response.data.data)
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
