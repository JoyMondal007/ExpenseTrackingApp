const transactionHistory=document.querySelector('.income--history')
const historyList=document.querySelector('.list')
const addTransactionForm=document.querySelector('.add--transaction')
const textInput=document.getElementById('text')
const amountInput=document.getElementById('amount')
const addTransactionBtn=document.querySelector('.add--transaction--btn')

const mainBalance =document.querySelector('.remainning--balance')
const remainningIncome =document.querySelector('.remainning--income')
const remainningExpense =document.querySelector('.remainning--expense')

const transactionsFromStorage=JSON.parse(localStorage.getItem('transactions'));

let transactions=localStorage.getItem('transactions') !== null ? transactionsFromStorage : [];


addTransactionForm.addEventListener('submit',function(e){
    e.preventDefault();
    if(textInput.value.trim()==='' && amountInput.value.trim()===''){
        textInput.classList.add('warning')
        amountInput.classList.add('warning')
    }
    else if(textInput.value.trim()===''){
        textInput.classList.add('warning')
    }
    else if(amountInput.value.trim()===''){
        amountInput.classList.add('warning')
    } 
    else{
        const transaction= {
            id:generateRandomId(),
            textMsg:textInput.value,
            amountIn:+amountInput.value
        }
        transactions.push(transaction)

        renderTransactionHistory(transaction);
        updateBalanceHistory();
        updateLocalStorage();

        textInput.value='';
        amountInput.value='';
        textInput.classList.remove('warning')
        amountInput.classList.remove('warning')
    }
})

const generateRandomId=function(){
    return Math.floor(Math.random()*100000000);
}

const renderTransactionHistory=function(transaction){
   const transactionType = transaction.amountIn > 0 ? 'income' : 'expense';
   const typeIndicator= transaction.amountIn > 0 ? '+' : '-';

   const markup=`
   <div class="eee">
       <button class="btn--close-history" onclick="removeSingleItem(${transaction.id})" data-id="${transaction.id}">&times;
       </button>
        <div class="transactions ${transactionType}">
            <p class="transansaction--title">
                    ${transaction.textMsg}
            </p>
            <span class="transaction--amount">
                    ${typeIndicator}${Math.abs(transaction.amountIn)}
            </span>
        </div>
   </div>
   `
   historyList.insertAdjacentHTML('beforeend',markup)
}

const updateBalanceHistory=function(){
   //console.log(typeof transactions)
   const amountAll=transactions.map(transaction => transaction.amountIn)
   //console.log(amountAll)
   const totalAmt=amountAll
        .reduce((acc, amtItem) => 
        (acc += amtItem), 0)
        .toFixed(2);
   mainBalance.innerText=`$${totalAmt}`
    
    const incomes = amountAll
        .filter(amtItem => amtItem > 0)
        .reduce((acc, amtItem) => (acc += amtItem), 0)
        .toFixed(2);

    const expenses = (amountAll
        .filter(amtItem => amtItem < 0)
        .reduce((acc, amtItem) => (acc += amtItem), 0) * -1)
        .toFixed(2);

    remainningIncome.innerText=`$${incomes}`
    remainningExpense.innerText=`$${expenses}` 
}

function removeSingleItem(id){
    transactions=transactions.filter(transaction => transaction.id !== id)
    // transactionHistory.addEventListener('click',function(e){
    //     if(e.target.classList.contains('btn--close-history')){
    //         const target=e.target.dataset.id;
    //         console.log(target)
    //         target.parentElement.classList.add('hidden')
    //     }
    // })
    
    updateLocalStorage();
    init();
}


const updateLocalStorage=function(){
    localStorage.setItem('transactions',JSON.stringify(transactions))
}

const init=function(){
   //const markup=``;
   //transactionHistory.insertAdjacentHTML('beforeend',markup)
   //historyList.innerHTML=markup;
   historyList.innerHTML='';
   transactions.forEach(renderTransactionHistory);
   updateBalanceHistory()
}
init();






