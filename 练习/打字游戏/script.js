const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'FUCK',
];
// store the list of words and the index of the word the player is currently typing
let words = [];  // 当前句子的练习组成的数组
let wordIndex = 0;
// the starting time
let startTime = Date.now();
// page elements
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');

document.getElementById('start').addEventListener('click', () => {  // 点击开始按钮
    // 从quotes里随机获取一个句子
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];

    // 把句子字符串分为数组
    words = quote.split(' ');

    // 追踪当前在句子的第几个单词上
    wordIndex = 0;

    // UI updates
    // Create an array of span elements so we can set a class
    const spanWords = words.map(function (word) { return `<span>${word} </span>` });
    // Convert into string and set as innerHTML on quote display
    quoteElement.innerHTML = spanWords.join('');  // 数组合并成字符串
    // Highlight the first word
    quoteElement.childNodes[0].className = 'highlight';  // 高亮第一个单词,在style.css中定义了highlight
    // Clear any prior messages
    messageElement.innerText = '';  // 清空消息

    // Setup the textbox
    // Clear the textbox
    typedValueElement.value = '';  // 清空输入框
    // set focus
    typedValueElement.focus();  // 光标聚焦到输入框
    // set the event handler

    // Start the timer
    startTime = new Date().getTime();
});

typedValueElement.addEventListener('input', () => {
    // 得到当前单词
    const currentWord = words[wordIndex];
    // 得到当前输入的值
    const typedValue = typedValueElement.value;

    if (typedValue === currentWord && wordIndex === words.length - 1) {
        // 全部打完了,显示消息
        const elapsedTime = new Date().getTime() - startTime;
        const message = `CONGRATULATIONS! You finished in ${elapsedTime / 1000} seconds.`;
        messageElement.innerText = message;

    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
        // 打完了一个单词
        // clear the typedValueElement for the new word
        typedValueElement.value = '';        

        // move to the next word
        wordIndex++;

        // reset the class name for all elements in quote
        quoteElement.childNodes[wordIndex].className = '';
        // for (const wordElement of quoteElement.childNodes) {
        //     wordElement.className = '';
        // }
        
        // highlight the new word
        quoteElement.childNodes[wordIndex].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
        // currently correct
        // highlight the next word
        typedValueElement.className = '';
    } else {
        // error state
        typedValueElement.className = 'error';
    }
});