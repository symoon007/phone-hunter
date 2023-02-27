const loadPhone = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhone(data.data, dataLimit);
};
const displayPhone = (phones, dataLimit) => {
  
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.innerText = "";
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);

    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  const noPhone = document.getElementById("no-phone");
 
  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
  } else {
    noPhone.classList.add("d-none");
  }
  phones.forEach((phone) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
         <div class="card p-5">
                <img src="${phone.image}" class="card-img-top w-100" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <p class="card-text">
                    
                  </p>
                  <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
                </div>
              </div>
        `;
    phoneContainer.appendChild(div);
  });
  toggleSpinner(false);
};

document.getElementById("btn-search").addEventListener("click", function () {
  processSearch(10)
});
document.getElementById('search-field').addEventListener("keypress", function (e) {
  console.log(e.key)
if (e.key === 'Enter') {
 processSearch(10);
}
})
const toggleSpinner = isLoading => {
  const loaderSection = document.getElementById("loader");
  if(isLoading) {
    loaderSection.classList.remove('d-none');
  }
  else {
    loaderSection.classList.add('d-none')
  }
}

function processSearch (dataLimit) {
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText, dataLimit);

}
document.getElementById('btn-show-all').addEventListener('click', function () {
  processSearch();
})
const loadPhoneDetails =async id => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data)
}
const displayPhoneDetails = phone => {
  console.log(phone)
  const modalTitle = document.getElementById("phoneDetailsModalLabel");
  modalTitle.innerText = phone.name;
  const modalDetails = document.getElementById("phone-details-modal");
  modalDetails.innerHTML = `
  <p>Release Date:<span class="fw-semibold"> ${phone.releaseDate ? phone.releaseDate : 'Not Available'}</span></p>
  <p>Storage: <span class="fw-semibold">${phone.mainFeatures?.storage}</span></p>
  <p>Memory: <span class="fw-semibold">${phone.mainFeatures?.memory}</span></p>
  <p>Chipset: <span class="fw-semibold">${phone.mainFeatures?.chipSet}</span></p>
  <p>Display Size: <span class="fw-semibold">${phone.mainFeatures?.displaySize}</span></p>
  `
}
loadPhone('iphone')