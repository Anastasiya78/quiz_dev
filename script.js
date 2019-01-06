
var quiztitle = "Quiz";


var quiz = [
       {
           "question" : "Mehr als ein Drittel der Ausländer in Zürich hat einen deutschen Pass.",
           "image" : "",
           "choices" : [
                                   "So ist es!",
                                   "Stimmt nicht!",
                               ],
           "correct" : "Stimmt nicht!",
           "explanation" : "Die Aussage entspricht nicht der Realität. Zwar repräsentierten deutsche Staatsangehörige die grösste Gruppe der ausländischen Bevölkerung in Zürich, doch belief sich ihr Anteil nur auf 24.7 Prozent. Die anderen dominierenden Herkunftsländer sind auch europäisch: Jeweils über 5 Prozent der ausländischen Bevölkerung machen Menschen aus Italien und Portugal aus. Weitere Nationalitäten kommen deutlich seltener vor. Und wie ist es mit der Vorstellung, dass mehr Männer als Frauen nach Zürich ziehen?",
           "graphics" : '<img src="img/1.png" alt="Nationalitäten" class="custom_class">'
       },
       {
           "question" : "Nach Zürich wandern aus dem Ausland mehr Männer als Frauen ein.",
           "image" : "",
           "choices" : [
                                   "So ist es!",
                                   "Stimmt nicht!",
                               ],
           "correct" : "So ist es!",
           "explanation" : "Das Vorurteil entspricht der Realität, wenn auch sehr knapp. Es gibt nur etwas mehr Ausländer als Ausländerinnen in der Stadt. 7 Prozentpunkte mehr Männer als Frauen hatten im Jahr 2017 keinen Schweizer Pass. Und in welchen Zürcher Stadtquartieren wohnen sie?",
           "graphics" : '<img src="img/2.png" alt="Geschlecht" class="custom_class">'
       },
       {
           "question" : "Unter Zürcher Stadtquartieren weist Altstetten den höchsten Ausländeranteil auf.",
           "image" : "",
           "choices" : [
                                   "So ist es!",
                                   "Stimmt nicht!"
                               ],
           "correct" : "Stimmt nicht!",
           "explanation" : "Die Aussage entspricht nicht der Realität. Zwar leben die meisten Zürcher Ausländer (8.5 Prozent) in Altstetten, deren Anteil an der Quartiersbevölkerung ist aber in Schwamendingen am grössten: Hier hat fast die Hälfte (42.3 Prozent) der Einwohner einen ausländischen Pass. Seefeld, Seebach und Langstrasse sind auch mit jeweils über 39 Prozent vergleichsweise international. Den geringsten Ausländeranteil hat Friesenberg, wo die Einwanderer nur 18.5 Prozent der Bevölkerung ausmachen. Und wie alt sind die in der Stadt unterschiedlich verteilten Einwanderer?",
           "graphics" : '<img src="img/3.png" alt="Stadtquartier" class="custom_class">'
       },
       {
           "question" : "Mehr als 40 Prozent der 20 bis 39-Jährigen in Zürich haben keinen Schweizer Pass.",
           "image" : "",
           "choices" : [
                                   "So ist es!",
                                   "Stimmt nicht!",
                               ],
           "correct" : "So ist es!",
           "explanation" : "Die Aussage entspricht der Realität. Fast die Hälfte der 20 bis 39-jährigen Zürcher sind tatsächlich Ausländer. Bei den anderen Altersgruppen ist ihr Anteil deutlich geringer: Während bei den 40 bis 39-Jährigen der Anteil noch relativ hoch bleibt (knapp 33 Prozent), sind Einwanderer in den älteren Gruppen eher schwach vertreten. Die jüngsten Zürcher haben relativ oft keinen Schweizer Pass: Ihr Anteil belief sich im Jahr 2017 auf knapp 27 Prozent. Nun lassen Sie uns das Thema Zivilstand der Einwanderer kurz ansprechen.",
           "graphics" : '<img src="img/4.png" alt="Alter" class="custom_class">'
       },
       {
           "question" : "Die Mehrheit der Zürcher Ausländer ab 20 Jahren ist verheiratet.",
           "image" : "",
           "choices" : [
                                   "So ist es!",
                                   "Stimmt nicht!"
                               ],
           "correct" : "Stimmt nicht!",
           "explanation" : "Die Aussage entspricht nicht der Realität. Der Anteil der Ausländer ab 20 Jahren, die verheiratet sind, betrug Ende 2017 rund 42 Prozent. 47 Prozent waren ledig und mehr als 8 Prozent geschieden. Und wie sieht die Aufteilung der ausländischen Bevölkerung nach der Anzahl an Kindern aus?",
           "graphics" : '<img src="img/5.png" alt="Zivilstand" class="custom_class">'
       },
       
       {
           "question" : "Mehr als drei Viertel der Ausländer in Zürich haben keine Kinder.",
           "image" : "",
           "choices" : [
                                   "So ist es!",
                                   "Stimmt nicht!",
                               ],
           "correct" : "So ist es!",
           "explanation" : "Die Aussage entspricht der Realität. Die überwiegende Mehrheit der Einwanderer war im Jahr 2017 kinderlos. Rund 12 Prozent hatten ein Kind, während 10.5 Prozent der ausländischen Bewohner mehr als zwei Kinder in der Familie hatten.",
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
        $('#pager').text('<Frage ' + Number(currentquestion + 1) + ' von ' + quiz.length + '>');
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
            $('#explanation').html(quiz[currentquestion]['graphics'] + '<strong>Richtig!</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
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
            $('#explanation').html(quiz[currentquestion]['graphics'] + '<strong>Falsch.</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
        }
        currentquestion++;
        $('#submitbutton').html('NÄCHSTE FRAGE &raquo;').on('click', function () {
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
        $('#question').text("Du hast " + score + " von " + quiz.length + " Fragen richtig beantwortet.");
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
            $(document.createElement('p')).addClass('pager').attr('id', 'pager').text('<Frage 1 von ' + quiz.length +'>').appendTo('#frame');
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
