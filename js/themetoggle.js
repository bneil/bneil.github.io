function setTheme(mode) {
    localStorage.setItem("theme-storage", mode);
    var e = document.querySelector("#dark-mode-toggle > .feather > use")
    var darkStyle = document.getElementById("darkModeStyle");
    var lightStyle = document.getElementById("lightModeStyle");
    
    if (mode === "dark") {
        if (darkStyle) darkStyle.disabled = false;
        if (lightStyle) lightStyle.disabled = true;
        e.href.baseVal = e.href.baseVal.replace(/#.*$/, "#sun")
    } else if (mode === "light") {
        if (darkStyle) darkStyle.disabled = true;
        if (lightStyle) lightStyle.disabled = false;
        e.href.baseVal = e.href.baseVal.replace(/#.*$/, "#moon")
    }
}

function toggleTheme() {
    if (localStorage.getItem("theme-storage") === "light") {
        setTheme("dark");
    } else if (localStorage.getItem("theme-storage") === "dark") {
        setTheme("light");
    }
}

var savedTheme = localStorage.getItem("theme-storage") || "light";
setTheme(savedTheme);
