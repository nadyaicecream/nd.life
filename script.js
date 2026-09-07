const events = [
 {tag:"PAGI",icon:"🌅",title:"Subuh Memanggil!",text:"Alarm berbunyi. Kamu masih mengantuk, tapi waktu Subuh sudah tiba. Apa yang kamu lakukan?",
 choices:[
  ["Bangun dan langsung bersiap","+10 poin • +10 semangat",10,0,10],
  ["Bangun setelah diingatkan teman","+6 poin • +5 kebaikan",6,5,4],
  ["Lanjut tidur 😴","-5 poin • -10 semangat",-5,0,-10]]},
 {tag:"KAMAR",icon:"🧹",title:"Piket Kamar",text:"Setelah kegiatan pagi, ternyata hari ini jadwal piketmu. Kamar masih berantakan.",
 choices:[
  ["Kerjakan piket dengan kompak"," +10 poin • +10 kebaikan",10,10,4],
  ["Ajak teman bagi tugas"," +8 poin • +5 semangat",8,5,7],
  ["Pura-pura tidak tahu 🙈"," -6 poin",-6,-5,-4]]},
 {tag:"BELAJAR",icon:"📚",title:"Waktu Ngaji & Sekolah",text:"Ada materi yang cukup sulit. Kamu punya waktu untuk memilih cara belajar.",
 choices:[
  ["Catat dan tanyakan yang belum paham"," +12 poin • +12 ilmu",12,4,8],
  ["Belajar bareng teman"," +10 poin • +8 ilmu",10,6,7],
  ["Nanti saja belajarnya"," -4 poin • -8 ilmu",-4,0,-6]]},
 {tag:"PERTEMANAN",icon:"🤝",title:"Teman Butuh Bantuan",text:"Seorang teman terlihat kesulitan membawa beberapa buku. Kamu sedang terburu-buru.",
 choices:[
  ["Bantu sebentar"," +12 poin • +12 kebaikan",12,12,6],
  ["Minta teman lain membantu"," +7 poin • +6 kebaikan",7,6,8],
  ["Lewat saja"," -5 poin",-5,-6,-2]]},
 {tag:"MALAM",icon:"🌙",title:"Muhasabah Malam",text:"Hari ini hampir selesai. Kamu mengingat kembali semua pilihanmu di pondok.",
 choices:[
  ["Bersyukur dan evaluasi diri"," +15 poin • +10 ilmu",15,8,8],
  ["Cerita santai dengan teman lalu tidur"," +9 poin • +8 semangat",9,4,10],
  ["Scroll sampai lupa waktu 📱"," -7 poin • -10 semangat",-7,-2,-10]]}
];

let state={character:"cewe",day:0,points:0,streak:0,knowledge:40,kindness:40,energy:70};

function showScreen(id){
 document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
 document.getElementById(id).classList.add('active');
 window.scrollTo({top:0,behavior:'smooth'});
}
function chooseCharacter(type){
 state.character=type; state.day=0; state.points=0; state.streak=0;
 state.knowledge=40; state.kindness=40; state.energy=70;
 document.getElementById('playerAvatar').textContent=type==='cewe'?'👧🏻':'👦🏻';
 document.getElementById('playerName').textContent=type==='cewe'?'Putri':'Putra';
 showScreen('game'); renderEvent();
}
function renderEvent(){
 const e=events[state.day];
 document.getElementById('day').textContent=state.day+1;
 document.getElementById('points').textContent=state.points;
 document.getElementById('streak').textContent=state.streak;
 document.getElementById('progressBar').style.width=((state.day+1)/events.length*100)+'%';
 document.getElementById('eventIcon').textContent=e.icon;
 document.getElementById('eventTag').textContent=e.tag;
 document.getElementById('eventTitle').textContent=e.title;
 document.getElementById('eventText').textContent=e.text;
 const box=document.getElementById('choices'); box.innerHTML='';
 e.choices.forEach((c,i)=>{
   const b=document.createElement('button'); b.className='choice';
   b.innerHTML=c[0]+'<small>'+c[1]+'</small>';
   b.onclick=()=>pick(i); box.appendChild(b);
 });
 updateMeters();
}
function pick(i){
 const c=events[state.day].choices[i];
 state.points=Math.max(0,state.points+c[2]);
 state.kindness=Math.max(0,Math.min(100,state.kindness+c[3]));
 state.knowledge=Math.max(0,Math.min(100,state.knowledge+(c[2]>0?5:0)));
 state.energy=Math.max(0,Math.min(100,state.energy+c[4]));
 state.streak = c[2]>0 ? state.streak+1 : 0;
 state.day++;
 if(state.day>=events.length) finish(); else renderEvent();
}
function updateMeters(){
 document.getElementById('knowledge').style.width=state.knowledge+'%';
 document.getElementById('kindness').style.width=state.kindness+'%';
 document.getElementById('energy').style.width=state.energy+'%';
}
function finish(){
 document.getElementById('finalPoints').textContent=state.points;
 let title='MasyaAllah! 🌷', text='Kamu berhasil melewati 5 hari kehidupan pondok. Setiap pilihan kecil bisa jadi pelajaran besar.';
 if(state.points>=50){title='Santri Teladan! 🏆';text='Pilihanmu menunjukkan semangat belajar, peduli pada teman, dan mau bertanggung jawab.'}
 else if(state.points<25){title='Tetap Semangat! 🌱';text='Tidak apa-apa kalau belum sempurna. Dalam kehidupan pondok, yang penting terus belajar dan memperbaiki diri.'}
 document.getElementById('resultTitle').textContent=title;
 document.getElementById('resultText').textContent=text;
 showScreen('result');
}
function restart(){chooseCharacter(state.character)}
showScreen('home');
