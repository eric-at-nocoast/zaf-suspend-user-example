const client = ZAFClient.init();
client.invoke("resize", { width: "100%", height: "300px" });

// Suspend input field
const suspendForm = document.getElementById("suspendForm");

async function suspendUser() {
  // Get the userID to suspend from the form field.
  const userID = suspendForm.value;
  const data = {
    user: {
      suspended: true,
    },
  };

  const suspendUserPayload = {
    url: `/api/v2/users/${userID}`,
    type: "PUT",
    contentType: "application/json",
    data: JSON.stringify(data),
    dataType: "json",
  };

  // Update the user suspending them
  try {
    const response = await client.request(suspendUserPayload);
    if (response.user.suspended === true) {
      client.invoke("notify", "User Successfully suspended");
      console.log("Success:", response.user.suspended);
    } else {
      client.invoke(
        "notify",
        "Something went wrong, check the console for more details"
      );
      console.log(response);
    }
  } catch (err) {
    client.invoke("notify", `Error: ${err.responseText}`, "error");
    console.log("Error:", err);
  }
}
