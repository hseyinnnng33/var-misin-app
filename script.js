const teklifKalanHtml = document.querySelector(".para-miktari");
const solBar = document.querySelector(".sol-bar");
const sagBar = document.querySelector(".sag-bar");
const kutular = document.querySelector(".kutular");
const bir = document.querySelector(".bir");
const teklifEkrani = document.querySelector(".teklif-ekrani")
const teklifEkraniResim = document.querySelector(".img")
const teklifEkraniPara = document.querySelector(".kasa-teklifi")
const kabulBtn = document.querySelector(".kabul")
const devamBtn = document.querySelector(".devam")

const paralar = ["100", "200", "1.000", "5.000", "10.000", "12.000", "20.000", "30.000",
"40.000", "50.000", "60.000", "90.000", "100.000", "150.000", "200.000", "500.000", "600.000", "700.000", "900.000", "1.000.000"];

const sesler = ['tada'];

function kutuYaratSol(){
    let dizi = paralar.slice(0, 10);
    for(let i = 0; i<dizi.length; i++){
        let solElemanlar = document.createElement("div");
        solElemanlar.classList.add("kutu");
        let h2 = document.createElement("h2");

        h2.innerHTML = dizi[i];

        solElemanlar.appendChild(h2);
        solBar.appendChild(solElemanlar);
    }
}

kutuYaratSol();

function kutuYaratSag(){
    let dizi = paralar.slice(10, 20);
    for(let i = 0; i<dizi.length; i++){
        let sagElemanlar = document.createElement("div");
        sagElemanlar.classList.add("kutu");
        let h2 = document.createElement("h2");
        
        h2.innerHTML = dizi[i];

        sagElemanlar.appendChild(h2);
        sagBar.appendChild(sagElemanlar);
    }
}

kutuYaratSag();

let index = 20;
let deger = 5;

function ortaKutular(){
    
    for(let i = 1; i<=20; i++){
        let RandomSayi = Math.floor(Math.random() * paralar.length);
        let yaratOrtaEleman = document.createElement("div");
        let yaratOrtaYazi = document.createElement("h1");

        yaratOrtaEleman.dataset.value = paralar[RandomSayi];
        yaratOrtaEleman.classList.add("box");
        yaratOrtaYazi.textContent = i;

        paralar.splice(RandomSayi, 1);
          
        yaratOrtaEleman.addEventListener("click", function(){

            playTadaSound();

            yaratOrtaEleman.classList.add("arka-plan");
            index--;
            deger--;

            teklifKalanHtml.innerHTML = deger;
            if(deger === 0){
                deger = 5;
            }
            
            let dataValue = this.dataset.value;

            let barKutular = document.querySelectorAll(".sol-bar .kutu, .sag-bar .kutu");

            for(let i = 0; i< barKutular.length; i++){
                let barKutu = barKutular[i];

                let h2 = barKutu.querySelector("h2");
                
                let h2Text = h2.textContent;

                if(h2Text === dataValue){
                    barKutu.classList.add("active");
                }
            }
            ortalamaBul();
        });        
        yaratOrtaEleman.appendChild(yaratOrtaYazi);
        kutular.appendChild(yaratOrtaEleman);
    }
}

ortaKutular();

function tumPara(deger){
    return ""+ deger.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

let teklifPara = 50000;

let yaziBir = document.querySelector(".yazi")

function ortalamaBul(){
    if(index === 15 || index === 10 || index === 5 || index === 2){
        setTimeout(()=>{
            let kutu = document.querySelectorAll(".box")
            kutu.forEach((item)=>{
                item.classList.add("etkisiz")
            })
            teklifEkrani.classList.add("active")
        }, 500);
    }
    else if(index === 1){
        setTimeout(() => {
            location.reload()
        }, 4000);
    }
}

kabulBtn.addEventListener("click", function(){
    teklifEkraniResim.src = "kabulresim.jpg";
    teklifEkraniPara.innerHTML = "PARANIZI KASADAN ALINIZ"
    setTimeout(()=>{
        location.reload()
    },6000)
})

let artis = 0;

devamBtn.addEventListener("click", function(){
    artis++;
    teklifPara += 50000;
    teklifEkraniResim.src = "devamresim.jpg";
    teklifEkraniPara.innerHTML = "EN DOGRU KARARI VERDİN"
    setTimeout(()=>{
        if(artis === 2){
            teklifPara = 10000;
        }
        teklifEkrani.classList.remove("active")
        teklifEkraniResim.src = "kasa-resim.jpg";
        teklifEkraniPara.innerHTML = `${tumPara(teklifPara)} TL`;
        let kutu = document.querySelectorAll(".box")
            kutu.forEach((item)=>{
                item.classList.remove("etkisiz")
            })
    },2000)
})

function playTadaSound(){
    let audio = new Audio('tada.mp3');
    audio.play();
}
