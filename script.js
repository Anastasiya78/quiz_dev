
var quiztitle = "Quiz";


var quiz = [
       {
           "question" : " Die meisten Ausländer haben einen italienischen Pass.",
           "image" : "",
           "choices" : [
                                   "So ist es!",
                                   "Stimmt nicht!",
                               ],
           "correct" : "So ist es!",
           "explanation" : "Die Aussage entspricht nicht der Realität.",
           "graphics" : '<img src="img/1.png" alt="Nationalitäten" class="custom_class">'
       },
       {
           "question" : "Mehr Männer als Frauen sind Ausländer",
           "image" : "",
           "choices" : [
                                   "So ist es!",
                                   "Stimmt nicht!",
                               ],
           "correct" : "So ist es!",
           "explanation" : "Im Jahr 2017 wohnten in Zürich mehr Männer mit einem ausländischen Pass",
           "graphics" : '<img src="img/2.png" alt="Geschlecht" class="custom_class">'
       },
       {
           "question" : "Der Ausländeranteil ist im Oerlikon am grössten.",
           "image" : "",
           "choices" : [
                                   "So ist es!",
                                   "Stimmt nicht!"
                               ],
           "correct" : "Stimmt nicht!",
           "explanation" : "In der Mitte",
           "graphics" : '<img src="img/3.png" alt="Stadtquartier" class="custom_class">'
       },
       {
           "question" : "Die Mehrheit der <18 Jährigen in Zürich sind Ausländer",
           "image" : "",
           "choices" : [
                                   "So ist es!",
                                   "Stimmt nicht!",
                               ],
           "correct" : "Stimmt nicht!",
           "explanation" : "Fast",
           "graphics" : '<img src="img/4.png" alt="Alter" class="custom_class">'
       },
       {
           "question" : "Mehr als die Hälfte der Ausländer sind ledig.",
           "image" : "",
           "choices" : [
                                   "So ist es!",
                                   "Stimmt nicht!"
                               ],
           "correct" : "So ist es!",
           "explanation" : "In der Mitte",
           "graphics" : '<img src="img/5.png" alt="Zivilstand" class="custom_class">'
       },
       
       {
           "question" : "Die meisten Ausländer haben Kinder",
           "image" : "",
           "choices" : [
                                   "So ist es!",
                                   "Stimmt nicht!",
                               ],
           "correct" : "Stimmt nicht!",
           "explanation" : "Im Jahr 2017 wohnten in Zürich mehr Männer mit einem ausländischen Pass",
           "graphics" : '<img src="img/6.png" alt="Kinder" class="custom_class">'
       },

   ];


var currentquestion = 0,
    score = 0,
    submt = true,
    picked;

function findCorrectAnswer(element) {
      return element == quiz[currentquestion]['correct'];
    }

jQuery(document).ready(function ($) {


    function htmlEncode(value) {
        return $(document.createElement('div')).text(value).html();
    }


    function addChoices(choices) {
        if (typeof choices !== "undefined" && $.type(choices) == "array") {
            $('#choice-block').empty();
            for (var i = 0; i < choices.length; i++) {
                $(document.createElement('li')).addClass('choice choice-box').attr('data-index', i).text(choices[i]).appendTo('#choice-block');
            }
        }
    }

    function nextQuestion() {
        submt = true;
        $('#explanation').empty();
        $('#question').text(quiz[currentquestion]['question']);
        $('#pager').text('<Question ' + Number(currentquestion + 1) + ' of ' + quiz.length + '>');
        if (quiz[currentquestion].hasOwnProperty('image') && quiz[currentquestion]['image'] != "") {
            if ($('#question-image').length == 0) {
                $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question'])).insertAfter('#question');
            } else {
                $('#question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question']));
            }
        } else {
            $('#question-image').remove();
        }
        addChoices(quiz[currentquestion]['choices']);
        setupButtons();
        $('#submitbutton').hide();
    }


    function processQuestion(choice) {
        if (quiz[currentquestion]['choices'][choice] == quiz[currentquestion]['correct']) {
            if (quiz[currentquestion]['graphics'].length > 0) {
              $('#question-image').remove();
            }
            $('.choice').addClass('disabled');
            $('.choice').eq(choice).css({
                'background-color': '#50D943'
            });
            $('#explanation').html(quiz[currentquestion]['graphics'] + '<strong>Correct!</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
            score++;
        } else {
            if (quiz[currentquestion]['graphics'].length > 0) {
              $('#question-image').remove();
            }
            $('.choice').addClass('disabled');
            $('.choice').eq(choice).css({
                'background-color': '#8F223A'
            });
            $('.choice-box').eq(choice).css({
                'color': 'silver'
            });
            var tmp = quiz[currentquestion]["choices"]
            $('.choice').eq(tmp.findIndex(findCorrectAnswer)).css({
                'background-color': '#50D943'
            });
            $('#explanation').html(quiz[currentquestion]['graphics'] + '<strong>Incorrect.</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
        }
        currentquestion++;
        $('#submitbutton').html('NEXT QUESTION &raquo;').on('click', function () {
            if (currentquestion == quiz.length) {
                endQuiz();
            } else {
                $(this).text('Check Answer').css({
                    'color': '#222'
                }).off('click');
                nextQuestion();
            }
        });
        $('#submitbutton').show();

    }

    function setupButtons() {
        $('.choice').on('click', function () {
          /*
            $('.choice-block').css({
              "padding-top": "200px"
            });
            */
            picked = $(this).attr('data-index');
            $('.choice').removeAttr('style').off('mouseout mouseover');
            $(this).css({
                'border-color': '#222',
                'font-weight': 700,
                'background-color': '#4D9898'
            });
             processQuestion(picked);
        });
    }


    function endQuiz() {
        $('#explanation').empty();
        $('#question').empty();
        $('#choice-block').empty();
        $('#submitbutton').remove();
        $('#question').text("You got " + score + " out of " + quiz.length + " correct.");
        $(document.createElement('h2')).css({
            'text-align': 'center',
            'font-size': '4em'
        }).text(Math.round(score / quiz.length * 100) + '%').insertAfter('#question');
    }


    function init() {
        //add title
        if (typeof quiztitle !== "undefined" && $.type(quiztitle) === "string") {
            $(document.createElement('h1')).text(quiztitle).appendTo('#frame');
        } else {
            $(document.createElement('h1')).text("Quiz").appendTo('#frame');
        }

        //add pager and questions
        if (typeof quiz !== "undefined" && $.type(quiz) === "array") {
            //add pager
            $(document.createElement('p')).addClass('pager').attr('id', 'pager').text('<Question 1 of ' + quiz.length +'>').appendTo('#frame');
            //add first question
            $(document.createElement('h2')).addClass('question').attr('id', 'question').text(quiz[0]['question']).appendTo('#frame');
            //add image if present
            if (quiz[0].hasOwnProperty('image') && quiz[0]['image'] != "") {
                $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[0]['image']).attr('alt', htmlEncode(quiz[0]['question'])).appendTo('#frame');
            }

            //questions holder
            $(document.createElement('ul')).attr('id', 'choice-block').appendTo('#frame');

            //add choices
            addChoices(quiz[0]['choices']);



            $(document.createElement('p')).addClass('explanation').attr('id', 'explanation').html('&nbsp;').appendTo('#frame');

            //add submit button
            $(document.createElement('div')).addClass('choice-box').attr('id', 'submitbutton').text('Check Answer').css({
                'font-weight': 700,
                'color': '$main-font-color',
                'padding': '30px 0'
            }).appendTo('#frame');

            setupButtons();
            $('#submitbutton').hide();
        }
    }

    init();
});
