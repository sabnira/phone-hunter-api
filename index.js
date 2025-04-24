const loadAllPhones = async() => {
  
    document.getElementById("spinner").style.display="none";


    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=iphone`);
    const data = await response.json();
    displayAllPhone(data.data.slice(0,6));
}


const displayAllPhone = (phones) => {
    console.log(phones);
}


const handleSearch = () => {

    document.getElementById("spinner").style.display="block";

    setTimeout(function () {
        loadAllPhones();
    },3000)
}

loadAllPhones()