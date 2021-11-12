
const formulario = document.getElementById("formulario");
const textoNuevaEntrada = document.getElementById("textoNuevaEntrada");
const btnAgregar = document.getElementById("btnAgregar");

const pokemonBox = document.getElementById("pokemonBox");
pokemonBox.className = "pokeBox";

formulario.addEventListener("submit", () => {
    event.preventDefault();
    buscarPokemon();    
});


const buscarPokemon = () => {

    if(textoNuevaEntrada.value.trim() == "") {
        alert("El campo esta vacío");
    } else {
        pokemonBox.innerHTML ="";

        let pokemon = textoNuevaEntrada.value.trim();
        
        console.log("Iniciando...");
        const response = axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        
        response.then((response) => {
            
            let name = response.data.name;
            let imageURL = response.data.sprites.other["official-artwork"].front_default;

            let image = document.createElement("img");
            image.className = "img"
            image.src = imageURL;
            pokemonBox.appendChild(image);

            let nombre = document.createElement("p");
            nombre.className = "name";
            nombre.innerText = name;
            pokemonBox.appendChild(nombre);

            const habilidades = document.createElement("div");
            habilidades.className = "ab";
            pokemonBox.appendChild(habilidades);

            let hp = response.data.stats[0].base_stat;
            let vida = document.createElement("p");
            vida.className = "vida";
            vida.innerText = hp;
            habilidades.appendChild(vida);

            let atack = response.data.stats[1].base_stat;
            let ataque = document.createElement("p");
            ataque.className = "ataque";
            ataque.innerText = atack;
            habilidades.appendChild(ataque);

            let defense = response.data.stats[2].base_stat;
            let defensa = document.createElement("p");
            defensa.className = "defensa";
            defensa.innerText = defense;
            habilidades.appendChild(defensa);

            console.log("Termino correctamente");
        }).catch((error) => {
            let mensaje = document.createElement("p");
            mensaje.innerText = "No existe ese pokemon";
            mensaje.className = "error";
            pokemonBox.appendChild(mensaje);
            console.log(error);
            console.log("Termino con errores");
        }).then(() => { 
            // Este then va a realizarse si paso o no paso la peticion, nosotros podremos ejecutar un codigo al terminar el then o el catch
            console.log("Finalizo");
        });
        console.log("Seguramente no ha acabado");    

        textoNuevaEntrada.value = "";

    }


}

