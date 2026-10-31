document.addEventListener('DOMContentLoaded', () => {
  // 1. SLIDER BACKGROUND HEADER
  const slides = document.querySelectorAll('.slide');
  
  if (slides.length > 0) {
    let currentSlide = 0;

    function nextSlide() {
      if (!slides[currentSlide]) return;

      slides[currentSlide].classList.remove('active');
      slides[currentSlide].classList.add('exit');

      const previousIndex = currentSlide;
      currentSlide = (currentSlide + 1) % slides.length;

      if (slides[currentSlide]) {
        slides[currentSlide].classList.remove('exit');
        slides[currentSlide].classList.add('active');
      }

      setTimeout(() => {
        if (slides[previousIndex]) {
          slides[previousIndex].classList.remove('exit');
        }
      }, 1000);
    }

    setInterval(nextSlide, 4000);
  }

  // 2. FEATURE POPUP MODAL DETAIL PRODUK & GAMBAR UKURAN ASLI
  const modal = document.getElementById('productModal');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalPrice = document.getElementById('modalPrice');
  const modalDesc = document.getElementById('modalDesc');
  const modalWaBtn = document.getElementById('modalWaBtn');
  const productCards = document.querySelectorAll('.product-card');

  // Buka Modal saat kartu produk diklik
  productCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Jika yang diklik adalah tombol "Pesan Sekarang", biarkan membuka WhatsApp secara langsung
      if (e.target.closest('.btn-buy')) {
        return;
      }

      const name = card.getAttribute('data-name');
      const price = card.getAttribute('data-price');
      const imgSrc = card.getAttribute('data-img');
      const desc = card.getAttribute('data-desc');

      // Isi data ke modal
      modalTitle.textContent = name;
      modalPrice.textContent = price;
      modalImg.src = imgSrc;
      modalDesc.textContent = desc;
      modalWaBtn.href = `https://wa.me/62895700745724?text=Halo%2C%20saya%20tertarik%20membeli%20${encodeURIComponent(name)}`;

      // Tampilkan modal
      modal.classList.add('active');
    });
  });

  // Fungsi Menutup Modal
  function closeModal() {
    modal.classList.remove('active');
  }

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);

  // Tutup modal dengan tombol Escape pada keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
});