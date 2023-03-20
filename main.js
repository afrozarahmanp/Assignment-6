const aiHubData = async (value) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    hubData(data.data.tools, value);

}

const hubData = (aiDatas, value = 0) => {
console.log(aiDatas);
    const hubContainer = document.getElementById('hub-container');
    hubContainer.textContent = '';

    const showAll = document.getElementById('show-all');

    if(value ===0){
        aiDatas = aiDatas.slice(0,6);
        showAll.classList.remove("d-none");

    }
    else if (value===1){
        showAll.classList.add("d-none");
    }

    if(value===2){
        aiDatas = aiDatas.sort(
            (x, y) => new Date(y.published_in) - new Date(x.published_in)

        );
        showAll.classList.add("d-none");
    }

    aiDatas.forEach(aiData => {
        console.log(aiData);
        const dataDiv = document.createElement('div');
        dataDiv.classList.add('col');
        dataDiv.innerHTML = `
        <div class="card h-100">
            <img src="${aiData.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h4 class="card-title fw-bold">Features </h4>
                <ol>
                    <li>${aiData.features[0]}</li>
                    <li>${aiData.features[1]}</li>
                    <li id='listID'>${aiData.features[2]? aiData.features : 'No more features' }</li>
                </ol>
                
            </div>
            <div class="card-footer bg-white d-flex justify-content-between align-items-center">
                <div>
                    <h4 class='fw-bold'>${aiData.name}</h4>
                    <h6><i class="fa-regular fa-calendar"></i><span> </span>${aiData.published_in}</h6>
                </div>
                <div>
                    <button class= "border-0 bg-white " data-bs-toggle="modal" data-bs-target="#AiHubModal" onclick="aiHubModalData('${aiData.id}')" >
                    <i class="fa-solid fa-circle-arrow-right text-danger-emphasis opacity-50 fs-3"></i>
                    </button>
                
                </div>
                
            </div>

        </div>`
        hubContainer.appendChild(dataDiv);


    });
    toggleSpinner(false);


}

aiHubData();


const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader')
    if(isLoading){
        loaderSection.classList.remove("d-none")
    }
    else {
        loaderSection.classList.add("d-none")
    }
}


// Show all
document.getElementById('show-all-btn').addEventListener('click',function(){
    toggleSpinner(true);
    aiHubData(1);

})
 
document.getElementById('sort-btn').addEventListener('click', function(){
    toggleSpinner(true);
    aiHubData(2);

})

const aiHubModalData = async (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);
    aiModal(data.data)
}
aiHubModalData('01');

const aiModal = (modalData) => {
  console.log(modalData.pricing[0].price);
    const aiHubModal = document.getElementById('ai-hub-modal');
    aiHubModal.textContent = '';

    const modalDiv1 = document.createElement('div');
    modalDiv1.classList.add('col');
        modalDiv1.innerHTML = `
        <div class="card border border-danger bg-danger-subtle opacity-75">
        <h4 class=" text-black card-body ">${modalData.description}</h4>
        <div class="card-body">
      
          <div id="subscription" class="row row-cols-1 row-cols-md-3 g-3">
          <div class="col">
          <div class="card border border-secondary-subtle bg-white text-center">
            <p class="mt-3 text-success fw-bold">${modalData.pricing[0].price? modalData.pricing[0].price : "Free subscription"}
            <br> ${modalData.pricing[0].plan? modalData.pricing[0].plan : "/Basic"} </p>
          </div>
        </div>
        <div class="col">
          <div class="card border border-secondary-subtle bg-white text-center">
            <p class="mt-3 text-warning fw-bold">${modalData.pricing[1].price? modalData.pricing[1].price : "Free subscription"}
            <br> ${modalData.pricing[1].plan? modalData.pricing[1].plan : "/Pro"}</p>
          </div>
        </div>
        <div class="col">
          <div class="card border border-secondary-subtle bg-white text-center">
            <p class="mt-3 text-danger fw-bold">${modalData.pricing[2].price? modalData.pricing[2].price : "Free subscription"}
            <br> ${modalData.pricing[2].plan? modalData.pricing[2].plan : "/Enterprise"} </p>
          </div>
        </div>
          </div>

          <div class="d-flex justify-content-between m-3">
        
            <div>
              <h4 class=" text-black card-title mt-3">Features</h4>
              <ul id="features-id">
              <li>${modalData.features[1].feature_name} </li>
              <li>${modalData.features[2].feature_name} </li>
              <li>${modalData.features[3].feature_name} </li>
              </ul>
            </div>
         

            <div>
              <h4 class=" text-black card-title mt-3 ">Integrations</h4>
              <ul id= "Integrations-id">
              </ul>
            </div>

          </div>

        </div>
      </div>
        `
    aiHubModal.appendChild(modalDiv1);

    const modalDiv2 = document.createElement('div');
    modalDiv2.classList.add('col');
        modalDiv2.innerHTML = `
        <div class="card">
          <img src="${modalData.image_link[0]}" class="card-img-top" alt="...">
          <div class="card-body text-center">
            <h4 class="card-title">${modalData.input_output_examples[0].input}</h4>
            <p class="card-text">${modalData.input_output_examples[0].output}</p>
          </div>
        </div> 
        `
        aiHubModal.appendChild(modalDiv2);


  integrationsDetails(modalData);
}


const integrationsDetails = (modalData) => {

    const integrationsList = document.getElementById('Integrations-id');
    console.log(modalData.integrations);
    if(modalData.integrations !=null){
      const integration = modalData.integrations;
      for (let i = 0; i < integration.length; i++){
        const li = document.createElement('li');
        li.innerHTML = integration[i];
        integrationsList.appendChild(li);
      }
    }
    else {

    }

}
