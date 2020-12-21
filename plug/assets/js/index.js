// const makeItRain = function () {
//     $(".rain").empty();
//     var increment = 0;
//     var drops = "";
//     var backDrops = "";
//     while (increment < 100) {
//         var randoHundo = Math.floor(Math.random() * (98 - 1 + 1) + 1);
//         var randoFiver = Math.floor(Math.random() * (5 - 2 + 1) + 2);
//         increment += randoFiver;
//         drops +=
//             '<div class="drop" style="left: ' +
//             increment +
//             "%; bottom: " +
//             (randoFiver + randoFiver - 1 + 100) +
//             "%; animation-delay: 0." +
//             randoHundo +
//             "s; animation-duration: 0.5" +
//             randoHundo +
//             's;"><div class="stem" style="animation-delay: 0.' +
//             randoHundo +
//             "s; animation-duration: 0.5" +
//             randoHundo +
//             's;"></div><div class="splat" style="animation-delay: 0.' +
//             randoHundo +
//             "s; animation-duration: 0.5" +
//             randoHundo +
//             's;"></div></div>';
//         backDrops +=
//             '<div class="drop" style="right: ' +
//             increment +
//             "%; bottom: " +
//             (randoFiver + randoFiver - 1 + 100) +
//             "%; animation-delay: 0." +
//             randoHundo +
//             "s; animation-duration: 0.5" +
//             randoHundo +
//             's;"><div class="stem" style="animation-delay: 0.' +
//             randoHundo +
//             "s; animation-duration: 0.5" +
//             randoHundo +
//             's;"></div><div class="splat" style="animation-delay: 0.' +
//             randoHundo +
//             "s; animation-duration: 0.5" +
//             randoHundo +
//             's;"></div></div>';
//     }
//     $(".rain.front-row").append(drops);
//     $(".rain.back-row").append(backDrops);
// };

function setCurrentTime() {
    document.getElementById("time").innerHTML = moment().format('lll');
}

function setBackground() {
    
    const imageIndex = Math.floor((Math.random()*5));;
    const urls = [
        'banner1.jpg',
        'banner2.jpg',
        'banner3.webp',
        'banner4.jpg',
        'banner5.webp',
    ]

    document.getElementById(
        "container"
    ).style.backgroundImage = `url(assets/images/${urls[imageIndex]})`;

    document.body.style.display = "block";

    // fetch("http://cdn.cocon.live:8008/api/getRandomImg")
    //     .then((response) => response.json())
    //     .then((data) => {
    //         const img = new Image();
    //         img.src = data.data;
    //         img.onload = function () {
    //             document.getElementById(
    //                 "container"
    //             ).style.backgroundImage = `url(${data.data})`;
    //             document.body.style.display = "block";
    //         };
    //     })
    //     .catch(() => {
    //         document.getElementById(
    //             "container"
    //         ).style.backgroundImage = `url(assets/images/default_background.jpg)`;
    //     });
}

function setWeatherDom(data) {
    const tq = {
        xue: "xue.png",
        lei: "lei.png",
        shachen: "shachen.png",
        wu: "wu.png",
        bingbao: "bingbao.png",
        yun: "yun.png",
        yu: "yu.png",
        yin: "yin.png",
        qing: "qing.png",
    };
    const ds = (data && data.data.slice(0, 3)) || [];
    let dom = "";
    ds.map((item) => {
        dom =
            dom +
            `<div class="every-item">
                <img src="assets/images/${tq[item.wea_img]}">
                <div className="da1">${item.day}</div>
                <div className="da2">${item.wea}</div>
                <div className="da3">${item.tem2} ~ ${item.tem1} </div>
            </div>`;
    });
    // if (
    //     ds[0].wea_img === "yu" ||
    //     ds[0].wea_img === "xue" ||
    //     ds[0].wea_img === "bingbao" ||
    //     ds[0].wea_img === "lei"
    // ) {
    //     makeItRain();
    // }
    document.getElementById("every-container").innerHTML = dom;
}

function fetchWeather() {
    fetch(
        "https://tianqiapi.com/api?version=v1&appid=82988158&appsecret=4uf5Y2Sg"
    )
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem("days", JSON.stringify(data));
            setWeatherDom(data);
        });
}

function init() {
    const days = localStorage.getItem("days") || "";
    if (days) {
        const d = JSON.parse(days);
        if (d.data[0].date === moment().format("YYYY-MM-D")) {
            setWeatherDom(d);
        } else {
            fetchWeather();
        }
    } else {
        fetchWeather();
    }
    setCurrentTime();
    setBackground();
}

function onSearch(e) {
    console.log(e);
}

// document.getElementById("ipt").onkeydown = function (e) {
//     if (e.keyCode === 13 && e.target.value !== "") {
//         window.location.href = `https://www.google.com/search?q=${e.target.value}`;
//         document.getElementById("ipt").value = "";
//     }
// };

init();
