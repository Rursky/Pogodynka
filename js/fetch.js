const town = document.getElementById("town")

town.addEventListener("change", function () {
    document.getElementById("temp").innerText = `Prognoza 5 dniowa dla miasta: ${town.value}`
})

const DOM_img = document.createElement("img");
const DOM_img1 = document.createElement("img");
const DOM_img2 = document.createElement("img");
const DOM_img3 = document.createElement("img");
const DOM_img4 = document.createElement("img");

const images_temperature = [DOM_img, DOM_img1, DOM_img2, DOM_img3, DOM_img4];
const images_html = ["image", "image1", "image2", "image3", "image4"];

for(let i=0; i<images_temperature.length; i++){ // pętla tworząca "puste" img bez src
    document.getElementById(images_html[i]).appendChild(images_temperature[i]);
}

const outputs = ["output", "output1", "output2", "output3", "output4"]
const nums = [0, 8, 16, 24, 32]

town.addEventListener("change", function () {
    fetch(`https:api.openweathermap.org/data/2.5/forecast?q=${town.value}&appid=3865d70b9f135bc376b8beb376bb474b`)
        .then( resp => resp.json())
        .then( data => {
            for(let j=0; j<outputs.length; j++){
                document.getElementById(outputs[j]).innerText = "Dzień: " + data.list[nums[j]].dt_txt + ", temperatura: " + ((data.list[nums[j]].main.temp)-273.15).toFixed(2) + "°c";
                switch(true){
                    case (((data.list[nums[j]].main.temp)-273.15) < 0):
                        images_temperature[j].src = "https://svgshare.com/i/SpP.svg"
                        break;
                    case ( (((data.list[nums[j]].main.temp)-273.15) >= 0) && (((data.list[nums[j]].main.temp)-273.15) < 5) ):
                        images_temperature[j].src = "https://svgshare.com/i/SoK.svg"
                        break;
                    case ( (((data.list[nums[j]].main.temp)-273.15) >= 5) && (((data.list[nums[j]].main.temp)-273.15) < 15) ):
                        images_temperature[j].src = "https://svgshare.com/i/SoL.svg"
                        break;
                    case ( (((data.list[nums[j]].main.temp)-273.15) >= 15) && (((data.list[nums[j]].main.temp)-273.15) < 27) ):
                        images_temperature[j].src = "https://svgshare.com/i/Snd.svg"
                        break;
                    case (((data.list[nums[j]].main.temp)-273.15) >= 27):
                        images_temperature[j].src = "https://svgshare.com/i/SoM.svg"
                        break;
                }
            }
        })
})
