/* =============================================
   Asena İHA — Enhanced Gallery Script
   Offline gallery helper — works with file:// URLs.
   Keep the `imageFiles` array in sync when you
   add or remove pictures from PhotoGallery/.
   ============================================= */

// --------------------------------------------------------------
// Configuration: list the names of the files in your folder.
// New photos should be added at the TOP of the array for
// "newest first" display order.
// --------------------------------------------------------------
const imageFiles = [
  'WhatsApp Image 2026-05-23 at 12.48.57.jpeg',
  'WhatsApp Image 2026-05-23 at 12.52.44.jpeg',
  'WhatsApp Image 2026-03-12 at 22.40.29 (1).jpeg',
  'WhatsApp Image 2026-03-12 at 22.40.29 (2).jpeg',
  'WhatsApp Image 2026-03-12 at 22.40.29 (3).jpeg',
  'WhatsApp Image 2026-03-12 at 22.40.29.jpeg',
];

// ------------------------------------------------------------------
// State
// ------------------------------------------------------------------
let currentModalIndex = -1;

// ------------------------------------------------------------------
// Runtime code
// ------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  // Update photo count badge
  const countBadge = document.getElementById('photoCount');
  if (countBadge) {
    countBadge.innerHTML = `<i class="fas fa-images"></i><span>${imageFiles.length} Fotoğraf</span>`;
  }

  if (imageFiles.length === 0) {
    grid.innerHTML = `
      <div class="gallery-empty" style="grid-column: 1 / -1;">
        <i class="fas fa-camera-retro"></i>
        <p>Galeride gösterilecek görsel yok.</p>
      </div>`;
    return;
  }

  imageFiles.forEach((filename, index) => {
    const card = document.createElement('div');
    card.classList.add('gallery-card', 'reveal-scale');

    const img = document.createElement('img');
    img.src = 'PhotoGallery/' + filename;
    img.alt = 'Asena İHA Takımı — Fotoğraf ' + (index + 1);
    img.loading = 'lazy';

    const overlay = document.createElement('div');
    overlay.classList.add('gallery-card-overlay');
    overlay.innerHTML = '<span><i class="fas fa-expand"></i> Büyüt</span>';

    card.appendChild(img);
    card.appendChild(overlay);

    card.addEventListener('click', () => openModal(index));
    grid.appendChild(card);
  });

  // Re-observe new reveal-scale elements for animations
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.gallery-card.reveal-scale').forEach(el => {
    revealObserver.observe(el);
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('galleryModal');
    if (!modal || !modal.classList.contains('open')) return;

    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') navigateModal(-1);
    if (e.key === 'ArrowRight') navigateModal(1);
  });
});

function openModal(index) {
  const modal = document.getElementById('galleryModal');
  if (!modal) return;
  currentModalIndex = index;
  updateModalImage();
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('galleryModal');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
  currentModalIndex = -1;
}

function navigateModal(direction) {
  if (currentModalIndex < 0) return;
  currentModalIndex += direction;

  // Wrap around
  if (currentModalIndex < 0) currentModalIndex = imageFiles.length - 1;
  if (currentModalIndex >= imageFiles.length) currentModalIndex = 0;

  updateModalImage();
}

function updateModalImage() {
  const modal = document.getElementById('galleryModal');
  if (!modal) return;

  const img = modal.querySelector('img');
  img.src = 'PhotoGallery/' + imageFiles[currentModalIndex];
  img.alt = 'Fotoğraf ' + (currentModalIndex + 1);

  const counter = document.getElementById('modalCounter');
  if (counter) {
    counter.textContent = `${currentModalIndex + 1} / ${imageFiles.length}`;
  }
}
