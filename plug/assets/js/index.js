function setCurrentTime() {
    document.getElementById("time").innerHTML = moment().format(
        "YYYY年MM月D日 星期dd"
    );
}

function setWeatherDom(data) {
    document.getElementById("city").innerHTML = data.city;
    const ds = (data && data.data.slice(0, 3)) || [];
    let dom = "";
    ds.map((item) => {
        dom =
            dom +
            `<div class="every-item">${item.day} ${item.wea} ${item.tem2} ~ ${item.tem1}</div>`;
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
