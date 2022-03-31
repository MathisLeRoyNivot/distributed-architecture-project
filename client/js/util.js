const colorGradient = fadeFraction => {
    const color1 = { red: 0, green: 0, blue: 255 }
    const color2 = { red: 255, green: 0, blue: 0 }
    const fade = fadeFraction;

    const diffRed = color2.red - color1.red;
    const diffGreen = color2.green - color1.green;
    const diffBlue = color2.blue - color1.blue;

    const gradient = {
        red: parseInt(Math.floor(color1.red + (diffRed * fade)), 10),
        green: parseInt(Math.floor(color1.green + (diffGreen * fade)), 10),
        blue: parseInt(Math.floor(color1.blue + (diffBlue * fade)), 10),
    };
    return `rgb(${gradient.red}, ${gradient.green}, ${gradient.blue})`;
}

const loadFile = (path, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 300) callback(xhr.responseText);
    }
    xhr.open("GET", path);
    xhr.send();
}