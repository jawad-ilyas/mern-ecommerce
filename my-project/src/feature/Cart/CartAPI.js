export async function addToCart(item) {
  console.log(item)
  try {
    const response = await fetch('http://localhost:1122/cart', {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": 'application/json' }
    });

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
export async function updateCart(update) {
  console.log(typeof update.id)
  console.log(update)
  try {
    const response = await fetch(`http://localhost:1122/cart/` + update.id, {
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
export async function deleteItemByUserId(deleteId) {
  try {
    const response = await fetch(`http://localHost:1122/cart/${deleteId}` , {
      method: "DELETE",
      headers: { "content-type": 'application/json' }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // const data = await response.json();
    return { id:deleteId };
  } catch (error) {
    console.error('Error:', error);
    throw error; // Return a rejected Promise with the error
  }
}
export async function fetchItemByUserId(userId) {
  try {
    const response = await fetch('http://localhost:1122/cart?userId=' + userId);
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
