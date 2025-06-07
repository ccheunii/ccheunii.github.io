let contactsData = {
  "contacts": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "555-123-4567",
      "type": "personal"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@company.com",
      "phone": "555-987-6543",
      "type": "work"
    },
    {
      "id": 3,
      "name": "Bob Johnson",
      "email": "bob@family.net",
      "phone": "555-555-5555",
      "type": "family"
    }
  ]
};

// Function to display contacts
// TODO
/* 1. create a constant variable named 'contactsList' and assign it the DOM element with id 'contacts-list'
   2. clear the contactsList by setting its innerHTML to an empty string
   3. check if the contacts array is empty (length === 0)
   4. if contacts array is empty, set contactsList.innerHTML to '<p>No contacts found.</p>' and return from the function
   5. use the forEach method on the contacts array to iterate through each contact
   6. for each contact, create a new div element using document.createElement('div')
   7. set the className of the div to 'contact-card'
   8. set the innerHTML of the div to create the contact card structure with:
      - an h3 element containing the contact's name
      - p elements for email, phone, and type (with the type's first letter capitalized)
   9. append the contact card div to the contactsList using appendChild()
*/
function displayContacts(contacts = contactsData.contacts) {
     const contactsList = document.getElementById('contacts-list');
  contactsList.innerHTML = '';

  if (contacts.length === 0) {
    contactsList.innerHTML = '<p>No contacts found.</p>';
    return;
  }

  contacts.forEach(function(contact) {
    const contactCard = document.createElement('div');
    contactCard.className = 'contact-card';

    contactCard.innerHTML = `
      <h3>${contact.name}</h3>
      <p>Email: ${contact.email}</p>
      <p>Phone: ${contact.phone}</p>
      <p>Type: ${contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}</p>
    `;

    contactsList.appendChild(contactCard);
  });
}

// Function to update JSON display
// TODO
/* 1. create a constant variable named 'jsonContent' and assign it the DOM element with id 'json-content'
   2. set the textContent of jsonContent to the JSON string representation of contactsData
   3. use JSON.stringify(contactsData, null, 4) to convert contactsData to a formatted JSON string
      - the null parameter means no replacer function
      - the 4 parameter adds 4 spaces of indentation for readability
*/
function updateJSONDisplay() {
   function updateJSONDisplay() {
  // TODO
  const jsonContent = document.getElementById('json-content');
  jsonContent.textContent = JSON.stringify(contactsData, null, 4);
}
}

// Function to search contacts
// TODO
/* 1. create a constant variable named 'searchTerm' and assign it the value of the input element with id 'search-input'
   2. convert the searchTerm to lowercase using toLowerCase() method
   3. check if searchTerm is empty (falsy)
   4. if searchTerm is empty, call displayContacts() with no arguments to show all contacts and return from the function
   5. create a constant variable named 'filteredContacts' that uses the filter() method on contactsData.contacts
   6. inside the filter function, return true if any of these conditions are met:
      - contact.name converted to lowercase includes the searchTerm
      - contact.email converted to lowercase includes the searchTerm
      - contact.phone includes the searchTerm (no need to convert to lowercase since it's numeric)
      - contact.type converted to lowercase includes the searchTerm
   7. call displayContacts() with the filteredContacts array as the argument
*/
function searchContacts() {
     const searchTerm = document.getElementById('search-input').value.toLowerCase();

  if (!searchTerm) {
    displayContacts();
    return;
  }

  const filteredContacts = contactsData.contacts.filter(function(contact) {
    return contact.name.toLowerCase().includes(searchTerm) ||
           contact.email.toLowerCase().includes(searchTerm) ||
           contact.phone.includes(searchTerm) ||
           contact.type.toLowerCase().includes(searchTerm);
  });

  displayContacts(filteredContacts);
}


// Function to add a new contact
function addContact() {
     const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const type = document.getElementById('type').value;

  // Generate a new ID using standard conditional statement
  let newId;
  if (contactsData.contacts.length > 0) {
    // Find the maximum ID in the existing contacts and add 1
    const maxId = Math.max(...contactsData.contacts.map(function(c) {
      return c.id;
    }));
    newId = maxId + 1;
  } else {
    // If no contacts exist, start with ID 1
    newId = 1;
  }

  // Create new contact object
  const newContact = {
    id: newId,
    name,
    email,
    phone,
    type
  };

  // Add to contacts array
  contactsData.contacts.push(newContact);

  // Reset form
  document.getElementById('contact-form').reset();

  // Update displays
  displayContacts();
  updateJSONDisplay();

  // Show success message
  alert('Contact added successfully!');

  // Switch to view tab
  switchTab('view');

  // Prevent form submission
  return false;
}

// Function to reset search
// Write the body of this function as an exercise.
// This should clear the input field and call displayContacts() funciton.
function resetSearch() {
     const searchInput = document.getElementById('search-input');
  searchInput.value = '';
  displayContacts();
}

// Function to switch tabs
function switchTab(tabId) {
     const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    if (tab.textContent.toLowerCase().includes(tabId)) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  // Update tab contents
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(content => {
    if (content.id === `${tabId}-contacts` || content.id === `${tabId}-contact` || content.id === `${tabId}-view`) {
      content.classList.add('active');
    } else {
      content.classList.remove('active');
    }
  });

  // Update JSON display when switching to JSON tab
  if (tabId === 'json') {
    updateJSONDisplay();
  }
}

// Initialize the app
window.onload = function() {
  displayContacts();
  updateJSONDisplay();
};