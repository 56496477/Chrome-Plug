document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        document.body.style.display = "block";
    } else {
        document.body.style.display = "none";
    };
};


function setCurrentTime() {
    document.getElementById("time").innerHTML = moment().format(
        "YYYY年MM月D日 星期dd"
    );
}

function setBackground() {
    fetch('http://cdn.cocon.live:8008/api/getRandomImg').then((response) => response.json())
    .then((data) => {
        console.log(data.data);
        document.getElementById("container").style.backgroundImage = `url(${data.data})`;
    }).catch(() => {
        document.getElementById("container").style.backgroundImage = `url(/images/default_background.jpg)`;
    })
}

function setWeatherDom(data) {
    // document.getElementById("city").innerHTML = data.city;
    const tq = {
        'xue': 'xue.png',
        'lei': 'lei.png',
        'shachen': 'shachen.png',
        'wu': 'wu.png',
        'bingbao': 'bingbao.png',
        'yun': 'yun.png',
        'yu': 'yu.png',
        'yin': 'yin.png',
        'qing': 'qing.png',
    }
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

document.getElementById('ipt').onkeydown = function(e) {
    if(e.keyCode === 13 && e.target.value !== '') {
        window.location.href = `https://www.google.com/search?q=${e.target.value}`;
        document.getElementById("ipt").value="";
    }
};

init();
