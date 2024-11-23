const quizData = [
    {
        question: "兒童平均幾歲開始接觸社群媒體？",
        options: ["8歲", "10歲", "12歲", "14歲"],
        answer: 1
    },
    {
        question: "每天使用電腦超過幾小時會增加視力下降的風險？",
        options: ["2小時", "6小時", "10小時", "13小時"],
        answer: 2
    },
    {
        question: "Alpha 世代的孩子最常在哪一個平台上看到別人模仿危險或不良行為？",
        options: ["YouTube", "Twitter", "TikTok", "Instagram"],
        answer: 0
    },
    {
        question: "全球平均每個人每天檢查手機幾次？",
        options: ["25次", "80次", "150次", "200次"],
        answer: 2
    },
    {
        question: "Alpha世代最常玩的遊戲有哪些？",
        options: ["《Minecraft》、《Roblox》", "《模擬市民》、《魔獸世界》", "《部落衝突》、《英雄聯盟》"],
        answer: 0
    },
    {
        question: "根據研究，多少百分比的家長不知道自己的孩子曾遭遇過網路霸凌？",
        options: ["10%", "25%", "40%", "60%"],
        answer: 3
    },
    {
        question: "下列哪一張不是AI生成式人臉圖片？",
        options: ["img/P.png", "img/P1.png", "img/P2.png", "img/P3.png"],
        answer: 0,
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
