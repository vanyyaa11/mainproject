window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";
            let api = `${proxy}https://api.darksky.net/forecast/fced929ddd4a16a922dc407e7b128c59/${lat},${long}`;
        
            fetch(api)
              .then(response => {
                return response.json(); 
               })
                .then(data => {
                    const {temperature, summary, icon} = data.currently;
                    //
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                     // formula for celsius
                let celsius = (temperature - 32)*(5/9);
                setIcons(icon, document.querySelector(".icon"));
                     
                     // celsius to farenheit
                temperatureSection.addEventListener("click", () => {
                    if (temperatureSpan.textContent === 'F') {
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                         } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                         }
                     })
                });
            });
    }
    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        let currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});




