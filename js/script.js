// Load Search Result
const searchPhone = (condition=true, search) => {
    displayOrHideElement('search-not-found', 'none');
    displayOrHideElement('load-more-button', 'none');


    let searchField = document.getElementById('search-field');
    let searchText = searchField.value;

    if(condition===true){
		document.getElementById('search-result').textContent = ``;
        document.getElementById('phone-details').textContent= ``;

	} else{
		searchText = search;
	}
   
    // clear data
    searchField.value = '';
        // load data
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data, condition, searchText))

}
// Display Search Result
const displaySearchResult = (data, condition, searchText) => {
    const searchResult = document.getElementById('search-result');
   // No search found
	if(data.length === 0){
		displayOrHideElement('search-not-found', 'block');
	}
    
    searchResult.textContent = '';

    const lengthOfResult = data.length;

	if(lengthOfResult>20){
		document.getElementById('load-more-button').setAttribute('onclick',`searchPhone(false,'${searchText}')`);
	}

	//Load More Button Show and Hide Codition
	if(lengthOfResult>20 && condition === true){
		displayOrHideElement('load-more-button', 'block');
	} 
    let flag = 0;
    data.forEach(singleData => {
        if(flag===20 && condition === true){
            return false;
        }
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
        flag++;
		return true;
        })
};

//Load Phone Details
const loadPhoneDetail = async id => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data));
        // .then(data => console.log(data.data.mainFeatures));
}

//Display Phone Details
const displayPhoneDetail = phoneDetail => {
    // console.log(phoneDetail);
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${phoneDetail.image}" class="card-img-top w-25 mx-auto" alt="...">
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
        <div>
			<li><strong>WLAN: </strong>${phoneDetail?.others?.WLAN ? phoneDetail.others.WLAN : notExistMessage()}</li>
			<li><strong>Bluetooth: </strong>${phoneDetail?.others?.Bluetooth ? phoneDetail.others.Bluetooth: notExistMessage()}</li>
			<li><strong>GPS: </strong>${phoneDetail?.others?.GPS ? phoneDetail.others.GPS : notExistMessage()}</li>
			<li><strong>NFC: </strong>${phoneDetail?.others?.NFC ? phoneDetail.others.NFC : notExistMessage()}</li>
			<li><strong>Radio: </strong>${phoneDetail?.others?.Radio ? phoneDetail.others.Radio : notExistMessage()}</li>
			<li><strong>USB: </strong>${phoneDetail?.others?.USB ? phoneDetail.others.USB : notExistMessage()}</li>
		</div
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