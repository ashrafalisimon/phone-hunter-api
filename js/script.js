// Loard Search Result
const searchPhone = async () => {
    displayOrHideElement('search-not-found', 'none');
	displayOrHideElement('phone-details', 'none');
	displayOrHideElement('load-more-button', 'none');
    
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    if (searchText == '') {
        // please write something to display
    }
    else {
        // load data
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data))
        // try {
        //     const res = await fetch(url);
        //     console.log(url);
        //     const data = await res.json();
        //     // displaySearchResult(data.phone)
        //     console.log(data);
           
        // }
        // catch (error) {
        //     console.log(error);
        // }

    }

}
// Display Search Result
const displaySearchResult = data => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    // if (data.length == 0) {
    //     // show no result found;
    // }
    data.forEach(singleData => {
        // console.log(singleData);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="loadPhoneDetail('${singleData.slug}')" class="card mt-3  h-100">
            <img src="${singleData.image}" class="card-img-top w-50 mx-auto mt-2" alt="...">
            <div class="card-body">
                <h5 class="card-title text-center">${singleData.phone_name}</h5>
                <p class="card-text text-center"> Brand: ${singleData.brand}</p>
            </div>
            <button class="btn btn-primary w-50  mx-auto mb-4" onclick="loadPhoneDetail('${singleData.slug}')">Explore</button>
	  	</div>
        </div>
        `;
        searchResult.appendChild(div);
    })
}

//Load Phone Details
const loadPhoneDetail = async id => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetail(data.data));
        // .then(data => console.log(data.data.mainFeatures));
}

//Display Phone Details
const displayMealDetail = phoneDetail => {
    // console.log(phoneDetail);
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${phoneDetail.image}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title text-center">${phoneDetail.name}</h5>
        <p class="card-text text-center"> Brand: ${phoneDetail.brand}</p>
        <p class="card-text text-center"><small class="text-muted">${phoneDetail.releaseDate? phoneDetail.releaseDate : 'No release date found'}</small></p>
        <h3 class='my-3' >Main Features</h3>
        <div>
			<li><strong>Display Size: </strong>${phoneDetail?.mainFeatures?.displaySize ? phoneDetail.mainFeatures.displaySize : notExistMessage()}</li>
			<li><strong>Chipset: </strong>${phoneDetail?.mainFeatures?.chipSet ? phoneDetail.mainFeatures.chipSet : notExistMessage()}</li>
			<li><strong>Memory: </strong>${phoneDetail?.mainFeatures?.memory ? phoneDetail.mainFeatures.memory : notExistMessage()}</li>
			<li><strong>Storage: </strong>${phoneDetail?.mainFeatures?.storage ? phoneDetail.mainFeatures.storage : notExistMessage()}</li>
			<li><strong>Sensors: </strong>${phoneDetail?.mainFeatures?.sensors ? phoneDetail.mainFeatures.sensors : notExistMessage()}</li>
		</div>
        <h3 class='my-3' >Others</h3>
    </div>
    `;
    phoneDetails.appendChild(div);
}

// No Exist Message Arrow Function
const notExistMessage = () => {
	return "This features doesn't exist";
}

//Display Or Hide Element Arrow Function
const displayOrHideElement = (id, displayType) => {
	document.getElementById(id).style.display = displayType;
}