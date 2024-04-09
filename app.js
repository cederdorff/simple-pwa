const props = ["name", "email", "tel", "address", "icon"];
const opts = { multiple: true };
const supported = "contacts" in navigator && "ContactsManager" in window;
console.log("Supported: ", supported);
console.log("Contacts: ", navigator);

document.querySelector(
  "code"
).textContent = `supported: ${supported} \n navigator: ${navigator} \n contacts: ${navigator.contacts} \n ContactsManager: ${window.ContactsManager}`;

async function getContacts() {
  console.log("Getting contacts...");
  if (supported) {
    console.log("Supported!");
    document.querySelector(
      "code"
    ).textContent = `Getting contacts... \n Supported!`;
    const contacts = await navigator.contacts.select(props, opts);
    console.log(contacts);
  }
}

const btn = document.querySelector("#btn-contacts");
btn.addEventListener("click", getContacts);

if ("IdleDetector" in window) {
  const idleBtn = document.getElementById("idle");
  idleBtn.addEventListener("click", event => runIdleDetection());

  async function runIdleDetection() {
    const state = await IdleDetector.requestPermission();
    console.log(state);

    const idleDetector = new IdleDetector();

    idleDetector.addEventListener("change", () => {
      const { userState, screenState } = idleDetector;
      console.log(idleDetector);

      if (userState == "idle") {
        // update database with status
      }
    });

    await idleDetector.start({
      threshold: 120000
    });
  }
}
