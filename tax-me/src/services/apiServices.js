require("dotenv").config();
var baseUrl = process.env.USERS_TEST_SERVER;

// GET
export const getUsers = () =>
  fetch(baseUrl, {
    method: "GET",
  }).then((data) => data.json());

// POST
export const createUser = (userInfo) => 
    fetch(baseUrl, {
        method: "POST",
        body: userInfo.stringify(body)
    }).;

// PUT

// DELETE
