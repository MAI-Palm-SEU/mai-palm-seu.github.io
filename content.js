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
             featured contains at most two work ids; figure.paper identifies the illustrated work.
   - activities: dated group events with bilingual titles, descriptions and optional captioned photos.
   - papers: representative PI works and joint works with current students. topic is the primary
             direction; relatedTopics records secondary links. kind is paper, report or book.
             Supporting work and books use the supporting subgroup rather than a fourth direction. */
window.MAI_CONTENT = {
  activities: [],
  members: [
    {
      id: "fan-liu", en: "Fan Liu", zh: "刘帆", role: "Faculty", title: ["Professor", "教授"], since: null,
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
      id: "huilin-chen", en: "Huilin Chen", zh: "陈慧临", role: "PhD",
      institution: ["Joint training · HFUT & NUS", "联合培养 · 合肥工业大学 & 新加坡国立大学"],
      interests: ["Multimedia recommendation · Personalized agents", "多媒体推荐 · 个性化智能体"],
      photo: "assets/people/huilin-chen.jpg",
      links: { homepage: "https://huilinchenjn.github.io/", github: "https://github.com/HuilinChenJN", scholar: "https://scholar.google.com/citations?user=vWoJdWEAAAAJ" },
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
