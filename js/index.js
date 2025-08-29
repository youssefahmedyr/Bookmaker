
var key = "bookmarks";
var nameWebsite = document.getElementById("websiteName");
var urlWebsite = document.getElementById("websiteURL");
var typeWebsite = document.getElementById("websiteType");
var btn = document.getElementById("btnWebsite");
var websitesList = document.getElementById("websitesList");
var modalEl = document.getElementById("staticBackdrop");
var bookmarks = [];


if (localStorage.getItem(key)) {
  bookmarks = JSON.parse(localStorage.getItem(key));
}
showWebsites(); 


btn.addEventListener("click", function () {
  var isValid = true;


  if (nameWebsite.value.trim() === "") {
    nameWebsite.classList.add("is-invalid");
    isValid = false;
  } else {
    nameWebsite.classList.remove("is-invalid");
  }

  var urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/;
  if (!urlPattern.test(urlWebsite.value.trim())) {
    urlWebsite.classList.add("is-invalid");
    isValid = false;
  } else {
    urlWebsite.classList.remove("is-invalid");
  }

  if (isValid) {
    addWebsite();
    clearInputs();


    var modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) modalInstance.hide();
  }
});

function addWebsite() {
  var name = nameWebsite.value.trim();
  var url = urlWebsite.value.trim();
  var type = typeWebsite.value.trim();

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  var website = { name: name, url: url, type: type };
  bookmarks.push(website);

  localStorage.setItem(key, JSON.stringify(bookmarks));
  showWebsites();
}

function showWebsites() {
  if (bookmarks.length === 0) {
    websitesList.innerHTML = `<div>
    
    </div>`;
    return;
  }

  websitesList.innerHTML = "";
  for (var i = 0; i < bookmarks.length; i++) {
    var w = bookmarks[i];
    var itemHTML = `
      <div class="websites-info p-3 rounded-3 my-3 d-flex flex-column flex-md-row justify-content-between align-items-center">
        <h4 class="web-title mb-2 mb-md-0">${w.name} ${w.type ? `<small>(${w.type})</small>` : ""}</h4>
        <div class="website-url my-2 my-md-0">${w.url}</div>
        <div class="actions">
          <button type="button" class="btn btn-success" onclick="openWebsite(${i})"><i class="fa-solid fa-eye"></i></button>
          <button type="button" class="btn btn-danger" onclick="deleteWebsite(${i})"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>`;
    websitesList.innerHTML += itemHTML;
  }
}


function openWebsite(index) {
  window.open(bookmarks[index].url, "_blank");
}


function deleteWebsite(index) {
  bookmarks.splice(index, 1);
  localStorage.setItem(key, JSON.stringify(bookmarks));
  showWebsites();
}


function clearInputs() {
  nameWebsite.value = "";
  urlWebsite.value = "";
  typeWebsite.value = "";

  nameWebsite.classList.remove("is-invalid");
  urlWebsite.classList.remove("is-invalid");
}
