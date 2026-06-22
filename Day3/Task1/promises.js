/*
========================================
CALLBACK Hell
========================================
*/

const API_DELAY_MS = 1000;
const PROMISE_DELAY_MS = 4000;
const ASYNC_DELAY_MS = 8000;

function fetchUserCallback(userId, callback) {
  setTimeout(() => {
    if (!userId) {
      callback(new Error("Invalid user ID"), null);
      return;
    }

    console.log("1. User fetched successfully.");

    callback(null, {
      id: userId,
      name: "John Doe",
    });
  }, API_DELAY_MS);
}

function fetchOrdersCallback(userId, callback) {
  setTimeout(() => {
    if (!userId) {
      callback(
        new Error("Orders cannot be retrieved without a valid user ID"),
        null
      );
      return;
    }

    console.log(`2. Orders fetched for user ID ${userId}.`);

    callback(null, [
      {
        orderId: 101,
        amount: 500,
      },
    ]);
  }, API_DELAY_MS);
}

function fetchPaymentsCallback(orderId, callback) {
  setTimeout(() => {
    if (!orderId) {
      callback(
        new Error("Payments cannot be retrieved without a valid order ID"),
        null
      );
      return;
    }

    console.log(`3. Payments fetched for order ID ${orderId}.`);

    callback(null, [
      {
        paymentId: 1001,
        status: "Completed",
      },
    ]);
  }, API_DELAY_MS);
}


console.log("\n===== CALLBACK HELL =====");

fetchUserCallback(1, (userError, user) => {
  if (userError) {
    console.error("User load failed");
    console.error(userError);
    return;
  }

  fetchOrdersCallback(user.id, (orderError, orders) => {
    if (orderError) {
      console.error("Order load failed");
      console.error(orderError);
      return;
    }

    fetchPaymentsCallback(orders[0].orderId, (paymentError, payments) => {
        if (paymentError) {
          console.error("Payment load failed");
          console.error(paymentError);
          return;
        }

        console.log("User:", user);
        console.log("Orders:", orders);
        console.log("Payments:", payments);
      }
    );
  });
});

/*
========================================
PROMISE CHAINING VERSION
========================================
*/

function fetchUser(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!userId) {
        reject(new Error("Invalid user ID"));
        return;
      }

      console.log("1. User fetched successfully.");

      resolve({
        id: userId,
        name: "John Doe",
      });
    }, API_DELAY_MS);
  });
}

// Step 2: Fetch Orders
function fetchOrders(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!userId) {
        reject(new Error("Orders cannot be retrieved without a valid user ID"));
        return;
      }

      console.log(`2. Orders fetched for user ID ${userId}.`);

      resolve([
        {
          orderId: 101,
          amount: 500,
        },
      ]);
    }, API_DELAY_MS);
  });
}

// Step 3: Fetch Payments
function fetchPayments(orderId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!orderId) {
        reject(
          new Error("Payments cannot be retrieved without a valid order ID")
        );
        return;
      }

      console.log(`3. Payments fetched for order ID ${orderId}.`);

      resolve([
        {
          paymentId: 1001,
          status: "Completed",
        },
      ]);
    }, API_DELAY_MS);
  });
}

setTimeout(() => {
  console.log("\n===== PROMISE CHAINING =====");

  fetchUser(1)
    .then((user) => {
      console.log("User:", user);
      return fetchOrders(user.id);
    })
    .then((orders) => {
      console.log("Orders:", orders);
      
      // Safety check to prevent array index crashes
      if (!orders || orders.length === 0) {
        throw new Error("No orders found for this user.");
      }
      
      return fetchPayments(orders[0].orderId);
    })
    .then((payments) => {
      console.log("Payments:", payments);
    })
    .catch((error) => {
      console.error("Data retrieval failed.");
      console.error(error.message);
    });
}, PROMISE_DELAY_MS);




/*
========================================
ASYNC / AWAIT VERSION
========================================
*/

async function processUserData(userId) {
  try {
    console.log("\n===== ASYNC / AWAIT =====");

    let user;
    try {
      user = await fetchUser(userId);
    } catch (error) {
      console.error("User load failed");
      console.error("Technical Details:", error.message);
      return;
    }

    let orders;
    try {
      orders = await fetchOrders(user.id);
    } catch (error) {
      console.error("Order load failed");
      console.error("Technical Details:", error.message);
      return;
    }

    if (!orders?.length) {
      console.error("Order load failed");
      console.error("Technical Details: No orders found for this user.");
      return;
    }

    let payments;
    try {
      payments = await fetchPayments(orders[0].orderId);
    } catch (error) {
      console.error("Payment load failed");
      console.error("Technical Details:", error.message);
      return;
    }

    console.log("User:", user);
    console.log("Orders:", orders);
    console.log("Payments:", payments);

  } catch (error) {
    console.error("Unexpected error:", error.message);
  }
}

setTimeout(() => {
  processUserData(1);
}, ASYNC_DELAY_MS);


// Uncomment to test failure scenarios

// processUserData(null);

// fetchUser(null)
//   .then((user) => fetchOrders(user.id))
//   .then((orders) => fetchPayments(orders[0].orderId))
//   .catch((error) => {
//     console.error("Data retrieval failed.");
//     console.error("Technical Details:", error.message);
//   });
