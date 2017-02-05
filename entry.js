let seconds = 2;
let worker;

// Shorten element lookups
const el = document.querySelector.bind(document);

// Boot.
run();

function run() {
  if (! window.Worker || ! window.Notification) {
    console.warn('Browser not supported');
    return;
  }

  setupWorker();

  // Hide the incompatability notice and show the app
  el('.no-way').style.display = 'none';
  el('.main').style.display = 'flex';

  // wire up UI events
  el('.notify-cta').onclick = handleNotify;
  el('.seconds-input').onchange = handleInputChange;
}

function handleInputChange(event) {
  seconds = event.target.value;
}

function handleNotify(event) {
  if (Notification.permission === 'granted') {
    signalWorkerToPush();
    return;
  }
  Notification.requestPermission(
    permission => permission === 'granted' ? signalWorkerToPush() : null
  );
}

function signalWorkerToPush() {
  if (! worker) {
    return console.log('Worker hasnt registered');
  }
  worker.postMessage({
    delay: seconds * 1000,
    message: 'Here I am, after ' + seconds + ' seconds. Miss me?',
  });
}

function setupWorker() {
  if (! worker) {
    worker = new Worker('worker.js');
  }
}
