let key = "aaa",
  cityArr = ["8014150", "3372783", "3373348", "8010693", "3372485", "3372589", "3372988", "3372643", "3373168"],
  // vila do porto, ponta delgada, angra do heroísmo, santa cruz da graciosa, velas, lajes do pico, horta, santa cruz das flores, vila do corvo
  card = document.getElementById("data"),
  cityNameRaw,
  cityNameClean,
  cityNameClean1,
  mainTempKelvin,
  mainTempCelsius,
  pressure_mb,
  cleanHourOutput,
  daPraSecarOutput,
  windRaw,
  windClean,
  cloudsRaw,
  weatherDescription,
  desc,
  humidity,
  percentOutput;
const ver = "2.5",
  cleanHours = getDate("hour");

function getData(a) {
  try {
    for (let i = 0; i < cityArr.length; i++) {
      /* FETCH DATA */
      fetch("https://api.openweathermap.org/data/" + ver + "/forecast?id=" + cityArr[i] + "&appid=" + a)
        .then((response) => response.json())
        .then((data) => {
          if (data.cod === "200") {
            /* TRIGGER HANLDE DATA */
            handleData(data);

            /* POPULATE FIELDS */
            card.innerHTML +=
              '<div class="col-12 col-md-6 col-lg-4 d-flex justify-content-between flex-wrap flex-row mb-4"> <div class="col-12 d-flex justify-content-center justify-content-md-between flex-wrap flex-row"> <div id="card_' +
              i +
              '" class="col-auto card hoverable overflow-hidden"> <div class="card-body p-3"> <div class="hour-auto d-flex align-items-center"> <h3 class="card-title font-weight-normal">' +
              cityNameClean +
              '</h3> </div><p class="card-text m-0 p-0">' +
              getDate("day") +
              " de " +
              getDate("month") +
              ", " +
              getDate("year") +
              '</p><div class="d-flex justify-content-center"> <p class="display-3">' +
              mainTempCelsius +
              '<sup style="font-size:60%;">&deg;</sup><small class="c">C</small></p></div><div class="row d-flex justify-content-between flex-wrap flex-row align-items-center mb-3"> <div class="col-6 m-0 p-0" > <div class="col-12 m-0 p-0 d-flex justify-content-center flex-wrap flex-row desc">' +
              desc +
              '</div></div><div class="col-6 m-0 pl-3 pr-0" style="border-left: 1px solid grey"> <div class="col-12 m-0 p-0 d-flex justify-content-start flex-wrap flex-row"> <div class="col-12 p-0 d-flex justify-content-start flex-wrap flex-row hpa"> <div class="col-2 m-0 p-0 d-flex justify-content-center flex-wrap flex-row mr-2"> <i class="d-flex justify-content-center fa-solid fa-weight-hanging fa text-muted"></i> </div><div class="col-9 m-0 p-0 d-flex justify-content-start flex-wrap flex-row"> <p>' +
              pressure_mb +
              '</p>&nbsp;<span>mb</span> </div></div><div class="col-12 p-0 d-flex justify-content-start flex-wrap flex-row hpa"> <div class="col-2 m-0 p-0 d-flex justify-content-center flex-wrap flex-row mr-2"> <i class="d-flex justify-content-center fa-solid fa-droplet fa text-muted"></i> </div><div class="col-9 m-0 p-0 d-flex justify-content-start flex-wrap flex-row"> <p>' +
              humidity +
              '</p>&nbsp;<span>%</span> </div></div><div class="col-12 p-0 d-flex justify-content-start flex-wrap flex-row hpa"> <div class="col-2 m-0 p-0 d-flex justify-content-center flex-wrap flex-row mr-2"> <i class="d-flex justify-content-center fa-solid fa-wind fa text-muted"></i> </div><div class="col-9 m-0 p-0 d-flex justify-content-start flex-wrap flex-row"> <p>' +
              windClean +
              '</p>&nbsp;<span>km/h</span> </div></div><div class="col-12 p-0 d-flex justify-content-start flex-wrap flex-row hpa"> <div class="col-2 m-0 p-0 d-flex justify-content-center flex-wrap flex-row mr-2"> <i class="d-flex justify-content-center fa-solid fa-cloud fa text-muted"></i> </div><div class="col-9 m-0 p-0 d-flex justify-content-start flex-wrap flex-row"> <p>' +
              cloudsRaw +
              '</p>&nbsp;<span>%</span> </div></div></div></div></div><div id="da_pra_secar" class="text-center">' +
              daPraSecarOutput +
              '</div><div class="progress md-progress mt-5"> <div class="tooltips" style="left: ' +
              percentOutput +
              '%;">&nbsp;<span class="tooltipstext">' +
              cleanHours +
              'h</span> </div><div class="progress-bar black" role="progressbar" style="width: ' +
              cleanHourOutput +
              '%" aria-valuenow="' +
              cleanHourOutput +
              '" aria-valuemin="0" aria-valuemax="100"></div></div><ul class="list-unstyled d-flex justify-content-between font-small text-muted _mb-4"> <li class="pl-4"><sup>8h</sup></li><li><sup>11h</sup></li><li><sup>2h</sup></li><li><sup>5h</sup></li><li class="pr-4"><sup>8h</sup></li></ul> </div></div></div></div>';
          } else {
            card.innerHTML = "-";
          }
        });
    }
  } catch (err) {
    console.error(err);
    console.error("can't retrieve information");
    card.innerHTML = "-";
  }
}
getData(key); // trigger data fetch

/* GET DATE FUNCTION */
function getDate(e) {
  try {
    const t = document.querySelectorAll(".getDate_day"),
      r = document.querySelectorAll(".getDate_month"),
      o = document.querySelectorAll(".getDate_year"),
      n = document.querySelectorAll(".getDate_hour_long"),
      l = (document.querySelectorAll(".getDate_semana"), new Date()),
      u = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    let g = 0;
    if ("day" === e) {
      let e = l.getDate();
      for (; g < t.length; g++) t[g].innerHTML = e;
      return e;
    }
    if ("month" === e) {
      let e = u[l.getMonth()];
      for (; g < r.length; g++) r[g].innerHTML = e;
      return e;
    }
    if ("year" === e) {
      let e = l.getFullYear();
      for (; g < o.length; g++) o[g].innerHTML = e;
      return e;
    }
    if ("hour_long" === e) {
      let e = l.getHours() + "hour:" + l.getMinutes() + "m:" + l.getSeconds() + "s";
      for (; g < n.length; g++) n[g].innerHTML = e;
      return e;
    }
    if ("hour" === e) {
      let e = l.getHours();
      l.getMinutes(), l.getSeconds();
      return e;
    }
  } catch (e) {
    console.log(e), console.log(" // error");
  }
}

/* HANDLE DATA AND SETUP VARIABLES */
function handleData(a) {
  /* HANDLE VARIABLES */
  mainTempKelvin = parseFloat(a.list[0].main.temp);
  mainTempCelsius = Math.round((mainTempKelvin - 273.15).toFixed(2) * 2) / 2;
  pressure_mb = a.list[0].main.pressure;
  humidity = a.list[0].main.humidity;
  windRaw = a.list[0].wind.speed;
  cloudsRaw = a.list[0].clouds.all;
  windClean = (windRaw * 3.6).toFixed(0);
  cityNameRaw = a.city.name;
  weatherDescription = a.list[0].weather[0].description;

  /* HANDLE LOCATION NAMES */
  cityNameClean1 = cityNameRaw
    .replace("Vila do Porto", "Santa Maria")
    .replace("São Roque do Pico", "Pico")
    .replace("Ponta Delgada", "São Miguel")
    .replace("Velas", "São Jorge")
    .replace("Santa Cruz da Graciosa Municipality", "Graciosa")
    .replace("Angra do Heroísmo", "Terceira")
    .replace("Horta", "Faial")
    .replace("Santa Cruz das Flores", "Flores")
    .replace("Vila do Corvo", "Corvo");

  /* LINKS TO GOOGLE MAPS */
  cityNameClean = '<a href="https://www.google.com/maps/@' + a.city.coord.lat + "," + a.city.coord.lon + ',10z" target="_blank">' + cityNameClean1 + "</a>";

  /* HANDLE HOURS */
  switch (cleanHours) {
    case 0:
    case 1:
      cleanHourOutput = 0;
      break;
    case 2:
    case 3:
    case 4:
      cleanHourOutput = 4.16;
      percentOutput = -1;
      break;
    case 5:
    case 6:
    case 7:
      cleanHourOutput = 8.16;
      break;
    case 8:
      cleanHourOutput = 13.28;
      percentOutput = 4.28;
      break;
    case 9:
    case 10:
      cleanHourOutput = 23.28;
      percentOutput = 14.28;
      break;
    case 11:
      cleanHourOutput = 33.28;
      percentOutput = 24.28;
      break;
    case 12:
    case 13:
      cleanHourOutput = 43.28;
      percentOutput = 34.28;
      break;
    case 14:
      cleanHourOutput = 53.28;
      percentOutput = 44.28;
      break;
    case 15:
    case 16:
      cleanHourOutput = 59.28;
      percentOutput = 49.28;
      break;
    case 17:
      cleanHourOutput = 69.28;
      percentOutput = 59.28;
      break;
    case 18:
    case 19:
      cleanHourOutput = 79.28;
      percentOutput = 69.28;
      break;
    case 20:
      cleanHourOutput = 86.28;
      percentOutput = 76.28;
      break;
    case 21:
    case 22:
    case 23:
      cleanHourOutput = 94.28;
      percentOutput = 84.28;
      break;
    case 24:
      cleanHourOutput = 100;
      percentOutput = 84.28;
      break;
  }

  /* DISPLAY WEATHER ICONS BASED ON WEATHER API DESCRIPTION */
  switch (weatherDescription) {
    case "clear sky":
      desc = "<div class='col-12 m-0 p-0 d-flex justify-content-center'><i class='d-flex justify-content-center fa-solid fa-sun text-muted mb-4 fa-2xl'></i></div><div class='col-12 m-0 p-0 d-flex justify-content-center'><span>céu limpo</span></div>";
      break;
    case "few clouds":
    case "scattered clouds":
      desc = "<div class='col-12 m-0 p-0 d-flex justify-content-center'><i class='d-flex justify-content-center fa-solid fa-cloud-sun text-muted mb-4 fa-2xl'></i></div><div class='col-12 m-0 p-0 d-flex justify-content-center'><span>céu pouco<br>nublado</span></div>";
      break;
    case "broken clouds":
      desc = "<div class='col-12 m-0 p-0 d-flex justify-content-center'><i class='d-flex justify-content-center fa-solid fa-cloud text-muted mb-4 fa-2xl'></i></div><div class='col-12 m-0 p-0 d-flex justify-content-center'><span>céu parcialmente<br>nublado</span></div>";
      break;
    case "overcast clouds":
      desc = "<div class='col-12 m-0 p-0 d-flex justify-content-center'><i class='d-flex justify-content-center fa-solid fa-cloud text-muted mb-4 fa-2xl'></i></div><div class='col-12 m-0 p-0 d-flex justify-content-center'><span>céu muito<br>nublado</span></div>";
      break;
    case "light rain":
    case "shower clouds":
      desc = "<div class='col-12 m-0 p-0 d-flex justify-content-center'><i class='d-flex justify-content-center fa-solid fa-cloud-rain text-muted mb-4 fa-2xl'></i></div><div class='col-12 m-0 p-0 d-flex justify-content-center'><span>possibilidade<br>de aguaceiros</span></div>";
      break;
    case "rain":
      desc = "<div class='col-12 m-0 p-0 d-flex justify-content-center'><i class='d-flex justify-content-center fa-solid fa-cloud-showers-heavy text-muted mb-4 fa-2xl'></i></div><div class='col-12 m-0 p-0 d-flex justify-content-center'><span>possibilidade<br>de chuva</span></div>";
      break;
    case "thunderstorm":
      desc = "<div class='col-12 m-0 p-0 d-flex justify-content-center'><i class='d-flex justify-content-center fa-solid fa-cloud-bolt text-muted mb-4 fa-2xl'></i></div><div class='col-12 m-0 p-0 d-flex justify-content-center'><span>possibilidade<br>de trovoada</span></div>";
      break;
    case "snow":
      desc = "<div class='col-12 m-0 p-0 d-flex justify-content-center'><i class='d-flex justify-content-center fa-solid fa-cloud-snowflake text-muted mb-4 fa-2xl'></i></div><div class='col-12 m-0 p-0 d-flex justify-content-center'><span>possibilidade de neve</span></div>";
      break;
    case "mist":
      desc = "<div class='col-12 m-0 p-0 d-flex justify-content-center'><i class='d-flex justify-content-center fa-solid fa-smog text-muted mb-4 fa-2xl'></i></div><div class='col-12 m-0 p-0 d-flex justify-content-center'><span>possibilidade de nevoeiro</span></div>";
      break;
  }

  /* DISPLAY INFO BASED ON ATMOSPHERIC PRESSURE */
  if (pressure_mb >= 950 && pressure_mb <= 1009) {
    daPraSecarOutput = "<div class='bg-danger m-0 p-0 hpa'>Não está bom p'ra secar.</div>";
  } else if (pressure_mb >= 1010 && pressure_mb < 1020) {
    daPraSecarOutput = "<div class='bg-warning m-0 p-0 hpa'>Não recomendado p'ra secar.</div>";
  } else if (pressure_mb >= 1020) {
    daPraSecarOutput = "<div class='bg-success m-0 p-0 hpa'>Ótimo day p'ra secar.</div>";
  }
}

/* ON CLICK LANGUAGE MODAL */
$("#pt").click(function () {
  $("#en").removeClass("bg-info");
  $("#en").addClass("bg-light");
  $("#pt").removeClass("bg-light");
  $("#pt").addClass("bg-info");
  $("#block_en").removeClass("d-block");
  $("#block_en").addClass("d-none");
  $("#block_pt").addClass("d-block");
});
$("#en").click(function () {
  $("#pt").removeClass("bg-info");
  $("#pt").addClass("bg-light");
  $("#en").removeClass("bg-light");
  $("#en").addClass("bg-info");
  $("#block_pt").removeClass("d-block");
  $("#block_pt").addClass("d-none");
  $("#block_en").addClass("d-block");
});
