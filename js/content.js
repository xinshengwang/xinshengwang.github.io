const SITE = {
  meta: {
    title: 'Xinsheng Wang — Audio Generation & Understanding',
    description:
      'Research Scientist at Soul AI Lab. Leading open-source projects in speech generation, understanding, and interaction.',
  },
  nav: {
    about: 'About',
    experience: 'Experience',
    news: 'News',
    projects: 'Projects',
    contact: 'Contact',
  },
  hero: {
    name: 'Xinsheng Wang',
    nameCn: '王新升',
    title: 'Research Scientist & Tech Lead',
    affiliation: 'Multimodal Interaction Team · Soul AI Lab',
    tagline:
      'I build speech-centric AI across the full loop of interaction, understanding, and generation — from real-time full-duplex dialogue to expressive voice and singing synthesis.',
    emailCta: 'Email',
    scholarCta: 'Google Scholar',
    githubCta: 'GitHub',
  },
  education: {
    label: 'Education',
    items: [
      {
        short: 'HKUST',
        degree: 'Postdoc',
        advisor: 'Prof. Wei Xue',
        advisorUrl: 'http://wei-xue.com/',
      },
      {
        short: 'XJTU',
        degree: 'Ph.D.',
        advisor: 'Prof. Jihua Zhu',
        advisorUrl: 'https://gr.xjtu.edu.cn/zhujh/',
      },
      {
        short: 'TU Delft',
        degree: 'Visiting Ph.D.',
        advisor: 'Prof. Odette Scharenborg',
        advisorUrl: 'https://odettescharenborg.wordpress.com/',
      },
      {
        short: 'NWPU',
        degree: 'Visiting Ph.D.',
        advisor: 'Prof. Lei Xie',
        advisorUrl: 'https://teacher.nwpu.edu.cn/xielei.html',
      },
    ],
  },
  stats: {
    githubLabel: 'GitHub stars',
    scholarLabel: 'Citations',
    pubLabel: 'Publications',
  },
  about: {
    title: 'About',
    html: `<p>I lead the Multimodal Interaction Team at <a href="https://soul-ailab.github.io/" target="_blank" rel="noopener">Soul AI Lab</a>, where we explore the next generation of human–AI interaction through speech, audio, and multimodal technologies.</p>
<p>My work focuses on building end-to-end systems that enable AI to listen, speak, sing, and interact naturally. I am particularly interested in bridging foundation models and real-world user experiences, transforming research advances into practical products.</p>
<p>As a first or corresponding author, I have led several open-source projects, including <a href="https://wenet-e2e.github.io/opencpop/" target="_blank" rel="noopener">OpenCpop</a>, <a href="https://sparkaudio.github.io/spark-tts/" target="_blank" rel="noopener">Spark-TTS</a>, <a href="https://soul-ailab.github.io/soulx-podcast" target="_blank" rel="noopener">SoulX-Podcast</a>, <a href="https://soul-ailab.github.io/soulx-singer/" target="_blank" rel="noopener">SoulX-Singer</a>, <a href="https://soul-ailab.github.io/soulx-duplug/" target="_blank" rel="noopener">SoulX-Duplug</a>, and <a href="https://soul-ailab.github.io/soulx-transcriber/" target="_blank" rel="noopener">SoulX-Transcriber</a>.</p>`,
  },
  experience: {
    title: 'Work Experience',
    items: [
      {
        date: '2025.06 – present',
        role: 'Research Scientist and Tech Lead',
        org: 'Soul AI Lab',
        url: 'https://soul-ailab.github.io/',
        current: true,
      },
      {
        date: '2024.06 – 2025.06',
        role: 'Postdoctoral Researcher',
        org: 'The Hong Kong University of Science and Technology',
        url: 'https://www.hkust.edu.hk/',
        current: false,
      },
      {
        date: '2022.03 – 2024.06',
        role: 'Research Scientist',
        org: 'miHoYo',
        url: null,
        current: false,
      },
    ],
  },
  news: {
    title: 'News',
    items: [
      {
        date: '2026.06.02',
        html: 'Released <a href="https://soul-ailab.github.io/soulx-transcriber/" target="_blank" rel="noopener">SoulX-Transcriber</a>',
      },
      {
        date: '2026.04.07',
        html: '<a href="https://github.com/Soul-AILab/SAC" target="_blank" rel="noopener">SAC</a> accepted to ACL 2026',
      },
      {
        date: '2026.03.17',
        html: 'Released <a href="https://soulx-duplug.sjtuxlance.com/" target="_blank" rel="noopener">SoulX-Duplug</a>',
      },
      {
        date: '2026.02.08',
        html: 'Released <a href="https://soul-ailab.github.io/soulx-singer/" target="_blank" rel="noopener">SoulX-Singer</a>',
      },
      {
        date: '2026.01.26',
        html: '<a href="https://arxiv.org/pdf/2509.21144" target="_blank" rel="noopener">UniSS</a> accepted to ICLR 2026',
      },
      {
        date: '2025.10.27',
        html: 'Released <a href="https://soul-ailab.github.io/soulx-podcast" target="_blank" rel="noopener">SoulX-Podcast</a>',
      },
      {
        date: '2025.03.04',
        html: 'Released <a href="https://github.com/sparkaudio/spark-tts" target="_blank" rel="noopener">Spark-TTS</a>',
      },
    ],
  },
  projects: {
    title: 'Projects',
    badges: {
      corresponding: 'Corresponding Author',
      first: 'First Author',
      leader: 'Project Leader',
    },
    links: {
      demo: 'Demo',
      paper: 'Paper',
      code: 'Code',
      hf: 'HuggingFace',
    },
    items: [
      {
        id: 'transcriber',
        title: 'SoulX-Transcriber',
        subtitle: 'Multi-Speaker Speech Transcription',
        about:
          'An end-to-end multi-speaker transcription system for long-form conversational audio. Jointly solves speaker attribution and speech recognition — who spoke, when, and what — with robust performance under rapid speaker switching and complex dialogue.',
        badges: ['corresponding', 'leader'],
        demo: 'https://soul-ailab.github.io/soulx-transcriber/',
        paper: 'http://arxiv.org/abs/2606.02400',
        code: 'https://github.com/Soul-AILab/SoulX-Transcriber',
        hf: 'https://huggingface.co/Soul-AILab/SoulX-Transcriber',
        video: 'assets/videos/soulx-transcriber-demo.mp4',
        poster: 'assets/images/poster-transcriber.svg',
      },
      {
        id: 'duplug',
        title: 'SoulX-Duplug',
        subtitle: 'Realtime Full-Duplex Speech Conversation',
        about:
          'A plug-and-play streaming semantic VAD model for real-time full-duplex speech conversation. Text-guided streaming state prediction enables low-latency, semantic-aware dialogue management in production systems.',
        badges: ['corresponding', 'leader'],
        demo: 'https://soulx-duplug.sjtuxlance.com/',
        paper: 'https://arxiv.org/pdf/2603.14877',
        code: 'https://github.com/Soul-AILab/SoulX-Duplug',
        hf: 'https://huggingface.co/Soul-AILab/SoulX-Duplug-0.6B',
        video: 'assets/videos/soulx-duplug-demo.mp4',
        poster: 'assets/images/poster-duplug.svg',
        reverse: true,
      },
      {
        id: 'singer',
        title: 'SoulX-Singer',
        subtitle: 'Zero-Shot Singing Voice Synthesis',
        about:
          'A high-fidelity zero-shot singing voice synthesis model for unseen singers. Supports melody-conditioned (F0 contour) and score-conditioned (MIDI notes) control for precise pitch, rhythm, and expression.',
        badges: ['corresponding', 'leader'],
        demo: 'https://soul-ailab.github.io/soulx-singer/',
        paper: 'https://github.com/Soul-AILab/SoulX-Singer/blob/main/assets/technical-report.pdf',
        code: 'https://github.com/Soul-AILab/SoulX-Singer',
        hf: 'https://huggingface.co/Soul-AILab/SoulX-Singer',
        video: 'assets/videos/soulx-singer-demo.mp4',
        poster: 'assets/images/poster-singer.svg',
      },
      {
        id: 'podcast',
        title: 'SoulX-Podcast',
        subtitle: 'Long-form Podcast Generation',
        about:
          'Podcast-style multi-turn, multi-speaker dialogic speech generation with paralinguistic controls. Supports Mandarin, English, and Chinese dialects including Sichuanese, Henanese, and Cantonese.',
        badges: ['corresponding', 'leader'],
        demo: 'https://soul-ailab.github.io/soulx-podcast',
        paper: 'https://arxiv.org/pdf/2510.23541',
        code: 'https://github.com/Soul-AILab/SoulX-Podcast',
        hf: 'https://huggingface.co/collections/Soul-AILab/soulx-podcast',
        video: 'assets/videos/soulx-podcast-demo.mp4',
        poster: 'assets/images/poster-podcast.svg',
        reverse: true,
      },
      {
        id: 'spark-tts',
        title: 'Spark-TTS',
        subtitle: 'LLM-Based Text-to-Speech',
        about:
          'Built on BiCodec, a single-stream speech codec decomposing speech into semantic and global tokens. Combined with Qwen2.5 LLM and chain-of-thought generation for coarse- and fine-grained voice control.',
        badges: ['first', 'leader'],
        demo: 'https://sparkaudio.github.io/spark-tts/',
        paper: 'https://arxiv.org/pdf/2503.01710',
        code: 'https://github.com/SparkAudio/Spark-TTS',
        hf: 'https://huggingface.co/SparkAudio/Spark-TTS-0.5B',
        youtube: 'kswY1uMN90g',
        poster: 'assets/images/poster-spark-tts.svg',
      },
    ],
  },
  contact: {
    email: 'Email',
    github: 'GitHub',
    scholar: 'Google Scholar',
  },
  footer: {
    text: '© 2026 Xinsheng Wang',
  },
  video: {
    play: 'Play demo',
  },
};
