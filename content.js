/* Curated public records; provenance is documented in SOURCES.md.
   Every bilingual value is written as [English, Chinese].
   - members:  everyone in the group, including incoming students, interns and alumni. The people page,
               the home-page group preview and the member report are generated from this list, and these
               names are bold in author lists. Fields:
                 role       Faculty | PhD | Master | Undergrad | Intern (from other universities) | Alumni
                 since      year the person joined the group (null = still to confirm)
                 intake     for incoming students, the admission year
                 degree/now alumni only: degree earned and year (member folder only); current position (shown)
                 institution  external affiliations are shown on member cards; note is retained for provenance
                 interests  short research keywords; cards wrap text when needed
                 links      homepage, scholar, github, orcid, profile (official page), email
   - topics: the three agreed research directions; names, copy, figures and selected works live here.
             featured contains at most two paper ids; figure.paper determines its project link.
   - projects: concrete research projects. Their directions are derived from the papers in themes.
               Empty themes may declare topics for ongoing work; do not add a separate layers list.
   - papers: representative PI works and joint works with current students. topic is the primary
             direction; relatedTopics records secondary links. kind is paper, report or book.
             Supporting work and books use the supporting subgroup rather than a fourth direction. */
window.MAI_CONTENT = {
  members: [
    {
      id: "fan-liu", en: "Fan Liu", zh: "刘帆", role: "Faculty", since: null,
      institution: ["Southeast University", "东南大学"],
      photo: "assets/fan-liu-official.png",
      links: { homepage: "https://liufancs.github.io/", profile: "https://cs.seu.edu.cn/liufan/main.htm", github: "https://github.com/liufancs", orcid: "https://orcid.org/0000-0002-4547-3982", email: "liufan@seu.edu.cn" },
    },
    {
      id: "lifan-zheng", en: "Lifan Zheng", zh: "郑力凡", role: "PhD", since: 2026,
      institution: ["Southeast University", "东南大学"],
      interests: ["LLMs · Agents · Embodied AI", "大语言模型 · 智能体 · 具身智能"],
      photo: "assets/people/lifan-zheng.jpg",
      links: { homepage: "https://z1ivan.github.io/", scholar: "https://scholar.google.com/citations?user=GDaqEpYAAAAJ", github: "https://github.com/z1ivan" },
    },
    {
      id: "enhao-cheng", en: "Enhao Cheng", zh: "程恩浩", role: "PhD", since: 2026,
      institution: ["Southeast University", "东南大学"],
      interests: ["LLMs · Generative RecSys", "大语言模型 · 生成式推荐"],
      photo: "assets/people/enhao-cheng.jpg",
      links: { homepage: "https://chehaoa.github.io/", scholar: "https://scholar.google.com/citations?user=Cou2xGUAAAAJ", github: "https://github.com/chehaoa" },
    },
    {
      id: "yang-tian", en: "Yang Tian", zh: "田阳", role: "PhD", since: 2026,
      institution: ["Shandong University", "山东大学"],
      interests: ["Multimodal RAG · Retrieval agents", "多模态 RAG · 检索智能体"],
      photo: "assets/people/yang-tian.jpg",
      links: { homepage: "https://tyangjn.github.io/", scholar: "https://scholar.google.com/citations?user=4n4O7YAAAAAJ", github: "https://github.com/TyangJN" },
    },
    {
      id: "guotao-chen", en: "Guotao Chen", zh: "陈国涛", role: "Master", since: 2025,
      institution: ["Southeast University", "东南大学"],
      interests: ["LLMs · Embodied AI", "大语言模型 · 具身智能"],
      photo: "assets/people/guotao-chen.jpg",
      links: { scholar: "https://scholar.google.com/citations?user=edPVJ2sAAAAJ", github: "https://github.com/cgt00better-a11y" },
    },
    // Incoming master's students and interns (names supplied by the group, 2026-10).
    {
      id: "yueqing-xing", en: "Yueqing Xing", zh: "邢越卿", role: "Master", intake: 2027,
      institution: ["Southeast University", "东南大学"],
      interests: ["RecSys · Matrix completion · UQ", "推荐系统 · 矩阵补全 · 不确定性量化"],
      note: ["Undergraduate in Cybersecurity, Nanjing University of Science and Technology (2027)", "南京理工大学网络空间安全专业本科（2027 届）"],
      photo: "assets/people/yueqing-xing.jpg",
      links: { homepage: "https://xingyueqing1-source.github.io/", scholar: "https://scholar.google.com/citations?user=F9wLIu8AAAAJ", github: "https://github.com/xingyueqing1-source" },
    },
    {
      id: "yukai-wu", en: "Yukai Wu", zh: "吴钰恺", role: "Master", intake: 2027,
      institution: ["Southeast University", "东南大学"],
      interests: ["Memory · RL · Long-horizon agents", "记忆 · 强化学习 · 长程智能体"],
      note: ["Undergraduate: Beijing Jiaotong University", "本科：北京交通大学"],
      photo: "assets/people/yukai-wu.jpg",
      links: { homepage: "https://mustbeasaltyfish.github.io/" },
    },
    {
      id: "zhiyu-zeng", en: "Zhiyu Zeng", zh: "曾沚玉", role: "Master", intake: 2027,
      institution: ["Southeast University", "东南大学"],
      note: ["Undergraduate: Central South University", "本科：中南大学"],
      photo: "assets/people/zhiyu-zeng.jpg",
      links: { github: "https://github.com/AMHOH" },
    },
    // Undergraduate students.
    { id: "yixuan-zhang", en: "Yixuan Zhang", zh: "张奕轩", role: "Undergrad", since: 2026, interests: ["Multi-agent systems", "多智能体"], photo: "assets/people/yixuan-zhang.jpg", links: {} },
    { id: "xintong-lu", en: "Xintong Lu", zh: "卢欣童", role: "Undergrad", since: 2026, interests: ["Memory · Long-horizon agents", "记忆 · 长程智能体"], photo: "assets/people/xintong-lu.jpg", links: {} },
    { id: "xinyi-li", en: "Xinyi Li", zh: "李欣怡", role: "Undergrad", since: 2026, interests: ["Memory · Long-horizon agents", "记忆 · 长程智能体"], photo: "assets/people/xinyi-li.jpg", links: {} },
    {
      id: "haoran-jing", en: "Haoran Jing", zh: "景浩然", role: "Undergrad", since: 2026,
      institution: ["Southeast University", "东南大学"],
      interests: ["Multimodality", "多模态"],
      note: ["Undergraduate in AI, Chien-Shiung Wu College, Southeast University (since 2025)", "东南大学吴健雄学院人工智能专业本科生（2025 级）"],
      photo: "assets/people/haoran-jing.jpg",
      links: { homepage: "https://jiabo12.github.io/", github: "https://github.com/jiabo12" },
    },
    // Research interns.
    {
      id: "wenxiang-sun", en: "Wenxiang Sun", zh: "孙文翔", role: "Intern", since: 2026,
      institution: ["Nanjing Agricultural University", "南京农业大学"],
      interests: ["Generative RecSys · LLMs", "生成式推荐 · 大语言模型"],
      note: ["Third-year undergraduate in Data Science, College of AI, Nanjing Agricultural University", "南京农业大学人工智能学院数据科学与大数据技术专业本科三年级"],
      photo: "assets/people/wenxiang-sun.jpg",
      links: { homepage: "https://swx0v0.github.io/", github: "https://github.com/swx0v0" },
    },
    { id: "bingzong-liu", en: "Bingzong Liu", zh: "刘秉宗", role: "Intern", since: 2026, institution: ["Xidian University", "西安电子科技大学"], interests: ["Medical imaging · Detection", "医学影像 · 目标检测"], photo: "assets/people/bingzong-liu.jpg", links: { github: "https://github.com/BestSelby" } },
    // Alumni.
    {
      id: "zhenyang-li", en: "Zhenyang Li", zh: "李振阳", role: "Alumni",
      degree: ["Ph.D. (Shandong University), 2024", "山东大学博士，2024"],
      now: ["Research Fellow @ CityU", "香港城市大学 Research Fellow"],
      photo: "assets/people/zhenyang-li.jpg",
      links: { homepage: "https://sdlzy.github.io/", scholar: "https://scholar.google.com/citations?user=1y3RxHMAAAAJ" },
    },
    {
      id: "huilin-chen", en: "Huilin Chen", zh: "陈慧临", role: "Alumni",
      degree: null,
      now: ["Ph.D. student @ HFUT", "合肥工业大学博士生"],
      note: ["Ph.D. student at Hefei University of Technology since 2023 (supervisors Prof. Zhiyong Cheng and Dr. Fan Liu); visiting Ph.D. student at NUS", "2023 年起在合肥工业大学读博（导师程志勇教授、刘帆老师）；现于新加坡国立大学访问"],
      interests: ["Multimedia recommendation · Personalized agents", "多媒体推荐 · 个性化智能体"],
      photo: "assets/people/huilin-chen.jpg",
      links: { homepage: "https://huilinchenjn.github.io/", github: "https://github.com/HuilinChenJN", scholar: "https://scholar.google.com/citations?user=vWoJdWEAAAAJ" },
    },
  ],

  topics: [
    {
      id: "perception",
      en: "Perception & Understanding",
      zh: "感知与理解",
      alias: "multimodal",
      question: ["How can models learn useful representations of the world and of human intent?","如何从多源信息中学习有效表征，理解环境与人的意图？"],
      intro: [
        "Learning representations from images, text and behavior to understand objects, interactions and user preferences.",
        "从图像、文本与行为中学习表征，理解对象、交互关系与用户偏好。"
      ],
      description: [
        "We study how information from different modalities can be represented, combined and interpreted. Our work includes human–object interaction understanding, short-text clustering and robust user–item representations, with recommendation as an application. Related work on visual synthesis and privacy-preserving data supports these studies.",
        "我们研究不同模态信息的表征、融合与理解，涵盖人–物交互、短文本聚类，以及面向推荐的稳健用户与物品表征。视觉生成与隐私保护数据等工作为这些研究提供支撑。"
      ],
      focus: ["Multimodal representation · Visual understanding · Text and preference modeling","多模态表征 · 视觉理解 · 文本与偏好建模"],
      groups: [
        {
          id: "visual",
          en: "Visual understanding and synthesis",
          zh: "视觉理解与生成"
        },
        {
          id: "representation",
          en: "Multimodal and preference representations",
          zh: "多模态与偏好表征"
        },
        {
          id: "text",
          en: "Text understanding",
          zh: "文本理解"
        },
        {
          id: "supporting",
          en: "Supporting work and books",
          zh: "支撑工作与专著"
        }
      ],
      featured: ["hoi-lvlm","i3mrec"],
      figure: {
        paper: "hoi-lvlm",
        src: "assets/research/hoi-framework.png",
        caption: ["ConCue uses contextual cues to improve human–object interaction detection.","ConCue 利用上下文线索改进人–物交互检测。"]
      }
    },
    {
      id: "reasoning",
      en: "Semantic Reasoning",
      zh: "语义推理",
      alias: "foundation",
      question: ["How can models interpret evidence and resolve conflicting knowledge?","如何理解证据中的语义，并协调不同来源的知识？"],
      intro: ["Interpreting semantic aspects and combining internal knowledge with retrieved evidence for grounded answers.","分析语义属性，协调模型内部知识与检索证据，形成有依据的回答。"],
      description: [
        "We study reasoning that draws on both model knowledge and external evidence. CoRe-MMRAG reconciles knowledge from different sources for multimodal question answering; SAGCN uses language models to infer semantic aspects in user reviews and inform recommendation.",
        "我们研究结合模型知识与外部证据的推理。CoRe-MMRAG 协调不同来源的知识，支持多模态问答；SAGCN 借助语言模型分析用户评论中的语义属性，为推荐提供依据。"
      ],
      focus: ["Knowledge reconciliation · Multimodal RAG · Semantic aspect inference","知识协调 · 多模态检索增强生成 · 语义属性推断"],
      groups: [
        {
          id: "knowledge",
          en: "Knowledge-grounded reasoning",
          zh: "基于知识的推理"
        },
        {
          id: "semantics",
          en: "Semantic aspects and user intent",
          zh: "语义属性与用户意图"
        }
      ],
      featured: ["core","sagcn"],
      figure: {
        paper: "core",
        src: "assets/research/core-teaser.jpg",
        caption: ["CoRe-MMRAG reconciles retrieved evidence with a model’s internal knowledge.","CoRe-MMRAG 协调检索证据与模型内部知识。"]
      }
    },
    {
      id: "decision",
      en: "Autonomous Decision-Making",
      zh: "自主决策",
      alias: "autonomous",
      question: ["How can agents choose and execute actions while making progress toward a goal?","智能体如何围绕目标选择并执行行动，并根据反馈调整策略？"],
      intro: ["Planning, tool use and action policies for agents and robots operating over multiple steps.","研究智能体与机器人在多步任务中的规划、工具调用和动作策略。"],
      description: [
        "Our work studies how agents gather evidence, manage context and act over extended tasks. MM-ContextFold supports multimodal agentic retrieval, FIG uses iterative retrieval to ground image generation, and our MetaFine entry refines robot policies through evaluation-guided demonstrations. Memory and multi-agent collaboration are ongoing topics.",
        "我们研究智能体在长程任务中如何获取证据、管理上下文并执行行动。MM-ContextFold 支持多模态智能体检索，FIG 通过迭代检索为图像生成提供证据，MetaFine 方案利用评估反馈改进示范与机器人策略。记忆与多智能体协作是正在探索的课题。"
      ],
      focus: ["Agentic retrieval · Context and memory · Robot policies","智能体检索 · 上下文与记忆 · 机器人策略"],
      groups: [],
      featured: ["contextfold","metafine"],
      figure: {
        paper: "fig",
        src: "assets/research/fig-motivation.png",
        caption: ["FIG uses open multimodal retrieval to provide evidence for factual image generation.","FIG 通过开放多模态检索，为事实性图像生成提供证据。"]
      }
    }
  ],

  projects: [
    {
      id: "multimodal-models",
      en: "Multimodal Models & Representations",
      zh: "多模态模型与表征",
      since: 2024,
      until: null,
      image: "assets/research/hoi-framework.png",
      imageCaption: [
        "ConCue: a large vision-language model generates cues about the people, their body language and the environment, which guide human–object interaction detection (ACM MM 2025).",
        "ConCue：视觉语言大模型生成关于人物、肢体动作与环境的线索，用于人–物交互检测（ACM MM 2025）。"
      ],
      imageSource: "https://arxiv.org/abs/2311.16475",
      question: ["How can models represent visual and textual information, and use it to understand scenes and answer questions?","如何表征视觉与文本信息，用于理解场景和回答问题？"],
      summary: ["Visual and text representations, knowledge-grounded multimodal reasoning, and visual synthesis.","视觉与文本表征、基于知识的多模态推理，以及视觉生成。"],
      overview: [
        [
          "This project connects perception and understanding with semantic reasoning. We study representations of visual and textual information, contextual cues for interaction detection, and the use of external knowledge in multimodal question answering.",
          "ConCue generates contextual cues for human–object interaction detection. NMVM combines word-level features and semantic embeddings to cluster short texts without fixing the number of clusters in advance. CoRe-MMRAG reconciles model knowledge with retrieved evidence. Related work on free-viewpoint human reenactment explores visual synthesis under unseen poses."
        ],
        [
          "本项目连接感知理解与语义推理，研究视觉和文本信息的表征、交互检测中的上下文线索，以及多模态问答中的外部知识利用。",
          "ConCue 为人–物交互检测生成上下文线索；NMVM 结合词级特征与语义嵌入，在不预设类别数量的情况下聚类短文本；CoRe-MMRAG 协调模型知识与检索证据。相关的人体重演工作探索未见姿态下的自由视角图像合成。"
        ]
      ],
      themes: [
        {
          en: "Visual understanding with vision-language models",
          zh: "视觉语言大模型与视觉理解",
          text: [
            "Using large vision-language models to supply context for fine-grained visual tasks such as human–object interaction detection.",
            "借助视觉语言大模型，为人–物交互检测等细粒度视觉任务提供上下文。"
          ],
          papers: ["hoi-lvlm"]
        },
        {
          en: "Short-text representations and clustering",
          zh: "短文本表征与聚类",
          text: ["Combining word-level evidence with semantic embeddings to discover interpretable text clusters.","结合词级信息与语义嵌入，发现可解释的文本簇。"],
          papers: ["nmvm"]
        },
        {
          en: "Knowledge reconciliation and multimodal RAG",
          zh: "知识协调与多模态检索增强",
          text: ["Reconciling what a model knows with what it retrieves from text and images.","协调模型内部知识与从文本、图像中检索到的知识。"],
          papers: ["core"]
        },
        {
          en: "Visual synthesis",
          zh: "视觉生成",
          text: ["Synthesizing people from free viewpoints in poses never seen in training.","在训练中未见过的新姿态下，从自由视角合成人体图像。"],
          papers: ["reenactment"]
        }
      ],
      members: ["yang-tian","guotao-chen","haoran-jing"]
    },
    {
      id: "autonomous-agents",
      en: "Autonomous Agents",
      zh: "自主智能体",
      since: 2025,
      until: null,
      image: "assets/research/fig-motivation.png",
      imageCaption: [
        "Generating a factual image from parametric knowledge, closed-domain retrieval and open multimodal retrieval (from the FIG paper, ACM MM 2026).",
        "分别依靠模型参数、封闭域检索与开放多模态检索生成事实性图像的对比（图取自 ACM MM 2026 的 FIG 论文）。"
      ],
      imageSource: "https://arxiv.org/abs/2510.22521",
      question: ["How can agents plan, remember and work together over long tasks, and act on their own in open environments?","智能体如何在长程任务中规划、记忆与协作，在开放环境中自主行动？"],
      summary: ["Agentic multimodal retrieval, memory for long-horizon tasks, and multi-agent systems and social simulation.","多模态智能体检索、面向长程任务的记忆，以及多智能体系统与社会模拟。"],
      overview: [
        [
          "An autonomous agent has to do more than answer a single question. It plans over many steps, searches and reads, keeps track of what it has found, and sometimes works with other agents. This project studies the abilities that such long tasks require.",
          "MM-ContextFold (ACM MM 2026) keeps an agent's plan in a persistent text-only context and sends image-dependent subtasks to short-lived branches, which fold their findings back as text. ORIG (ACM MM 2026) retrieves and filters text and image evidence from the open web before generating an image, and the accompanying FIG-Eval benchmark measures factuality. Ongoing work in the group studies memory and reinforcement learning for long-horizon agents, multi-agent collaboration, and social simulation with language-model agents."
        ],
        [
          "自主智能体要做的不只是回答一个问题：它需要多步规划、检索与阅读，记住已经发现的内容，有时还要与其他智能体协作。本项目研究这类长程任务所需要的能力。",
          "MM-ContextFold（ACM MM 2026）用只含文本的持久上下文负责规划，把依赖图像的子任务交给临时分支处理，分支再把发现以文本形式折叠回主上下文。ORIG（ACM MM 2026）在生成图像前从开放网络检索并筛选文本与图像证据，配套的 FIG-Eval 基准用于评估生成结果的事实性。组内正在进行的工作包括：长程智能体的记忆与强化学习、多智能体协作，以及基于大语言模型智能体的社会模拟。"
        ]
      ],
      themes: [
        {
          en: "Agentic retrieval and grounded generation",
          zh: "智能体检索与有据生成",
          text: ["Agents that search across text and images over many rounds, and generation grounded in retrieved evidence.","跨文本与图像多轮检索的智能体，以及以检索证据为依据的生成。"],
          papers: ["contextfold","fig"]
        },
        {
          en: "Memory and long-horizon tasks",
          zh: "记忆与长程任务",
          text: [
            "How agents keep, organize and use what they have seen over long tasks, and how reinforcement learning can train them to do so.",
            "智能体如何在长程任务中保存、组织和使用已获得的信息，以及如何用强化学习训练这种能力。"
          ],
          papers: [],
          topics: ["decision"]
        },
        {
          en: "Multi-agent systems and social simulation",
          zh: "多智能体与社会模拟",
          text: ["Several agents working together, and language-model agents that simulate social behavior.","多个智能体的协作，以及用大语言模型智能体模拟社会行为。"],
          papers: [],
          topics: ["decision"]
        }
      ],
      members: ["lifan-zheng","yang-tian","yukai-wu","yixuan-zhang","xintong-lu","xinyi-li"]
    },
    {
      id: "embodied-intelligence",
      en: "Embodied Intelligence",
      zh: "具身智能",
      since: 2026,
      until: null,
      image: "assets/research/metafine-real.jpg",
      imageCaption: ["A real-robot scene from the MetaFine benchmark: a robot arm and letter blocks.","MetaFine 基准中的真实机器人场景：机械臂与字母积木。"],
      imageSource: "https://metafine.github.io/",
      question: ["How can a robot turn an instruction and what it sees into precise, reliable actions?","机器人如何把指令和所见转化为精确、可靠的动作？"],
      summary: [
        "Vision-language-action policies for fine-grained robot manipulation; first place in the MetaFine Open Competition at CoRL 2026.",
        "面向细粒度机器人操作的视觉-语言-动作策略；获 CoRL 2026 MetaFine 公开赛第一名。"
      ],
      overview: [
        [
          "Fine-grained manipulation leaves little room for error: a robot has to ground the right object attribute, perceive local spatial structure precisely and move within physical constraints. The MetaFine benchmark evaluates these abilities separately, along instruction understanding, perception and controlled execution, which makes it possible to see where a policy fails.",
          "For the MetaFine Open Competition (RoboFineMani Workshop, CoRL 2026), the group fine-tuned a separate π0.5 policy for each of the five tasks. Local evaluation exposed recurring grasping, pushing and insertion failures. The team revised the demonstrated motions and added expert continuations from states the policy actually reached, while keeping the nominal demonstrations in training, and compared checkpoints instruction by instruction so that a gain on one instruction could not hide a loss on another. The submission, MAI, ranked first overall with a score of 96.66."
        ],
        [
          "细粒度操作几乎不容出错：机器人需要找准物体的局部属性，精确感知局部空间结构，并在物理约束下完成动作。MetaFine 基准从指令理解、感知与动作执行三个方面分别评估这些能力，从而能看清策略在哪里失败。",
          "在 MetaFine 公开赛（CoRL 2026 RoboFineMani Workshop）中，团队为五个任务分别微调了 π0.5 策略。本地评估暴露出反复出现的抓取、推动与插入失败；团队据此修改示范动作，并从策略实际到达的状态补充专家接续，同时保留原始示范参与训练；不同检查点按每条指令逐一比较，避免一条指令上的提升掩盖另一条上的退步。最终提交的 MAI 以 96.66 分获总成绩第一。"
        ]
      ],
      themes: [
        {
          en: "Vision-language-action policies for fine-grained manipulation",
          zh: "视觉-语言-动作策略与细粒度操作",
          text: ["Fine-tuning VLA policies for precise manipulation, and refining demonstrations by what evaluation reveals.","为精细操作微调视觉-语言-动作策略，并依据评估暴露的问题改进示范。"],
          papers: ["metafine"]
        }
      ],
      members: ["lifan-zheng","guotao-chen"]
    },
    {
      id: "recommendation",
      en: "Intelligent Recommendation",
      zh: "智能推荐",
      since: 2022,
      until: null,
      image: "assets/research/sagcn.png",
      imageCaption: [
        "A large language model reads user reviews for the semantic aspects behind user–item interactions (from the ACM TOIS 2025 paper).",
        "大语言模型从用户评论中读出交互背后的语义属性（图取自 ACM TOIS 2025 论文）。"
      ],
      imageSource: "https://arxiv.org/abs/2312.16275",
      question: [
        "How can recommender systems understand users from images, text, behavior and language, and move from matching items to generating recommendations?",
        "推荐系统如何从图像、文本、行为与语言中理解用户，并从匹配物品走向生成式推荐？"
      ],
      summary: [
        "Multimodal representations, graph collaborative filtering, privacy-preserving data and recommendation with large language models.",
        "多模态表征、图协同过滤、隐私保护数据，以及大语言模型驱动的推荐。"
      ],
      overview: [
        [
          "This project applies perception and understanding and semantic reasoning to recommendation. Images, descriptions, reviews and interaction graphs provide complementary evidence about user preferences. Current work also explores language-model-based recommendation.",
          "DMRL models factor-specific modality preferences; SGFD distills useful multimodal features; AD-DRL uses item attributes to guide representation disentanglement; and I³-MRec addresses missing modalities. ClusterGCF improves representations with cluster-specific interaction graphs, while SAGCN extracts semantic aspects from reviews. UPC-SDG provides privacy-preserving synthetic data, and the GCN monograph brings together related methods. Generative recommendation is an ongoing topic."
        ],
        [
          "本项目将感知理解与语义推理应用于推荐，利用图像、描述、评论与交互图中的互补信息建模用户偏好，并探索大语言模型驱动的推荐方法。",
          "DMRL 建模不同偏好因素下的模态权重，SGFD 蒸馏有效的多模态特征，AD-DRL 以物品属性引导表征解耦，I³-MRec 处理模态缺失。ClusterGCF 利用特定簇的交互图改进表征，SAGCN 从评论中提取语义属性。UPC-SDG 提供隐私保护合成数据，GCN 专著总结相关方法。生成式推荐是正在探索的课题。"
        ]
      ],
      themes: [
        {
          en: "Multimodal recommendation",
          zh: "多模态推荐",
          text: ["Modeling users and items from images and text: disentanglement, distillation and missing modalities.","从图像与文本建模用户和物品：解耦表征、特征蒸馏与模态缺失。"],
          papers: ["i3mrec","addrl","sgfd","dmrl"]
        },
        {
          en: "Graph collaborative filtering",
          zh: "图协同过滤",
          text: [
            "Graph convolutional networks for recommendation, from cluster-based collaborative filtering to a monograph on the topic.",
            "图卷积网络推荐：从基于聚类的协同过滤，到这一方向的专著。"
          ],
          papers: ["gcn-book","clustergcf"]
        },
        {
          en: "Privacy-preserving recommendation",
          zh: "隐私保护推荐",
          text: ["Synthetic interaction data that keeps recommendation useful while protecting user privacy.","在保护用户隐私的同时保持推荐效果的合成交互数据。"],
          papers: ["upc-sdg"]
        },
        {
          en: "Large language models and generative recommendation",
          zh: "大模型与生成式推荐",
          text: [
            "Language models that read reviews for the aspects users care about; work on generative recommendation is ongoing.",
            "用语言模型从评论中读出用户关心的属性；生成式推荐方面的工作正在进行中。"
          ],
          papers: ["sagcn"]
        }
      ],
      members: ["enhao-cheng","yueqing-xing","wenxiang-sun"]
    }
  ],

  papers: [
    {
      id: "metafine",
      short: "MetaFine (1st place)",
      title: "Evaluation-Guided Demonstration Refinement for Vision-Language-Action Policies: The Winning Entry in the MetaFine Open Competition",
      year: 2026,
      venue: "arXiv",
      distinction: ["1st Place, MetaFine Open Competition @ CoRL 2026","MetaFine 公开赛第一名（CoRL 2026）"],
      topic: "decision",
      members: ["lifan-zheng","guotao-chen"],
      authors: ["Lifan Zheng","Guotao Chen","Zhenyang Li","Shujie Cui","Qiang Huang","Fan Liu"],
      paper: "https://arxiv.org/abs/2610.36765",
      summary: [
        "Refining demonstrations by what evaluation reveals: the winning entry in the MetaFine fine-grained manipulation competition.",
        "依据评估暴露的问题改进示范：MetaFine 细粒度操作竞赛的冠军方案。"
      ],
      kind: "report"
    },
    {
      id: "contextfold",
      short: "MM-ContextFold",
      title: "MM-ContextFold: Context Folding for Multimodal Agentic Retrieval",
      year: 2026,
      venue: "ACM MM",
      distinction: "Oral",
      topic: "decision",
      members: ["yang-tian"],
      authors: ["Yang Tian","Fan Liu","Jingyuan Zhang","Zhenyang Li","Yupeng Hu","Liqiang Nie"],
      paper: "https://arxiv.org/abs/2609.23121",
      code: "https://github.com/iLearn-Lab/MM26-MMContextFold",
      summary: [
        "Keep the plan, load images when needed: context folding for agents working through long multimodal retrieval tasks.",
        "保留主线规划，按需加载图像：通过上下文折叠，支持智能体完成长程多模态检索任务。"
      ],
      kind: "paper"
    },
    {
      id: "fig",
      short: "FIG",
      title: "Open Multimodal Retrieval-Augmented Factual Image Generation",
      year: 2026,
      venue: "ACM MM",
      distinction: "Oral",
      topic: "decision",
      members: ["yang-tian"],
      authors: ["Yang Tian","Fan Liu","Jingyuan Zhang","Wei Bi","Yupeng Hu","Liqiang Nie"],
      paper: "https://arxiv.org/abs/2510.22521",
      code: "https://github.com/iLearn-Lab/MM26-FIG",
      dataset: "https://huggingface.co/datasets/TyangJN/FIG",
      summary: ["Retrieve real-world evidence before generating an image, and evaluate how factual the result is.","先检索真实世界的证据再生成图像，并评估生成结果的事实性。"],
      kind: "paper",
      relatedTopics: ["reasoning"]
    },
    {
      id: "nmvm",
      short: "NMVM",
      title: "A Non-parametric Multi-view Model for Short Text Clustering",
      year: 2026,
      venue: "KDD",
      topic: "perception",
      group: "text",
      members: ["enhao-cheng"],
      authors: ["Enhao Cheng","Xiaolong Zheng","Jintong Li","Juncheng Hou","Fan Liu","Xuemeng Song","Tian Gan","Jianhua Yin"],
      paper: "https://doi.org/10.1145/3770855.3817827",
      code: "https://github.com/chehaoa/NMVM",
      summary: [
        "Combine word-level evidence with language-model embeddings to cluster short texts without fixing the number of clusters in advance.",
        "结合词级信息与语言模型嵌入，在不预先指定聚类数量的情况下完成短文本聚类。"
      ],
      kind: "paper"
    },
    {
      id: "core",
      short: "CoRe-MMRAG",
      title: "CoRe-MMRAG: Cross-Source Knowledge Reconciliation for Multimodal RAG",
      year: 2025,
      venue: "ACL",
      topic: "reasoning",
      group: "knowledge",
      members: ["yang-tian"],
      authors: ["Yang Tian","Fan Liu","Jingyuan Zhang","Victoria W.","Yupeng Hu","Liqiang Nie"],
      paper: "https://aclanthology.org/2025.acl-long.1583/",
      code: "https://github.com/iLearn-Lab/ACL25-COREMMRAG",
      summary: [
        "Reconcile what a model knows with what it retrieves, bringing visual and textual evidence together for knowledge-based question answering.",
        "协调模型内部知识与外部检索结果，整合视觉和文本证据，支持基于知识的问答。"
      ],
      kind: "paper"
    },
    {
      id: "sagcn",
      short: "SAGCN",
      title: "Understanding Before Recommendation: Semantic Aspect-Aware Review Exploitation via Large Language Models",
      year: 2025,
      venue: "ACM TOIS",
      topic: "reasoning",
      group: "semantics",
      members: [],
      authors: ["Fan Liu","Yaqi Liu","Huilin Chen","Zhiyong Cheng","Liqiang Nie","Mohan Kankanhalli"],
      paper: "https://doi.org/10.1145/3704999",
      code: "https://github.com/HuilinChenJN/LLMSAGCN",
      summary: [
        "Use large language models to extract semantic aspects from reviews and build finer-grained representations for recommendation.",
        "利用大语言模型提取评论中的语义属性，为推荐构建更细粒度的表示。"
      ],
      kind: "paper"
    },
    {
      id: "hoi-lvlm",
      short: "ConCue",
      title: "Enhancing HOI Detection with Contextual Cues from Large Vision-Language Models",
      year: 2025,
      venue: "ACM MM",
      topic: "perception",
      group: "visual",
      members: [],
      authors: ["Yu-Wei Zhan","Fan Liu","Xin Luo","Xin-Shun Xu","Liqiang Nie","Mohan Kankanhalli"],
      paper: "https://doi.org/10.1145/3746027.3755566",
      summary: [
        "A large vision-language model describes the people, their body language and the surroundings; these cues help detect how people interact with objects.",
        "视觉语言大模型描述图中人物、肢体动作与环境，这些线索帮助识别人与物体之间的交互。"
      ],
      kind: "paper"
    },
    {
      id: "i3mrec",
      short: "I³-MRec",
      title: "I³-MRec: Invariant Learning with Information Bottleneck for Incomplete Modality Recommendation",
      year: 2025,
      venue: "ACM MM",
      topic: "perception",
      group: "representation",
      members: [],
      authors: ["Huilin Chen","Miaomiao Cai","Fan Liu","Zhiyong Cheng","Richang Hong","Meng Wang"],
      paper: "https://doi.org/10.1145/3746027.3755410",
      summary: [
        "Invariant learning with an information bottleneck keeps multimodal recommendation reliable when some modalities are missing.",
        "借助不变学习与信息瓶颈，在部分模态缺失时保持多模态推荐的可靠性。"
      ],
      kind: "paper"
    },
    {
      id: "gcn-book",
      short: "GCN for RecSys (book)",
      title: "Advancing Recommender Systems with Graph Convolutional Networks",
      year: 2025,
      venue: "Springer",
      distinction: ["Monograph","专著"],
      topic: "perception",
      group: "supporting",
      members: [],
      authors: ["Fan Liu","Liqiang Nie"],
      paper: "https://doi.org/10.1007/978-3-031-85093-6",
      summary: [
        "A monograph on graph convolutional networks for recommendation: interest-aware message passing, cluster-based collaborative filtering, semantic aspects, attribute-aware attention and light graph transformers.",
        "关于图卷积网络推荐的专著：兴趣感知的消息传递、基于聚类的协同过滤、语义属性、属性感知注意力与轻量图 Transformer。"
      ],
      kind: "book",
      relatedTopics: ["reasoning"]
    },
    {
      id: "addrl",
      short: "AD-DRL",
      title: "Attribute-driven Disentangled Representation Learning for Multimodal Recommendation",
      year: 2024,
      venue: "ACM MM",
      topic: "perception",
      group: "representation",
      members: [],
      authors: ["Zhenyang Li","Fan Liu","Yinwei Wei","Zhiyong Cheng","Liqiang Nie","Mohan Kankanhalli"],
      paper: "https://doi.org/10.1145/3664647.3681148",
      code: "https://github.com/iLearn-Lab/ACMMM24-AD-DRL",
      summary: ["Item attributes guide the disentanglement of multimodal representations for recommendation.","以物品属性为引导，解耦用于推荐的多模态表征。"],
      kind: "paper"
    },
    {
      id: "clustergcf",
      short: "ClusterGCF",
      title: "Cluster-based Graph Collaborative Filtering",
      year: 2024,
      venue: "ACM TOIS",
      topic: "perception",
      group: "representation",
      members: [],
      authors: ["Fan Liu","Shuai Zhao","Zhiyong Cheng","Liqiang Nie","Mohan Kankanhalli"],
      paper: "https://dl.acm.org/doi/abs/10.1145/3687481",
      code: "https://github.com/zhao254014/ClusterGCF",
      summary: ["Graph collaborative filtering built on the cluster structure of the user–item graph.","利用用户–物品交互图中的聚类结构进行图协同过滤。"],
      kind: "paper"
    },
    {
      id: "reenactment",
      short: "Free-viewpoint reenactment",
      title: "Open-set Synthesis for Free-viewpoint Human Body Reenactment of Novel Poses",
      year: 2024,
      venue: "IEEE TCSVT",
      topic: "perception",
      group: "visual",
      members: [],
      authors: ["Zhicheng Sheng","Fan Liu","Meng Liu","Feng Zheng","Liqiang Nie"],
      paper: "https://ieeexplore.ieee.org/abstract/document/10613821",
      summary: ["Synthesizing a person from free viewpoints in poses never seen in training.","在训练中未见过的新姿态下，从自由视角合成人体图像。"],
      kind: "paper"
    },
    {
      id: "sgfd",
      short: "SGFD",
      title: "Semantic-Guided Feature Distillation for Multimodal Recommendation",
      year: 2023,
      venue: "ACM MM",
      topic: "perception",
      group: "representation",
      members: [],
      authors: ["Fan Liu","Huilin Chen","Zhiyong Cheng","Liqiang Nie","Mohan Kankanhalli"],
      paper: "https://arxiv.org/abs/2308.03113",
      code: "https://github.com/HuilinChenJN/SGFD",
      summary: ["Semantic guidance distills the parts of image and text features that matter for recommendation.","以语义为引导，从图像与文本特征中提炼出对推荐有用的信息。"],
      kind: "paper"
    },
    {
      id: "upc-sdg",
      short: "Privacy-preserving data synthesis",
      title: "Privacy-Preserving Synthetic Data Generation for Recommendation Systems",
      year: 2022,
      venue: "SIGIR",
      topic: "perception",
      group: "supporting",
      members: [],
      authors: ["Fan Liu","Zhiyong Cheng","Huilin Chen","Yinwei Wei","Liqiang Nie","Mohan Kankanhalli"],
      paper: "https://dl.acm.org/doi/abs/10.1145/3477495.3532044",
      code: "https://github.com/HuilinChenJN/UPC-SDG",
      summary: ["Synthetic user–item data that protects privacy while keeping recommendation useful.","生成保护用户隐私、同时保持推荐效果的合成交互数据。"],
      kind: "paper"
    },
    {
      id: "dmrl",
      short: "DMRL",
      title: "Disentangled Multimodal Representation Learning for Recommendation",
      year: 2022,
      venue: "IEEE TMM",
      topic: "perception",
      group: "representation",
      members: [],
      authors: ["Fan Liu","Huilin Chen","Zhiyong Cheng","Anan Liu","Liqiang Nie","Mohan Kankanhalli"],
      paper: "https://arxiv.org/abs/2203.05406",
      code: "https://github.com/liufancs/DMRL",
      summary: ["Disentangling how much each modality matters to a user, factor by factor, for multimodal recommendation.","按偏好因素解耦各模态对用户的作用，用于多模态推荐。"],
      kind: "paper"
    }
  ],
};
