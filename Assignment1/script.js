
(function() {
    function debounce(func, wait) {
        let timeout
        return function(...args) {
            const context = this
            clearTimeout(timeout)
            timeout = setTimeout(() => func.apply(context, args), wait)
        }
    }

    let app = {
        list: {},
        prevValue: '',
        attachEvent() {
            let input =  document.getElementById('input'),
                that = this;
            
            input.addEventListener('keyup', (e) => debounce(function() {
                if (e.target.value.length > 0 && that.prevValue !== e.target.value && !that.list[e.target.value]) {
                    that.prevValue = e.target.value;

                    let digits = e.target.value.split(',');

                    digits.forEach(eachDigit => {
                        if (eachDigit.indexOf('-') > -1) {
                            let splitArray = eachDigit.split('-');
                            for (let i = parseInt(splitArray[0]); i <= parseInt(splitArray[1]); i++) {
                                that.list[i] = ( that.list[i] || 0 ) + 1;
                            }
                        }
                        else {
                            that.list[parseInt(eachDigit)] = ( that.list[parseInt(eachDigit)] || 0 ) + 1;
                        }
                    });
                    that.sagregatre();
                }
            }, 5000)());
        },
        sagregatre() {
            let uniqueElement = [], duplicateELement = [];

            for (let obj in this.list) {
                if (this.list[obj] === 1) {
                    uniqueElement.push(obj);
                }
                else {
                    duplicateELement.push(obj);
                }
            }
            this.print(uniqueElement, duplicateELement);
        },
        print(unique, duplicate) {
            let uniqueList = unique.reduce((acc, element) => {
               return acc + `<li>${element}</li>` 
            }, '');

            let duplicateList = duplicate.reduce((acc, element) => {
                return acc + `<li>${element}</li>` 
             }, '');

             document.getElementById('unique-list').innerHTML = uniqueList;
             document.getElementById('duplicate-list').innerHTML = duplicateList;
        },
        init() {
            this.attachEvent();
        }
    }

    app.init();

})();
