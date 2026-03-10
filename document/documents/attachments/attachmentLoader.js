window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    const type = urlParams.get('type')

    if (type === "text") {
        document.getElementById("text").innerText = "Text is not yet supported"
    }

    if (type === "video") {
        const video = document.getElementById("video")
        const fullUrl = `${window.location.origin}/documents/attachments/${id}`
        
        // 1. Hide it, reset innerHTML, and show it again
        video.style.display = "none"
        video.innerHTML = `<source src="${fullUrl}" type="video/mp4">`
        video.style.display = "block"
        
        // 2. Force the load
        video.load()
        video.play().catch(e => console.log("Auto-play blocked, please click play manually."))
    }
}