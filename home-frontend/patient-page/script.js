let a = document.querySelector(".hamburger");
let b = document.querySelector(".services")
a.addEventListener("click",()=>{

    b.classList.toggle("active")
})
document.addEventListener('DOMContentLoaded', function() {
    var questions = document.querySelectorAll('.question');
    
    questions.forEach(function(question) {
        question.addEventListener('click', function() {
            var faqItem = this.parentNode;
            faqItem.classList.toggle('active');
        });
    });
});
