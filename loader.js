async function getJson(f) {
    console.log("Fetching", f)
    const response = await fetch(f)
    const data = await response.json()
    console.log("Fetched:\n", JSON.stringify(data, null, 4))
    return data
}