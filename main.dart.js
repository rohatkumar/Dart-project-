import 'dart:html';

var pianoKeys = querySelectorAll('.piano-keys .key');
var volumeSlider = querySelector('.volume-slider input');
var keysCheckbox = querySelector('.keys-checkbox input');

var allKeys = [];
var audio = Audio('tunes/a.wav'); // Corrected the audio source to use quotes

void playTune(String key) {
  audio.src = 'tunes/${key}.wav'; // Corrected interpolation syntax
  audio.play();

  var clickedKey = querySelector('[data-key="${key}"]'); // Corrected the query selector
  clickedKey!.classList.add('active');
  Timer(Duration(milliseconds: 150), () {
    clickedKey!.classList.remove('active');
  });
}

void main() {
  pianoKeys.forEach((key) {
    allKeys.add(key.dataset['key']);
    key.onClick.listen((_) => playTune(key.dataset['key']!));
  });

  volumeSlider.addEventListener('input', handleVolume);
  keysCheckbox.addEventListener('click', showHideKeys);
  document.addEventListener('keydown', pressedKey);
}

void handleVolume(Event e) {
  var target = e.target as InputElement;
  audio.volume = double.parse(target.value);
}

void showHideKeys() {
  pianoKeys.forEach((key) {
    key.classes.toggle('hide');
  });
}

void pressedKey(KeyboardEvent e) {
  if (allKeys.contains(e.key)) playTune(e.key);
}
