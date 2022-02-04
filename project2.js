
// WHERES THAT POKEMON, CHOOSE A POKEMON AND WE CAN LIST THE LOCATIONS TO CAPTURE IT 
const app = {};
//use the jquery append functions from lighthouse to create a log and log those locations on the page 
        
        

// use encounters object from getLocation and display in HTML element
app.displayLocation = function(areas) {
    console.log(areas);
    $(`.pokemongroup`).hide();
    $(`.locations`).show();
    // empty locations div everytime a pokemon is searched
    $(`.locations`).empty();
    // take each encounter and log individually as a list item
    areas.forEach(function(locObj) {
        console.log(locObj.location_area.name)
        const locationProper = locObj.location_area.name.replace(/[^a-zA-Z 0-9 ]/g, " ");
        const locationHtml = `
        <li>Pokemon Game Version: ${locObj.version_details[0].version.name}<br>${locationProper}  </li><br>
    `;
    //append li elements to existing ul in locations class
    $(`.locations`).append(locationHtml);
    $(`.congrats`).show();
    })
}
// use pokemon id as a variable within the api url in another ajax call, locations and pokemon are in different objects so had to use a second AJAX call
app.getLocation = function(id) {
    console.log(id);
    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${id}/encounters?limit=50`,
        method: `GET`,
        dataType: `json`,
    }).then(function(location) {
        console.log(location);
        if (location.length === 0) {
            $(`.locations`).empty();
            
            console.log("nothing");
            const nothHtml = `No locations found! This pokemon not found in the wild!`;
            $(`.locations`).append(nothHtml);
            
        } else {
        //use encounters object in displayLocation function
        app.displayLocation(location);
    }
    }); 
}

// using pokemon from getPokemon we display attributes from API in html element
app.displayPokemon = function(info) {
    // empty results div everytime a pokemon is searched
    $(`.results`).empty();
    console.log(`pokemon attributes`, info);
    const pokeHtml = `
        <div class="poke-box">
            <p class="info-text">
            Name: ${info.name} <br>
            Type 1: (${info.types[0].type.name})
            <br>
            <img class="sprite" src="${info.sprites.front_default}" alt="${info.name}">
            <br>
            Base Experience: ${info.base_experience}
            <br>
           
            
            Base HP: ${info.stats[0].base_stat}
            Base ATK: ${info.stats[1].base_stat}
            Base DEF: ${info.stats[2].base_stat}<br>
            Base SP-ATK: ${info.stats[3].base_stat}
            Base SP-DEF: ${info.stats[4].base_stat}
            BASE SPD: ${info.stats[5].base_stat}<br>
            </p>
        </div>
    `;
    //put pokemon attributes in results div
    $(`.results`).append(pokeHtml);
}
// access api with ajax to match search input to pokemon
app.getPokemon = function(searchName) {
    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${searchName}`,
        method: `GET`,
        dataType: `json`,
    }).then(function(res) {
        console.log(res);
        // take pokemon name in display pokemon
        app.displayPokemon(res);
        // take pokemon id to use in location function
        app.getLocation(res.id);
    });
};
 

   
// Init function
app.init = function() {
    //console.log when app is ready
    console.log("it's ready!");
    $(`.locations`).hide();
    $(`.congrats`).hide();
    //on search submit, search value will be used in getPokemon function
    $(`form`).on(`submit`, function(event) {
        event.preventDefault();
        $(`.congrats`).hide();
        // take search input and take value
        const selection = $(`#search-input`).val();
        console.log(selection);
        app.getPokemon(selection);
    })
};

$(document).ready(() => {
    app.init();
    });