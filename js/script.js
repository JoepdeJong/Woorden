$(document).ready(function(){
  var questions = [];
  var previousWrong = false;
  var previousQuestion = null;
  var currentQuestion = null;
  var questionCount = 0;
  var correctCount = 0;
  // var correctQuestions = [];
  $('.wd-start').on('click', function(){
    $.each($('#questions').val().split(/\n/), function(i, line){
          var comment = line.split('{')[1];
          if(comment != null){

          comment = comment.replace(/[}]/g, "");
          //   comment = comment.replace('}', '');
          }
          var rawLine = line.split('{')[0];
          var question = rawLine.split('=')[0];
          var answer = rawLine.split('=')[1];
          var newQuestion = {};
          newQuestion.question = $.trim(question);
          newQuestion.answer = $.trim(answer);
          newQuestion.comment = $.trim(comment);

          if(answer){
              questions.push(newQuestion);
          }
      });
    newWord(false);
    $('.questions').slideUp('fast', function(){
      $('.test').slideDown('fast');
    });
  });

  $('#form').on('submit', function(e) { //use on if jQuery 1.7+
        e.preventDefault();  //prevent form from submitting
        newWord();
    });

  $('#check').on('click', function(){
    newWord();
  });

  $('#previous').on('click', function(){
    previousCorrect();
  });

  function newWord(doCheck = true) {
    if(doCheck){
      check();
    }

    if(questions.length > correctCount){
      previousQuestion = currentQuestion;
      currentQuestion = newQuestion();
      $('#questionCount').text(questionCount);
      questionCount++;
      showQuestion();
    } else {
      finish();
    }
  }

  function check(){
    var answer = $('#input').val();
    var current = questions[currentQuestion];
    if($.trim(answer) == current.answer){
      // questions.splice(currentQuestion, 1);
      questions[currentQuestion] = null;
      correctCount++;
      $('#correctCount').text(correctCount);
      $('#correctQuestion').text('');
      $('#correctAnswer').text('');
      previousWrong = false;
    } else {
      $('#correctQuestion').text(current.question);
      $('#correctAnswer').text(current.answer);
      previousWrong = true;
    }
    $('#input').val('');
    
  }

  function previousCorrect(){
    if(previousWrong){
      // questions.splice(previousQuestion, 1);
      questions[previousQuestion] = null;
      correctCount++;
      $('#correctCount').text(correctCount);
      // $('#correctQuestion').text('');
      // $('#correctAnswer').text('');
      $('#previous').fadeOut('fast');
      if(previousQuestion == currentQuestion){
        finish();
      }
    }
  }

  function newQuestion() {
    var question = Math.floor(Math.random()*questions.length);
    console.log('ID' + questions.length)

    if(questions[question] == null){
      question = newQuestion();
    }
    // if(questions.length > 0 && question == 0){
    //   alert('test');
    //   question = newQuestion();
    // }
    if(questions.length > (correctCount + 1) && previousQuestion == question){
      // alert('previous');
      // console.log(questions.length);
      // console.log(correctCount);
      // console.log(previousQuestion);
      // console.log(question);
      question = newQuestion();
    }
    return question;
  }

  function showQuestion(){
    $('#question').text(questions[currentQuestion].question);

    if(previousWrong){
      $('#previous').fadeIn('fast');
    } else {
      $('#previous').fadeOut('fast');
    }
  }

  function finish(){
    $('.form').slideUp();
  }
});