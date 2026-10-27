/* Curated public records; provenance is documented in SOURCES.md. */
window.MAI_CONTENT = {
  "members": [
    {
      "id": "lifan-zheng",
      "en": "Lifan Zheng",
      "zh": "郑力凡",
      "role": "PhD",
      "institution": [
        "Southeast University",
        "东南大学"
      ],
      "interests": [
        "LLMs · AI agents · Social simulation",
        "大语言模型 · 智能体 · 社会模拟"
      ],
      "photo": "assets/people/lifan-zheng.jpg",
      "links": [
        [
          "Homepage",
          "个人主页",
          "https://z1ivan.github.io/"
        ],
        [
          "Scholar",
          "学术主页",
          "https://scholar.google.com/citations?user=GDaqEpYAAAAJ"
        ]
      ]
    },
    {
      "id": "enhao-cheng",
      "en": "Enhao Cheng",
      "zh": "程恩浩",
      "role": "PhD",
      "institution": [
        "Southeast University",
        "东南大学"
      ],
      "interests": [
        "Generative recommendation · Agents",
        "生成式推荐 · 智能体"
      ],
      "photo": "assets/people/enhao-cheng.jpg",
      "links": [
        [
          "Scholar",
          "学术主页",
          "https://scholar.google.com/citations?user=Cou2xGUAAAAJ&hl=en"
        ]
      ]
    },
    {
      "id": "yang-tian",
      "en": "Yang Tian",
      "zh": "田阳",
      "role": "PhD",
      "institution": [
        "Shandong University",
        "山东大学"
      ],
      "interests": [
        "Multimodal retrieval agents · Multimodal RAG",
        "多模态检索智能体 · 多模态 RAG"
      ],
      "photo": "assets/people/yang-tian.jpg",
      "links": [
        [
          "Homepage",
          "个人主页",
          "https://tyangjn.github.io/"
        ],
        [
          "GitHub",
          "GitHub",
          "https://github.com/TyangJN"
        ]
      ]
    },
    {
      "id": "guotao-chen",
      "en": "Guotao Chen",
      "zh": "陈国涛",
      "role": "Master",
      "institution": [
        "Southeast University",
        "东南大学"
      ],
      "interests": [
        "Large language models",
        "大语言模型"
      ],
      "photo": null,
      "links": [
        [
          "Scholar",
          "学术主页",
          "https://scholar.google.com/citations?user=edPVJ2sAAAAJ&hl=zh-CN"
        ]
      ]
    }
  ],
  "topics": [
    {
      "id": "multimodal",
      "en": "Multimodal understanding",
      "zh": "多模态理解",
      "description": [
        "Learning from visual, textual, and behavioral signals, with a focus on representations and evidence across knowledge sources.",
        "从视觉、文本与行为信号中学习，关注多模态表征和跨来源知识的理解与整合。"
      ],
      "focus": [
        "Multimodal representation · Knowledge reconciliation · Recommendation",
        "多模态表征 · 知识协调 · 推荐系统"
      ],
      "papers": [
        "core",
        "addrl"
      ]
    },
    {
      "id": "foundation",
      "en": "Foundation models",
      "zh": "基础模型",
      "description": [
        "Understanding and using the semantic capabilities of large models for retrieval, recommendation, and learning from sparse data.",
        "研究大模型的语义理解能力，探索其在检索、推荐与稀疏数据学习中的应用。"
      ],
      "focus": [
        "Language models · Semantic learning · Information retrieval",
        "语言模型 · 语义学习 · 信息检索"
      ],
      "papers": [
        "nmvm",
        "sagcn"
      ]
    },
    {
      "id": "autonomous",
      "en": "Autonomous intelligence",
      "zh": "自主智能",
      "description": [
        "Agents that plan, use tools, and interact with the world. Current work explores multimodal retrieval and evidence-grounded generation.",
        "研究能够规划、调用工具并与环境交互的智能体，当前工作包括多模态检索和基于事实证据的生成。"
      ],
      "focus": [
        "Tool use · Context management · Agentic retrieval",
        "工具调用 · 上下文管理 · 智能体检索"
      ],
      "papers": [
        "contextfold",
        "fig"
      ]
    }
  ],
  "papers": [
    {
      "id": "contextfold",
      "short": "MM-ContextFold",
      "title": "MM-ContextFold: Context Folding for Multimodal Agentic Retrieval",
      "year": 2026,
      "venue": "ACM MM",
      "distinction": "Oral",
      "scope": "group",
      "topic": "autonomous",
      "members": [
        "yang-tian"
      ],
      "authors": [
        "Yang Tian",
        "Fan Liu",
        "Jingyuan Zhang",
        "Zhenyang Li",
        "Yupeng Hu",
        "Liqiang Nie"
      ],
      "image": "assets/research/contextfold.jpg",
      "paper": "https://arxiv.org/abs/2609.23121",
      "code": "https://github.com/iLearn-Lab/MM26-MMContextFold",
      "source": "https://tyangjn.github.io/",
      "summary": [
        "Keep the plan, load images when needed. A context-folding framework for agents working through extended multimodal retrieval tasks.",
        "保留主线规划，按需加载图像。通过上下文折叠，支持智能体完成长程多模态检索任务。"
      ],
      "detail": [
        "MM-ContextFold separates long-term planning from image-dependent subtasks. A persistent text context carries the plan; short-lived branches inspect images and return concise findings to that context.",
        "MM-ContextFold 将长期规划与依赖图像的子任务分开：持续保留的文本上下文负责主线规划，临时分支处理图像，并将简洁的结果返回主线上下文。"
      ]
    },
    {
      "id": "fig",
      "short": "Factual Image Generation",
      "title": "Open Multimodal Retrieval-Augmented Factual Image Generation",
      "year": 2026,
      "venue": "ACM MM",
      "distinction": "Oral",
      "scope": "group",
      "topic": "autonomous",
      "members": [
        "yang-tian"
      ],
      "authors": [
        "Yang Tian",
        "Fan Liu",
        "Jingyuan Zhang",
        "Wei Bi",
        "Yupeng Hu",
        "Liqiang Nie"
      ],
      "image": "assets/research/fig.jpg",
      "paper": "https://arxiv.org/abs/2510.22521",
      "code": "https://github.com/iLearn-Lab/MM26-FIG",
      "dataset": "https://huggingface.co/datasets/TyangJN/FIG",
      "source": "https://tyangjn.github.io/",
      "summary": [
        "Retrieve real-world evidence before generating an image. An agentic approach to improving factual consistency in visual generation.",
        "先检索真实世界的证据，再生成图像。通过智能体检索，提高图像生成的事实一致性。"
      ],
      "detail": [
        "ORIG retrieves and filters text and image evidence from the open web, then builds enriched prompts for image generation. The accompanying FIG-Eval benchmark evaluates factual grounding across different categories and dimensions.",
        "ORIG 从开放网络检索并筛选文本与图像证据，再将其整合为更充分的提示词，引导图像生成。配套的 FIG-Eval 基准从不同类别与维度评估生成结果的事实依据。"
      ]
    },
    {
      "id": "nmvm",
      "short": "Non-parametric multi-view learning",
      "title": "A Non-parametric Multi-view Model for Short Text Clustering",
      "year": 2026,
      "venue": "KDD",
      "scope": "group",
      "topic": "foundation",
      "members": [
        "enhao-cheng"
      ],
      "authors": [
        "Enhao Cheng",
        "Xiaolong Zheng",
        "Jintong Li",
        "Juncheng Hou",
        "Fan Liu",
        "Xuemeng Song",
        "Tian Gan",
        "Jianhua Yin"
      ],
      "image": null,
      "paper": "https://doi.org/10.1145/3770855.3817827",
      "code": "https://github.com/chehaoa/NMVM",
      "source": "https://api.crossref.org/works/10.1145/3770855.3817827",
      "summary": [
        "Combine word-level evidence with language-model embeddings to cluster short texts without fixing the number of clusters in advance.",
        "结合词级信息与语言模型嵌入，在不预先指定聚类数量的情况下完成短文本聚类。"
      ],
      "detail": [
        "NMVM integrates sparse word features with dense semantic embeddings in a non-parametric model. The two views provide complementary evidence for clustering short texts.",
        "NMVM 在非参数模型中整合稀疏的词特征与稠密的语义嵌入，通过两种视角的互补信息实现短文本聚类。"
      ]
    },
    {
      "id": "core",
      "short": "CoRe-MMRAG",
      "title": "CoRe-MMRAG: Cross-Source Knowledge Reconciliation for Multimodal RAG",
      "year": 2025,
      "venue": "ACL",
      "scope": "group",
      "topic": "multimodal",
      "members": [
        "yang-tian"
      ],
      "authors": [
        "Yang Tian",
        "Fan Liu",
        "Jingyuan Zhang",
        "Victoria W.",
        "Yupeng Hu",
        "Liqiang Nie"
      ],
      "image": "assets/research/core.png",
      "paper": "https://aclanthology.org/2025.acl-long.1583/",
      "code": "https://github.com/iLearn-Lab/ACL25-COREMMRAG",
      "source": "https://aclanthology.org/2025.acl-long.1583/",
      "summary": [
        "Reconcile what a model knows with what it retrieves, bringing visual and textual evidence together for knowledge-based question answering.",
        "协调模型内部知识与外部检索结果，整合视觉和文本证据，支持基于知识的问答。"
      ],
      "detail": [
        "CoRe-MMRAG combines an internal response, multimodal evidence selection, an external response, and final answer integration. Its training scheme supports distinguishing and reconciling different knowledge sources.",
        "CoRe-MMRAG 依次生成内部回答、筛选多模态证据、生成外部回答并整合最终答案，配合训练策略区分和协调不同来源的知识。"
      ]
    },
    {
      "id": "sagcn",
      "short": "Understanding before recommendation",
      "title": "Understanding Before Recommendation: Semantic Aspect-Aware Review Exploitation via Large Language Models",
      "year": 2025,
      "venue": "ACM TOIS",
      "scope": "faculty",
      "topic": "foundation",
      "members": [],
      "authors": [
        "Fan Liu",
        "Yaqi Liu",
        "Huilin Chen",
        "Zhiyong Cheng",
        "Liqiang Nie",
        "Mohan Kankanhalli"
      ],
      "image": "assets/research/sagcn.png",
      "paper": "https://doi.org/10.1145/3704999",
      "code": "https://github.com/HuilinChenJN/LLMSAGCN",
      "source": "https://arxiv.org/abs/2312.16275",
      "summary": [
        "Use large language models to extract semantic aspects from reviews and build more informative representations for recommendation.",
        "利用大语言模型提取评论中的语义属性，为推荐构建更细粒度的表示。"
      ],
      "detail": [
        "The method extracts semantic aspects from user reviews using large language models, then models the resulting interactions with a Semantic Aspect-based Graph Convolution Network.",
        "该方法借助大语言模型提取用户评论中的语义属性，并通过基于语义属性的图卷积网络建模细粒度交互。"
      ]
    },
    {
      "id": "addrl",
      "short": "Attribute-driven representations",
      "title": "Attribute-driven Disentangled Representation Learning for Multimodal Recommendation",
      "year": 2024,
      "venue": "ACM MM",
      "scope": "faculty",
      "topic": "multimodal",
      "members": [],
      "authors": [
        "Zhenyang Li",
        "Fan Liu",
        "Yinwei Wei",
        "Zhiyong Cheng",
        "Liqiang Nie",
        "Mohan Kankanhalli"
      ],
      "image": null,
      "paper": "https://doi.org/10.1145/3664647.3681148",
      "code": "https://github.com/iLearn-Lab/ACMMM24-AD-DRL",
      "source": "https://arxiv.org/abs/2312.14433",
      "summary": [
        "Learn disentangled representations guided by item attributes, connecting visual and textual information for recommendation.",
        "以物品属性引导解耦表征学习，将视觉与文本信息用于推荐。"
      ],
      "detail": [
        "AD-DRL connects item attributes with disentangled multimodal representations. This selected faculty work studies how attribute information can guide learning across modalities for recommendation.",
        "AD-DRL 将物品属性与多模态解耦表征相结合，研究如何利用属性信息引导跨模态学习，服务于推荐任务。"
      ]
    }
  ]
};
