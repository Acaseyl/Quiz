const strt_btn = document.querySelector(".strt-btn button");
const info_box = document.querySelector(".info-box");
const quiz_box = document.querySelector(".quiz-box");
const score_box = document.querySelector(".score-box");
const timer = document.querySelector("header .timer");
const count_down = document.querySelector(".timer .count-down");
const time_text = document.querySelector(".timer .time-text");
const option_list = document.querySelector(".option_list");
const question_count = document.querySelector(".question-count");

strt_btn.addEventListener("click", function()  {
    info_box.classList.remove("showInfo"); 
    quiz_box.classList.add("showQuiz"); 
    console.log("start button clicked")
    showQuestions(0); 
    questionCounter(1); 
    startTimer(60); 
 });

let question_index = 0;
let question_number = 1;
let userScore = 0;
let penalty_time = -3;

const next_btn = document.querySelector("footer .next-btn");
const bottom_ques_counter = document.querySelector("footer .question-count");

next_btn.addEventListener("click", function() {
    if (question_index < question.length - 1){
        question_index++; 
        question_number++; 
        showQuestions(question_index); 
        questionCounter(question_number);  
        time_text.textContent = "Time Left"; 
        next_btn.classList.remove("show"); 
    }else{
        showResult();
    }
})

function showQuestions(index){
    const question_text = document.querySelector(".question-text");
    let question_tag = '<span>'+ question[index].number + ". " + question[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ question[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ question[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ question[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ question[index].options[3] +'</span></div>';
    question_text.innerHTML = question_tag; 
    option_list.innerHTML = option_tag; 
    
    const option = option_list.querySelectorAll(".option");

    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

    function questionCounter(index){
        let totalQuestionCounterTag = '<span><p>'+ index +'</p> of <p>'+ question.length +'</p> Questions </span>';
        question_count.innerHTML = totalQuestionCounterTag;
    }

    function startTimer(time){
        counter = setInterval(timer, 1000);
        function timer(){
            count_down.textContent = time; //changing the value of timeCount with time value
            time--; 
            if(time < 0){ 
                clearInterval(counter); 
                time_text.textContent = "Quiz over!"; 
                next_btn.classList.add("show");
            }
        } 

    }
    
    function showResult(){
        info_box.classList.remove("showInfo"); 
        quiz_box.classList.remove("showQuiz"); 
        score_box.classList.add("showResult"); 
        const scoreText = score_box.querySelector(".score");
        
        let scoreTag = 'You got <p>'+ userScore +'</p> out of <p>'+ question.length + '<p> correct!' + '</p></span>';
        scoreText.innerHTML = scoreTag;  
    }

    function optionSelected(answer){
        let user_answer = answer.textContent; 
        let correct_answer = question[question_index].answer; 
        const all_options = option_list.children.length; 
        
        if(user_answer == correct_answer){ 
            userScore += 1; 
            answer.classList.add("correct"); 
           console.log("Your correct answers = " + userScore);
           if (question_index < question.length - 1){
            question_index++; 
            question_number++; 
            showQuestions(question_index); 
            questionCounter(question_number);  
            time_text.textContent = "Time Left"; 
            next_btn.classList.remove("show"); 
            
        }else{ 
            showResult();
        } 
        
        }else{

            answer.classList.add("incorrect"); //adding red color to correct selected option
            // console.log("Wrong Answer");
            // console.log("Your incorrect answers = " + userScore);
            penalty_time = Number(timer.textContent)
            clearInterval(counter)
            startTimer(penalty_time - 3)

           if (question_index < question.length - 1){
            question_index++; 
            question_number++; 
            showQuestions(question_index); 
            questionCounter(question_number);  
            time_text.textContent = "Time Left"; 
            next_btn.classList.remove("show"); 

        }else{

            showResult();
        }
            for(i=0; i < all_options; i++){
                if(option_list.children[i].textContent == correct_answer){ //if there is an option which is matched to an array answer 
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    //option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                    console.log("Auto selected correct answer.");
                }
            }
        }
        for(i=0; i < all_options; i++){
            option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
        }
        next_btn.classList.add("show"); //show the next button if user selected any option
    }