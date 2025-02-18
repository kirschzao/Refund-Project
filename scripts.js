const amount = document.getElementById("amount")


//metodo que capta o evento de input
amount.oninput = () =>{
  let value = amount.value.replace(/\D/g , "")// o que não for numero, ele troca com o metodo replace para vazio

  //transforma o valor em centavos para aplicar a formatação do value 
  value = Number(value) / 100
                                          
  amount.value = formatCurrencyBRL(value) //faz com que o caracter do input seja trocado pelo value que só tem numeros e no foramato BRL                     
}

function formatCurrencyBRL(value){
  //formata o valor no padrão de real brasileiro
  value = value.toLocaleString("pt-BR",{
    style: "currency",
    currency:"BRL", 
  })
  //retorna o valor solicitado
  return value;
}