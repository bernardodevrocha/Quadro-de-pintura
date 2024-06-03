let container = document.querySelector(".container");
let gridButton = document.getElementById("criar-grade");
let clearGridButton = document.getElementById("limpar-grade");
let gridWidth = document.getElementById("largura-range");
let gridHeight = document.getElementById("altura-range");
let colorButton = document.getElementById("cor-input");
let eraseBtn = document.getElementById("apagar-btn");
let paintBtn = document.getElementById("pintar-btn");
let widthValue = document.getElementById("largura-valor");
let heightValue = document.getElementById("altura-valor");

let eventos = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup"
    },
    touch: {
        down: "touchstart",
        move: "touchmove",
        up: "touchend"
    }
};

let deviceType = "";

let desenho = false;
let apagar = false;

const isTouchDevice = () => {
    try {
        document.createEvent('TouchEvent');
        deviceType = 'touch';
        return true;
    } catch (e) {
        deviceType = 'mouse';
        return false;
    }
};

isTouchDevice();

gridButton.addEventListener('click', () => {
    container.innerHTML = '';
    let count = 0;
    for (let i = 0; i < gridHeight.value; i++) {
        let div = document.createElement('div');
        div.classList.add('linha-grade');

        for (let j = 0; j < gridWidth.value; j++) {
            count += 1;
            let col = document.createElement('div');
            col.classList.add('coluna-grade');
            col.setAttribute('id', `colunaGrade${count}`);
            col.addEventListener(eventos[deviceType].down, () => {
                desenho = true;
                if (apagar) {
                    col.style.backgroundColor = 'transparent';
                } else {
                    col.style.backgroundColor = colorButton.value;
                }
            });

            col.addEventListener(eventos[deviceType].move, (e) => {
                if (!desenho) return;
                let elementId = document.elementFromPoint(
                    !isTouchDevice() ? e.clientX : e.touches[0].clientX,
                    !isTouchDevice() ? e.clientY : e.touches[0].clientY
                ).id;
                checker(elementId);
            });

            col.addEventListener(eventos[deviceType].up, () => {
                desenho = false;
            });

            div.appendChild(col);
        }

        container.appendChild(div);
    }
});

function checker(elementId) {
    let element = document.getElementById(elementId);
    if (element && element.classList.contains('coluna-grade')) {
        if (desenho && !apagar) {
            element.style.backgroundColor = colorButton.value;
        } else if (desenho && apagar) {
            element.style.backgroundColor = 'transparent';
        }
    }
}

clearGridButton.addEventListener('click', () => {
    container.innerHTML = '';
});

eraseBtn.addEventListener('click', () => {
    apagar = true;
});

paintBtn.addEventListener('click', () => {
    apagar = false;
});

gridWidth.addEventListener('input', () => {
    widthValue.innerHTML = gridWidth.value < 10 ? `0${gridWidth.value}` : gridWidth.value;
});

gridHeight.addEventListener('input', () => {
    heightValue.innerHTML = gridHeight.value < 10 ? `0${gridHeight.value}` : gridHeight.value;
});

window.onload = () => {
    gridHeight.value = 0;
    gridWidth.value = 0;
    widthValue.innerHTML = "00";
    heightValue.innerHTML = "00";
};
