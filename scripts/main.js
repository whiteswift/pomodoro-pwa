(function () {
  'use strict';

  var clock = document.querySelector('#clockdiv');
  var workButton = document.querySelector('#tomato');
  var minutesSpan = document.querySelector('#minutes');
  var secondsSpan = document.querySelector('#seconds');
  var fiveMinButton = document.querySelector('#five-min');
  var tenMinButton = document.querySelector('#ten-min');
  var breakButtons = document.getElementById('break-buttons');
  var volumeButton = document.getElementById('volume');
  var optionsSelect = document.querySelector('#options-select');
  var durationSelect = document.querySelector('#duration-select');
  var durationButtonToggle = document.getElementById('btn-duration-toggle');

  var toggleSeconds = document.getElementById('toggle-seconds');
  var secondsBlock = secondsSpan ? secondsSpan.parentElement : null;

  var timeinterval = 0;
  var timerType;
  var status = document.getElementById('status');

  function toggleSecondsVisibility(show) {
    if (!secondsBlock) return;
    secondsBlock.style.display = show ? '' : 'none';
    localStorage.setItem('showSeconds', JSON.stringify(show));
    if (toggleSeconds) toggleSeconds.checked = !!show;
  }

  // Load saved preference on start (default: show)
  (function initSecondsPreference() {
    if (!secondsBlock) return;
    var saved = localStorage.getItem('showSeconds');
    var show = saved === null ? true : JSON.parse(saved);
    toggleSecondsVisibility(show);
    if (toggleSeconds) {
      toggleSeconds.addEventListener('change', function () {
        toggleSecondsVisibility(toggleSeconds.checked);
      });
    }
  })();

  function setClock(minutes, seconds) {
    minutesSpan.innerHTML = minutes;
    secondsSpan.innerHTML = seconds;
  }

  function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return { 'total': t, 'days': days, 'hours': hours, 'minutes': minutes, 'seconds': seconds };
  }

  function initializeClock(endtime) {
    function updateClock() {
      var t = getTimeRemaining(endtime);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

      if (t.total <= 0) {
        clearInterval(timeinterval);
        onTimerFinish();
        let volume = localStorage.getItem('volume');
        volume === 'true' ? alarm.play() : console.log('Volume muted');
        status.innerHTML = timerType === 'work' ? 'Get ready to work it!' : 'Time to chill';
      }
    }

    updateClock();
    timeinterval = setInterval(updateClock, 1000);
  }

  function setTimer(duration) { // Duration in seconds
    timeinterval ? clearInterval(timeinterval) : console.log('Work Work Work Work Work');
    let deadline = new Date(Date.parse(new Date()) + duration * 1000);
    initializeClock(deadline);
  }

  function doSomeWork(workit) {
    let workButton = document.getElementById('tomato');
    let breakButtons = document.getElementById('break-buttons');

    if (workit) {
      status.innerHTML = 'Work it';
      breakButtons.className = 'hidden';
      workButton.className = 'visible';
      timerType = 'work';
    } else {
      status.innerHTML = 'Chill out time';
      breakButtons.className = 'visible';
      workButton.className = 'hidden';
      timerType = 'break';
    }
  }

  function onTimerFinish() {
    timerType === 'work' ? doSomeWork(false) : doSomeWork(true);
    displayNotification();
  }

  // Event listeners
  workButton.addEventListener('click', function () {
    status.innerHTML = '';
    setTimer(parseInt(durationSelect.value) * 60);
    doSomeWork(true);
  });

  fiveMinButton.addEventListener('click', function () {
    setTimer(5 * 60);
    doSomeWork(false);
  });

  tenMinButton.addEventListener('click', function () {
    setTimer(10 * 60);
    doSomeWork(false);
  });

  volumeButton.addEventListener('click', function () {
    if (localStorage.getItem('volume') === 'true') {
      volumeButton.children[0].setAttribute('src', 'assets/images/volume_muted.svg');
      localStorage.setItem('volume', false);
    } else {
      volumeButton.children[0].setAttribute('src', 'assets/images/volume_on.svg');
      localStorage.setItem('volume', true);
    }
  });

  durationButtonToggle.addEventListener('click', () => {
    durationButtonToggle.classList.toggle('duration-toggle-open');
    optionsSelect.classList.toggle('options-select-visible');
  });

  window.addEventListener('beforeinstallprompt', function (e) {
    e.userChoice.then(function (choiceResult) {
      if (choiceResult.outcome == 'dismissed') {
        console.log('User cancelled home screen install');
      } else {
        console.log('User added to home screen');
      }
    });
  });

  // Sound and notifications
  function sound(src) {
    var self = this;
    self.sound = document.createElement("audio");
    self.sound.src = src;
    self.sound.setAttribute("preload", "auto");
    self.sound.setAttribute("controls", "none");
    self.sound.style.display = "none";
    document.body.appendChild(self.sound);
    self.play = function () { self.sound.play(); };
    self.stop = function () { self.sound.pause(); };
  }

  var alarm = new sound('assets/media/alarm.mp3');

  function displayNotification() {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      new Notification("Timer finished!");
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        if (permission === "granted") new Notification("Timer finished!");
      });
    }
  }

  function checkVolume() {
    let vol = localStorage.getItem('volume');
    if (vol === 'false' || vol === '') {
      volumeButton.children[0].setAttribute('src', 'assets/images/volume_muted.svg');
      localStorage.setItem('volume', false);
    } else {
      volumeButton.children[0].setAttribute('src', 'assets/images/volume_on.svg');
      localStorage.setItem('volume', true);
    }
  }

  Notification.requestPermission();
  checkVolume();
}());