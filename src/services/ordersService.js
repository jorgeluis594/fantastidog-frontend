const URL = "http://localhost:3000/api/v1/orders"

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

export async function get(orderId) {
    const response = await fetch(`${URL}/${orderId}`, {
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

export async function update(orderId, orderData) {
    const response = await fetch(`${URL}/${orderId}`, {
        headers: {"content-type": "application/json"},
        method: "PUT",
        body: JSON.stringify(orderData),
    })
    const data = await response.json();
    if(!response.ok) throw new Error(data.body)
    return data;
}

export async function deliver(orderId) {
    const response = await fetch(`${URL}/${orderId}/deliver`, {
        headers: {"content-type": "application/json"},
        method: "POST",
    });
    const data = await  response.json();
    if(!response.ok) throw  new Error(data.body);
    return data;
}

export async function send(order) {
    const response = await fetch(URL, {
        headers: {"content-type": "application/json"},
        body: JSON.stringify(order),
        method: "POST",
    });
    const data = await response.json();
    if(!response.ok) throw new Error(data.body);
    return data
}