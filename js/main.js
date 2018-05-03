let time = 1000;
let t;
let score = 0;
let count = 0;

function makeYard () {
    for (let i = 0; i < 20; i++) {
        $('#yard').append("<img class=\"hole\" src=\"img/hole.jpg\">")
    }
}

function countMole() {
    $('#count').text($('.mole').length)
    if ($('.mole').length === 20) {
        $('#count').html('GAME OVER')
        stopMole()
    }
}

function countScore() {
    $('#score').text(score)
}

function addMole() {
    let list = $("#yard .hole").toArray();
    let num_hole = list.length;
    let rand_num = Math.floor(Math.random() * num_hole);
    let rand_hole = list[rand_num];
    $(rand_hole).attr('src', 'img/mole.jpg');
    $(rand_hole).attr('class','mole')
    countMole()
}


function stopMole() {
    $('#play').toggleClass('active');
    $('#play').text('PLAY');
    clearInterval(t);
}

function infest() {
    resetInterval();
    $('#play').toggleClass('active');
    $('#play').text('PAUSE')
}

function resetInterval () {
    clearInterval(t);
    time -= 10;
    t = setInterval(addMole, time)

}


$('#yard').click( function (e) {
    if ($('#play').attr('class') === 'active') {
        if ($(e.target).attr('src') === 'img/mole.jpg') {
            $(e.target).attr('src', 'img/hole.jpg');
            $(e.target).attr('class','hole');
            resetInterval();
            score += 1;
            countScore();
            countMole()
        }
    }
});

$('#play').click( function () {
    if ($(this).attr('class') !== 'active') {
        infest()
    }
    else if ($(this).attr('class') === 'active'){
        stopMole()
    }
});

$('#reset').click( function (){
    score = 0;
    count = 0;
    time += 1000;
    $('#yard').empty();
    makeYard();
    stopMole();
    countMole();
    countScore()
});

makeYard();
