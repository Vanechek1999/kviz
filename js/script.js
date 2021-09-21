var canvas = document.querySelector('canvas')
var c = canvas.getContext('2d')

canvas.width = document.documentElement.clientWidth
canvas.height =  document.documentElement.clientHeight

// Variables
var attributes = {
  particleCount: 400,   // кол-во снежинок
  particleSize: 3,      // макс размер снежинки
  fallingSpeed: 1,      // интенсивность снега
  colors: ['#ccc', '#eee', '#fff', '#ddd'] // цвета
}

var mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}


addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
    init()
})

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
    var xDist = x2 - x1
    var yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

// объект снежинки
function Particle(x, y, radius, color, radians) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = radians;
    this.velocity = 0.005;

    this.update = () => {
        // движение точек
        this.radians += this.velocity;
        this.x = x + Math.cos(this.radians) * 400 ;
        this.y = y + Math.tan(this.radians) * 600 ;

        this.draw();
    }

    this.draw = () => {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()

        c.closePath()
    }
}

// запуск анимации
var particles;
function init() {
    particles = [];

    for (var i = 0; i < attributes.particleCount; i++) {
        particles.push(
          new Particle(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            randomIntFromRange(0.5, attributes.particleSize),
            randomColor(attributes.colors),
            Math.random() * 80
          )
        );
    }
}

// цикл анимации
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach(particle => {
     particle.update();
    });
}

init()
animate()
$(".js-range-slider").ionRangeSlider({
    type: "single",
    min: 0,
    max: 600000,
    from: 100000,
    grid: true,
    step: 100000,
    grid_num: 5,
});

function showValueRange(){
    var value12 = document.getElementById('range');
    var showText = document.getElementsByClassName('txt')
    var list = document.getElementById('value1Txt')
    document.getElementById('value1').innerHTML='До'+ ' ' + value12.value + ' ' + 'рублей'

    if(value12.value == 100000){
        $(list).find(">:first-child").addClass('txtShow')
        $(list).find(">:nth-child(2)").removeClass('txtShow')
    }else if(value12.value == 200000){
        $(list).find(">:first-child").removeClass('txtShow')
        $(list).find(">:nth-child(3)").removeClass('txtShow')
        $(list).find(">:nth-child(2)").addClass('txtShow')
    }else if(value12.value == 300000){
        $(list).find(">:nth-child(2)").removeClass('txtShow')
        $(list).find(">:nth-child(4)").removeClass('txtShow')
        $(list).find(">:nth-child(3)").addClass('txtShow')
    }
    else if(value12.value == 400000){
        $(list).find(">:nth-child(3)").removeClass('txtShow')
        $(list).find(">:nth-child(4)").addClass('txtShow')
        $(list).find(">:nth-child(5)").removeClass('txtShow')
    }
    else if(value12.value == 500000){
        $(list).find(">:nth-child(4)").removeClass('txtShow')
        $(list).find(">:nth-child(5)").addClass('txtShow')
        $(list).find(">:nth-child(6)").removeClass('txtShow')
    }
    else if(value12.value == 600000){
        $(list).find(">:nth-child(5)").removeClass('txtShow')
        $(list).find(">:nth-child(6)").addClass('txtShow')
    }
}

function back(){
    var rect = document.getElementById('bigSingleCircle').getBoundingClientRect()
    if(parseInt($('#bigSingleCircle').css('left')) >= parseInt($('#smallSingleCircle').css('left'))){
        $('#smallSingleCircle').css('background-color', 'transparent')
    }else {
        $('#smallSingleCircle').css('background-color', '#AB896D')
    }
}
back()

// $(document).on('click','.show_me',function(){
//     var numTab = $(this).attr('data-tub');
//     var formApp = $('.block2'),
//     slides = formApp.find('.content');
//     var $curSlide = $('.content.active1');
//     if(!$(this).hasClass('active1')){
//         $('.content').each(function(){
//             if($curSlide.find('input.js-answer').length && ! $curSlide.find('input.js-answer').val()){
//                 $curSlide.find('.js-message').html('Вы не ответили на вопрос');
//                 return;
//             }else if($curSlide.find('input.firstAnswer').val()<=100000){ //проверка на условие
//                 $curSlide.find('.js-message').html('Ты дурак?');
//                 return;
//             }
//             else {
//                 $(this).removeClass('active1');
//             }

//         });
//         $('.count').each(function (){
//             if(! $curSlide.find('input.js-answer').length && ! $curSlide.find('input.js-answer').val()){
//                 $(this).removeClass('transparent');
//             }else if($curSlide.find('input.js-answer').length &&  $curSlide.find('input.js-answer').val()){
//                 if($curSlide.find('input.firstAnswer').val()<=100000){ //проверка на условие
//                     return;
//                 }
//                 $(this).removeClass('transparent');
//             }
//             if($(this).hasClass('transparent')){
//                 $('.val_show').each(function (){
//                     if(!$curSlide.find('input.js-answer').length &&  !$curSlide.find('input.js-answer').val()){
//                         $('.val_show').removeClass('show_value')
//                     }
//                 })
//             }else if($curSlide.find('input.js-answer').length &&  $curSlide.find('input.js-answer').val()){
//                 $('.val_show').removeClass('show_value')
//             }
//         })
//         if($curSlide.find('input.js-answer').length && ! $curSlide.find('input.js-answer').val()){
//             $curSlide.find('.js-message').html('Вы не ответили на вопрос');
//             return;
//         }else if($curSlide.find('input.firstAnswer').val()<=100000){ //проверка на условие
//             $curSlide.find('.js-message').html('Ты дурак?');
//             return;
//         }
//         else {
//             $('.content[data-tub="'+numTab+'"]').addClass('active1');
//         }
//         slides.each(function () {
//             var el = $(this),
//                 questionTxt = el.find('.js-question').text(),
//                 input = el.find('input.js-answer'),
//                 radio = el.find('.js-radioBtn'),
//                 checkbox = el.find('.js-checkBox');
//             function addValue() {
//                 var answerTxt = el.find('.js-radioBtn.active label').text();
//                 input.attr('value', questionTxt + ' : <b>' + answerTxt + '</b>');
//                 console.log(answerTxt)
//             }
//             function addValueCheck(){
//                 var answerCheckTxt = el.find('.js-checkBox.active label').text();
//                 input.attr('value', questionTxt + ' : <b>' + answerCheckTxt + '</b>');
//                 console.log(answerCheckTxt)
//             }
//             radio.click(function () {
//                 $(this).addClass('active').siblings('.active').removeClass('active');
//                 addValue();
//             });
//             checkbox.click(function () {
//                 $( this ).toggleClass( "active" );
//                 addValueCheck()
//             })
//         });
//         $('.count[data-tub="'+numTab+'"]').addClass('transparent');
//         $('.val_show[data-tub="'+numTab+'"]').addClass('show_value');

//     }

// })



// $(document).on('click','.chose_item',function(){
//     if(!$(this).hasClass('active')){
//         $(this).parent().find('.chose_item').each(function(){
//             $(this).removeClass('active');
//         });
//         $(this).addClass('active');
//         var name_quest = $(this).parent().attr('data-quest');
//         var value_quest = $(this).find('.chose_text').text();
//         $('input[name="'+name_quest+'"]').val(value_quest);
//     }

// });
// $(document).on('click','.chose_item-Check',function(){
//         var checkboxValues = [];
//         $('input[type="checkbox"]:checked').each(function (index, elem) {
//                 checkboxValues.push($(elem).val())
//         })
//         var name_quest = $(this).parent().attr('data-quest');
//         var value_quest = $(this).find('.chose_text').text();
//         $('input[name="'+name_quest+'"]').val(checkboxValues.join(','));


// });


// $(document).on('click','.item',function(){
//     if(!$(this).hasClass('active')){
//         $('.item').each(function(){
//             $(this).removeClass('active');
//         });
//         $(this).addClass('active');
//     if(!$(this).find('.content').hasClass('active')){
//         $('.content').each(function (){
//             $('.content').removeClass('active1')
//         })
//         $(this).find('.content').addClass('active1')
//     }
//     if(!$(this).find('.count').hasClass('transparent')){
//         $('.count').each(function (){
//             $('.count').removeClass('transparent')
//         })
//         $(this).find('.count').addClass('transparent')
//     }
//     if(!$(this).find('.val_show').hasClass('show_value')){
//         $('.val_show').each(function (){
//             $('.val_show').removeClass('show_value')
//         })
//         $(this).find('.val_show').addClass('show_value')
//     }
//     }
// });

$('#russia path:eq(0)').animate([{opacity: "1"}], 400, function(){
    $(this).next().animate({opacity: "1"}, 400, arguments.callee);
});
$('#russia2 path:eq(0)').animate({opacity: "1"}, 100, function(){
    $(this).next().animate({opacity: "1"}, 100, arguments.callee);
});
$('#russia path:eq(0)').animate({strokeDashoffset: "0"}, 3000, function(){
    $(this).next().animate({strokeDashoffset: "0"}, 40, arguments.callee);
});
$('#russia2 path:eq(0)').animate({strokeDashoffset: "0"}, 3000, function(){
    $(this).next().animate({strokeDashoffset: "0"}, 40, arguments.callee);
});





//Реализация квиза на чистом js


let slides = document.querySelectorAll('form .item'),
    countOfSlide = document.querySelectorAll('form .item .count'),
    contenttOfSlide = document.querySelectorAll('form .item .content'),
    btns = document.querySelectorAll('form .item .content .btn'),
    textAnswers = document.querySelectorAll('form input[type="text"]'),
    radioAnswers = document.querySelectorAll('.js-radioBtn input'),
    checkBoxAnswers = document.querySelectorAll('.js-checkBox input');


function checkActiveSlide(){
    contenttOfSlide.forEach(content=>{
        if(content.parentElement.classList.contains('active')){
            content.classList.add('active1')
            content.nextElementSibling.classList.add('transparent')
            content.nextElementSibling.querySelector('span').classList.add('show_value')
        }else{
            content.classList.remove('active1')
            content.nextElementSibling.classList.remove('transparent')
            content.nextElementSibling.querySelector('span').classList.remove('show_value')
        }
    })
}
function changeSlide(){
    slides.forEach(slide =>{
        slide.addEventListener('click', function(event){
                if(event.target.classList.contains('next-question')){
                    if(event.target.parentNode.parentNode.parentNode.querySelector('input[type="hidden"]').value !== ''){
                        console.log(event.target.parentNode.parentNode.parentNode.querySelector('input[type="hidden"]'))
                        event.target.parentNode.parentNode.parentNode.parentNode.classList.remove('active')
                        event.target.parentNode.parentNode.parentNode.parentNode.nextElementSibling.classList.add('active')
                        checkActiveSlide()
                    }
                    return
                }else if(event.target.classList.contains('count')){
                    slides.forEach(item=>{
                        if(item.classList.contains('active')){
                            if(item.querySelector('input[type="hidden"]').value !==''){
    
                                item.classList.remove('active')
                                event.target.parentElement.classList.add('active')
                                checkActiveSlide()
                            }
                            return
                        }
                    })
                   
    
                }
          
        })
    })

}
function writeYourAnswer(){
    textAnswers.forEach(text=>{
        text.addEventListener('input', function(){
            this.parentElement.querySelector('input[type="hidden"]').value= this.value;
            console.log(this.previousElementSibling)
        })
    })
    checkBoxAnswers.forEach(checkBox=>{
        checkBox.addEventListener('click', function(){
            this.parentElement.parentElement.parentElement.previousElementSibling.value += `${this.nextElementSibling.innerText}, `
            console.log(this.parentElement.parentElement.parentElement.previousElementSibling.value)
        })
    })
    radioAnswers.forEach(radio =>{
        radio.addEventListener('click', function(){
            console.log(this)
            this.parentElement.parentElement.parentElement.previousElementSibling.value = this.nextElementSibling.innerText
        })
    })

}
writeYourAnswer()
changeSlide()
// nextSlide()






