export function fetchAllProducts() {
  return fetch('http://localhost:1122/products')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      return { data };
    })
    .catch((error) => {
      console.error('Error:', error);
      throw error; // Return a rejected Promise with the error
    });
}
export function fetchAllBrands() {
  return fetch('http://localhost:1122/brands')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((brands) => {
      // console.log(brands)
      // console.log(typeof  brands  + " inot api call ")
      return { brands };
    })
    .catch((error) => {
      console.error('Error:', error);
      throw error; // Return a rejected Promise with the error
    });
}
export function fetchAllCatageroy() {
  return fetch('http://localhost:1122/catageroy')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((catageroy) => {
      // console.log(catageroy)
      return { catageroy };
    })
    .catch((error) => {
      console.error('Error:', error);
      throw error; // Return a rejected Promise with the error
    });
}
export function fetchProductById(id) {
  return fetch(`http://localhost:1122/products/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((productId) => {
      // console.log("productId : " + productId)
      return { productId };
    })
    .catch((error) => {
      console.error('Error:', error);
      throw error; // Return a rejected Promise with the error
    });
}


export const fetchProductByFilter = async (filter, sort, paginationValue) => {
  // console.log(typeof paginationValue)
  // console.log(typeof sort)
  // console.log(typeof filter)
  let queryString = "";
  for (let key in filter) {
    const catageroyValues = filter[key];
    if (catageroyValues.length) {
      queryString += `${key}=${catageroyValues}&`
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`
  }
  for (let key in paginationValue) {
    // console.log(key, paginationValue[key])
    queryString += `${key}=${paginationValue[key]}&`
  }

  console.log(queryString)
  return await fetch('http://localhost:1122/products?' + queryString).then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const totalItems = response.headers.get('X-Total-Count');

    return response.json().then((data) => {
      // console.log(totalItems)
      return { data, totalItems }
    })
  }).catch((error) => {
    console.error('Error:', error);
    throw error
  })

}




//  this function is used to add product 


export async function updateProduct(update) {


  console.log(" i am into the product edit function ")

  console.log(typeof update.id)
  console.log(update)
  try {
    const response = await fetch(`http://localhost:1122/products/` + update.id, {
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






export async function deleteProduct(deleteId) {



  console.log(deleteId);
  const response = await fetch(`http://localhost:1122/products/${deleteId}`, {
    method: "DELETE",
    headers: { "content-type": 'application/json' }
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  // const data = await response.json();
  return { id: deleteId };
}






export async function addProduct(data) {

  try {
    const response = await fetch('http://localhost:1122/products', {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" }
    })
    console.log(response)


    return response.json();
  } catch (error) {

  }


} 