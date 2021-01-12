const URL = "http://localhost:3000/api/v1/products"

export async function list() {
    const response = await fetch(URL, {
        headers: {"content-type": "application/json"}
    })
    const data = await response.json();
    if (!response.ok) {
        const error = new Error(data.body)
        error.status = data.status
        throw error;
    }
    return data;
}