/* Forma para deixar o 'details.html' dinamico peguei a url e dei split pegando o número que passei no 'main.js' dentro da função 'loadPokemonItens' primeira linha*/
const url_atual = window.location.href
const id = url_atual.split('?')
const apiPokemon = `https://pokeapi.co/api/v2/pokemon/${id[1]}`

/* Instanciando os locais onde foram adicionadas as informações das funções*/
const listDetailPokemon = document.getElementById('detailPokemon')
const listDescriptPokemon = document.getElementById('listDescriptPokemon')
const navigateButtons = document.getElementById('navigateButtons')

/* Instanciando os botões */
const btnAbout = document.getElementById('button_About')
const button_Stats = document.getElementById('button_Stats')
const aboutToClass = document.getElementById('about')
const StatsToClass = document.getElementById('stats')


/* FUNÇÃO PARA ADICIONAR OS PRINCIPAIS DETALHES */

function detailPokemon (pokemon) {    
    return `
        <div class="pokemon ${pokemon.type}">
            <span class="name" id="name_detail">${pokemon.name}</span>
            <span class="number">${pokemon.number}</span>
            <div class="detail">
                <ol class="types_detail">
                    ${(pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join(''))}    
                    
                </ol>
            </div>
            <img src="${pokemon.photo}" alt="${pokemon.name}" class="pokemon_img">
        </div>
    `
};

/* FUNÇÃO PARA ADICIONAR AS DESCRIÇÕES ABOUT */

function descriptPokemonAbout (pokemon) {
    return `
            <div class="about_descript" name="descript">
                <span class="descript">Height</span>
                <span class="result">${pokemon.height}</span>
            </div>
            <div class="about_descript" name="descript">
                <span class="descript">Weight</span>
                <span class="result">${pokemon.weight}</span>
            </div>
            <div class="about_descript" name="descript">
                <span class="descript">Ability</span>
                <span class="result">${pokemon.ability}</span>
            </div>
            <div class="about_descript" name="descript">
                <span class="descript">Moves</span>
                <span class="result">${pokemon.move}</span>
            </div>
    `
};

/* FUNÇÃO PARA ADICIONAR AS DESCRIÇÕES STATS */

function descriptPokemonStats (pokemon) {
    return `
        <div class="stat_descript" name="descript">
            <span class="descript">HP</span>
            <div class="descript">
                <div class="barra">
                    <div style="width:${pokemon.stat[0]-10}%"></div>
                </div>
            </div>
        </div>
        <div class="stat_descript" name="descript">
            <span class="descript">Attack</span>
            <div class="descript">
                <div class="barra">
                    <div style="width:${pokemon.stat[1]-10}%"></div>
                </div>
            </div>
        </div>
        <div class="stat_descript" name="descript">
            <span class="descript">Defense</span>
            <div class="descript">
                <div class="barra">
                    <div style="width:${pokemon.stat[2]-10}%"></div>
                </div>
            </div>
        </div>
        <div class="stat_descript" name="descript">
            <span class="descript">Special Attack</span>
            <div class="descript">
                <div class="barra">
                    <div style="width:${pokemon.stat[3]-10}%"></div>
                </div>
            </div>
        </div>
        <div class="stat_descript" name="descript">
            <span class="descript">Special Defense</span>
            <div class="descript">
                <div class="barra">
                    <div style="width:${pokemon.stat[4]-10}%"></div>
                </div>
            </div>
        </div>
        <div class="stat_descript" name="descript">
            <span class="descript">Speed</span>
            <div class="descript">
                <div class="barra">
                    <div style="width:${pokemon.stat[5]-10}%"></div>
                </div>
            </div>
        </div>
    `
};

/* FUNÇÃO PARA ADICIONAR OS BOTÕES INFERIORES (NECESSÁRIO PARA HREF DINAMICA) */

function navigateButtonsBottom (pokemon) {
    let number = 0

    if(pokemon.number === 1){number = 1}else{number = pokemon.number - 1}
    
    return `
    <div class="action_button_down">
        <div id="previu_arrow">
            <a href="./details?${number}"><span><</span></a>
        </div>
        <div id="next_arrow">
            <a href="./details?${pokemon.number + 1}"><span>></span></a>
        </div>
    </div>
    `
};

/* FUNÇÃO PARA CRIAR NOVO POKEMON */

function convertPokeApiDetailT (detailPoke) {
    const pokemon = new Pokemon()
    const types = detailPoke.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    const abilities = detailPoke.abilities.map((abilitiesMap) => abilitiesMap.ability.name)
    const moves = detailPoke.moves.map((movesMap) => movesMap.move.name)
    const [move1,move2,move3] = moves
    const base_stat = detailPoke.stats.map((statsmap) => statsmap.base_stat)
    
    pokemon.number = detailPoke.id
    pokemon.name = detailPoke.name   
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = detailPoke.sprites.other.dream_world.front_default
    pokemon.height = detailPoke.height
    pokemon.weight = detailPoke.weight
    pokemon.ability = abilities
    pokemon.move = [move1,move2,move3]
    pokemon.stat = base_stat

    return pokemon
}

fetch(apiPokemon)
        .then((resp) => resp.json())
        .then(convertPokeApiDetailT)
        .then((result) => {
            listDetailPokemon.innerHTML = detailPokemon(result)
            aboutToClass.innerHTML = descriptPokemonAbout(result)
            StatsToClass.innerHTML = descriptPokemonStats(result)
            navigateButtons.innerHTML = navigateButtonsBottom(result)
        }) 


/*BOTÕES*/

document.getElementById('button_About').addEventListener('click',() =>{
    
    aboutToClass.style.display = "block"
    StatsToClass.style.display = "none"
})

document.getElementById('button_Stats').addEventListener('click',() =>{
    
    aboutToClass.style.display = "none"
    StatsToClass.style.display = "block"
})