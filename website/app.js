/* Global Variables */
const server = 'http://127.0.0.1:4000';
// baseURL to return weather api
const baseURL = 'api.openweathermap.org/data/2.5/weather?zip=';
// API Key
const apiKey = '&appid=63914b6ade95bb20be16d6af1b5e7cba&units=metric';
// error message
const error = document.getElementById('error');
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();

// call function to generateData
const generateData = ()=>{
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById("feelings").value;
    // generate weather data to return promise 
    getWeathData(zip).then((data)=>{
        console.log(data);
        if(data) {
            // const {
            // main: { temp },
            //   name: city,
            //   weather: [{description}],
            // } = data;
            const info = {
                temp : Math.round(data.list[0].main.temp),
                city: data.city.name,
                feelings,
            };
            console.log(info);
            postData(server + '/add', info);
            updateUI();
            document.getElementById('entry').style.opacity = 1;
        }
    });

};

// event listener

document.getElementById('generate').addEventListener("click", generateData);
// call function to get api data
const getWeathData = async (zip) => {
    try{
        const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${zip}${apiKey}`);
        const data = await res.json();
        if (data.cod != 200) {
            error.innerHTML = data.message;
            setTimeout(function(){
                error.innerHTML = '';
            },2000)
            throw `${data.message}`;
        }
        return data;
    }catch (error) {
        console.log(error);
    }
};

// function POST data
const postData = async (url = '', info = {}) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(info),
    });
    try {
        const newData = await res.json();
        console.log(newData);
        return newData;
    }catch(error) {
        console.log(error);
    }
};

// call function updateUI
async function updateUI(){
    const res = await fetch(server + '/all');
    try {
        const servData = await res.json();
        document.getElementById('date').innerHTML = newDate + " °C|°F";
        document.getElementById('temp').innerHTML = servData.temp;
        document.getElementById('city').innerHTML = servData.city;
        document.getElementById('content').innerHTML = servData.feelings;
    }catch(error) {
        console.log(error);
    }
};