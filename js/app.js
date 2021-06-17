$(document).ready(function(){
 
var sorusayisi = 0;
var dogru=0;
let watch = new StopWatch();
let zamandegeri=10;

document.getElementById("basla").addEventListener("click",basla);
document.getElementById("yeniden").addEventListener("click",basla);

document.getElementById("sonuc").style.display = 'none'; 
document.getElementById("sorucevap").style.display = 'none'; 


function sonucyaz(){
  document.getElementById("puan").innerText = dogru + ' / ' + sorusayisi;
} 
function basla(){
  document.getElementById("basla").setAttribute("type", "hidden");
  document.getElementById("yeniden").setAttribute("type", "hidden");
  document.getElementById("sonuc").style.display = 'inline-block';
  document.getElementById("sorucevap").style.display = 'inline-block';
  sorusayisi = 0;
  dogru=0;
  sorugetir();
  sonucyaz();

}


function secenekler(s)
{
  let d = document.createElement('div');
  d.classList.add("col-md-12");
  let i = document.createElement('input');
  i.setAttribute('type','button');
  i.setAttribute('data-card', s);
  i.setAttribute('value', s);
  i.classList.add("secenek");  
  d.appendChild(i);
  return d;
}

function secenek_dogru(){
  document.querySelectorAll('.secenek').forEach(function(s){
    if (s.getAttribute('data-card') == sorular[sorusayisi]["cevap"])
    {
      s.classList.remove("disabled");
      s.classList.add("success");
    }
  });
}

function secenek_kapat(){
  document.querySelectorAll('.secenek').forEach(function(s){
    s.disabled = true;
    s.classList.add("disabled");
  });
}


function sorugetir()
{
  let zaman=zamandegeri+1;
  console.log("sorusayısı:" + sorular.length);
  if (sorular.length == sorusayisi)
  {
    watch.stopTimer();
    document.getElementById("yeniden").setAttribute("type", "button");
    document.getElementById("soruPano").innerHTML ="<img src='img/oyunbitti.jpg'>";
    document.getElementById("sorucevap").innerText ="";
    document.getElementById("sonuc").innerText ="";
    document.getElementById("soru").innerHTML =" Toplam Puan : " +  dogru + ' / ' + sorusayisi;
    return;
  }
  else
  {
    document.getElementById("sonuc").innerText ="Cevap Nedir ?";
    document.getElementById("sorucevap").innerText ="";

    document.getElementById("soru").innerHTML = "SORU # "+ (sorusayisi+1) +"<br>"+sorular[sorusayisi]["soru"];
    document.getElementById("soruPano").innerHTML = sorular[sorusayisi]["gorsel"];
    for(let i = 0; i < sorular[sorusayisi]["secenek"].length; i++) {
      let input = secenekler(sorular[sorusayisi]["secenek"][i]); // seçenekler oluşturuluyor.
    document.getElementById("sorucevap").appendChild(input);// input ekleniyor
  }
}


watch.startTimer(function(){
  zaman-=1;
  if (zaman>9)   document.getElementById("zaman").innerText = "00:"+zaman; else document.getElementById("zaman").innerText = "00:0"+zaman;
  if (zaman===0 ) {
    watch.stopTimer();
    secenek_kapat();
    secenek_dogru();
    sorusayisi++;
      sonucyaz();
      setTimeout(function(){ sorugetir(); }, 1500);
  }

console.log("zaman");
});


  document.querySelectorAll('.secenek').forEach(function(secenek) {
    secenek.addEventListener('click', function() {
      watch.stopTimer();
      secenek_kapat();
      console.log(sorular[sorusayisi]["cevap"]);
      console.log(secenek.getAttribute('data-card') );
      if (secenek.getAttribute('data-card') == sorular[sorusayisi]["cevap"])
      {
        dogru++;
        document.getElementById("sonuc").innerText ="Doğru !";
        secenek.classList.remove("disabled");
        secenek.classList.add("success");
      }
      else{
        secenek.classList.remove("disabled");
        secenek.classList.add("warning");
        document.getElementById("sonuc").innerText ="Yanlış !";
        setTimeout(function(){ 
          secenek_dogru();
          secenek.classList.add("disabled");
          secenek.classList.remove("warning");        
        }, 1500);
      }

      setTimeout(function(){   
          sorusayisi++;
          sonucyaz();
          sorugetir(); }, 3500);
    });
    });
  

}




});
