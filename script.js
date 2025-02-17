window.addEventListener("load", () => {
    gsap.to(".heading", { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" });
    gsap.to(".subheading", { opacity: 1, y: 0, duration: 1, delay: 1, ease: "power3.out" });

    gsap.from(".hero-image", { opacity: 0, scale: 1.1, duration: 1.5, stagger: 0.2, ease: "power3.out" });
});

const images = document.querySelectorAll(".image");
const textContainer = document.querySelector(".text-container");
const gap = 80, bottomGap = 80;

// Function to position images dynamically
function placeImagesAroundText() {
    const textRect = textContainer.getBoundingClientRect();
    const positions = [
        { top: textRect.top - gap - 60, left: textRect.left - gap - 60 },
        { top: textRect.top - gap - 60, left: textRect.right + gap - 300 },
        { top: textRect.bottom + gap + bottomGap - 280, left: textRect.left - gap + 10 },
        { top: textRect.bottom + gap + bottomGap - 280, left: textRect.right + gap - 400 },
    ];

    images.forEach((image, index) => {
        const position = positions[index];
        image.style.top = `${Math.max(position.top, gap)}px`;
        image.style.left = `${Math.max(position.left, gap)}px`;
    });
}

placeImagesAroundText();

// Hover Animation
function handleHover(image) {
    gsap.to(image.querySelector(".hero-image"), {
        opacity: 1,
        scale: 1.4,
        duration: 0.3,
        ease: "power2.out",
    });

    gsap.to(image, { zIndex: 1, duration: 0 }); // Set hovered image to z-index 1
    gsap.to(".text-container", { zIndex: 0, duration: 0 }); // Set background content to z-index 0

    images.forEach((otherImage) => {
        if (otherImage !== image) {
            gsap.to(otherImage.querySelector(".hero-image"), {
                opacity: 0.3,
                scale: 1.1,
                duration: 0.3,
                ease: "power2.out",
            });
        }
    });

    gsap.to(".text-container", { opacity: 0.3, duration: 0.3, ease: "power2.out" });

    gsap.to(image.querySelector(".image-title"), { opacity: 1, duration: 0.3 });

    image.classList.add("hovered");
}

// Reset Animation on Mouse Leave
function handleMouseLeave(image) {
    gsap.to(image.querySelector(".hero-image"), {
        opacity: 0.7,
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out",
    });

    images.forEach((otherImage) => {
        gsap.to(otherImage.querySelector(".hero-image"), {
            opacity: 0.7,
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out",
        });
    });

    gsap.to(".text-container", { opacity: 1, duration: 0.3, ease: "power2.out" });

    image.classList.remove("hovered");

    gsap.to(image.querySelector(".image-title"), { opacity: 0, duration: 0.3 });

    // Reset z-index when no images are hovered
    setTimeout(() => {
        if (!document.querySelector(".hovered")) {
            gsap.to(".text-container", { zIndex: 1, duration: 0 }); // Restore background content z-index
        }
    }, 100);

    // Reset movement
    gsap.to(image, { x: 0, y: 0, duration: 0.3 });
}

// Mouse Move Effect
function handleMouseMove(image, e) {
    const bounds = image.getBoundingClientRect();
    const offsetX = (e.clientX - bounds.left) / bounds.width;
    const offsetY = (e.clientY - bounds.top) / bounds.height;

    if (image.classList.contains("hovered")) {
        gsap.to(image, {
            x: (offsetX - 0.5) * 80,
            y: (offsetY - 0.5) * 80,
            duration: 0.2,
            ease: "power2.out",
        });
    }
}

// Event Listeners
images.forEach((image) => {
    image.addEventListener("mouseenter", () => handleHover(image));
    image.addEventListener("mouseleave", () => handleMouseLeave(image));
    image.addEventListener("mousemove", (e) => handleMouseMove(image, e));
});
