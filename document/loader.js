function resetUI(message = "Nickname, NACA-id") {
    document.getElementById("name").innerText = message;
    document.getElementById("class").innerText = "[CLASSIFICATION]:";
    document.getElementById("description").innerText = "[DESCRIPTION]:\n";
    document.getElementById("containment").innerText = "[CONTAINMENT PROCEDURE]:\n";
    document.getElementById("addendums").innerText = "\n[ADDENDUMS]:\n";
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
    resetUI("Loading...")
    const naca = await getJson("documents/naca" + n + ".json")
    if (naca == "fail") {
        resetUI("Failed to fetch document for NACA-" + n)
    } else {
        console.log("Fetched:\n", JSON.stringify(naca, null, 4))
        document.getElementById("name").innerText = naca.nickname + ", NACA-" + n
        document.getElementById("class").innerText = "[CLASSIFICATION]: " + naca.classification
        document.getElementById("description").innerText = "[DESCRIPTION]:\n" + naca.description
        document.getElementById("containment").innerText = "[CONTAINMENT PROCEDURE]:\n" + naca.containment
        document.getElementById("addendums").innerText = "\n[ADDENDUMS]:\n"
        for (let i = 0; i < naca.addendums.length; i++) {
            let addendum = "ADDENDUM-" + (i + 1) + " [" + naca.addendums[i].type + "]\n" + naca.addendums[i].text + "\n\n"
            document.getElementById("addendums").innerText = document.getElementById("addendums").innerText + addendum
        }
    }
}

document.addEventListener('keydown', function(e) {
    if (e.key == "Enter") {
        setNaca(document.getElementById("search").value)
    }
})