window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search)
    const idFromUrl = urlParams.get('id')

    if (idFromUrl) {
        document.getElementById('search').value = idFromUrl
        setNaca(idFromUrl)
    }
}

function resetUI(message = "Nickname, NACA-id") {
    document.getElementById("name").innerText = message
    document.getElementById("author").innerText = ""
    document.getElementById("warning").innerText = ""
    document.getElementById("class").innerText = ""
    document.getElementById("description").innerText = ""
    document.getElementById("containment").innerText = ""
    document.getElementById("attachment").innerText = ""
    document.getElementById("addendums").innerText = ""
}

resetUI()
        
async function getJson(f) {
    console.log("Fetching", f)
    const response = await fetch(f)
    if (response.ok) {
        const data = await response.json()
        return data
    } else {
        return "fail"
    }
}

async function setNaca(n) {
    const newURL = new URL(window.location.href)
    newURL.searchParams.set('id', n)
    window.history.pushState({ id: n }, '', newURL)
    try {
        resetUI("Loading...")
        document.getElementById("loading").style.display = "block"
        const naca = await getJson("documents/naca" + n + ".json")
        if (naca == "fail") {
            resetUI("Failed to fetch document for NACA-" + n)
        } else {
            console.log("Fetched:\n", JSON.stringify(naca, null, 4))
            document.getElementById("name").innerText = naca.nickname + ", NACA-" + n.split("/")[n.split("/").length-1]
            if (naca.fanmade) {
                document.getElementById("author").innerText = "Anomaly made by: " + naca.fanauthor
                document.getElementById("warning").innerText += "This file is fanmade. Nothing in this file is true in the NACA lore"
            }
            if (naca.unfinished) {
                document.getElementById("warning").innerText += "\nATTENTION: THIS FILE IS UNFINISHED. IT MAY CONTAIN INACCURATE INFORMATION."
            }
            if (naca.cognito) {
                document.getElementById("warning").innerText += "\nATTENTION: THIS FILE IS A COGNITOHAZARD. DO NOT READ FURTHER."
            }
            document.getElementById("class").innerText = "[CLASSIFICATION]: " + naca.classification
            document.getElementById("description").innerText = "[DESCRIPTION]:\n" + naca.description
            document.getElementById("containment").innerText = "[CONTAINMENT PROCEDURE]:\n" + naca.containment
            if (naca.attachment) {
                document.getElementById("attachment").href = window.location.origin + "/document/documents/attachments/" + naca.attachment
                document.getElementById("attachment").innerText = naca.attachment
            }
            document.getElementById("addendums").innerText = "\n[ADDENDUMS]:\n"
            for (let i = 0; i < naca.addendums.length; i++) {
                let addendum = "ADDENDUM-" + (i + 1) + " [" + naca.addendums[i].type + "]\n" + naca.addendums[i].text + "\n\n"
                document.getElementById("addendums").innerText = document.getElementById("addendums").innerText + addendum
            }
        }
    } catch (error) {
        resetUI("Fetch successful, but an error occured!")
        document.getElementById("warning").innerText = error
    } finally {
        document.getElementById("loading").style.display = "none"
    }
}

document.addEventListener('keydown', function(e) {
    if (e.key == "Enter") {
        setNaca(document.getElementById("search").value)
    }
})