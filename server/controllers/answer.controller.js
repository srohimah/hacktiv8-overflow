const Answer = require('../models/answer.model')
const jwt = require('jsonwebtoken')

module.exports ={
  addAnswer: function (req, res){
    let token = req.headers.token
    var decoded = jwt.verify(token, 'secret');
    Answer.create({
      questionId: req.body.questionId,
      content : req.body.content,
      userId : decoded.id
    }).then(data=>{
      res.status(201).json({
        message : 'question created',
        data
      }).catch(err=>res.send(err))
    })
  },
  findOneQuestion: function (req, res){
    Question.find(req.params.id).then(data=>{
      res.status(200).json({
        message : 'data'
      })
    })
  }
}