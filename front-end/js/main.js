// Search
const filterInput = document.getElementById("filterInput");
// CRUD
const firstNameInput = document.getElementById("firstNameInput");
const lastNameInput = document.getElementById("lastNameInput");
const btnCreateContact = document.getElementById("btnCreateContact");
const sortFilter = document.getElementById("sortFilter");

//GET response
fetch("http://127.0.0.1:5000/get")
  .then((res) => res.json())
  .then((data) => renderContacts(data));

//showContact();
btnCreateContact.addEventListener("click", async () => {
  const firstNameInputValue = firstNameInput.value;
  const lastNameInputValue = lastNameInput.value;

  if (firstNameInputValue && lastNameInputValue != 0) {
    fetch("http://127.0.0.1:5000/post", {
      method: "POST",
      body: JSON.stringify({
        first_name: firstNameInputValue,
        last_name: lastNameInputValue,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then((data) => renderContacts(data));
    checkInput();
  } else if (firstNameInputValue == 0) {
    errorInput();
  }

  clearInput();
});

const checkInput = () => {
  const firstInputWrapper = document.getElementById("firstInputWrapper");
  const lastInputWrapper = document.getElementById("lastInputWrapper");

  firstInputWrapper.classList.remove("error");
  lastInputWrapper.classList.remove("error");
  firstInputWrapper.classList.add("check");
  lastInputWrapper.classList.add("check");
};

const errorInput = () => {
  const firstInputWrapper = document.getElementById("firstInputWrapper");
  const lastInputWrapper = document.getElementById("lastInputWrapper");

  firstInputWrapper.classList.add("error");
  lastInputWrapper.classList.add("error");
};

// Render

async function renderContacts(contacts) {
  innerItem = "";
  const contactsHtmlWrapper = document.getElementById("contacts");

  contacts.forEach((item, index) => {
    innerItem += `
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

                    <div id="buttons${index}" class="card-button-wrapper">
                        <button id="btnEdit" onclick="editContact(${index})" type="button" class="card-btn">
                            Edit
                        </button>
                        <button id="btnSaveContact" onclick="saveContact(${index})" type="button" class="card-btn save-btn" style="display: none">
                            Save
                        </button>
                        <button id="btnDelete" onclick="deleteContact(${index})"  type="button" class="card-btn btn-delete">
                            Delete
                        </button>
                    </div>
                </a>
            </li>
        `;
  });

  contactsHtmlWrapper.innerHTML = innerItem;
}

// function showContact() {
//   let contact = localStorage.getItem("localContact");

//   if (contact == null) {
//     contactsList = [];
//   } else {
//     contactsList = JSON.parse(contact);
//   }

//   let innerItem = "";
//   const contactsHtmlWrapper = document.getElementById("contacts");

//   contactsList.forEach((item, index) => {
//     innerItem += `
//             <li class="main-card-item">
//                 <a href="#">
//                     <div class="card-info">
//                         <div class="card-id">
//                             ${index + 1}
//                         </div>
//                         <div class="card-first-name">
//                             ${item.first_name}
//                         </div>
//                         <span class="card-line"></span>
//                         <div class="card-last-name">
//                             ${item.last_name}
//                         </div>
//                         <span class="card-line"></span>
//                         <div class="card-phone-number">
//                             +380 (66) 891 55 44
//                         </div>
//                     </div>

//                     <div class="card-button-wrapper">
//                         <button id="btnEdit" onclick="editContact(${index})" type="button" class="card-btn">
//                             Edit
//                         </button>
//                         <button id="btnDelete" onclick="deleteContact(${index})"  type="button" class="card-btn btn-delete">
//                             Delete
//                         </button>
//                     </div>
//                 </a>
//             </li>
//         `;
//   });
//   contactsHtmlWrapper.innerHTML = innerItem;
// }

// Edit

async function editContact(index) {
  const saveindex = document.getElementById("saveindex");
  const btnCreateContact = document.getElementById("btnCreateContact");
  const btnSaveContact = document.getElementById("btnSaveContact");

  let resonse = await fetch("http://127.0.0.1:5000/get");
  contactList = await resonse.json();

  firstNameInput.value = contactList[index].first_name;
  lastNameInput.value = contactList[index].last_name;

  btnCreateContact.style.display = "none";
  btnSaveContact.style.display = "block";

  console.log((saveindex.value = index));
}

let btnSaveContact = document.getElementById("btnSaveContact");

btnSaveContact.addEventListener("click", async function () {
  let resonse = await fetch("http://127.0.0.1:5000/get");
  contactList = await resonse.json();
  console.log(contactList);

  let btnCreateContact = document.getElementById("btnCreateContact");
  const firstNameInputValue = firstNameInput.value;
  const lastNameInputValue = lastNameInput.value;

  let saveindex = document.getElementById("saveindex").value;
  console.log(saveindex);
  contactList[saveindex].first_name = firstNameInput.value;
  contactList[saveindex].last_name = lastNameInput.value;
  btnCreateContact.style.display = "block";
  btnSaveContact.style.display = "none";

  clearInput();

  fetch("http://127.0.0.1:5000/put/" + saveindex, {
    method: "PUT",
    body: JSON.stringify({
      first_name: firstNameInputValue,
      last_name: lastNameInputValue,
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => renderContacts(data));
});

const clearInput = () => {
  firstNameInput.value = "";
  lastNameInput.value = "";
};

// Delete

async function deleteContact(index) {
  fetch("http://127.0.0.1:5000/delete/" + index, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => renderContacts(data));
}

// Filter

sortFilter.addEventListener("change", () => {
  let contact = localStorage.getItem("localContact");
  let contactsList = JSON.parse(contact);

  if (sortFilter.value === "ascending") {
    sortByName(contactsList, 1, -1);
  } else if (sortFilter.value === "descending") {
    sortByName(contactsList, -1, 1);
  }

  function sortByName(arr, number_1, number_2) {
    arr.sort((a, b) => (a.first_name > b.first_name ? number_1 : number_2));
  }

  localStorage.setItem("localContact", JSON.stringify(contactsList));
  showContact();
});

// Search

filterInput.addEventListener("keyup", () => {
  let filterValue = document.getElementById("filterInput").value.toUpperCase();

  let ul = document.getElementById("contacts");

  let li = ul.querySelectorAll("li");

  for (let i = 0; i < li.length; i++) {
    let firstName = li[i].getElementsByClassName("card-first-name")[0];
    let id = li[i].getElementsByClassName("card-id")[0];
    let lastName = li[i].getElementsByClassName("card-last-name")[0];

    if (id.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
      li[i].style.display = "";
    } else if (firstName.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
      li[i].style.display = "";
    } else if (lastName.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
});
