// ========== Init Features ========== //
document
  .querySelector("#btn-select-contacts")
  .addEventListener("click", selectContacts);

document
  .querySelector("#btn-send-notification")
  .addEventListener("click", sendNotification);

document
  .querySelector("#btn-geolocation")
  .addEventListener("click", getGeolocation);

// ========== Select Contacts ========== //
async function selectContacts() {
  console.log("selectContacts");
  const list = document.querySelector("#contacts");

  if (!("contacts" in navigator && "ContactsManager" in window)) {
    list.textContent = "Contacts API is not available";
    return;
  }

  const props = await navigator.contacts.getProperties();
  const contacts = await navigator.contacts.select(props, {
    multiple: true
  });

  list.innerHTML = "";

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

  list.innerHTML = html;
}

// ========== Show Notification ========== //

async function sendNotification() {
  const notification = document.querySelector("#notification");

  if (!("Notification" in window)) {
    notification.textContent = "Notification API is not available";
    return;
  }

  const registration = await navigator.serviceWorker.getRegistration();

  if (Notification.permission === "granted") {
    showNotification(notification.value);
  } else {
    if (Notification.permission !== "denied") {
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        showNotification(notification.value);
      }
    }
  }

  function showNotification(body) {
    const title = "Simple PWA";

    const payload = {
      body
    };

    if ("showNotification" in registration) {
      registration.showNotification(title, payload);
    } else {
      new Notification(title, payload);
    }
  }
}

// ========== Get Geolocation ========== //

async function getGeolocation() {
  const geolocation = document.querySelector("#geolocation");
  const map = document.querySelector("#map");

  geolocation.textContent = "Loading...";

  if (!("geolocation" in navigator)) {
    geolocation.textContent = "Geolocation is not available";
    return;
  }

  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;

    geolocation.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;

    map.src = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude},${latitude}&marker=${latitude},${longitude}`;
  });
}
