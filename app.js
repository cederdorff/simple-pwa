// ========== Select Contacts ========== //

if ("contacts" in navigator && "ContactsManager" in window) {
  getContacts();
}
async function getContacts() {
  const props = await navigator.contacts.getProperties();
  const list = document.querySelector("#contacts");
  const button = document.querySelector("#select-contacts");

  list.innerHTML = "";

  const showContacts = contacts => {
    const html = contacts.reduce((html, contact) => {
      const names = contact.name.join(", ");
      const emails = contact.email.join(", ");
      const telephone = contact.tel.join(", ");

      return `${html}
        <p>
          <span>
            <i class="material-icons">person</i>
            <strong>${names}</strong><br>
          </span>
          <span>
            <i class="material-icons">mail_outline</i>
            ${emails}<br>
          </span>
          <span>
            <i class="material-icons">phone</i>
            ${telephone}</p>
          </span>
        `;
    }, ``);

    list.innerHTML = html;
  };

  button.addEventListener("click", async e => {
    const contacts = await navigator.contacts.select(props, { multiple: true });

    showContacts(contacts);
  });
}

// ========== Show Notification ========== //

async function getNotificationPermission() {
  const notification = document.querySelector("#notification");
  const sendButton = document.querySelector("#send");
  const registration = await navigator.serviceWorker.getRegistration();

  async function sendNotification() {
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
  }
  sendNotification();

  function showNotification(body) {
    const title = "What PWA Can Do Today";

    const payload = {
      body
    };

    if ("showNotification" in registration) {
      registration.showNotification(title, payload);
    } else {
      new Notification(title, payload);
    }
  }

  sendButton.addEventListener("click", sendNotification);
}

getNotificationPermission();
