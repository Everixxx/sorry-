let playMusic = false;
const message = `maafin akuuuu yaaaa sayanggg...\nmaaf kalau selama iniii kamu selalu sakit hatiii sama akuu, entah dari perbuatan ataupun dari kata yang aku ucapkan ke kamuuu\n\nmaaf kalau ketemu sama akuuu, jadi bagian terburuk dalam hidup kamuu, aku juga ga pengen nyakitin kamuuu tapi semua hal yang bikin kamu sakittt itu semuanya datengnya secara ngga langsung dari akuuu sendiriii... akuu minta maaf yaaa sayangggg :(\n\nsemoga kamuuu bisa maafin akuu yaaaa, akuu masii bakal terus berusaha jadi yang terbaik buat kamuuu\nI LOVE YOUUU SAYANGGG\n\nfrom: almas nakal `;

function startWithMusic(choice) {
  playMusic = choice;

  // Sembunyikan pilihan awal
  const choiceBox = document.getElementById("musicChoice");
  const intro = document.getElementById("introText");
  const btn = document.getElementById("readBtn");

  choiceBox.style.display = "none";
  intro.style.display = "block";
  btn.style.display = "inline-block";

  // Siapkan musik
  const bgMusic = document.getElementById("bgMusic");
  bgMusic.loop = true;
  bgMusic.volume = 0.6;

  // Preload agar siap
  bgMusic.load();

  // Jika user memilih musik, coba mainkan sebentar untuk memberi izin Chrome
  if (playMusic) {
    bgMusic.play().then(() => {
      // langsung pause lagi, supaya Chrome izinkan nanti
      bgMusic.pause();
      bgMusic.currentTime = 0;
      console.log("Musik siap dan diizinkan.");
    }).catch(err => {
      console.warn("Autoplay diblokir, tapi akan dicoba lagi nanti:", err);
    });
  }
}

function showLetter() {
  const bgMusic = document.getElementById("bgMusic");

  // Jalankan musik (kalau dipilih)
  if (playMusic) {
    bgMusic.play().then(() => {
      console.log("Musik diputar saat surat mulai.");
    }).catch(err => {
      console.warn("Masih diblokir. Gunakan tombol audio manual:", err);
      bgMusic.setAttribute("controls", true); // munculkan kontrol kalau gagal
      alert("Silakan tekan tombol ▶️ di bawah untuk memutar musik.");
    });
  }

  // Transisi intro ke surat
  document.getElementById("introText").style.opacity = 0;
  document.getElementById("readBtn").style.display = "none";

  setTimeout(() => {
    const letterBox = document.getElementById("letterBox");
    const typedText = document.getElementById("typedText");
    letterBox.style.display = "block";
    let i = 0;

    function typeWriter() {
      if (i < message.length) {
        typedText.innerHTML += message.charAt(i);
        i++;
        setTimeout(typeWriter, 30);
      }
    }
    typeWriter();
  }, 600);
}