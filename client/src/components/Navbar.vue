<template>
<div>
<nav class="navbar navbar-expand-lg navbar-dark fixed-top navbar-top">
    <div class="container">
      <a class="navbar-brand" href="#">Siro Overflow</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <button v-if="tokenUser" class="btn btn-otline-info" data-toggle="modal" data-target="#modalAdd">Ask Question</button>
            <button v-if="!tokenUser" class="btn btn-otline-info" data-toggle="modal" data-target="#modalSignup">Signup</button>
            <button v-if="!tokenUser" class="btn btn-otline-info" data-toggle="modal" data-target="#modalSignin">Login</button>
            <button v-if="tokenUser" class="btn btn-otline-info" @click="logout">Logout</button>
          </li>
        </ul>
      </div>
    </div>
</nav>
<Askquestion></Askquestion>
<signup></signup>
<signin></signin>
</div>
</template>

<script>
import Askquestion from '@/components/Askquestion'
import signup from '@/components/SignUp'
import signin from '@/components/Signin'
import router from '../router'

export default {
  components: {
    Askquestion,
    signup,
    signin
  },
  data () {
    return {
      tokenUser: localStorage.tokenUser
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      router.push('/')
    }
  }
}
</script>

<style>
.navbar-top{
    background-color: grey;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
}
</style>
