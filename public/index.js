const result = document.querySelector('.result')
const result1 = document.querySelector('.result1')
const fetchPeople = async () => {
    try {
        const { data } = await axios.get('/api/locations')
        const places = data.data.map((place) => {

            return `<p>${place.location}</p>`
        })
        result.innerHTML = places.join('')

    } catch (error) {
        result.innerHTML = `<div class=""><i>none</i></div>`
    }
}

fetchPeople()

// submit form
const btn = document.querySelector('.submit-btn')
const input = document.querySelector('.form-input')
const formAlert = document.querySelector('.form-alert')
btn.addEventListener('click', async (e) => {
    e.preventDefault()

    const l = input.value
    try {
        const { data } = await axios.post('/api/Location', { location: l })
        let location, weather, minTemp, maxTemp, errormsg;
        let h1 = document.createElement('h5');
        let h2 = document.createElement('h5');
        let h3 = document.createElement('h5');
        let h4 = document.createElement('h5');
        let h5 = document.createElement('h5');
        
        if (data.success) {
            location = data.data.location;
            weather = data.data.weather;
            minTemp = data.data.minTemp;
            maxTemp = data.data.maxTemp;
            
            h1.textContent = "Location: "+location
            result1.replaceChildren(h1)
            
            h2.textContent = "Weather: "+weather
            result1.appendChild(h2)
            
            h3.textContent = "Min Temp: "+minTemp
            result1.appendChild(h3)
            
            h4.textContent = "Max Temp: "+maxTemp
            result1.appendChild(h4)
        }
        else {
            errormsg = data.msg;
           
            h5.textContent = errormsg;
            result1.replaceChildren(h5)
        }

        // console.log(data);
        // const h5 = document.createElement('h5')
        // h5.textContent = data.person
        // result.appendChild(h5)
    } catch (error) {
        console.log(error.response)
        formAlert.textContent = error.response.data.msg
    }
    input.value = ''
})

