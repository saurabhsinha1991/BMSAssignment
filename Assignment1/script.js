
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
        attachEvent() {
            let input =  document.getElementById('input'),
                that = this;
            
            input.addEventListener('keyup', (e) => debounce(function() {
                if (!that.list[e.target.value]) {
                    if (e.target.value.indexOf('-') > -1) {
                        let splitArray = e.target.value.split('-');
                        if (!that.list[splitArray[0]] && !that.list[splitArray[1]]) {
                            for (let i = splitArray[0]; i <= splitArray[1]; i++) {
                                that.list[i] = ( that.list[i] || 0 ) + 1;
                            }
                        }
                    }
                    else {
                        that.list[e.target.value] = ( that.list[e.target.value] || 0 ) + 1;
                    }
                    that.sagregatre();
                }
            }, 2000)());
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
