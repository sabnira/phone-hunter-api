const loadAllPhones = async(status, searchText) => {

    document.getElementById("spinner").style.display="none";

    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText?searchText:"iphone"}`);
    const data = await response.json();

    if(status){
        displayAllPhone(data.data);
    }
    else {
        displayAllPhone(data.data.slice(0,6));
    }
}


const displayAllPhone = (phones) => {
    document.getElementById("phones-container").innerHTML ='';

    const phonesContainer = document.getElementById("phones-container");

    phones.forEach(phone => {

        const {brand, image, slug} = phone;

        const div = document.createElement('div');
        div.innerHTML = `
        
        <div class="card m-2 bg-base-100 w-80 shadow-sm">
        <figure class="px-10 pt-10">
            <img
            src=${image}
            class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
        <h2 class="card-title">${brand
            }</h2>
        <p>${slug}</p>
        <div class="card-actions">

            <button onclick="phoneDetails('${slug}')" class="btn btn-accent">Show Details</button>

        </div>
        </div>
        </div>

        `

        phonesContainer.appendChild(div);
    })
}


const handleShowAll = () => {
    document.getElementById("phones-container").innerHTML ='';
    loadAllPhones(true);
}


const handleSearch = () => {

    document.getElementById("spinner").style.display="block";

    const searchText = document.getElementById("search-box").value;

    setTimeout(function () {
        loadAllPhones(false, searchText);
    },3000)
}


const phoneDetails = async (slugs) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${slugs}`)
    const data = await response.json();
    console.log(data.data);


    const {brand, releaseDate, slug} = data.data;

    const modalContainer = document.getElementById("modal-container");

    modalContainer.innerHTML = `
    
        <dialog id="my_modal_1" class="modal">
        <div class="modal-box">
          <h3 class="text-lg font-bold">${brand}</h3>
          <p class="py-4">${releaseDate}</p>
          <div class="modal-action">
            <form method="dialog">
              <button class="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    `

    my_modal_1.showModal();
}


loadAllPhones(false,"iphone")