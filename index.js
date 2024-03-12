const generateForm = document.querySelector('.generate-form');
const imageGallery = document.querySelector('.image-gallery');
const OPENAI_API_KEY = "";

const generateAiImages = async (userPrompt, userImgQuantity) => {
    try {
        const response = await fetch("https://api.openai.com/v1/images/generations",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                prompt : userPrompt,
                n: userImgQuantity,
                size: '512x512',
                response_format: 'b64_json'
            })
        })
    }catch (error){
        console.log(error);
    }
}

const handleformsubmission = (e) => {
    e.preventDefault();

    //Get user input and image quatity values from the form 
    const userPrompt = e.srcElement[0].value;
    const userImgQuantity = e.srcElement[1].value;

    //Craeting HTML markup for image card swith loading state
    const imgCardMarkup = Array.from({length: userImgQuantity},()=>
    `    <div class="img-card loading">
    <img src="./loader.svg" alt="imge">
    <a href="" class="download-btn"><img src="./download.svg" alt=""></a>
    </div>`
    ).join("");
    imageGallery.innerHTML = imgCardMarkup;
    generatingAIImages(userPrompt, userImgQuantity)

}
generateForm.addEventListener('submit', handleformsubmission);
