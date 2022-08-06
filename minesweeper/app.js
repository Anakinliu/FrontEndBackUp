function bfs(arr1, arr2, r, c, rLim, cLim) {// 0区域向外扩展，直到遇到标号区域
    // arr1: 标号数组， arr2：可见性数组
    if (0 < arr1[r][c]) {
        arr2[r][c] = true;
        return
    }
    if (true === arr2[r][c]) {  // 访问过的正好用到arr2标记，避免无限循环调用访问造成栈溢出
        return
    }
    if (arr1[r][c] === 0) {
        arr2[r][c] = true;
    }
    if (c + 1 < cLim) {
        bfs(arr1, arr2, r, c + 1, rLim, cLim);
    }
    if (c - 1 >= 0) {
        bfs(arr1, arr2, r, c - 1, rLim, cLim);
    }
    if (r + 1 < rLim) {
        bfs(arr1, arr2, r + 1, c, rLim, cLim);
    }
    if (r - 1 >= 0) {
        bfs(arr1, arr2, r - 1, c, rLim, cLim);
    }
}
const app = Vue.createApp({
    data() {
        return {
            row: 9,
            col: 12,
            boardArr: [],
            mineCount: 10,
            firstStep: true,
            isGameOver: false,
            visibleArr: [],
            flagArr: [],
        }
    },
    created() {
        this.boardArr = Array(this.row).fill(0).map(e => Array(this.col).fill(0));
        this.visibleArr = Array(this.row).fill(false).map(e => Array(this.col).fill(false));
        this.flagArr = Array(this.row).fill(false).map(e => Array(this.col).fill(false));
    },
    computed: {

    },
    methods: {
        reloadPage() {
            location.reload();
        },
        initCellClass(rIdx, cIdx) {
            // 初始化棋盘颜色
            return {
                'bg-1': (cIdx % 2 === 0 && rIdx % 2 === 0) || (cIdx % 2 === 1 && rIdx % 2 === 1),
                'bg-2': (cIdx % 2 === 0 && rIdx % 2 === 1) || (cIdx % 2 === 1 && rIdx % 2 === 0),
            }
        },
        placeFlag(rIdx, cIdx) {
            this.flagArr[rIdx][cIdx] = !this.flagArr[rIdx][cIdx];
        },
        checkCell(rIdx, cIdx) {
            if (true === this.flagArr[rIdx][cIdx]) {
                return;
            }
            if (this.firstStep) { // 第一次点击时不能直接踩雷
                this.generateMine(rIdx, cIdx);
                this.generateAnswer();
                this.firstStep = false;
                console.log('first click is done');
                bfs(this.boardArr, this.visibleArr, rIdx, cIdx, this.row, this.col);
            } else {
                if (true === this.isGameOver) {
                    // alert('刷新重开！')
                    return;
                } else {
                    // 正常游戏流程的点击
                    if (false === isNaN(this.boardArr[rIdx][cIdx])) {// 非 雷 cell
                        bfs(this.boardArr, this.visibleArr, rIdx, cIdx, this.row, this.col);
                    } else { // 点中雷   
                        this.visibleArr[rIdx][cIdx] = true;
                        this.isGameOver = true;
                        // alert('你踩雷了！')
                        return;  // 游戏结束
                    }
                }
            }
        },
        generateMine(r, c) {
            const mineSet = new Set();
            const cellCount = this.row * this.col;
            while (mineSet.size < this.mineCount) {
                let n = parseInt(Math.random() * cellCount);
                if (n !== r * this.col + c) {
                    mineSet.add(n);
                }
            }
            for (let e of mineSet) {
                this.boardArr[parseInt(e / this.col)][e % this.col] = NaN;
            }
            // console.log(this.boardArr);
        },
        generateAnswer() {
            let r = 0;
            let c = 0;
            for (; r < this.row; r++) {
                for (c = 0; c < this.col; c++) {
                    if (isNaN(this.boardArr[r][c])) {
                        if (c + 1 < this.col) {
                            this.boardArr[r][c + 1] += 1;
                        }
                        if (c - 1 >= 0) {
                            this.boardArr[r][c - 1] += 1;
                        }
                        if (r + 1 < this.row) {
                            this.boardArr[r + 1][c] += 1;
                        }
                        if (r - 1 >= 0) {
                            this.boardArr[r - 1][c] += 1;
                        }
                        if (c + 1 < this.col && r + 1 < this.row) {
                            this.boardArr[r + 1][c + 1] += 1;
                        }
                        if (c + 1 < this.col && r - 1 >= 0) {
                            this.boardArr[r - 1][c + 1] += 1;
                        }
                        if (c - 1 >= 0 && r + 1 < this.row) {
                            this.boardArr[r + 1][c - 1] += 1;
                        }
                        if (c - 1 >= 0 && r - 1 >= 0) {
                            this.boardArr[r - 1][c - 1] += 1;
                        }
                    }
                }
            }
        }
    }
})

app.mount('#game');