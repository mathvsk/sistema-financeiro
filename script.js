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

// salvando as informaçoes\transacoes no localestorage do navegador
const storage = {
  get() {
    //transformando um STRING em uma ARRAY
    return JSON.parse(localStorage.getItem("dados")) || []
  },

  set(transactions){
    // Transformando em uma uma STRING uma ARRAY
    localStorage.setItem("dados:", JSON.stringify(transactions))
  }
}

//var para calcular entradas/saidas/total de transaçoesv
const transactionMovimentation = {
  //agrupando a var transactions
  all: storage.get(),
  // Adicionando novas transacoes
  add(transaction) {
    transactionMovimentation.all.push(transaction)

    app.reload()
  },

  //removendo a transação
  remove(index) {
    transactionMovimentation.all.splice(index, 1)

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
    tr.innerHTML = dom.innerHtmlTransaction(transaction, index)
    tr.dataset.index = index
    // preenchendo o html
    dom.transactionContainer.appendChild(tr)
  },

  // preenchendo com elementos
  innerHtmlTransaction(transaction, index) {
    //verificando se o valor é positivo ou negativo (caso seja positivo ele vai mudar a classe)
    const CSSclass = transaction.amount > 0 ? 'income' : 'expense'

    const amount = utils.formatCurrency(transaction.amount)

    const html = `<tr>
    <td class="description">${transaction.description}</td>
    <td class=${CSSclass}>${amount}</td>
    <td class="date">${transaction.date}</td>
    <td><img onclick="transactionMovimentation.remove(${index})" src="assets/minus.svg" alt="remover transação"></td>
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
  clearTransaction() {
    dom.transactionContainer.innerHTML = ''
  }
}

// trecho de conversão e formatação de moedas
const utils = {
  formatAmount(value) {
    value = Number(value) * 100

    return value
  },

  formatDate(date) {
    //formatando a data para a versao que utilizamos no BR
    const splittedDate = date.split('-')

    return `${splittedDate[2]}/ ${splittedDate[1]}/ ${splittedDate[0]}`
  },

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

const form = {
  // pegando os elementos do html
  description: document.querySelector('input#description'),
  amount: document.querySelector('input#amount'),
  date: document.querySelector('input#date'),

  getValues() {
    return {
      description: form.description.value,
      amount: form.amount.value,
      date: form.date.value
    }
  },

  // validando os dados do formulario
  validadeFields() {
    // pegando os elementos da array form
    const { description, amount, date } = form.getValues()

    // verificando se o valor é vazio
    if (
      description.trim() === '' ||
      amount.trim() === '' ||
      date.trim() === ''
    ) {
      /// retornando um erro caso um dos campos esteja vazio
      throw new Error('Preencha todos os campos.')
    }
  },

  // formatando os valores do formulario
  formatValues() {
    let { description, amount, date } = form.getValues()

    amount = utils.formatAmount(amount)

    date = utils.formatDate(date)

    return { description, amount, date }
  },

  // salvando
  saveTransaction(transaction) {
    transactionMovimentation.add(transaction)
  },

  // limpando os dados
  clearFields() {
    form.description.value = ''
    form.amount.value = ''
    form.date.value = ''
  },
  //

  submit(event) {
    // trecho para tirar o comportamento padrao do form
    event.preventDefault()

    // capturando e tratando o erro
    try {
      form.validadeFields()
      const transaction = form.formatValues()
      form.saveTransaction(transaction)
      form.clearFields()
      modal.close()
    } catch (error) {
      alert(error.message)
    }
  }
}

const app = {
  init() {
    // foreach "PARA CADA" transação, sera adicionada um nova
    transactionMovimentation.all.forEach((transaction, index) => {
      dom.addTransaction(transaction, index)
    })

    dom.updateBalance()

    storage.set(transactionMovimentation.all)
  },

  reload() {
    dom.clearTransaction()
    app.init()
  }
}

// PARTE QUE COMEÇA A EXECUTAR O CÓDIGO
app.init()
