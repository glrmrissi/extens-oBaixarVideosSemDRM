function addElementBtn(videoElement) {
    const divBtn = document.createElement("button")
    divBtn.textContent = "Download";
    divBtn.style.backgroundColor = "#007bff";
    divBtn.style.color = "#fff";
    divBtn.style.padding = "5px 10px";
    divBtn.style.cursor = "pointer";
    divBtn.style.position = "absolute";
    divBtn.style.top = "20px";
    divBtn.style.right = "10px";
    divBtn.style.borderRadius = "5px";
    divBtn.style.zIndex = "1000";

    document.body.appendChild(divBtn);
    document.body.style.backgroundColor = "#000";
    console.log("Botão adicionado.");

    divBtn.addEventListener("click", () => {
        const videoUrl = videoElement.src || videoElement.currentSrc;
        if (videoUrl) {
            const a = document.createElement("a");
            a.href = videoUrl;
            a.download = "video.mp4";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            alert("URL do vídeo não encontrada.");
        }
    });

    videoElement.parentElement.style.position = "relative";
    videoElement.parentElement.appendChild(divBtn);

}

function detectVideos() {
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
        if (!video.hasAttribute("data-download-button")) {
            addElementBtn(video);
            video.setAttribute("data-download-button", "true");
        }
    });
}

const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
            detectVideos(); 
        }
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
});

window.addEventListener("load", detectVideos);