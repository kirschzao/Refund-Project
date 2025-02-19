//seleciona os elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")
const expenseList = document.querySelector("ul")
const expensesQuantity = document.querySelector("aside header p span")
const expensesTotal = document.querySelector("aside header h2")


//metodo que capta o evento de input
amount.oninput = () =>{
  let value = amount.value.replace(/\D/g , "")// o que não for numero, ele troca com o metodo replace para vazio

  //transforma o valor em centavos para aplicar a formatação do value 
  value = Number(value) / 100
                                          
  amount.value = formatCurrencyBRL(value) //faz com que o caracter do input seja trocado pelo value que só tem numeros e no foramato BRL                     
}

//formata no valor de cobrança brasileiro
function formatCurrencyBRL(value){
  //formata o valor no padrão de real brasileiro
  value = value.toLocaleString("pt-BR",{
    style: "currency",
    currency:"BRL", 
  })
  //retorna o valor solicitado
  return value;
}

//capturao evento de submit do forms para obter valores 
form.onsubmit = (event) => {
  //previne o comportamento padrão de recarregar a página
  event.preventDefault()

  //Cria um objeto com os detalhes na nova despesa
  const newExpense = {
    id: new Date().getTime,
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  }

  //chama a função que adiciona na lista de gastos
  expenseAdd(newExpense)
  updateTotals()
  expense.value = ""
  amount.value = ""
  category.value = null
}

//Cria o elemento para adicionar na lista
function expenseAdd(newExpense){
  try{
  const expenseItem = document.createElement("li") //cria o item 
  expenseItem.classList.add("expense") // add a classe expense

  //cria o icone da categoria
  const expenseIcon = document.createElement("img")
  expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
  expenseIcon.setAttribute("alt", `Figura de item`)
  
  //cria a info/div da despesa
  const expenseInfo = document.createElement("div")
  expenseInfo.classList.add("expense-info")

  //cria o nome das despesas
  const expenseName = document.createElement("strong")
  expenseName.textContent = newExpense.expense

  //cria a categoria das despesas
  const categoryName = document.createElement("span")
  categoryName.textContent = newExpense.category_name

  //cria o valor da despesa
  const expenseAmount = document.createElement("small")
  expenseAmount.classList.add("expense-amount")
  expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

  //cria o ícone de remover
  const removeIcon = document.createElement("img")
  removeIcon.classList.add("remove-icon")
  removeIcon.setAttribute("src","img/remove.svg")
  removeIcon.setAttribute("alt","remover item")
  


  //adiciona as informações no item
  expenseInfo.append(expenseName , categoryName)
  expenseItem.append(expenseIcon , expenseInfo, expenseAmount, removeIcon)
  expenseList.append(expenseItem)

  }catch(error){
    alert("Não foi possivel atualizar a lista de despesas!")
    console.log(error)
  }
}

//atualiza os totais
function updateTotals(){
  try{
    const items = expenseList.children
    expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}` 
    let total = 0

    for(let item = 0; item < items.length; item++){
      //pega o valor de cada
      const itemAmount = items[item].querySelector(".expense-amount")

      let value = parseFloat(itemAmount.textContent.replace(/[^\d,]/g , "").replace(",","."))

      if(isNaN(value)){
        return alert("Não foi possível exibir o total. O Valor não parece ser um número!")
      }
      total += value
    }

    const symbolBRL = document.createElement("small")
    symbolBRL.textContent = "R$"
    total = formatCurrencyBRL(total).toUpperCase().replace("R$","")
    expensesTotal.innerHTML= ""
    expensesTotal.append(symbolBRL, total)
  }catch(error){
    alert("Não foi possivel atualizar a lista de despesas!")
    console.log(error)
  }

}

//captura o evento de clique dos itens da lista
expenseList.addEventListener("click", function(event) {
  
  if(event.target.classList.contains("remove-icon")){  //ve se clicou no "X"qu tem a classe classlist 
    const item = event.target.closest(".expense")      //pega o elemento pai do item clicado
    item.remove()
    
  }
  updateTotals()
})

