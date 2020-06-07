function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )  //.then( (res) => {return res.json()} )  se for apenas um parâmetro com retorno simples pode simplificar
    .then( states => {
        for(const state of states) {
            ufSelect.innerHTML += `<option value = "${state.id}">${state.nome}</option>`
        }
    } )
}
populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSlectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSlectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecionea Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )  //.then( (res) => {return res.json()} )  se for apenas um parâmetro com retorno simples pode simplificar
    .then( cities => {
        for(const city of cities) {
            citySelect.innerHTML += `<option value = "${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    } )
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

    // Itens de Coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    itemLi.classList.toggle("selected") //Adiciona ou Remove uma classe com js
    const itemId = itemLi.dataset.id


    // verificar se existem itens selecionados, se sim
    // pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId
        return itemFound
    })

    // se já estiver selecionado
    if(alreadySelected >= 0) {
        //tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems

        // se não estiver selecionado
    } else {
        //adicionar a seleção
        selectedItems.push(itemId)
    }

    // atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}