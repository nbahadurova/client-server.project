class Currency {
     constructor(firstCurrency, secondCurrency) {
         this.firstCurrency = firstCurrency;
         this.secondCurrency = secondCurrency;
         this.url = `https://api.exchangerate.host/latest?base=`;
 
         this.amount = null;
     }
 
     alert(message) {
 
         const div = document.createElement('div');
         div.textContent = message;
         div.className = 'alert alert-danger';
         div.style.display = 'block'
 
         const section = document.querySelector('.main');
 
         section.append(div);
 
         setTimeout(() => {
             div.style.display = 'none'
         }, 1000);
 
         amountElement.value = '';
     }
 
     exchange() {
 
         if (this.firstCurrency == this.secondCurrency) {
 
             this.alert("Eyni valyutanı bir-birinə çevirməyinizə ehtiyac yoxdur...");
 
         }
 
         return new Promise((resolve, reject) => {
 
             fetch(this.url + this.firstCurrency)
                 .then(res => res.json())
                 .then(data => {
                     const rate = (data.rates[this.secondCurrency]);
 
         
                     const newAmount = Number(this.amount);
 
                     let result = (rate * newAmount).toFixed(4);
 
                     let fromRate = document.querySelector('#fromRate');
                     let toRate = document.querySelector('#toRate');
                     fromRate.textContent = `1 ${this.firstCurrency} = ${(rate).toFixed(4)} ${this.secondCurrency}`;
 
                     toRate.textContent = `1 ${this.secondCurrency} = ${(1 / rate).toFixed(4)} ${this.firstCurrency}`
 
                     resolve(result);
                 })
                 .catch(err =>{this.alert('Network error');reject(err)})
         })
 
     }
     changeAmount(amount) {
         this.amount = amount;
     }
 
     changeFirstCurrency(fromCurrency) {
         this.firstCurrency = fromCurrency;
     }
 
     changeSecondCurrency(toCurrency) {
         this.secondCurrency = toCurrency;
     }
 }
 const amountElement = document.querySelector('#amount');

const firstSelect = document.querySelector('#from');
const secondSelect = document.querySelector('#to');

const resultField = document.querySelectorAll('#amount')[1]

const currency = new Currency('RUB', 'USD');

addEventListener();

function addEventListener() {
    document.addEventListener('DOMContentLoaded', () => {
        fetch('https://api.exchangerate.host/latest?base=RUB')
            .then((res) => res.json())
            .then((data) => {
                fromRate.textContent = `1 RUB = ${(data.rates['USD']).toFixed(4)} USD`;
                toRate.textContent = `1 USD = ${(1 / (data.rates['USD'])).toFixed(4)} RUB`
            })
            .catch((err) => console.log(err))
    })
    amountElement.addEventListener('input', exchangeCurrency);
    firstSelect.addEventListener('click', exchangeFrom);
    secondSelect.addEventListener('click', exchangeTo);
    amountElement.addEventListener('keyup', changeComma);
}



function changeComma(e) {
    if (amountElement.value.includes(',')) {
        let newFilterComma = amountElement.value.replace(',', '.');
        amountElement.value = newFilterComma;
    }
}





function exchangeCurrency() {

    amountElement.value = amountElement.value.replace(/ /g, '');

    if ((amountElement.value.indexOf(',') == -1 || amountElement.value.indexOf('.') == -1) && amountElement.value.match(/[a-z&\/\\_^#@+()$~%'"`!|:*?<>{}-]/g)) {
        currency.alert('Yalnız ədəd tipli dəyişənlər daxil edə bilərsiniz...');

        amountElement.value = '';
        resultField.value = '';

    }

    else {

        if (amountElement.value.indexOf(',') == -1 && amountElement.value.indexOf('.') == -1) {

            let yeni = Number(amountElement.value).toLocaleString().replace(/,/g, ' ');

            let gonderilen = yeni.replace(/ /g, '');

            amountElement.value = yeni;

            currency.changeAmount(gonderilen);
        }

        else {
            if (amountElement.value.indexOf(',')) {
                let yeni = amountElement.value.replace(',', '.')
                currency.changeAmount(yeni)
            }
        }
        currency.exchange()
            .then(result => {

                if (amountElement.value == 0) {
                    resultField.value = ""
                }

                else {
                    resultField.value = result;
                }
            })
    }
}

function exchangeFrom(e) {
    if (e.target.textContent == 'RUB') {

        currency.changeFirstCurrency(e.target.textContent);

        currency.exchange()
            .then(result => {

                if (amountElement.value == 0) {
                    resultField.value = ""
                }
                else {
                    resultField.value = result;
                }
            })
            .catch(err => console.log(err));
    }
    else if (e.target.textContent == 'USD') {

        currency.changeFirstCurrency(e.target.textContent);

        currency.exchange()
            .then(result => {
                if (amountElement.value == 0) {
                    resultField.value = ""
                }
                else {
                    resultField.value = result;
                }
            })
            .catch(err => console.log(err));
    }
    else if (e.target.textContent == 'EUR') {

        currency.changeFirstCurrency(e.target.textContent);

        currency.exchange()
            .then(result => {

                if (amountElement.value == 0) {
                    resultField.value = ""
                }
                else {
                    resultField.value = result;
                }
            })
            .catch(err => console.log(err));

    }
    else if (e.target.textContent == 'GBP') {

        currency.changeFirstCurrency(e.target.textContent);

        currency.exchange()
            .then(result => {

                if (amountElement.value == 0) {
                    resultField.value = ""
                }
                else {
                    resultField.value = result;
                }
            })
            .catch(err => console.log(err));
    }
}

function exchangeTo(e) {
    if (e.target.textContent == 'RUB') {
        currency.changeSecondCurrency(e.target.textContent);

        currency.exchange()
            .then(result => {

                if (amountElement.value == 0) {
                    resultField.value = ""
                }
                else {
                    resultField.value = result;
                }
            })
            .catch(err => console.log(err));


    }
    else if (e.target.textContent == 'USD') {

        currency.changeSecondCurrency(e.target.textContent);

        currency.exchange()
            .then(result => {

                if (amountElement.value == 0) {
                    resultField.value = ""
                }
                else {
                    resultField.value = result;
                }
            })
            .catch(err => console.log(err));

    }
    else if (e.target.textContent == 'EUR') {

        currency.changeSecondCurrency(e.target.textContent);

        currency.exchange()
            .then(result => {
                console.log(result);

                if (amountElement.value == 0) {
                    resultField.value = ""
                }
                else {
                    resultField.value = result;
                }
            })
            .catch(err => console.log(err));

    }
    else if (e.target.textContent == 'GBP') {

        currency.changeSecondCurrency(e.target.textContent);

        currency.exchange()
            .then(result => {
                console.log(result);

                if (amountElement.value == 0) {
                    resultField.value = ""
                }
                else {
                    resultField.value = result;
                }
            })
            .catch(err => console.log(err));
    }

}
const currenciesFrom = document.querySelectorAll('.currencies')[0];
const currenciesTo = document.querySelectorAll('.currencies')[1];

let buttonsLeft = document.querySelectorAll('#from button');
let buttonsRight = document.querySelectorAll('#to button');

change = (e) => {

    if (e.target.textContent == 'RUB') {

        buttonsLeft.forEach((item) => {
            item.style = 'background: #fff; color: #C6C6C6'
        })
        e.target.style = "background: #833AE0; color: #fff";

    }

    else if (e.target.textContent == 'USD') {

        buttonsLeft.forEach((item) => {
            item.style = 'background: #fff; color: #C6C6C6'
        })

        e.target.style = "background: #833AE0; color: #fff";

        let choosen = document.querySelector('#choosen')

    }
    else if (e.target.textContent == 'EUR') {

        buttonsLeft.forEach((item) => {
            item.style = 'background: #fff; color: #C6C6C6'
        })

        e.target.style = "background: #833AE0; color: #fff";
    }

    else if (e.target.textContent == 'GBP') {

        buttonsLeft.forEach((item) => {
            item.style = 'background: #fff; color: #C6C6C6'
        })

        e.target.style = "background: #833AE0; color: #fff";
    }
}


change2 = (e) => {

    if (e.target.textContent == 'RUB') {

        buttonsRight.forEach((item) => {
            item.style = 'background: #fff; color: #C6C6C6'
        })
        e.target.style = "background: #833AE0; color: #fff";
    }

    else if (e.target.textContent == 'USD') {

        buttonsRight.forEach((item) => {
            item.style = 'background: #fff; color: #C6C6C6'
        })

        e.target.style = "background: #833AE0; color: #fff";


    }
    else if (e.target.textContent == 'EUR') {

        buttonsRight.forEach((item) => {
            item.style = 'background: #fff; color: #C6C6C6'
        })

        e.target.style = "background: #833AE0; color: #fff";

    }

    else if (e.target.textContent == 'GBP') {

        buttonsRight.forEach((item) => {
            item.style = 'background: #fff; color: #C6C6C6'
        })

        e.target.style = "background: #833AE0; color: #fff";

    }
}

currenciesFrom.addEventListener('click', change);
currenciesTo.addEventListener('click', change2);