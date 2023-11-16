export async function fetchOrderByUserId(id) {
  console.log(id)


  try {


    console.log("\n now we fetch the all order of the user into user api \n");


    const response = await fetch(`http://localhost:8080/orders/${id}`)
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
    const response = await fetch('http://localhost:8080/users/' + userData.id, {
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

export async function fetchAllDataForProfile(id) {
  console.log("this is the id for fetch the data for the profile : " + id)
  try {
    const response = await fetch(`http://localhost:8080/users/${id}`)
    const data = await response.json();
    return { data }
  } catch (error) {
    console.log(error)
  }
}