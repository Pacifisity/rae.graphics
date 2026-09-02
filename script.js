// Gallery Configuration
const GALLERY_GRID = document.getElementById('gallery-grid');
const LIGHTBOX = document.getElementById('lightbox');
const LIGHTBOX_IMAGE = document.getElementById('lightbox-image');

const GALLERY_IMAGES = [
    { full: './portfolio/main/1.jpg', thumbnail: './portfolio/background/gallery/1.jpg' },
    { full: './portfolio/main/2.jpg', thumbnail: './portfolio/background/gallery/2.jpg' },
    { full: './portfolio/main/3.jpg', thumbnail: './portfolio/background/gallery/3.jpg' },
    { full: './portfolio/main/4.jpg', thumbnail: './portfolio/background/gallery/4.jpg' },
    { full: './portfolio/main/5.jpg', thumbnail: './portfolio/background/gallery/5.jpg' },
    { full: './portfolio/main/6.jpg', thumbnail: './portfolio/background/gallery/6.jpg' },
    { full: './portfolio/main/7.jpg', thumbnail: './portfolio/background/gallery/7.jpg' },
    { full: './portfolio/main/8.jpg', thumbnail: './portfolio/background/gallery/8.jpg' },
    { full: './portfolio/main/9.jpg', thumbnail: './portfolio/background/gallery/9.jpg' }
];

const BACKGROUND_IMAGES = [
    './portfolio/background/portfolio/1.jpg',
    './portfolio/background/portfolio/2.jpg',
    './portfolio/background/portfolio/3.jpg',
    './portfolio/background/portfolio/4.jpg',
    './portfolio/background/portfolio/5.jpg',
    './portfolio/background/portfolio/6.jpg',
    './portfolio/background/portfolio/7.jpg',
    './portfolio/background/portfolio/8.jpg',
    './portfolio/background/portfolio/9.jpg',
    './portfolio/background/gallery/1.jpg',
    './portfolio/background/gallery/2.jpg',
    './portfolio/background/gallery/3.jpg',
    './portfolio/background/gallery/4.jpg',
    './portfolio/background/gallery/5.jpg',
    './portfolio/background/gallery/6.jpg',
    './portfolio/background/gallery/7.jpg',
    './portfolio/background/gallery/8.jpg',
    './portfolio/background/gallery/9.jpg'
];

let loadedImages = [];
let currentImageIndex = 0;
let onImageLoadedCallbacks = [];

/**
 * Register a callback to be called when each image is loaded
 */
function onImageLoaded(callback) {
    onImageLoadedCallbacks.push(callback);
}

/**
 * Load the nine images in the top-level portfolio directory into the gallery.
 */
function loadPortfolioImages() {
    GALLERY_IMAGES.forEach(({ full, thumbnail }, index) => {
        const img = new Image();

        img.onload = function () {
            const imageNumber = index + 1;
            addImageToGallery(thumbnail, full, imageNumber);
            loadedImages.push({
                path: full,
                number: imageNumber
            });
        };

        img.onerror = function () {
            console.warn(`Unable to load gallery thumbnail: ${thumbnail}`);
        };

        img.src = thumbnail;
    });
}

/**
 * Load every portfolio image once for the scattered hero background.
 */
function loadBackgroundImages() {
    BACKGROUND_IMAGES.forEach((imagePath, index) => {
        const img = new Image();

        img.onload = function () {
            onImageLoadedCallbacks.forEach(callback => callback(imagePath, index + 1));
        };

        img.onerror = function () {
            console.warn(`Unable to load background image: ${imagePath}`);
        };

        img.src = imagePath;
    });
}

/**
 * Add a loaded image to the gallery grid
 */
function addImageToGallery(thumbnailPath, imagePath, imageNumber) {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.style.aspectRatio = '1';
    galleryItem.onclick = (e) => openLightbox(imagePath, imageNumber - 1);

    const img = document.createElement('img');
    img.src = thumbnailPath;
    img.alt = `Portfolio piece ${imageNumber}`;
    img.loading = 'lazy';

    galleryItem.appendChild(img);
    GALLERY_GRID.appendChild(galleryItem);
}

/**
 * Open the lightbox modal with the selected image
 */
function openLightbox(imagePath, index) {
    currentImageIndex = index;
    LIGHTBOX_IMAGE.src = imagePath;
    LIGHTBOX.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

/**
 * Close the lightbox modal
 */
function closeLightbox() {
    LIGHTBOX.classList.add('hidden');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

/**
 * Navigate to next image in lightbox
 */
function nextImage() {
    if (loadedImages.length === 0) return;
    currentImageIndex = (currentImageIndex + 1) % loadedImages.length;
    LIGHTBOX_IMAGE.src = loadedImages[currentImageIndex].path;
}

/**
 * Navigate to previous image in lightbox
 */
function previousImage() {
    if (loadedImages.length === 0) return;
    currentImageIndex = (currentImageIndex - 1 + loadedImages.length) % loadedImages.length;
    LIGHTBOX_IMAGE.src = loadedImages[currentImageIndex].path;
}

/**
 * Keyboard navigation for lightbox
 */
document.addEventListener('keydown', function (e) {
    if (LIGHTBOX.classList.contains('hidden')) return;

    if (e.key === 'ArrowRight') {
        nextImage();
    } else if (e.key === 'ArrowLeft') {
        previousImage();
    } else if (e.key === 'Escape') {
        closeLightbox();
    }
});

/**
 * Close lightbox when clicking outside the image
 */
LIGHTBOX.addEventListener('click', function (e) {
    if (e.target === LIGHTBOX) {
        closeLightbox();
    }
});

// Initialize gallery on page load
document.addEventListener('DOMContentLoaded', function () {
    loadPortfolioImages();
    loadBackgroundImages();
});
