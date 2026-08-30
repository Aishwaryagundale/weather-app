const searchbtn = document.querySelector("#Search");
const searchinput = document.querySelector("#input");
const temperature = document.querySelector(".temperature");
const cityname = document.querySelector(".city-name");
const dateElement = document.querySelector(".Date");
const timeElement = document.querySelector(".time");
const condition = document.querySelector(".weather-condition");
const icon = document.querySelector("#icon");



searchbtn.addEventListener("click", async function (){
    const location = searchinput.value ;
    if(location != ""){
        const Data = await fetchweather(location);

         if(Data!= null){
        updateDom(Data)
    }
        searchinput.value="";
    }
   
})
 function updateDom(Data){
  const city = Data.location.name
  const temp = Data.current.temp_c
  const localtime = Data.location.localtime
  const[date,time]= localtime.split(" ");
  const conditionn = Data.current.condition.text
  const iconn = Data.current.condition.icon
  console.log({
    city,
    temp,
    date,
    time,
    conditionn,
    iconn
});
temperature.textContent=temp;
cityname.textContent=city;
condition.textContent=conditionn;
icon.src=iconn;
dateElement.textContent=date;
timeElement.textContent=time;

}
 async function fetchweather(location){
    const url = `http://api.weatherapi.com/v1/current.json?key=1eba8367e65540929fa100438262908&q=${location}&aqi=no`
     const response = await fetch(url)
    console.log(response);
          
        if(response.status==400){
            alert("location is invalid");
        }else if(response.status==200){
           const json = await response.json()
           console.log(json);
           return json;
            }
        
}
