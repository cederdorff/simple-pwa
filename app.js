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
