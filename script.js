//document. "ACESSANDO A DOM"
const modal = {
  //Funçao que vai até a classe modal e adiciona outra classe chamada active
  // *** IMPLEMENTAR A FUNCAO TOOGLE (DESAFIO)
  open() {
    document.querySelector('.modal-overlay').classList.add('active')
  },
  close() {
    document.querySelector('.modal-overlay').classList.remove('active')
  }
}

const transaction = [
  { id: 1, description: 'Luz', amount: 45000, date: '11/02/22' },
  { id: 2, description: 'Luz', amount: 95000, date: '11/02/22' },
  { id: 3, description: 'Luz', amount: -4000, date: '11/02/22' }
]

//var para calcular entradas/saidas/total de transaçoesv
const transactionMovimentation = {
  //agrupando a var transactions
  all: transaction,

  // Adicionando novas transacoes
  add(transaction) {
    transactionMovimentation.all.push(transaction)

    app.reload()
  },

  // funcao de somar as entradas
  incomes() {
    let income = 0
    // fazendo um verificaçao da transacao, utilizando um arrow function
    transactionMovimentation.all.forEach(transaction => {
      if (transaction.amount > 0) {
        income += transaction.amount
      }
    })
    return income
  },
  // somar as saidas
  expenses() {
    let expense = 0
    // fazendo um verificaçao da transacao, utilizando um arrow function
    transactionMovimentation.all.forEach(transaction => {
      if (transaction.amount < 0) {
        expense += transaction.amount
      }
    })
    return expense
  },

  // entradas - saidas
  total() {
    return (
      transactionMovimentation.incomes() + transactionMovimentation.expenses()
    )
  }
}

//var para armazenar todas as transações realizadas
const dom = {
  // Pegando o elemento do HTML
  transactionContainer: document.querySelector('#data-table tbody'),

  //criando elemento para html via script
  addTransaction(transaction, index) {
    //criando um tr
    const tr = document.createElement('tr')
    //adicionando elementos ao tr
    tr.innerHTML = dom.innerHtmlTransaction(transaction)
    // preenchendo o html
    dom.transactionContainer.appendChild(tr)
  },

  // preenchendo com elementos
  innerHtmlTransaction(transaction) {
    //verificando se o valor é positivo ou negativo (caso seja positivo ele vai mudar a classe)
    const CSSclass = transaction.amount > 0 ? 'income' : 'expense'

    const amount = utils.formatCurrency(transaction.amount)

    const html = `<tr>
    <td class="description">${transaction.description}</td>
    <td class=${CSSclass}>${amount}</td>
    <td class="date">${transaction.date}</td>
    <td><img src="assets/minus.svg" alt="remover transação"></td>
  </tr>`

    return html
  },

  //mudando os valores de entradas|saidas|total
  updateBalance() {
    document.getElementById('incomeDisplay').innerHTML = utils.formatCurrency(
      transactionMovimentation.incomes()
    )
    document.getElementById('expenseDisplay').innerHTML = utils.formatCurrency(
      transactionMovimentation.expenses()
    )
    document.getElementById('totalDisplay').innerHTML = utils.formatCurrency(
      transactionMovimentation.total()
    )
  },

  //metodo para limpar todos os elementos da tabela
  clearTransaction () {
    dom.transactionContainer.innerHTML = ""
  }
}

// trecho de conversão e formatação de moedas
const utils = {
  formatCurrency(value) {
    // convertando o valor de entrada em um numero, e validando
    const signal = Number(value) < 0 ? '-' : ''

    // Pegando o valor em string, fazendo um replace para pegar todas as strings e apaga-las
    value = String(value).replace(/\D/g, '')

    // trecho para deixar o numero com as casas decimais corretas
    value = Number(value) / 100

    //transformando para moeda
    value = value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
    return signal + value
  }
}

const app = {
  init() {
    // foreach "PARA CADA" transação, sera adicionada um nova
    transactionMovimentation.all.forEach(transaction => {
      dom.addTransaction(transaction)
    })

    dom.updateBalance()
  },

  reload() {
    dom.clearTransaction()
    app.init()
  }
}

// PARTE QUE COMEÇA A EXECUTAR O CÓDIGO
app.init()

transactionMovimentation.add({
  id: 5,
  description: 'Sla',
  amount: 942,
  date: '12//02/2022'
})
