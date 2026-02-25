// Gallery Configuration
const PORTFOLIO_PATH = './portfolio/';
const GALLERY_GRID = document.getElementById('gallery-grid');
const LIGHTBOX = document.getElementById('lightbox');
const LIGHTBOX_IMAGE = document.getElementById('lightbox-image');

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
 * Dynamically load portfolio images from the portfolio folder
 * Uses a for loop with Image.onload and Image.onerror for graceful fallback
 */
function loadPortfolioImages() {
    let imageNumber = 1;
    const maxAttempts = 100; // Safety limit to prevent infinite loops
    let consecutiveFailures = 0;

    function loadNextImage() {
        if (imageNumber > maxAttempts || consecutiveFailures >= 3) {
            console.log(`Gallery complete. Loaded ${loadedImages.length} images.`);
            return;
        }

        const imagePath = `${PORTFOLIO_PATH}${imageNumber}.jpg`;
        const img = new Image();

        img.onload = function () {
            // Image loaded successfully, add it to the gallery
            addImageToGallery(imagePath, imageNumber);
            loadedImages.push({
                path: imagePath,
                number: imageNumber
            });
            
            // Call registered callbacks
            onImageLoadedCallbacks.forEach(cb => cb(imagePath, imageNumber));
            
            consecutiveFailures = 0;
            imageNumber++;
            loadNextImage(); // Continue to next image
        };

        img.onerror = function () {
            // Image not found, increment counter
            consecutiveFailures++;
            imageNumber++;
            loadNextImage();
        };

        img.src = imagePath;
    }

    // Start the loading process
    loadNextImage();
}

/**
 * Add a loaded image to the gallery grid
 */
function addImageToGallery(imagePath, imageNumber) {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.style.aspectRatio = '1';
    galleryItem.onclick = (e) => openLightbox(imagePath, imageNumber - 1);

    const img = document.createElement('img');
    img.src = imagePath;
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
});
