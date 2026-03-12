/* =============================================
   Asena İHA — Offline gallery helper script
   This version does **not** try to fetch directory listings,
   so it works with `file://` URLs and requires no server at all.
   You are responsible for keeping the `imageFiles` array (or
   the count/numbering) in sync whenever you add or remove
   pictures. Each entry is simply prefixed with "PhotoGallery/".
   ============================================= */

// --------------------------------------------------------------
// Configuration: list the names of the files in your folder.
// Alternatively, use the numbered pattern example below and set
// imageCount appropriately.
// --------------------------------------------------------------
const imageFiles = [
  // put your actual filenames here, e.g.:
  'WhatsApp Image 2026-03-12 at 22.40.29 (1).jpeg',
  'WhatsApp Image 2026-03-12 at 22.40.29 (2).jpeg',
  'WhatsApp Image 2026-03-12 at 22.40.29 (3).jpeg',
  'WhatsApp Image 2026-03-12 at 22.40.29.jpeg',
];
// -- or uncomment the next lines to generate a simple 1.jpg..N.jpg sequence: --
// const imageCount = 4; // update this number when you add/remove pictures
// for (let i = 1; i <= imageCount; i++) imageFiles.push(i + '.jpg');

// ------------------------------------------------------------------
// runtime code
// ------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  // mark gallery link active when on this page
  const galleryLink = document.querySelector('a[href="gallery.html"]');
  if (galleryLink) galleryLink.classList.add('active');

  if (imageFiles.length === 0) {
    grid.innerHTML = '<p>Galeride gösterilecek görsel yok. `js/gallery.js` dosyasını güncelleyin.</p>';
    return;
  }

  imageFiles.forEach(filename => {
    const img = document.createElement('img');
    img.src = 'PhotoGallery/' + filename;
    img.alt = '';
    img.loading = 'lazy';
    img.classList.add('gallery-item');
    img.addEventListener('click', () => openModal(img.src));
    grid.appendChild(img);
  });
});

function openModal(src) {
  const modal = document.getElementById('galleryModal');
  if (!modal) return;
  modal.querySelector('img').src = src;
  modal.classList.add('open');
}

function closeModal() {
  const modal = document.getElementById('galleryModal');
  if (!modal) return;
  modal.classList.remove('open');
}
