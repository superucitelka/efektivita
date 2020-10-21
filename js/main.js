/* 
1. Efektivnější přístup k elementům stránky
*/
/* Vybere všechny objekty s třídou odstavec, které jsou v sekci označené id elements */
const odstavce = document.querySelectorAll('#elements .odstavec');
/* Vybere všechny buňky td v tabulce s class="sachovnice" */
const sachovePole = document.querySelectorAll('.sachovnice td');

/* Důkazy v konzoli, že v proměnné je vždy celá seznam (pole) objektů a každý má svůj index. */
console.log(odstavce);
console.log(sachovePole);

/* Klasický způsob průchodu všemi prvky pole odstavce */
/*
for (let i = 0; i < odstavce.length; i++) {
    // postupně se takto každému odstavci nastaví červená barva textu 
    odstavce[i].style.color = 'red';
    // postupně každému odstavci nastaví reakce na událost mousemove 
    odstavce[i].addEventListener('mousemove', function() {
        this.style.backgroundColor = 'yellow';
    })
}
*/

/* Novější varianta průchodu všech prvků v poli: 
   value = hodnota či obsah prvku (v našem případě vždy objekt jednoho odstavce) 
   key = index prvku, s nímž se zrovna pracuje   
*/
odstavce.forEach(function(value, key) {
    /* Každý sudý prvek zčervená */
    if (key % 2 == 0)
        value.style.color = 'red';        
    value.addEventListener('click', function() {
        /* Klíčové slovo this může nahradit identifikátor zrovna používaného objektu. 
           Místo this může být v tomto případě použito i value. */
        this.style.backgroundColor = 'yellow';
        colorMachine(this, 'pink', 'rgb(255,0,0)');
    })
})

/* Ukázka jak efektivně ošetřit různé akce pro jednotlivá pole pomyslné šachovnice */
let row = 0;
/* Atribut array odkazuje uvnitř metody forEach() na pole, s nímž se zrovna pracuje (zde sachovePole) */
sachovePole.forEach(function(value, key, array) {
    if (key % 8 == 0) row++;
    if ((key % 2 == 0 && row % 2 == 1) || (key % 2 == 1 && row % 2 == 0))    
        value.style.backgroundColor = 'red';
    else 
        value.style.backgroundColor = 'yellow';
    value.innerText = 'X';         
    value.addEventListener('click', function() {
        /* Ukázka využití atributu array - můžu do buňky zleva sousedící s buňkou, na níž se kliklo myší,
           vložit symbolický pozdrav. */
        if (key > 0)
            array[key - 1].innerText = 'Ahoj sousede!';
        this.style.backgroundColor = 'blue';
        fontMachine(this, 'Calibri', '50px');
    })
})

/* Příklady funkcí obsahující parametry s výchozími hodnotami (ty jsou při volání funkce považovány za nepovinné). */
function colorMachine(element, bgColor='white', txtColor='black') {
    element.style.backgroundColor = bgColor;
    element.style.color = txtColor;
}

function fontMachine(element, family='Arial Black', size='30px') {
    element.style.fontFamily = family;
    element.style.fontSize = size;
}