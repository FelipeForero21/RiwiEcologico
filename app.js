const valoresAAgregar = [
    {
        aprovechables: 0,
        organicos: 0,
        no_aprovechables: 0,
        piso: 3
    },
    {
        aprovechables: 0,
        organicos: 0,
        no_aprovechables: 0,
        piso: 4
    },
    {
        aprovechables: 0,
        organicos: 0,
        no_aprovechables: 0,
        piso: 5
    },
]

let agregarValor;


// SELECTORES
const pisosDeRiwi = document.querySelector("#select_floor")
const canecas = document.querySelectorAll(".bowl")
const guardarValorCanecas = document.querySelector("#btnSubmit")
const cantidad = document.querySelector("#cantidad")


// Eventos
document.addEventListener("DOMContentLoaded", () => {
    localStorage.setItem("data_floor", JSON.stringify(valoresAAgregar))
    loadingData()
})

pisosDeRiwi.addEventListener("input", loadingData)

guardarValorCanecas.addEventListener("click", actualizarPuntoEcologico)


canecas.forEach(caneca => {
    caneca.addEventListener("click", () => {
        document.querySelector("#btnOpenModal").click();
        agregarValor = caneca.getAttribute("type-bowl")
    })
})

// Funciones
function actualizarPuntoEcologico() {
    let dataFloor = localStorage.getItem("data_floor");
    if (dataFloor) {
        dataFloor = JSON.parse(dataFloor);

        dataFloor.forEach(element => {
            if (element.piso == pisosDeRiwi.value) {
                element[agregarValor] += parseInt(cantidad.value)
            }
        });

        console.log(dataFloor)

        localStorage.setItem("data_floor", JSON.stringify(dataFloor))

        loadingData()
    }
}


function loadingData() {
    let dataFloor = localStorage.getItem("data_floor");

    if (dataFloor) {
        dataFloor = JSON.parse(dataFloor);
        showNumbersBowls(dataFloor)
    }
}


function showNumbersBowls(dataFloor) {

    dataFloor.forEach(element => {

        if (element.piso == pisosDeRiwi.value) {

            const aprovechable = document.querySelector("#aprovechables .body_top span")
            aprovechable.textContent = `${element.aprovechables}/500`

            const organicos = document.querySelector("#organicos .body_top span")
            organicos.textContent = `${element.organicos}/500`

            const no_aprovechables = document.querySelector("#no_aprovechables  .body_top span")
            no_aprovechables.textContent = `${element.no_aprovechables}/500`

            let punto_ecologico = element.aprovechables + element.organicos + element.no_aprovechables
            punto_ecologico = ((punto_ecologico * 100) / 1500)

            if (punto_ecologico < 25) {
                document.body.style.backgroundImage = 'url("https://www.color-hex.com/palettes/18251.png")'
                document.body.style.backgroundRepeat = 'no-repeat'
                document.body.style.backgroundSize = '100%'
                
            }
            if (punto_ecologico >= 25 && punto_ecologico <= 50) {
                document.body.style.backgroundImage = 'url("https://www.color-hex.com/palettes/81920.png")'
                document.body.style.backgroundRepeat = 'no-repeat'
                document.body.style.backgroundSize = '100%'

            }

            if (punto_ecologico > 50) {
                document.body.style.background = "green"
                document.body.style.backgroundImage = 'url("https://www.color-hex.com/palettes/101606.png")'
                document.body.style.backgroundRepeat = 'no-repeat'
                document.body.style.backgroundSize = '100%'

            }
        }
    });
}