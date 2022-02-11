//document. "ACESSANDO A DOM"
const modal = {
  //Funçao que vai até a classe modal e adiciona outra classe chamada active
  // *** IMPLEMENTAR A FUNCAO TOOGLE (DESAFIO)
  open(){
document.querySelector(".modal-overlay").classList.add("active")  
}, 
  close(){
    document.querySelector(".modal-overlay").classList.remove("active") 
  }
}

//var para calcular entradas/saidas/total de transaçoesv  
const transaction_movimentation = {
  // funcao de somar as entradas
  incomes () {

  },
  // somar as saidas
  expenses ()  {

  },
  // entradas - saidas
  total () {

  }
}

//var para armazenar todas as transações realizadas
const transaction = [{
  id: 1,
  description: 'Luz',
  amount: - 45000,
  date: '11/02/22'
}]

// Substituindo os valores do HTML 
const dom = {
  // Pegando o elemento do HTML
  transactionContainer: document.querySelector('#data-table tbody'),

  //criando elemento para html via script
  addTransaction(transaction, index){
    //criando um tr 
    const tr = document.createElement('tr')
    //adicionando elementos ao tr
    tr.innerHTML = dom.innerHtmlTransaction(transaction)
    // preenchendo o html
    dom.transactionContainer.appendChild(tr)
  },

  innerHtmlTransaction(transaction) {
    //verificando se o valor é positivo ou negativo (caso seja positivo ele vai mudar a classe)
    const CSSclass = transaction.amount > 0 ? "income" : "expense"

    const amount = utils.formatCurrency(transaction.amount)

    const html = `<tr>
    <td class="description">${transaction.description}</td>
    <td class=${CSSclass}>${amount}</td>
    <td class="date">${transaction.date}</td>
    <td><img src="assets/minus.svg" alt="remover transação"></td>
  </tr>`

  return html
  }
}

const utils = {
  formatCurrency(value){
    // convertando o valor de entrada em um numero, e validando
    const signal = Number(value) < 0 ? "-": ""

    // Pegando o valor em string, fazendo um replace para pegar todas as strings e apaga-las
    value = String(value).replace(/\D/g, "")

    // trecho para deixar o numero com as casas decimais corretas 
    value = Number(value) / 100

    //transformando para moeda
    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })
    return signal + value
  }
}

// foreach "PARA CADA" transação, sera adicionada um nova
transaction.forEach(function(transaction){
  dom.addTransaction(transaction)
})