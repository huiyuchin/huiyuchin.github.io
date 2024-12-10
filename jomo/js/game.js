const quizData = [
    {
        question: "以下哪款遊戲最受台灣小學生喜愛，特別是因為它能激發創造力？",
        options: ["Minecraft", "Free Fire", "傳說對決", "Candy Crush"],
        answer: 0
    },
    {
        question: "為什麼家長需要了解孩子使用 Roblox 的方式？",
        options: ["遊戲容易上癮", "Roblox 提供玩家間互動，可能有不安全的對話", "它需要課金才能玩", "以上皆是"],
        answer: 3
    },
    {
        question: "當你發現有不友善的留言霸凌訊息時，你應該？",
        options: ["回罵對方","不回應並截圖作為證據", "立刻刪除訊息", "假裝沒看到"],
        answer: 1
    },
    {
        question: "哪一種密碼是最安全的？",
        options: ["123456", "自己的生日", "包含大小寫字母、數字和符號的隨機組合", "自己的名字加一串數字"],
        answer: 2
    },
    {
        question: "如果你在影片中看到有人挑戰危險的行為（如爬高、點火等），你應該怎麼做？",
        options: ["覺得很酷，試著模仿", "分享給朋友，讓他們也看看", "告訴父母或老師，了解這樣做是否安全", "忽略不採取任何行動"],
        answer: 2
    },
    {
        question: "當你模仿網路上的惡作劇行為，可能會導致什麼後果？",
        options: ["變得很受歡迎", "被人批評或面對法律問題", "讓家人覺得你很有創意", "影片會變成病毒式傳播"],
        answer: 1
    },
    {
        question: "Roblox 的遊戲內容主要由誰製作？",
        options: ["專業的遊戲開發公司", "Roblox 官方團隊", "遊戲玩家和用戶", "教育機構"],
        answer: 2
    },
    {
        question: "如果有人在遊戲中問你：『你住在哪裡？』該怎麼回答？",
        options: ["告訴對方你住的城市或街道", "說出你的國家，因為這很常見", "不回答，並告訴家長有陌生人詢問個人資訊", "回答說「這是秘密」，並繼續對話"],
        answer: 2
    },
    {
        question: "當社群媒體上有陌生人發送「恭喜你獲得大獎！」的訊息時，你應該怎麼做？",
        options: ["點擊連結查看如何領獎", "把訊息刪除並忽略", "回覆訊息，詢問獎品細節", "把訊息截圖發給老師或家長，請他們幫忙確認"],
        answer: 3
    },
    {
        question: "下列哪一張不是AI生成式人臉圖片？",
        options: ["img/P.png", "img/P1.png", "img/P2.jpg", "img/P3.png"],
        answer: 2,
        type: "image"
    },
    {
        question: "以下哪一首翻唱歌曲不是由AI生成的版本？",
        options: ["audio/A.mp3", "audio/B.mp3", "audio/C.mp3", "audio/D.mp3"],
        answer: 0,
        type: "audio"
    }
];

class Quiz {
    constructor(quizData, containerElement) {
        this.quizData = quizData;
        this.containerElement = containerElement;
        this.userAnswers = {};
        this.renderQuiz();
    }

    renderQuiz() {
        const quizHTML = `
            <div class="quiz-container mb-5">
                <h1>JOMO遊戲室</h1>
                ${this.quizData.map((q, index) => `
                    <div class="question">
                        <h4>${q.question}</h4>
                        <div class="options">
                            ${q.options.map((option, optionIndex) => {
                                if (q.type === "image") {
                                    return `
                                        <div 
                                            class="option" 
                                            data-question="${index}" 
                                            data-option="${optionIndex}"
                                        >
                                            <img src="${option}" alt="選項 ${optionIndex + 1}">
                                        </div>
                                    `;
                                } else if (q.type === "audio") {
                                    return `
                                        <div 
                                            class="option" 
                                            data-question="${index}" 
                                            data-option="${optionIndex}"
                                        >
                                            <audio src="${option}" controls></audio>
                                        </div>
                                    `;
                                } else {
                                    return `
                                        <div 
                                            class="option" 
                                            data-question="${index}" 
                                            data-option="${optionIndex}"
                                        >
                                            ${option}
                                        </div>
                                    `;
                                }
                            }).join('')}
                        </div>
                    </div>
                `).join('')}
                <button class="submit-btn btn-green">提交答案</button>
            </div>
        `;
        
        this.containerElement.innerHTML = quizHTML;
        this.addEventListeners();
    }

    addEventListeners() {
        const options = this.containerElement.querySelectorAll('.option');
        options.forEach(option => {
            option.addEventListener('click', (e) => {
                const questionIndex = e.target.closest('.option').getAttribute('data-question');
                const optionIndex = e.target.closest('.option').getAttribute('data-option');
                
                options.forEach(opt => {
                    if (opt.getAttribute('data-question') === questionIndex) {
                        opt.classList.remove('selected');
                    }
                });
                
                e.target.closest('.option').classList.add('selected');
                
                this.userAnswers[questionIndex] = parseInt(optionIndex);
            });
        });

        const submitBtn = this.containerElement.querySelector('.submit-btn');
        submitBtn.addEventListener('click', () => this.submitQuiz());
    }

    submitQuiz() {
        let score = 0;
        const options = this.containerElement.querySelectorAll('.option');

        this.quizData.forEach((q, index) => {
            const selectedOption = this.userAnswers[index];
            if (selectedOption === q.answer) {
                score++;
            }

            options.forEach(opt => {
                const questionIndex = opt.getAttribute('data-question');
                const optionIndex = opt.getAttribute('data-option');

                if (parseInt(questionIndex) === index) {
                    opt.classList.remove('selected');
                    if (parseInt(optionIndex) === q.answer) {
                        opt.classList.add('correct');
                    } else if (selectedOption === parseInt(optionIndex)) {
                        opt.classList.add('incorrect');
                    }
                }
            });
        });

        this.showResultModal(score);
    }

    showResultModal(score) {
        const modalHTML = `
            <div class="result-modal">
                <div class="modal-content">
                    <h2>測驗結果</h2>
                    <p>你答對了 ${score} / ${this.quizData.length} 題！</p>
                    <button onclick="document.querySelector('.result-modal').remove()">關閉</button>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz-container');
    new Quiz(quizData, quizContainer);
});
