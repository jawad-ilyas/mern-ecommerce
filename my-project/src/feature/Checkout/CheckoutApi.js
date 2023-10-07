
export async function createOrder(orderItems) {
  try {


    const response = await fetch("http://localhost:1122/orders", {
      method: "POST",
      body: JSON.stringify(orderItems),
      headers: { "content-type": 'application/json' }
    })
    if (!response.status) {
      throw new Error('Network response was not ok');
    }
    console.log(response)
    const data = await response.json();
    console.log(data)
    return { data };

  } catch (error) {
    throw error; // Return a rejected Promise with the error

  }
}