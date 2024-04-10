// ========== Init Features ========== //
document
  .querySelector("#btn-select-contacts")
  .addEventListener("click", selectContacts); // Add an event listener to the button with the ID "btn-select-contacts"

document
  .querySelector("#btn-send-notification")
  .addEventListener("click", sendNotification); // Add an event listener to the button with the ID "btn-send-notification"

document
  .querySelector("#btn-geolocation")
  .addEventListener("click", getGeolocation); // Add an event listener to the button with the ID "btn-geolocation"

// ========== Select Contacts ========== //
async function selectContacts() {
  const list = document.querySelector("#contacts"); // Get the contacts element

  // Check if the Contacts API is available
  if (!("contacts" in navigator && "ContactsManager" in window)) {
    list.textContent = "Contacts API is not available";
    return;
  }

  const props = await navigator.contacts.getProperties(); // Get the properties of the contacts
  const contacts = await navigator.contacts.select(props, {
    multiple: true
  }); // Select multiple contacts

  list.innerHTML = ""; // Clear the contacts element

  // Create an HTML string with the contacts
  const html = contacts.reduce((html, contact) => {
    const names = contact.name.join(", ");
    const emails = contact.email.join(", ");
    const telephone = contact.tel.join(", ");

    return `${html}
        <p>
          <span>
            <strong>${names}</strong><br>
          </span>
          <span>
            ${emails}<br>
          </span>
          <span>
            ${telephone}</p>
          </span>
        `;
  }, ``);

  list.innerHTML = html; // Set the inner HTML of the contacts element to the HTML string
}

// ========== Show Notification ========== //

async function sendNotification() {
  const notification = document.querySelector("#notification"); // Get the notification element
  const registration = await navigator.serviceWorker.getRegistration(); // Get the service worker registration

  // Check if the Notification API is available
  if (!("Notification" in window)) {
    notification.textContent = "Notification API is not available";
    return;
  }

  // Check if the permission is granted
  if (Notification.permission === "granted") {
    showNotification(notification.value); // Show the notification
  } else {
    // If the permission is not granted, request the permission
    if (Notification.permission !== "denied") {
      const permission = await Notification.requestPermission(); // Request the permission

      // If the permission is granted, show the notification
      if (permission === "granted") {
        showNotification(notification.value); // Show the notification
      }
    }
  }

  // Show the notification
  function showNotification(body) {
    const title = "Simple PWA"; // Set the title of the notification

    const payload = {
      body
    }; // Set the payload of the notification

    // Check if the showNotification method is available in the registration object
    if ("showNotification" in registration) {
      registration.showNotification(title, payload); // Show the notification
    } else {
      new Notification(title, payload); // Show the notification
    }
  }
}

// ========== Get Geolocation ========== //

async function getGeolocation() {
  const geolocation = document.querySelector("#geolocation"); // Get the geolocation element
  const map = document.querySelector("#map"); // Get the map element

  geolocation.textContent = "Loading..."; // Set the text content to "Loading..."

  // Check if geolocation is available
  if (!("geolocation" in navigator)) {
    geolocation.textContent = "Geolocation is not available"; // Set the text content to "Geolocation is not available"
    return;
  }

  // Get the current position
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords; // Get the latitude and longitude from the position object

    geolocation.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`; // Set the text content to the latitude and longitude

    map.src = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude},${latitude}&marker=${latitude},${longitude}`; // Set the src attribute of the map to the OpenStreetMap URL
  });
}
