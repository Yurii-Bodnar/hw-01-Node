const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const contactsList = await fs.readFile(contactsPath);
    return JSON.parse(contactsList);
  } catch (err) {
    console.log(err.message);
  }
}

async function updateContacts(contacts) {
  try {
    const NewContactsList = await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts)
    );
    return NewContactsList;
  } catch (err) {
    console.log(err.massege);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const id = String(contactId);
    const findContact = contacts.find((el) => el.id === id);
    return findContact || null;
  } catch (err) {
    console.log(err.massege);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const id = String(contactId);
    const deletedContact = contacts.filter((el) => el.id !== id);

    if (deletedContact === []) {
      return null;
    }
    await updateContacts(deletedContact);

    return deletedContact;
  } catch (err) {
    console.log(err.massege);
  }
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();

  const newContact = {
    id: String(Date.now()),
    name,
    email,
    phone,
  };

  contacts.push(newContact);

  await updateContacts(contacts);

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
