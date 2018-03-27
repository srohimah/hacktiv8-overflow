<template>
  <div class="modal fade" id="modalAdd" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Question</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="recipient-name" class="text-md-left col-form-label">Title:</label>
            <input type="text" class="form-control" id="recipient-name" v-model="questions.title">
          </div>
          <div class="form-group">
            <label for="message-text" rows="5" class="text-md-left col-form-label">Question:</label>
            <textarea class="form-control" id="body-text" v-model="questions.content"></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="askQuestion(questions)">Post Article</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      questions: {
        title: '',
        content: '',
        userId: localStorage.userId
      }
    }
  },
  methods: {
    askQuestion (questions) {
      this.$store.dispatch('askQuestion', questions)
    }
  }
}
</script>

<style>
textarea{
   height: 150px;
}

</style>