showContact();

// Search
const filterInput = document.getElementById('filterInput');
// CRUD
const firstNameInput = document.getElementById('firstNameInput');
const lastNameInput = document.getElementById('lastNameInput');
const btnCreateContact = document.getElementById('btnCreateContact');

btnCreateContact.addEventListener('click', () => {
    firstNameInputValue = firstNameInput.value;
    lastNameInputValue = lastNameInput.value;

    if (firstNameInputValue && lastNameInputValue != 0) {
        let contact = localStorage.getItem('localContact');

        let contactObj = {
            first_name: firstNameInputValue,
            last_name: lastNameInputValue
        }

        if (contact == null) {
            contactsList = [];
        } else {
            contactsList = JSON.parse(contact);
        }

        contactsList.push(contactObj);
        localStorage.setItem('localContact', JSON.stringify(contactsList));
    }

    showContact();
});

function showContact() {
    let contact = localStorage.getItem('localContact');

    if (contact == null) {
        contactsList = [];
    } else {
        contactsList = JSON.parse(contact);
    }

    let html = '';
    const contactsHtmlWrapper = document.getElementById('contacts');

    contactsList.forEach((item, index) => {
        html += `
            <li class="main-card-item">
                <a href="#">
                    <div class="card-info">
                        <div class="card-id">
                            ${index + 1}
                        </div>
                        <div class="card-first-name">
                            ${item.first_name}
                        </div>
                        <span class="card-line"></span>
                        <div class="card-last-name">
                            ${item.last_name}
                        </div>
                        <span class="card-line"></span>
                        <div class="card-phone-number">
                            +380 (66) 891 55 44
                        </div>
                    </div>
                    
                    <div class="card-button-wrapper">
                        <button id="btnEdit" onclick="editContact(${index})" type="button" class="card-btn">
                            Edit
                        </button>
                        <button id="btnDelete" onclick="deleteContact(${index})"  type="button" class="card-btn btn-delete">
                            Delete
                        </button>
                    </div>
                </a>
            </li>
        `;
    });
    contactsHtmlWrapper.innerHTML = html;
}

function editContact(index) {
    let saveindex = document.getElementById('saveindex');
    let btnCreateContact = document.getElementById('btnCreateContact');
    let btnSaveContact = document.getElementById('btnSaveContact');
    let contact = localStorage.getItem('localContact');
    let contactsList = JSON.parse(contact);
    firstNameInput.value = contactsList[index].first_name;
    lastNameInput.value = contactsList[index].last_name;

    btnCreateContact.style.display = 'none';
    btnSaveContact.style.display = 'block';

    saveindex.value = index;
}

let btnSaveContact = document.getElementById('btnSaveContact');

btnSaveContact.addEventListener('click', () => {
    let btnCreateContact = document.getElementById('btnCreateContact');

    let contact = localStorage.getItem('localContact');
    let contactsList = JSON.parse(contact);

    let saveindex = document.getElementById('saveindex').value;
    contactsList[saveindex].first_name = firstNameInput.value;
    contactsList[saveindex].last_name = lastNameInput.value;
    btnCreateContact.style.display = 'block';
    btnSaveContact.style.display = 'none';
    localStorage.setItem('localContact', JSON.stringify(contactsList));
    clearInput();

    showContact();
});

const clearInput = () => {
    firstNameInput.value = '';
};

function deleteContact(index) {
    let contact = localStorage.getItem('localContact');
    let contactsList = JSON.parse(contact);
    contactsList.splice(index, 1);
    localStorage.setItem('localContact', JSON.stringify(contactsList));
    showContact();
}










filterInput.addEventListener('keyup', filterNames);

function filterNames() {
    //console.log(filterInput.value);
    let filterValue = document.getElementById('filterInput').value.toUpperCase();

    let ul = document.getElementById('contacts');

    let li = ul.querySelectorAll('li');

    for (let i = 0; i < li.length; i++) {
        let firstName = li[i].getElementsByClassName('card-first-name')[0];
        let id = li[i].getElementsByClassName('card-id')[0];
        let lastName = li[i].getElementsByClassName('card-last-name')[0];

        if (id.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
            li[i].style.display = '';
        } else if (firstName.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
            li[i].style.display = '';
        } else if (lastName.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }
}