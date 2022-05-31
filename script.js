let pokemonId = 1;
let currentPokemon;
let x = 20;
let shownPokemon = 0;
let checker = 0;

async function loadXPokemon() {
    for (let i = 0; i < x; i++) {
        await loadPokemon(pokemonId);
        showPokemons(pokemonId);
        pokemonId++;
    }
    shownPokemon = shownPokemon + x;
    showButtons();
}


async function loadPokemon(pokemonId) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log('Loaded Pokemon', currentPokemon);
}


function showPokemons(pokemonId) {
    let currentType = currentPokemon['types'][0]['type']['name'];
    document.getElementById(`mainbox`).innerHTML += ` 
    <div class="SinglePokemonBox" id="pokemon${pokemonId}" onclick="showClickedPokemon(${pokemonId})">
     <div class="pokeHeader"> <p>${currentPokemon['name']}</p> <p>#${currentPokemon['id']}</p></div> 
     <div class="ImageANDClass"> 
     <div class="pokeClass">   ${currentType} </div>
     <div class="pokemonImageHolder" id="pokemonImageHolder${pokemonId}" >
   <div class="pokeImageBox">  <img class="pokemonImage" id="pokemonImage${pokemonId}" src="${currentPokemon['sprites']['front_default']}"></div>
 </div>
     `
    document.getElementById(`pokemon${pokemonId}`).classList.add(`${currentType}`);
}

async function showClickedPokemon(pokemonId) {
    await loadPokemon(pokemonId);
    showBG();
    let currentType = currentPokemon['types'][0]['type']['name'];
    document.getElementById('background').classList.add(`${currentType}`);
    console.log('Loaded Pokemon', currentPokemon);
    document.getElementById('background').innerHTML = "";
    document.getElementById('background').innerHTML += `
    <div class="BigSinglePokemonBox">
        <div class="BigPokeHeader"><div> ${currentPokemon['name']} </div><div> #${currentPokemon['id']}</div></div> 
        <div class="BigPokeClass">   ${currentType} </div>
        <div class="pokemonImageHolderBig" id="pokemonImageHolder${pokemonId}" >
        <img id="front_default" src="${currentPokemon['sprites']['front_default']}" class="placeholder">
        <img id="back_default" src="${currentPokemon['sprites']['back_default']}" class="placeholder">
        <img id="front_shiny" src="${currentPokemon['sprites']['front_shiny']}" class="d-none">
        <img id="back_shiny" src="${currentPokemon['sprites']['back_shiny']}"class="d-none">
       
        </div>
      <div class="shinyButtonBox">  <button class="InfoButtons" onclick="changeToShiny()"> Change ${currentPokemon['name']}'s style!</button> </div>
        <div class="bigButtonsBox">
        <button class="InfoButtons" id="focusedPokemon" onclick="loadAllInfo()"><b> INFOs </b></button>
        <button class="InfoButtons" onclick="loadAllStats()"> <b>STATS</b> </button>
        <button class="InfoButtons" onclick="loadAllAbilities()"> <b>Abilities </b></button>
        </div>
        <div class="secondaryBox" id="secondaryBox"> 
        
    </div>
    <button class="button1 button-fixed" onclick="hideBG()" > Close </button>`
    loadAllInfo();
    focusPokemon();
}
 function focusPokemon() {
    document.getElementById('focusedPokemon').focus();
 }

async function loadAllAbilities() {
    document.getElementById('secondaryBox').innerHTML = "";
    currentType = currentPokemon['types'][0]['type']['name'];

    for (let i = 0; i < currentPokemon['abilities'].length; i++) {
        let abilityURL = currentPokemon['abilities'][i]['ability']['url'];
        let ability = currentPokemon['abilities'][i]['ability']['name'];
        let responseAbility = await fetch(abilityURL);
        let currentAbility = await responseAbility.json();
        console.log(currentAbility);
        document.getElementById('secondaryBox').innerHTML += `
        <div>  ${ability} </div>
        <div> ${currentAbility['effect_entries'][1]['effect']} </div>
        <br>
        `
        /* async function loadPokemon(pokemonId) {
            let url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
            let response = await fetch(url);
            currentPokemon = await response.json();
            console.log('Loaded Pokemon', currentPokemon);
        }*/

    }
}

function loadAllStats() {
    document.getElementById('secondaryBox').innerHTML = `
    <div> ${currentPokemon['stats'][0]['base_stat']} ${currentPokemon['stats'][0]['stat']['name']} </div>
    <div> ${currentPokemon['stats'][1]['base_stat']} ${currentPokemon['stats'][1]['stat']['name']} </div>
    <div> ${currentPokemon['stats'][2]['base_stat']} ${currentPokemon['stats'][2]['stat']['name']} </div>
    <div> ${currentPokemon['stats'][3]['base_stat']} ${currentPokemon['stats'][3]['stat']['name']} </div>
    <div> ${currentPokemon['stats'][4]['base_stat']} ${currentPokemon['stats'][4]['stat']['name']} </div>
    <div> ${currentPokemon['stats'][5]['base_stat']} ${currentPokemon['stats'][5]['stat']['name']} </div>

    `
}
function loadAllInfo() {
    document.getElementById('secondaryBox').innerHTML = `
    <div> Height: ${currentPokemon['height']} </div>
    <div> Weight: ${currentPokemon['weight']} </div>
    `
}

function showBG() {
    document.getElementById('background').classList.remove('d-none');
    document.getElementById('header').classList.add('d-none');
    document.getElementById('mainbox').classList.add('d-none');
    document.getElementById('buttonBox').classList.add('d-none');
}

function hideBG() {
    document.getElementById('background').classList.add('d-none');
    document.getElementById('header').classList.remove('d-none');
    document.getElementById('mainbox').classList.remove('d-none');
    document.getElementById('buttonBox').classList.remove('d-none');
    removeColors();
    checker = 0;
}
function removeColors() {
    document.getElementById('background').classList.remove('grass');
    document.getElementById('background').classList.remove('posion');
    document.getElementById('background').classList.remove('normal');
    document.getElementById('background').classList.remove('water');
    document.getElementById('background').classList.remove('fire');
    document.getElementById('background').classList.remove('bug');
    document.getElementById('background').classList.remove('ground');
    document.getElementById('background').classList.remove('fairy');
    document.getElementById('background').classList.remove('electric');
    document.getElementById('background').classList.remove('fighting');
    document.getElementById('background').classList.remove('dragon');
    document.getElementById('background').classList.remove('ghost');
    document.getElementById('background').classList.remove('psychic');
}

function addXPokemonToListe() {
    if (shownPokemon < 139) {
        loadXPokemon();
    } else {
        alert('Es können keine weiteren 20 Pokemon geladen werden, bitte lasse dir alle 151 Pokemon anzeigen, solange die Funktion noch nicht vollständig funktioniert. Vielen Dank für Ihr Verständnis.')
    }
}

function showAllPokemon() {
    x = 151 - shownPokemon;
    loadXPokemon();
}

function showButtons() {
    document.getElementById('buttonBox').innerHTML = `
    <button onclick="addXPokemonToListe(20)" id="button1" class="button1"> 20 weitere Laden</button>
    <button class="button2" id="button2" onclick="showAllPokemon()"> Die restlichen ${151 - shownPokemon}/151 Pokemon laden</button>
`
    if (shownPokemon > 139) { document.getElementById('button1').classList.add('d-none') };

    if (shownPokemon > 150) { document.getElementById('button2').classList.add('d-none'); }
}

function changeToShiny() {
    
    if (checker < 1) {
        document.getElementById('front_default').classList.add('d-none');
        document.getElementById('back_default').classList.add('d-none');
        document.getElementById('front_shiny').classList.remove('d-none');
        document.getElementById('back_shiny').classList.remove('d-none');
checker = 2;
    } else  {
        document.getElementById('front_default').classList.remove('d-none');
        document.getElementById('back_default').classList.remove('d-none');
        document.getElementById('front_shiny').classList.add('d-none');
        document.getElementById('back_shiny').classList.add('d-none'); 
        checker = 0;
    }
   
}
