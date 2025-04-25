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
    
    const phonesContainer = document.getElementById("phones-container");

    phones.forEach(phone => {

        const {brand, image, slug} = phone;

        const div = document.createElement('div');
        div.innerHTML = `
        
        <div class="card m-2 bg-base-100 w-96 shadow-sm">
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
    loadAllPhones(true);
}


const handleSearch = () => {

    document.getElementById("spinner").style.display="block";

    const searchText = document.getElementById("search-box").value;

    setTimeout(function () {
        loadAllPhones(false, searchText);
    },3000)
}


const phoneDetails = async (slug) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
    const data = await response.json();
    console.log(data.data);
}


loadAllPhones(false,"iphone")