let filterInput = document.getElementById('filterInput');

filterInput.addEventListener('keyup', filterNames);

function filterNames() {
    //console.log(filterInput.value);
    let filterValue = document.getElementById('filterInput').value.toUpperCase();

    let ul = document.getElementById('contacts');

    let li = ul.querySelectorAll('li');

    for(let i = 0; i < li.length; i++) {
        let firstName = li[i].getElementsByClassName('card-first-name')[0];
        let id = li[i].getElementsByClassName('card-id')[0];
        let lastName = li[i].getElementsByClassName('card-last-name')[0];

        if(id.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
            li[i].style.display = '';
        } else if(firstName.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
            li[i].style.display = '';
        } else if(lastName.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }
}