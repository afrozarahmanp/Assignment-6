const aiHubData = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    hubData(data.data.tools);

}

const hubData = (aiDatas) => {
console.log(aiDatas);
    const hubContainer = document.getElementById('hub-container');
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


}

aiHubData();

// const aiHubModal = id
const aiHubModalData = async (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
console.log(data);

}
