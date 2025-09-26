// Selección de elementos
const cards = document.querySelectorAll('.song-card');
const modal = document.getElementById('playerModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalArtist = document.getElementById('modalArtist');
const modalAudio = document.getElementById('modalAudio');
const closeModal = document.getElementById('closeModal');

const playBtn = document.getElementById('playPause'); // div con imagen
const progressContainer = document.getElementById('progressContainer');
const progressBar = document.getElementById('progressBar');
const currentTime = document.getElementById('currentTime');

// Control de volumen
const volumeSlider = document.getElementById('volumeSlider');
volumeSlider.addEventListener('input', () => {
  modalAudio.volume = volumeSlider.value;
});
function updateVolumeColor() {
  const value = volumeSlider.value * 100; // 0–100
  // Como el slider es vertical invertido (rtl), usamos "to top"
  volumeSlider.style.background = `linear-gradient(to top, #ff4d4d ${value}%, #444 ${value}%)`;
}

// Inicializar al cargar
updateVolumeColor();

// Actualizar al mover
volumeSlider.addEventListener('input', () => {
  modalAudio.volume = volumeSlider.value;
  updateVolumeColor();
});


// Abrir modal al hacer clic en tarjeta
cards.forEach(card => {
  card.addEventListener('click', () => {
    modal.style.display = 'flex';
    modalImg.src = card.dataset.img;
    modalTitle.textContent = card.dataset.title;
    modalArtist.textContent = card.dataset.artist;
    modalAudio.src = card.dataset.song;
    modalAudio.play();

    // Cambiar imagen del botón a pause
    const img = playBtn.querySelector('img');
    if(img) img.src = "../iconos/pause.png";
  });
});

// Play / Pause con imagen
playBtn.addEventListener('click', () => {
  const img = playBtn.querySelector('img');
  if(modalAudio.paused){
    modalAudio.play();
    if(img) img.src = "../iconos/pause.png";
  } else {
    modalAudio.pause();
    if(img) img.src = "../iconos/play.png";
  }
});

// Actualizar barra de progreso y tiempo
modalAudio.addEventListener('timeupdate', () => {
  const percent = (modalAudio.currentTime / modalAudio.duration) * 100;
  progressBar.style.width = percent + '%';

  let minutes = Math.floor(modalAudio.currentTime / 60);
  let seconds = Math.floor(modalAudio.currentTime % 60);
  if(seconds < 10) seconds = '0' + seconds;
  currentTime.textContent = `${minutes}:${seconds}`;
});

// Saltar a un punto de la canción al hacer clic en la barra
progressContainer.addEventListener('click', (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = modalAudio.duration;
  modalAudio.currentTime = (clickX / width) * duration;
});

// Cerrar modal con botón
closeModal.addEventListener('click', closeModalFunc);

// Cerrar modal al hacer clic fuera
window.addEventListener('click', e => {
  if(e.target === modal){
    closeModalFunc();
  }
});

// Función para cerrar modal y resetear audio
function closeModalFunc(){
  modal.style.display = 'none';
  modalAudio.pause();

  // Cambiar imagen del botón a play
  const img = playBtn.querySelector('img');
  if(img) img.src = "../imagenes/play-icon.png";

  progressBar.style.width = '0%';
  currentTime.textContent = '0:00';
}
