export async function allOrders() {


    try {
        const response = await fetch('http://localhost:8080/orders/');
        console.log(response)
        const data = await response.json();

        console.log(data)

        return data
    } catch (error) {
        console.log("this error from the order api ");
        console.log(error)
    }

}


export async function updateCart(update) {
    console.log(typeof update.id)
    console.log(update)
    try {
        const response = await fetch(`http://localhost:8080/cart/` + update.id, {
            method: "PATCH",
            body: JSON.stringify(update),
            headers: { "content-type": 'application/json' }
        });
        console.log(response)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return { data };
    } catch (error) {
        console.error('Error:', error);
        throw error; // Return a rejected Promise with the error
    }
}



export async function updateOrder(order) {


    try {
        const response = await fetch('http://localhost:8080/orders/' + order.id, {
            method: 'PATCH',
            body: JSON.stringify(order),
            headers: { "content-type": 'application/json' }


        });
        console.log(response)
        const data = await response.json();

        console.log(data)

        return data
    } catch (error) {
        console.log(error)
    }

}


export async function deleteOrder(order) {


    try {
        const response = await fetch('http://localhost:8080/orders/' + order, {
            method: 'DELETE',
            headers: { "content-type": 'application/json' }


        });
        console.log(response)
        const data = await response.json();

        console.log(data)

        return { data: order }
    } catch (error) {
        console.log(error)
    }

}