const LoadPhone = async (SearchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${SearchText}`);
    // const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone&fbclid=IwAR2Rgp2jENoQylw3YaIki4gOsizC2K-2LlzO-_spmSqJ_WYja8bhZ1OEGnU');
    const data = await res.json();
    const phones = data.data;
    console.log(phones);
    displayphones(phones, isShowAll)

}

const displayphones = (phones, isShowAll) => {
    //    console.log(phones)
    const PhoneContainer = document.getElementById('phone-container')
    PhoneContainer.textContent = '';

    // show All button 

    const ShowAllContainer = document.getElementById('show-all-container');
    // Assuming phones is an array
    if (phones.length > 12 && !isShowAll) {
        ShowAllContainer.classList.remove('hidden');
    } else {
        ShowAllContainer.classList.add('hidden');
    }

    console.log('is show All ', isShowAll)

    // Display only 12 phones if now showALl
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        console.log(phone)
        //    create a div 

        const phoneCard = document.createElement('div');
        phoneCard.classList = `card  bg-gray-100 p-4 shadow-xl`
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}"
        alt="Shoes" /></figure>
         <div class="card-body">
             <h2 class="card-title">${phone.phone_name}</h2>
             <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
              <button onclick="showdetails('${phone.slug}');
              show_details.showModal()"  class="btn btn-primary">Show Details</button>
            </div>
        </div>
        
        `;

        // append child 

        PhoneContainer.appendChild(phoneCard)

    });
    // hide loading spinner 
    toggloadindSpinner(false);
}

// showdeatials 
const showdetails = async (id) => {
    console.log('id', id)
    //   load data singleohine 
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const phone = data.data
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
    const phonename = document.getElementById('phone-name');
    phonename.innerText = phone.name
    const showdetailcontainer = document.getElementById('show-details-container')
    showdetailcontainer.innerHTML = `
    <img src="${phone.image}" alt="">
    <p><span>Stroage:</span>${phone?.mainFeatures?.stroage}</p>
   
   `;


    //   show the modal 
    show_details.showModal();

}


const HandleSearch = (isShowAll) => {
    toggloadindSpinner(true);
    const SearchFiled = document.getElementById('search-field')
    const SearchText = SearchFiled.value;
    console.log(SearchText)
    LoadPhone(SearchText, isShowAll);
}

const toggloadindSpinner = (isloading) => {
    const loadingSpinner = document.getElementById('loading-spinner')
    if (isloading) {
        loadingSpinner.classList.remove('hidden')
    }
    else {
        loadingSpinner.classList.add('hidden')
    }
}

const handleShowAll = () => {
    HandleSearch(true);
}

