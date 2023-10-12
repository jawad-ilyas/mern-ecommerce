export async function fetchOrderByUserId(id) {
  console.log(id)
  try {
    
    const response = await fetch("http://localhost:1122/orders/?products.userId=" + id)
    const data = await response.json();
    console.log(data)
    return { data };
  } catch (error) {
    throw error;
  }

}
export async function updateUser(userData) {
  console.log(userData)
  try {
    const response = await fetch('http://localhost:1122/users/'+userData.id, {
      method: "PATCH",
      body: JSON.stringify(userData),
      headers: { "content-type": 'application/json' }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log(response)
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('Error:', error);
    throw error; // Return a rejected Promise with the error
  }
}