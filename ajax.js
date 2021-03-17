let data = null;
// let url = 'http://edu.gplweb.pl/res/web-app-ajax/test.txt';
//let url = 'http://localhost/firma.json';
let items =[{id: '1', type: 'json', url: 'http://localhost/firma.json'},
{id: '2', type: 'txt', url: 'http://localhost/test.txt'}
];
    
     

let item_id ='1';

function getBundle() {
    
    for(x=0;x<items.length;x++){
        
                if(items[x].id==item_id){
                    document.getElementById('dType').textContent = items[x].type;
                                    // stworzenie obiektu do komunikacji
                    const xhr = new XMLHttpRequest();
                    // ustawienie formatu danych odpowiedzi
                    xhr.responseType = items[x].type; // domyślne text
                    // formaty: {Text, ArrayBuffer, Blob, Document, JSON};

                    // skonfigurowac polaczenie
                    xhr.open('GET', items[x].url, async = true);
                    xhr.send(); // "wysłać połączenie"
                    // GET - pobranie: data = null
                    // POST - wysłanie: data = document.form[]
                    console.log(xhr.response);

                    xhr.addEventListener('readystatechange', function (e) {
                        if (xhr.readyState !== 4) {
                            // komunikaty dla użytkownika
                            console.log(xhr.readyState);
                        } else if (xhr.status === 200) {
                            console.log('są kalesonki są');
                            console.log(xhr.response);
                        } else if (xhr.status === 404) {
                            console.log('Brak zasobu / błędy URL');
                        } else if (xhr.status === 500) {
                            console.log('serwer odpadł');
                        } else if (xhr.status === 503) {
                            console.log('Retry in 3, 2, 1...');
                        }
                    });

                    xhr.addEventListener('load', function (e) {
                        console.log(xhr.response);
                        data = xhr.response;
                        if (data !== null) {
                            let i = 1;
                            let timeInt = 1000; // ms
                            let t1 = setInterval(function () {
                                if (i === data.length - 1) clearInterval(t1);
                                insItem(i++, data[i - 1]);
                            }, timeInt);
                            // data.forEach(item => insItem(i++, item));
                            // setStatusBar();
                        }
                    });

           
            
        }
        
    }
    
}

function insItem(i, item) {
    let main = document.querySelector('#main');
    let template = document.querySelector('#rowTplt');
    let r2 = template.content.cloneNode(true);
    let rid = r2.querySelector('#row-');
    // <div id="row-1" ... 2 3>
    rid.id += i;
    let cells = r2.querySelectorAll('p');
    cells[0].textContent = i;
    cells[1].textContent = item.imie;
    cells[2].textContent = item.nazwisko;
    cells[3].textContent = item.stanowisko;
    main.appendChild(r2);
    document.getElementById('rows').textContent = i;
    addNavItem(rid, i);
    // addNavItem(i);
}
function addNavItem(r, i){
    attr = {href: '#'+r.id};
    let el = document.querySelector('nav');
    let node = addNode('a', attr, i);
    el.appendChild(node);
}
addNode = (name, attr, text)=> {
    let lnk = document.createElement(name);
    for (var at in attr) {
        lnk.setAttribute(at, attr[at]);
    }
    lnk.textContent = text;
    return lnk;
}


window.addEventListener('load', getBundle);