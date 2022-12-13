const baseURL = "http://server-nodejs.cit.byui.edu:3000/";

// Convert response to data
async function convertToJson(res) {
  // converting response to json
  const data = await res.json();
  // If res is 200 or most 300
  if (res.ok) {
    return data;
  } else {
    // New error to throw and include the data
    throw { name: "servicesError", message: data };
  }
}

export default class ExternalServices {
  // Our two basic ajax functions
  async getData(category) {
    return fetch(baseURL + `products/search/${category}`)
      .then(convertToJson)
      .then((data) => data.Result);
  }
  async findProductById(id) {
    return await fetch(baseURL + `product/${id}`)
      .then(convertToJson)
      .then((data) => data.Result);
  }

  // Payload is key value pairs for the order
  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(baseURL + "checkout/", options).then(convertToJson);
  }
}
