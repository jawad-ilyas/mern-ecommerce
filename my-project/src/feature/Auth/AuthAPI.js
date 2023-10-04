export async function createUser(userData) {
  console.log(userData)
  try {
    const response = await fetch('http://localhost:1122/users', {
      method: "POST",
      body: JSON.stringify(userData),
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
export async function verifyUser(userData) {
  const { email } = userData;
  const { password } = userData;
  // console.log(email)
  // console.log(userData)
  try {
    const response = await fetch('http://localhost:1122/users?email=' + email);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    if (data.length) {
      if (data[0].password === password) {

        return { data: { redirect: true, id: data[0].id } };
      }
      else {
        throw new Error('User not found');

      }
    }
    else {
      throw new Error('User not found');
    }

  } catch (error) {
    console.error('Error:', error);
    throw error; // Return a rejected Promise with the error
  }
}
