let datos;
let pokemon;

function mostrarTotalPokemones(totalPokemones){
    $totalPokemones = document.querySelector("#totalPokemones");
    $totalPokemones.innerText = `Hay ${totalPokemones} en la Pokedex`;
}


function traerHabilidades(pokemon){
    let habilidades = [];// = pokemon.abilities[0].ability.name;
    pokemon.abilities.forEach(element => {
        habilidades.push(element.ability.name);
    })
    //console.log(habilidades);
    return habilidades;
}

function traerExperiencia(pokemon){
    let experiencia = pokemon.base_experience;
    return experiencia;
}

function traerFoto(pokemon){
    let foto = pokemon.sprites.front_default;
    return foto;
}

function mostrarHabilidades(pokemon){
    $habilidades = document.querySelector("#habilidades");
    $habilidades.innerHTML = "";
    let habilidades = traerHabilidades(pokemon);
    let $li = document.createElement("li");
    $li.innerText = "Habilidades";
    $habilidades.appendChild($li);
    habilidades.forEach(element =>{
        let li = document.createElement("li");
        li.innerText = element;
        $habilidades.appendChild(li);
    })
}

function mostrarExperiencia(pokemon){
    $experiencia = document.querySelector("#experiencia");
    $experiencia.innerHTML = "";
    let experiencia = traerExperiencia(pokemon);
    let $tituloExperiencia = document.createElement("li");
    $tituloExperiencia.innerText = "Experiencia";
    $experiencia.appendChild($tituloExperiencia);
    let $valorExperiencia = document.createElement("li");
    $valorExperiencia.innerText = experiencia
    $experiencia.appendChild($valorExperiencia);
}

function mostrarFoto(pokemon){
    $foto = document.querySelector("#foto");
    let foto = traerFoto(pokemon);
    $foto.src = foto;
}

function mostrarDatosPokemonSeleccionado(pokemon){
    //$detallePokemon = document.querySelector("#detallePokemon");
    //$detallePokemon.innerHTML = "";
    mostrarHabilidades(pokemon);
    mostrarExperiencia(pokemon);
    mostrarFoto(pokemon);
    
    
    
    
    
    //let div = document.createElement("div");
    //div.innerText = habilidades + experiencia + foto;

    

    

    
}

function traerPokemon(url){
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      pokemon = data;
      mostrarDatosPokemonSeleccionado(pokemon);
    });
}

function mostrarDetallePokemon(e){
    //$detallePokemon = document.querySelector("#detallePokemon");
    let url;
    datos.results.forEach(element =>{
        if(element.name === e.srcElement.innerText){
            url = element.url;
        }
    })
    traerPokemon(url);
    //$detallePokemon.innerText = url;
    //console.log(e.srcElement.innerText)
}

function mostrarListadoPokemones(listadoPokemones){
    $listadoPokemones = document.querySelector("#listadoPokemones");
    listadoPokemones.forEach(element => {
        let div = document.createElement("div");
        div.onclick = mostrarDetallePokemon;
        div.innerText = element.name;
        $listadoPokemones.appendChild(div);
    });
    //$listadoPokemones.innerText = listadoPokemones[0].name;
}

function cambiarPagina(e){
    //console.log(e.srcElement.innerText);
    if(e.srcElement.innerText === "Pagina siguiente" && datos.next != null){
        $listadoPokemones = document.querySelector("#listadoPokemones");
        $habilidades = document.querySelector("#habilidades");
        $experiencia = document.querySelector("#experiencia");
        $foto = document.querySelector("#foto");
        $listadoPokemones.innerHTML = "";
        $habilidades.innerHTML = "";
        $experiencia.innerHTML = "";
        $foto.src = "";
        iniciar(datos.next);
    }
    if(e.srcElement.innerText === "Pagina anterior" && datos.previous!= null){
        $listadoPokemones = document.querySelector("#listadoPokemones");
        $habilidades = document.querySelector("#habilidades");
        $experiencia = document.querySelector("#experiencia");
        $foto = document.querySelector("#foto");
        $listadoPokemones.innerHTML = "";
        $habilidades.innerHTML = "";
        $experiencia.innerHTML = "";
        $foto.src = "";
        iniciar(datos.previous);
    }
}

function cargarAnteriorYSiguiente(){
    $paginaAnterior = document.querySelector("#paginaAnterior");
    $paginaAnterior.onclick = cambiarPagina;
    $paginaSiguiente = document.querySelector("#paginaSiguiente");
    $paginaSiguiente.onclick = cambiarPagina;

}

function iniciar(direccion = "https://pokeapi.co/api/v2/pokemon/") {
  fetch(direccion)
    .then((response) => response.json())
    .then((data) => {
      datos = data;
      //console.log(datos);
      mostrarTotalPokemones(datos.count);
      mostrarListadoPokemones(datos.results);
      cargarAnteriorYSiguiente();
    });

}

iniciar();



