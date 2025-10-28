// ==================== Supabase配置 ====================
// 请替换为你的Supabase项目URL和anon key
const SUPABASE_URL = 'https://bgacrpaqdgjoobpcknjx.supabase.co'; // 替换为你的Supabase URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnYWNycGFxZGdqb29icGNrbmp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2MTQwNDcsImV4cCI6MjA3NzE5MDA0N30.YoqyHY-FkijdAIuJ3WX-KQcQgAyJIXM2FKV2Dar4gfc'; // 替换为你的Supabase anon key

// 初始化Supabase客户端
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ==================== 数据模型 ====================
let userInfo = {
  username: '',
  phone: '',
  grade: '',
  loginTime: null
};

// ==================== 测评题目 ====================
const questions = [
  // 文综倾向题目（共35题）
  "我对历史事件的因果关系分析很感兴趣",
  "阅读政治新闻时我会思考背后的政策逻辑",
  "我喜欢研究不同地区的地理环境差异",
  "我能轻松记住历史年代和事件",
  "讨论社会现象时我能提出自己的观点",
  "我喜欢绘制地图和分析地形",
  "我对法律条文和案例分析感兴趣",
  "我经常关注国际政治局势",
  "我喜欢研究气候对人类活动的影响",
  "历史纪录片是我喜欢的节目类型",
  "我擅长撰写议论文和社会评论",
  "我能理解不同国家的文化差异",
  "我对哲学问题有探索欲望",
  "我喜欢参加辩论活动",
  "旅游时我会关注当地的人文历史",
  "我能轻松区分不同的政治制度特点",
  "我喜欢收集各地的地理信息",
  "我对经济现象有自己的理解",
  "我喜欢研究古代文明的兴衰",
  "我擅长分析社会问题的解决方案",
  "我能理解地球运动与季节变化的关系",
  "我喜欢阅读历史小说",
  "我关注社会热点话题并思考解决方案",
  "我能看懂复杂的地图和图表",
  "我对心理学和人类行为分析感兴趣",
  "我喜欢研究不同时期的艺术风格",
  "我能理解国际关系的基本准则",
  "我对地质构造和矿产资源分布感兴趣",
  "我喜欢分析文学作品的社会背景",
  "我擅长统计和分析社会数据",
  "我对环境保护和可持续发展感兴趣",
  "我喜欢研究战争与和平的历史",
  "我能理解不同经济体制的特点",
  "我对人口问题和城市化发展感兴趣",
  "我喜欢探讨伦理和道德问题",
  
  // 理综倾向题目（共35题）
  "我对物理公式的推导过程很感兴趣",
  "化学实验中的现象变化让我着迷",
  "我喜欢观察生物的生长和进化过程",
  "我擅长解决数学难题",
  "我对机械原理和工程设计感兴趣",
  "我喜欢研究物质的化学结构",
  "我能理解生物遗传和变异的原理",
  "我喜欢用数学方法解决实际问题",
  "我对电学和磁学现象充满好奇",
  "我喜欢做化学实验并记录结果",
  "我对生态系统的平衡感兴趣",
  "我擅长几何证明和空间想象",
  "我喜欢研究力学原理在生活中的应用",
  "我能理解化学反应的基本原理",
  "我对人体生理结构和功能感兴趣",
  "我喜欢计算和分析数据",
  "我对光学现象和原理感兴趣",
  "我喜欢研究元素周期表的规律",
  "我对微生物世界充满好奇",
  "我擅长逻辑推理和问题分析",
  "我对核能和新能源技术感兴趣",
  "我喜欢研究有机化合物的性质",
  "我对进化论和自然选择感兴趣",
  "我喜欢统计学和概率问题",
  "我对天体物理和宇宙起源感兴趣",
  "我能理解化学平衡和反应速率",
  "我喜欢研究细胞的结构和功能",
  "我擅长数学建模和数据分析",
  "我对量子物理的基本概念感兴趣",
  "我喜欢研究物质的状态变化",
  "我对基因工程和生物技术感兴趣",
  "我喜欢解决物理中的运动学问题",
  "我对化学在生活中的应用感兴趣",
  "我喜欢观察和研究动物行为",
  "我对人工智能和算法原理感兴趣",
  
  // 混合倾向题目（共30题）
  "我既能理解文学作品也能解决科学问题",
  "我喜欢艺术但也对科技发展感兴趣",
  "我擅长语言表达也擅长逻辑推理",
  "我既喜欢历史也喜欢科学史",
  "我能在人文和科学学科中找到平衡点",
  "我喜欢阅读文学作品也喜欢科普文章",
  "我对社会科学和自然科学都有兴趣",
  "我擅长写作也擅长实验操作",
  "我喜欢哲学思考也喜欢科学探索",
  "我对艺术设计和工程设计都感兴趣",
  "我能理解人文关怀也能理解科学精神",
  "我喜欢音乐也喜欢计算机编程",
  "我对经济学和物理学都有兴趣",
  "我擅长记忆也擅长分析",
  "我喜欢诗歌也喜欢数学公式",
  "我对心理学和神经科学都感兴趣",
  "我喜欢手工制作也喜欢科学实验",
  "我能理解文化差异也能理解科学原理",
  "我喜欢历史也喜欢科技史",
  "我对社会学和统计学都感兴趣",
  "我喜欢绘画也喜欢三维建模",
  "我能理解伦理问题也能理解技术难题",
  "我喜欢古典文学也喜欢科幻作品",
  "我对地理信息系统和遥感技术感兴趣",
  "我喜欢政治学也喜欢科学政策",
  "我擅长文字表达也擅长数据可视化",
  "我对宗教学和生命科学都感兴趣",
  "我喜欢传统工艺也喜欢现代科技",
  "我能理解哲学问题也能理解数学问题",
  "我对环境科学和环境政策都感兴趣"
];

// ==================== DOM元素 ====================
const loginSection = document.getElementById('login-section');
const startSection = document.getElementById('start-section');
const testSection = document.getElementById('test-section');
const resultSection = document.getElementById('result-section');
const loginForm = document.getElementById('login-form');
const startBtn = document.getElementById('start-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const saveResultBtn = document.getElementById('save-result');
const progressText = document.getElementById('progress-text');
const progressFill = document.getElementById('progress-fill');
const questionNumber = document.getElementById('question-number');
const questionContent = document.getElementById('question-content');
const optionsContainer = document.getElementById('options-container');

// ==================== 测评状态 ====================
let currentQuestion = 0;
let scores = { liberal: 0, science: 0, mixed: 0 };

// ==================== 事件监听器 ====================

// 登录表单提交
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  userInfo.username = document.getElementById('username').value;
  userInfo.phone = document.getElementById('phone').value;
  userInfo.grade = document.getElementById('grade').value;
  userInfo.loginTime = new Date();
  
  const phoneRegex = /^[0-9]{11}$/;
  if (!phoneRegex.test(userInfo.phone)) {
    alert('请输入有效的11位手机号码');
    return;
  }
  
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
  
  loginSection.classList.add('hidden');
  startSection.classList.remove('hidden');
  window.scrollTo(0, 0);
});

// 开始测评
startBtn.addEventListener('click', () => {
  startSection.classList.add('hidden');
  testSection.classList.remove('hidden');
  window.scrollTo(0, 0);
});

// 上一题
prevBtn.addEventListener('click', () => {
  if (currentQuestion > 0) {
    const selectedOption = document.querySelector('input[name="question"]:checked');
    if (selectedOption) {
      const value = parseInt(selectedOption.value);
      if (currentQuestion < 35) scores.liberal -= value;
      else if (currentQuestion < 70) scores.science -= value;
      else scores.mixed -= value;
    }
    
    currentQuestion--;
    updateQuestion();
    updateNavButtons();
  }
});

// 下一题/提交
nextBtn.addEventListener('click', () => {
  const selectedOption = document.querySelector('input[name="question"]:checked');
  if (!selectedOption) {
    alert('请选择一个选项后继续');
    return;
  }
  
  const value = parseInt(selectedOption.value);
  if (currentQuestion < 35) scores.liberal += value;
  else if (currentQuestion < 70) scores.science += value;
  else scores.mixed += value;
  
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    updateQuestion();
    updateNavButtons();
    window.scrollTo(0, 0);
  } else {
    showResult();
  }
});

// 重新测评
restartBtn.addEventListener('click', () => {
  currentQuestion = 0;
  scores = { liberal: 0, science: 0, mixed: 0 };
  resultSection.classList.add('hidden');
  testSection.classList.remove('hidden');
  updateQuestion();
  updateNavButtons();
  window.scrollTo(0, 0);
});

// 保存结果到Supabase
saveResultBtn.addEventListener('click', async () => {
  const resultData = {
    userInfo: userInfo,
    scores: scores,
    resultType: document.getElementById('result-type').textContent,
    recommendCombo: document.getElementById('recommend-combo').textContent,
    resultAnalysis: document.getElementById('result-analysis').textContent,
    testTime: new Date()
  };
  
  // 保存到localStorage
  localStorage.setItem('testResult', JSON.stringify(resultData));
  
  // 显示加载状态
  const originalText = saveResultBtn.innerHTML;
  saveResultBtn.innerHTML = '<div class="spinner"></div>保存中...';
  saveResultBtn.classList.add('loading');
  
  try {
    // 保存到Supabase
    const { data, error } = await supabase
      .from('test_results')
      .insert([
        {
          username: userInfo.username,
          phone: userInfo.phone,
          grade: userInfo.grade,
          result_type: resultData.resultType,
          recommend_combo: resultData.recommendCombo,
          liberal_score: scores.liberal,
          science_score: scores.science,
          mixed_score: scores.mixed,
          result_analysis: resultData.resultAnalysis,
          test_time: resultData.testTime
        }
      ])
      .select();
    
    if (error) throw error;
    
    alert('结果已成功保存到服务器！');
    
  } catch (error) {
    console.error('保存错误:', error);
    alert('保存到服务器失败，但结果已本地保存。错误: ' + error.message);
  } finally {
    // 恢复按钮状态
    saveResultBtn.innerHTML = originalText;
    saveResultBtn.classList.remove('loading');
  }
  
  // 复制到剪贴板
  const resultText = createResultText(resultData);
  copyToClipboard(resultText);
});

// ==================== 工具函数 ====================

// 创建结果文本
function createResultText(resultData) {
  return `高中选科测评结果\n\n` +
    `用户信息：${userInfo.username} | ${userInfo.phone} | ${userInfo.grade}\n` +
    `测评类型：${resultData.resultType}\n` +
    `推荐组合：${resultData.recommendCombo}\n` +
    `结果分析：${resultData.resultAnalysis}\n\n` +
    `测评时间：${new Date().toLocaleString()}`;
}

// 复制到剪贴板
function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      console.log('结果已复制到剪贴板');
    }).catch(() => {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
}

// 兼容性复制方法
function fallbackCopy(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    console.log('结果已复制到剪贴板');
  } catch (err) {
    console.log('复制失败');
  }
  document.body.removeChild(textArea);
}

// 更新题目显示
function updateQuestion() {
  questionNumber.textContent = `问题 ${currentQuestion + 1}/${questions.length}`;
  questionContent.textContent = questions[currentQuestion];
  progressText.textContent = `${currentQuestion + 1}/${questions.length}`;
  progressFill.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  
  document.querySelectorAll('input[name="question"]').forEach(radio => {
    radio.checked = false;
  });
}

// 更新导航按钮状态
function updateNavButtons() {
  prevBtn.disabled = currentQuestion === 0;
  if (currentQuestion === 0) {
    prevBtn.classList.add('disabled');
  } else {
    prevBtn.classList.remove('disabled');
  }
  
  if (currentQuestion === questions.length - 1) {
    nextBtn.innerHTML = '查看结果 <span class="icon" style="margin-left: 0.25rem;">✅</span>';
  } else {
    nextBtn.innerHTML = '下一题 <span class="icon" style="margin-left: 0.25rem;">→</span>';
  }
}

// 显示测评结果
function showResult() {
  const total = scores.liberal + scores.science + scores.mixed;
  const liberalRate = (scores.liberal / total) * 100;
  const scienceRate = (scores.science / total) * 100;
  const mixedRate = (scores.mixed / total) * 100;
  
  let resultType, comboHtml, analysis;
  
  if (liberalRate >= 40) {
    resultType = { name: "文综倾向", class: "bg-liberal" };
    comboHtml = `
      <span class="px-3 py-1 bg-liberal/20 text-liberal rounded-full text-sm">历史</span>
      <span class="px-3 py-1 bg-liberal/20 text-liberal rounded-full text-sm">地理</span>
      <span class="px-3 py-1 bg-liberal/20 text-liberal rounded-full text-sm">政治</span>
    `;
    analysis = "您在人文社科类题目中表现出较强的兴趣和潜力，对历史事件分析、社会现象解读等领域有天然的敏感度。这类选科组合适合未来报考法学、新闻学、社会学、国际政治等专业方向，能充分发挥您的人文素养和思辨能力。";
  } else if (scienceRate >= 40) {
    resultType = { name: "理综倾向", class: "bg-science" };
    comboHtml = `
      <span class="px-3 py-1 bg-science/20 text-science rounded-full text-sm">物理</span>
      <span class="px-3 py-1 bg-science/20 text-science rounded-full text-sm">化学</span>
      <span class="px-3 py-1 bg-science/20 text-science rounded-full text-sm">生物</span>
    `;
    analysis = "您在自然科学领域表现出明显优势，对物理规律、化学变化和生物现象有浓厚兴趣。这类选科组合适合未来报考医学、工学、理学、计算机等专业方向，能充分发挥您的逻辑思维和科学探究能力。";
  } else {
    resultType = { name: "文理混合", class: "bg-mixed" };
    comboHtml = `
      <span class="px-3 py-1 bg-mixed/20 text-mixed rounded-full text-sm">物理</span>
      <span class="px-3 py-1 bg-mixed/20 text-mixed rounded-full text-sm">地理</span>
      <span class="px-3 py-1 bg-mixed/20 text-mixed rounded-full text-sm">政治</span>
      <span class="px-3 py-1 bg-mixed/20 text-mixed rounded-full text-sm">或 史化生</span>
    `;
    analysis = "您在人文和科学领域均表现出一定兴趣和能力，具有跨学科思维优势。这类选科组合灵活性强，适合未来报考建筑学、经济学、环境科学、心理学等交叉学科专业，能兼顾您的多元发展需求。";
  }
  
  // 更新结果页面
  document.getElementById('result-type').textContent = resultType.name;
  document.getElementById('result-type').className = `${resultType.class} px-6 py-2 rounded-full text-white font-medium text-base`;
  document.getElementById('recommend-combo').innerHTML = comboHtml;
  document.getElementById('result-analysis').textContent = analysis;
  
  // 切换显示
  testSection.classList.add('hidden');
  resultSection.classList.remove('hidden');
  window.scrollTo(0, 0);
}

// ==================== 初始化 ====================
updateQuestion();
updateNavButtons();
