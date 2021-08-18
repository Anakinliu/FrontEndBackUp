window.onload = main;
console.log('ok')
const lcoalKey = 'history-max-score';
const len = 4;
// 数组和item容器div内span的值一一对应
let matrix = [...Array(len)].map(() => Array(len).fill(0));
const colorMap = {
    0: '#ffffff',
    2: '#E74C3C',
    4: '#A569BD',
    8: '#3498DB',
    16: '#1ABC9C',
    32: '#F1C40F',
    64: '#E67E22',
    128: '#F1C40F',
    256: '#1ABC9C',
    512: '#3498DB',
    1024: '#A569BD',
    2048: '#E74C3C',
    4096: '#E67E22',
    8192: '#F1C40F',
    16384: '#1ABC9C',
    32768: '#3498DB',
    65536: '#A569BD',
    131072: '#E74C3C'
}

let stepCount = 0;  // 总步数
let stepSpan = null;  // 显示步数的span

let maxSpan = null;  // 显示最大数
let maxCell = 0;
let maxHistory = 2;

let infoDiv = null;

function canMergeCellRound(i, j, v) {
    if (i - 1 >= 0 && v === matrix[i - 1][j]) {
        return true;
    }
    if (i + 1 <= (len - 1) && v === matrix[i + 1][j]) {
        return true;
    }
    if (j - 1 >= 0 && v === matrix[i][j - 1]) {
        return true;
    }
    if (j + 1 <= (len - 1) && v === matrix[i][j + 1]) {
        return true;
    }
    return false;
}

// 是否游戏结束,true为游戏结束
function checkGameOver() {
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (matrix[i][j] === 0) {
                return false;
            }
            if (canMergeCellRound(i, j, matrix[i][j])) {
                return false;
            }
        }
    }
    // 没有任何返回false条件被触发,则此局游戏已结束!
    return true;
}

// 从arr数组中随机抽取一个数
function choiceOneElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// 所有item内值清空
function clearMatrix() {
    // 新建二维数组,元素置为0
    matrix = [...Array(len)].map(() => Array(len).fill(0));
    // matrix = [[0, 65536, 32768, 32768], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]  // 这种情况,右移变32,左移是两个16
}




// 随机在matrix中值为0的元素中选择一个位置,
// 设值为value
function randomOneCell(value) {
    // 找出matrix中值为0的索引
    let arr = [];
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (matrix[i][j] === 0) {
                arr.push([i, j]);
            }
        }
    }
    function canContinue() {

        if (arr.length === 0) {  // 无法移动,显示提示
            if (checkGameOver()) {
                infoDiv.style.display = 'block';
                infoDiv.firstElementChild.textContent = '游戏已结束!';
            } else {
                infoDiv.style.display = 'block';
                infoDiv.firstElementChild.textContent = '无效移动!';
            }
        } else {  // 可以移动
            // 不可见提示
            infoDiv.style.display = 'none';

            // 从非0索引中选择一个索引赋值value
            let [x, y] = choiceOneElement(arr);
            matrix[x][y] = value;

            // 更新步数,可以移动时才记作有效移动次数
            stepCount += 1;
        }
    }
    canContinue();

}

// 映射matrix到div
function mapMatrixToDiv() {
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            let value = matrix[i][j];
            let element = document.querySelector(`div[x='${i}'][y='${j}']`);
            // matrix元素值非0,设置值,由于值的文字颜色白色,所以会和背景色在一起,看不出来有值
            if (value) {
                // 位数大于4时,调小字号
                if (value.toString().length > 4) {
                    element.firstElementChild.style.fontSize = '1rem'
                    element.firstElementChild.textContent = value;
                } else {
                    element.firstElementChild.style.fontSize = '1.5rem'
                    element.firstElementChild.textContent = value;
                }

            }
            // 不管matrix元素值,都要设置背景色
            element.style.backgroundColor = colorMap[value];
        }
    }
}

function updateHistory() {
    maxHistory = Math.max(maxCell, maxHistory);
    localStorage.setItem(lcoalKey, maxHistory);
    historySpan.textContent = maxHistory;
}

// 刷新游戏,初始化
function initGame() {

    // 清空matrix
    clearMatrix();

    //随机设置两个位置的值为2或者4
    randomOneCell(choiceOneElement([2, 4]))
    mapMatrixToDiv();
    randomOneCell(choiceOneElement([2, 4]))
    mapMatrixToDiv();

    // console.log(matrix);

    // 步数清0
    stepCount = 0;
    updateInfoSpan();

    // 设置历史最大值
    updateHistory()

}

function moveUp() {
    for (let i = 0; i < len; i++) {
        for (let j = 1; j < len; j++) {
            // 非 0 元素
            if (matrix[j][i]) {
                let k = j;
                while (k >= 1 && matrix[k - 1][i] === 0) {
                    k -= 1;
                }
                if (k === 0) {
                    matrix[k][i] = matrix[j][i];
                    matrix[j][i] = 0;
                } else {
                    if (matrix[k - 1][i] === matrix[j][i]) {
                        matrix[k - 1][i] += matrix[k - 1][i];
                        // 更新最大数
                        maxCell = Math.max(maxCell, matrix[k - 1][i]);

                        matrix[j][i] = 0;
                    } else if (k !== j) {
                        matrix[k][i] = matrix[j][i];
                        matrix[j][i] = 0;
                    }
                }
            }
        }
    }
}

function moveDown() {
    for (let i = 0; i < len; i++) {
        for (let j = len - 2; j >= 0; j--) {
            // 只看非 0 元素
            if (matrix[j][i]) {
                let k = j;
                while (k <= (len - 2) && matrix[k + 1][i] === 0) {
                    k += 1;
                }
                if (k === (len - 1)) {
                    matrix[k][i] = matrix[j][i];
                    matrix[j][i] = 0;
                } else {
                    if (matrix[k + 1][i] === matrix[j][i]) {
                        matrix[k + 1][i] += matrix[k + 1][i];
                        // 更新最大数
                        maxCell = Math.max(maxCell, matrix[k + 1][i]);
                        matrix[j][i] = 0;
                    } else if (k !== j) {
                        matrix[k][i] = matrix[j][i];
                        matrix[j][i] = 0;
                    }
                }
            }
        }
    }
}

function moveLeft() {
    for (let i = 0; i < len; i++) {
        for (let j = 1; j < len; j++) {
            // 非 0 元素
            if (matrix[i][j]) {
                let k = j;
                while (k >= 1 && matrix[i][k - 1] === 0) {
                    k -= 1;
                }
                if (k === 0) {
                    matrix[i][k] = matrix[i][j];
                    matrix[i][j] = 0;
                } else {
                    if (matrix[i][k - 1] === matrix[i][j]) {
                        matrix[i][k - 1] += matrix[i][k - 1];
                        // 更新最大数
                        maxCell = Math.max(maxCell, matrix[i][k - 1]);
                        matrix[i][j] = 0;
                    } else if (k !== j) {
                        matrix[i][k] = matrix[i][j];
                        matrix[i][j] = 0;
                    }
                }
            }
        }
    }
}

function moveRight() {
    for (let i = 0; i < len; i++) {
        // j从索引len-2开始计算,是因为最右边的元素暂时不用看
        for (let j = len - 2; j >= 0; j--) {
            // 非 0 元素
            if (matrix[i][j]) {
                let k = j;
                while (k <= (len - 2) && matrix[i][k + 1] === 0) {
                    k += 1;
                }
                // 最右边没有元素时,直接赋值
                if (k === (len - 1)) {
                    matrix[i][k] = matrix[i][j];
                    // 原来的位置清0
                    matrix[i][j] = 0;
                } else {
                    // 可以合并值,k+1位置是非空的
                    if (matrix[i][k + 1] === matrix[i][j]) {
                        matrix[i][k + 1] += matrix[i][k + 1];
                        // 更新最大数
                        maxCell = Math.max(maxCell, matrix[i][k + 1]);
                        matrix[i][j] = 0;
                    } else if (k !== j) {
                        // 不能合并值且k位置为空元素
                        matrix[i][k] = matrix[i][j];
                        matrix[i][j] = 0;
                    }
                }
            }
        }
    }
}

function updateInfoSpan() {
    stepSpan.textContent = stepCount;
    maxSpan.textContent = maxCell;
}

// 核心是移动时如何设置 matrix
function moveCell(event) {
    let keyBoard = event.keyCode;
    if (keyBoard == '38') {
        console.log('上箭头');
        moveUp();
        randomOneCell(choiceOneElement([2, 4]))
        mapMatrixToDiv();
    }
    if (keyBoard == '40') {
        console.log('下箭头');
        moveDown();
        randomOneCell(choiceOneElement([2, 4]))
        mapMatrixToDiv();
    }
    if (keyBoard == '37') {
        console.log('左箭头');
        moveLeft();
        randomOneCell(choiceOneElement([2, 4]))
        mapMatrixToDiv();
    }
    if (keyBoard == '39') {
        console.log('右箭头');
        moveRight();
        randomOneCell(choiceOneElement([2, 4]))
        mapMatrixToDiv();
    }

    // 更新步数
    updateInfoSpan();
}


function main() {
    stepSpan = document.querySelector(".step-count");
    maxSpan = document.querySelector(".max-cell");
    historySpan = document.querySelector('.history-max')
    infoDiv = document.querySelector(".alert");

    // 刷新事件监听
    document.querySelector(".fresh").addEventListener('click', initGame);
    // 按键事件监听
    document.addEventListener('keyup', moveCell);

    maxHistory = localStorage.getItem(lcoalKey);

    // 页面加载完时第一次初始化
    initGame();
}
