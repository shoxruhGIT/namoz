let API = 'https://islomapi.uz/api/present/day?region=',
vaqt_b = document.querySelector('#vaqt_b'),
vaqt_p = document.querySelector('#vaqt_p'),
vaqt_a = document.querySelector('#vaqt_a'),
vaqt_s = document.querySelector('#vaqt_s'),
vaqt_h = document.querySelector('#vaqt_h'),
quyosh = document.querySelector('.span'),
select = document.querySelector('#select'),
main = document.querySelector('.main'),
h1 = document.querySelector('.h1'),

weekday = document.querySelector('.weekday')

// main.style.display = 'none'


select.addEventListener('change', ()=>{

    fetch(`${API+select.value}`)
  .then(res=> res.json())
  .then(data=> {
    h1.style.display = 'none'
    main.style.display = 'flex'
    vaqt_b.innerHTML = data.times.tong_saharlik
    vaqt_p.innerHTML = data.times.peshin
    vaqt_a.innerHTML = data.times.asr
    vaqt_s.innerHTML = data.times.shom_iftor
    vaqt_h.innerHTML = data.times.hufton
    quyosh.innerHTML = data.times.quyosh
    weekday.innerHTML = data.weekday
    let bomdodT = new Date(`${data.date}T${data.times.tong_saharlik}`),
    huftonT = new Date(`${data.date}T${data.times.hufton}`),
    asrT = new Date(`${data.date}T${data.times.asr}`),
    shomT = new Date(`${data.date}T${data.times.shom_iftor}`),
    peshinT = new Date(`${data.date}T${data.times.peshin}`),
    bomdod_hufton = parseInt(huftonT.getTime())-parseInt(bomdodT.getTime()),
    tahajjudHours = huftonT.getTime() + (bomdod_hufton)*2/3


    set = new Date()
    set.setTime(tahajjudHours)

    let TT = document.querySelector('.tahajjud'),
    date = new Date()
    TT.innerHTML = `TAHAJJUD: `+`${Zero(set.getHours())+':'+Zero(set.getMinutes())+'-'+data.times.tong_saharlik}`

    if(date.getTime()>bomdodT.getTime() && date.getTime()<peshinT.getTime()){
      getDeltaTime(peshinT,  data.times.peshin, 'Peshin')
    }
    if(date.getTime()>peshinT.getTime() && date.getTime()<asrT.getTime()){
      getDeltaTime(asrT,data.times.asr, 'Asr')
    }
    if(date.getTime()>asrT.getTime() && date.getTime()<shomT.getTime()){
      getDeltaTime(shomT,data.times.shom_iftor, 'Shom')
    }
    if(date.getTime()>shomT.getTime() && date.getTime()<huftonT.getTime()){
      getDeltaTime(huftonT,data.times.hufton, 'Hufton')
    }
    if(date.getTime()>huftonT.getTime()){
      getDeltaTime(bomdodT,data.times.tong_saharlik, 'Bomdod')
    }

})
})

// fetch(`${API+select.value}`)
// .then(res=> res.json())
// .then(data=>{
//   vaqt_b.innerHTML = data.times.tong_saharlik
//   vaqt_p.innerHTML = data.times.peshin
//   vaqt_a.innerHTML = data.times.asr
//   vaqt_s.innerHTML = data.times.shom_iftor
//   vaqt_h.innerHTML = data.times.hufton
//   quyosh.innerHTML = data.times.quyosh
//   weekday.innerHTML = data.weekday
//   let bomdodT = new Date(`${data.date}T${data.times.tong_saharlik}`),
//   huftonT = new Date(`${data.date}T${data.times.hufton}`),
//   asrT = new Date(`${data.date}T${data.times.asr}`),
//   shomT = new Date(`${data.date}T${data.times.shom_iftor}`),
//   peshinT = new Date(`${data.date}T${data.times.peshin}`),
//   bomdod_hufton = parseInt(huftonT.getTime())-parseInt(bomdodT.getTime()),
//   tahajjudHours = huftonT.getTime() + (bomdod_hufton)*2/3


//   set = new Date()
//   set.setTime(tahajjudHours)

//   let TT = document.querySelector('.tahajjud'),
//   date = new Date()
//   TT.innerHTML = `TAHAJJUD: `+`${Zero(set.getHours())+':'+Zero(set.getMinutes())+'-'+data.times.tong_saharlik}`

//   if(date.getTime()>bomdodT.getTime() && date.getTime()<peshinT.getTime()){
//     getDeltaTime(peshinT,  data.times.peshin, 'Peshin')
//   }
//   if(date.getTime()>peshinT.getTime() && date.getTime()<asrT.getTime()){
//     getDeltaTime(asrT,data.times.asr, 'Asr')
//   }
//   if(date.getTime()>asrT.getTime() && date.getTime()<shomT.getTime()){
//     getDeltaTime(shomT,data.times.shom_iftor, 'Shom')
//   }
//   if(date.getTime()>shomT.getTime() && date.getTime()<huftonT.getTime()){
//     getDeltaTime(huftonT,data.times.hufton, 'Hufton')
//   }
//   if(date.getTime()>huftonT.getTime()){
//     getDeltaTime(bomdodT,data.times.tong_saharlik, 'Bomdod')
//   }
// })

function getDeltaTime(num_1, num_2, num_3){

  setInterval(()=>{


    let date = new Date()
    let name = document.querySelector('.name'),
    timeN = document.querySelector('.timeN'),
    timeC = document.querySelector('.nameC')

    let qolganSoat = Math.floor((num_1.getTime() - date.getTime())/(1000*60*60)),
    qolganMinut = Math.floor(((num_1.getTime() - date.getTime())/(1000*60*60) - qolganSoat)*60),
    qolganSekund = Math.floor((((num_1.getTime() - date.getTime())/(1000*60*60) - qolganSoat)*60 - qolganMinut)*60)


    name.innerHTML = `${num_2}`
    timeN.innerHTML = num_3
    timeC.innerHTML = `${qolganSoat+':'+Zero(qolganMinut)+':'+Zero(qolganSekund)}`

  }, 1000)



}

function Zero(num){
  if(num<10){
    return '0'+num
  }
  else{
    return num
  }
}