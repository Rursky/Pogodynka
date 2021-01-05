const town = document.getElementById("town")

town.addEventListener("change", function () { // nasluchiwanie na "zmiany" selecta w celu pokazaniu napisu "Prognoza 5[...]"
    document.getElementById("temp").innerText = `Prognoza 5 dniowa dla miasta: ${town.value}`
})

const html_elements_number = 5 // wpisz ile masz "okienek" dla pogody - w tym wypadku 5 bo prognoza na 5 dni / musisz ręcznie dopisać okienka w html
// <div class="windows"><div id="outputX"></div><div id="imageX"></div></div>
const images_html = []
const outputs = []
const nums = []
for(let i=0; i<html_elements_number; i++){
    images_html.push(`image${i}`)
    outputs.push(`output${i}`)
    nums.push(i*8)
}

const pictures = []
for(let i=0; i<images_html.length; i++){
    document.getElementById(images_html[i]).innerHTML = `<img id=img${i} src="">`;
    pictures.push(document.getElementById(`img${i}`))
}

town.addEventListener("change", function () {
    fetch(`https:api.openweathermap.org/data/2.5/forecast?q=${town.value}&appid=3865d70b9f135bc376b8beb376bb474b`)
        .then( resp => resp.json())
        .then( data => {
            for(let j=0; j<outputs.length; j++){
                document.getElementById(outputs[j]).innerText = "Dzień: " + data.list[nums[j]].dt_txt + ", temperatura: " + ((data.list[nums[j]].main.temp)-273.15).toFixed(2) + "°c";
                switch(true){
                    case (((data.list[nums[j]].main.temp)-273.15) < 0):
                        pictures[j].src = "https://svgshare.com/getbyhash/sha1-pgVZNzECL/moe+8E8C6zGpLHHLs="
                        break;
                    case ( (((data.list[nums[j]].main.temp)-273.15) >= 0) && (((data.list[nums[j]].main.temp)-273.15) < 5) ):
                        pictures[j].src = "https://svgshare.com/getbyhash/sha1-erTcmRD/+pygI17D0Laqe09jlYU="
                        break;
                    case ( (((data.list[nums[j]].main.temp)-273.15) >= 5) && (((data.list[nums[j]].main.temp)-273.15) < 15) ):
                        pictures[j].src = "https://svgshare.com/getbyhash/sha1-vmHVc9B7LqtQstwyH4Rnyc9lPIs="
                        break;
                    case ( (((data.list[nums[j]].main.temp)-273.15) >= 15) && (((data.list[nums[j]].main.temp)-273.15) < 27) ):
                        pictures[j].src = "https://svgshare.com/getbyhash/sha1-p/plJ4g+zdMEcfsgD0/CNL05vLg="
                        break;
                    case (((data.list[nums[j]].main.temp)-273.15) >= 27):
                        pictures[j].src = "https://svgshare.com/getbyhash/sha1-JWWlgjTlz97B1sZguAvp0cNgtWM="
                        break;

                }

            }
        })
})
