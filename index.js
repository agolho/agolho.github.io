document.addEventListener("DOMContentLoaded", function() {
    const lightboxTriggers = document.querySelectorAll(".lightbox-trigger");
    const videoLightbox = document.getElementById("video-lightbox");
    const closeButton = document.querySelector(".close-button");
    const videoFrame = document.getElementById("video-frame");

    lightboxTriggers.forEach(function(trigger) {
        trigger.addEventListener("click", function(event) {
            event.preventDefault();
            const videoUrl = this.getAttribute("data-video");
            videoFrame.setAttribute("src", videoUrl);
            videoLightbox.style.display = "block";
            document.body.classList.add("lightbox-open");
        });
    });

    // Close the lightbox when clicking outside of the video
    videoLightbox.addEventListener("click", function(event) {
        if (event.target === videoLightbox) {
            videoFrame.setAttribute("src", "");
            videoLightbox.style.display = "none";
            document.body.classList.remove("lightbox-open");
        }
    });

    closeButton.addEventListener("click", function() {
        videoFrame.setAttribute("src", "");
        videoLightbox.style.display = "none";
        document.body.classList.remove("lightbox-open");
    });
});
