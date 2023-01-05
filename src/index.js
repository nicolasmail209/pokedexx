let datos;
let datosPokemonSeleccionado;

function mostrarTotalPokemones(totalPokemones){
    $totalPokemones = document.querySelector("#totalPokemones");
    $totalPokemones.innerText = `Hay ${totalPokemones} en la Pokedex`;
}


function mostrarHabilidades(datosPokemonSeleccionado){
    let habilidades = [];// = datosPokemonSeleccionado.abilities[0].ability.name;
    datosPokemonSeleccionado.abilities.forEach(element => {
        habilidades.push(element.ability.name);
    })
    //console.log(habilidades);
    return habilidades;
}

function mostrarExperiencia(datosPokemonSeleccionado){
    let experiencia = datosPokemonSeleccionado.base_experience;
    return experiencia;
}

function mostrarFoto(datosPokemonSeleccionado){
    let foto = datosPokemonSeleccionado.sprites.front_default;
    return foto;
}

function mostrarDatosPokemonSeleccionado(datosPokemonSeleccionado){
    //$detallePokemon = document.querySelector("#detallePokemon");
    //$detallePokemon.innerHTML = "";
    $habilidades = document.querySelector("#habilidades");
    $habilidades.innerHTML = "";
    $experiencia = document.querySelector("#experiencia");
    $experiencia.innerHTML = "";
    $foto = document.querySelector("#foto");
    let habilidades = mostrarHabilidades(datosPokemonSeleccionado);
    let experiencia = mostrarExperiencia(datosPokemonSeleccionado);
    let foto = mostrarFoto(datosPokemonSeleccionado);
    //let div = document.createElement("div");
    //div.innerText = habilidades + experiencia + foto;

    let $li1 = document.createElement("li");
    $li1.innerText = "Habilidades";
    $habilidades.appendChild($li1);
    habilidades.forEach(element =>{
        let li = document.createElement("li");
        li.innerText = element;
        $habilidades.appendChild(li);
    })

    let $li2 = document.createElement("li");
    $li2.innerText = "Experiencia";
    $experiencia.appendChild($li2);
    let $li3 = document.createElement("li");
    $li3.innerText = experiencia
    $experiencia.appendChild($li3);

    $foto.src = foto;
}

function traerDatosPokemonSeleccionado(url){
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      datosPokemonSeleccionado = data;
      mostrarDatosPokemonSeleccionado(datosPokemonSeleccionado);
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
    traerDatosPokemonSeleccionado(url);
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



