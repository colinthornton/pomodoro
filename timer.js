var timerIntervalID;
var playTime = false;
var timerRunning = false;
var pauseTime = null;
var paused = false;

$(document).ready(function(){
  $('.fa-plus-square').on('click', function(){
    var val = Number($(this).prev().text());
    val++;
    $(this).prev().text(val);
  });
  
  $('.fa-minus-square').on('click', function(){
    var val = Number($(this).next().text());
    val = val > 1 ? val - 1 : val;
    $(this).next().text(val);
  });
  
  $(".display").mousedown(function(e){
    e.preventDefault();
  });
  
  $('#startBtn').on('click', function(){
    if(paused){
      startTimer(pauseTime);
      $(this).html('<i class="fa fa-pause"></i>');
      $('h4').text('Work');
      $(".col-sm-3 i").fadeOut(500);
      paused = false;
    } else if(!timerRunning){
      var time = $('#workTime').text() * 60;
      startTimer(time);
      $(this).html('<i class="fa fa-pause"></i>');
      $('h4').text('Work');
      $(".col-sm-3 i").fadeOut(500);
    } else {
      paused = true;
      stopTimer();
      $('h4').text('Paused');
      var timeString = $('h1').text();
      var timeArr = timeString.split(":");
      pauseTime = (Number(timeArr[0]) * 60) + Number(timeArr[1]);
    }
  });
  
  $("#resetBtn").on("click", function(){
    paused = false;
    stopTimer();
    $("h1").text("25:00");
    $('h4').text("PomoTomo")
    $("#workTime").text("25");
    $("#playTime").text("5");
  });
});

function startTimer(duration){
  console.log('startTimer');
  timerRunning = true;
  paused = false;
  var start = Date.now();
  var diff;
  var minutes;
  var seconds;
  
  function timer(){
    console.log('timer(), diff is ' + diff);
    diff = duration - ((Date.now() - start) / 1000 | 0);
    console.log('diff is ' + diff);
    
    minutes = (diff / 60) | 0;
    seconds = (diff % 60) | 0;
      
    //append leading 0 if less than 10
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    // // same code as shorthand above =>
    // // if(minutes < 10){
    // //   minutes = "0" + minutes;
    // // } else {
    // //   minutes = minutes;
    // // }
    
    $("h1").text(minutes + ':' + seconds);
    
    if($('h4').text() !== 'Work' && !playTime){
      $('h4').text('Work');
    } else if($('h4').text() !== 'Play' && playTime){
      $('h4').text('Play');
    }
    
    if (diff < 0){
      clearInterval(timerIntervalID);
      var alarm = new Audio("dotted-spiral.mp3");
      alarm.play();
      if(playTime){
        playTime = false;
        startTimer($('#workTime').text() * 60);
      } else {
        playTime = true;
        startTimer($('#playTime').text() * 60);
      }
    }
  }
  timer();
  timerIntervalID = setInterval(timer, 1000);
}

function stopTimer(){
  if(timerIntervalID){
    clearInterval(timerIntervalID);
  }
  if($(".col-sm-3 i").css("display") === "none" && !paused){
    $(".col-sm-3 i").fadeIn(500);
  }
  $("#startBtn").html('<i class="fa fa-play"></i>');
  timerRunning = false;
}