import { Module, Question, Comment } from "./types";

export const INITIAL_MODULES: Module[] = [
  {
    id: "module-boolean",
    title: "Aljabar Boolean",
    badge: "Logic & Digital System",
    description: "Belajar konsep dasar Boolean, operator logika, hukum Boolean, bentuk kanonik, SOP/POS, rangkaian logika, dan Karnaugh Map.",
    progress: 0,
    lessons: [
      { id: "boolean-intro", title: "Pengantar Aljabar Boolean", slug: "pengentar-aljabar-boolean", duration: "10 Menit", difficulty: "Dasar" },
      { id: "boolean-def", title: "Definisi Aljabar Boolean", slug: "definisi-aljabar-boolean", duration: "15 Menit", difficulty: "Dasar" },
      { id: "boolean-2-values", title: "Aljabar Boolean 2-Nilai", slug: "aljabar-boolean-2-nilai", duration: "12 Menit", difficulty: "Dasar" },
      { id: "boolean-expr", title: "Ekspresi Boolean", slug: "ekspresi-boolean", duration: "15 Menit", difficulty: "Menengah" },
      { id: "boolean-laws", title: "Hukum-Hukum Aljabar Boolean", slug: "hukum-hukum-aljabar-boolean", duration: "20 Menit", difficulty: "Menengah" },
      { id: "boolean-function", title: "Fungsi Boolean", slug: "fungsi-boolean", duration: "15 Menit", difficulty: "Menengah" },
      { id: "boolean-sop-pos", title: "Bentuk Kanonik SOP dan POS", slug: "bentuk-kanonik-sop-dan-pos", duration: "25 Menit", difficulty: "Menengah" },
      { id: "boolean-minterm-maxterm", title: "Minterm dan Maxterm", slug: "minterm-dan-maxterm", duration: "18 Menit", difficulty: "Menengah" },
      { id: "boolean-logic-circuit", title: "Rangkaian Logika", slug: "rangkaian-logika", duration: "20 Menit", difficulty: "Lanjut" },
      { id: "boolean-gates", title: "Gerbang AND, OR, NOT, NAND, NOR, XOR, XNOR", slug: "gerbang-logika", duration: "22 Menit", difficulty: "Dasar" },
      { id: "boolean-simplification", title: "Penyederhanaan Fungsi Boolean", slug: "penyederhanaan-fungsi-boolean", duration: "25 Menit", difficulty: "Lanjut" },
      { id: "boolean-kmap", title: "Peta Karnaugh (K-Map)", slug: "peta-karnaugh", duration: "30 Menit", difficulty: "Lanjut" },
      { id: "boolean-practice", title: "Latihan Aljabar Boolean", slug: "latihan-aljabar-boolean", duration: "15 Menit", difficulty: "Menengah" }
    ]
  },
  {
    id: "module-probability",
    title: "Peluang, Kombinasi, dan Permutasi",
    badge: "Probability & Counting",
    description: "Belajar teori kemungkinan, nilai tempat, aturan pengisian tempat, permutasi, kombinasi, kombinasi pengulangan, dan penerapannya.",
    progress: 0,
    lessons: [
      { id: "prob-theory", title: "Teori Kemungkinan", slug: "teori-kemungkinan", duration: "12 Menit", difficulty: "Dasar" },
      { id: "prob-place-value", title: "Nilai Tempat", slug: "nilai-tempat", duration: "10 Menit", difficulty: "Dasar" },
      { id: "prob-filling-slots", title: "Aturan Pengisian Tempat", slug: "aturan-pengisian-tempat", duration: "15 Menit", difficulty: "Dasar" },
      { id: "prob-perm-all", title: "Permutasi Semua Elemen", slug: "permutasi-semua-elemen", duration: "15 Menit", difficulty: "Menengah" },
      { id: "prob-perm-partial", title: "Permutasi Sebagian Elemen", slug: "permutasi-sebagian-elemen", duration: "15 Menit", difficulty: "Menengah" },
      { id: "prob-perm-repeat", title: "Permutasi dengan Pengulangan", slug: "permutasi-dengan-pengulangan", duration: "18 Menit", difficulty: "Menengah" },
      { id: "prob-perm-circular", title: "Permutasi Melingkar", slug: "permutasi-melingkar", duration: "15 Menit", difficulty: "Lanjut" },
      { id: "prob-comb", title: "Kombinasi", slug: "kombinasi", duration: "18 Menit", difficulty: "Menengah" },
      { id: "prob-comb-props", title: "Sifat-Sifat Kombinasi", slug: "sifat-sifat-kombinasi", duration: "15 Menit", difficulty: "Menengah" },
      { id: "prob-comb-repeat", title: "Kombinasi dengan Pengulangan", slug: "kombinasi-dengan-pengulangan", duration: "25 Menit", difficulty: "Lanjut" },
      { id: "prob-examples", title: "Contoh Soal dan Pembahasan", slug: "contoh-soal-dan-pembahasan", duration: "20 Menit", difficulty: "Menengah" },
      { id: "prob-practice", title: "Latihan Peluang dan Kombinatorika", slug: "latihan-peluang-dan-kombinatorika", duration: "15 Menit", difficulty: "Menengah" }
    ]
  },
  {
    id: "module-graph",
    title: "Graf (Teori Graf)",
    badge: "Graph Theory",
    description: "Belajar graf isomorfik, graf planar, graf bidang, graf dual, rumus Euler, Teorema Kuratowski, dan penerapannya.",
    progress: 0,
    lessons: [
      { id: "graph-intro", title: "Pengantar Teori Graf", slug: "pengentar-teori-graf", duration: "10 Menit", difficulty: "Dasar" },
      { id: "graph-isomorphic", title: "Graf Isomorfik", slug: "graf-isomorfik", duration: "20 Menit", difficulty: "Menengah" },
      { id: "graph-isomorphic-rules", title: "Syarat Graf Isomorfik", slug: "syarat-graf-isomorfik", duration: "15 Menit", difficulty: "Menengah" },
      { id: "graph-bijection", title: "Pemetaan Bijektif", slug: "pemetaan-bijektif", duration: "15 Menit", difficulty: "Lanjut" },
      { id: "graph-adjacency-matrix", title: "Matriks Ketetanggaan", slug: "matriks-ketetanggaan", duration: "18 Menit", difficulty: "Menengah" },
      { id: "graph-planar", title: "Graf Planar", slug: "graf-planar", duration: "20 Menit", difficulty: "Menengah" },
      { id: "graph-kuratowski", title: "Teorema Kuratowski", slug: "teorema-kuratowski", duration: "25 Menit", difficulty: "Lanjut" },
      { id: "graph-plane", title: "Graf Bidang", slug: "graf-bidang", duration: "15 Menit", difficulty: "Menengah" },
      { id: "graph-faces", title: "Muka / Face pada Graf Bidang", slug: "muka-face-pada-graf-bidang", duration: "15 Menit", difficulty: "Menengah" },
      { id: "graph-euler", title: "Rumus Euler", slug: "rumus-euler", duration: "20 Menit", difficulty: "Menengah" },
      { id: "graph-dual", title: "Graf Dual", slug: "graf-dual", duration: "22 Menit", difficulty: "Lanjut" },
      { id: "graph-forming-dual", title: "Cara Membentuk Graf Dual", slug: "cara-membentuk-graf-dual", duration: "20 Menit", difficulty: "Lanjut" },
      { id: "graph-tech-app", title: "Penerapan Graf dalam Teknologi", slug: "penerapan-graf-dalam-teknologi", duration: "15 Menit", difficulty: "Menengah" },
      { id: "graph-practice", title: "Latihan Teori Graf", slug: "latihan-teori-graf", duration: "15 Menit", difficulty: "Menengah" }
    ]
  }
];

export const QUIZ_QUESTIONS: Question[] = [
  // Aljabar Boolean
  {
    id: "q-bool-1",
    moduleSlug: "module-boolean",
    text: "Manakah ekspresi di bawah ini yang merupakan Hukum De Morgan untuk (a + b)' ?",
    options: [
      "a' + b'",
      "a' · b'",
      "a · b",
      "a + b"
    ],
    correctAnswer: 1,
    explanation: "Hukum De Morgan menyatakan bahwa komplemen dari penjumlahan adalah perkalian dari masing-masing komplemen, yaitu (a + b)' = a' · b'. Begitu juga sebaliknya, (a · b)' = a' + b'."
  },
  {
    id: "q-bool-2",
    moduleSlug: "module-boolean",
    text: "Berapakah jumlah baris pada tabel kebenaran untuk fungsi boolean dengan 3 variabel bebas?",
    options: [
      "4 baris",
      "6 baris",
      "8 baris",
      "16 baris"
    ],
    correctAnswer: 2,
    explanation: "Tabel kebenaran untuk n variabel bebas memiliki 2^n baris. Dengan 3 variabel, jumlah barisnya adalah 2^3 = 8 baris."
  },
  {
    id: "q-bool-3",
    moduleSlug: "module-boolean",
    text: "Bentuk kanonik SOP (Sum of Products) dibentuk dari penjumlahan dari...",
    options: [
      "Minterm (perkalian semua literal)",
      "Maxterm (penjumlahan semua literal)",
      "Hukum distributif saja",
      "Gerbang NAND saja"
    ],
    correctAnswer: 0,
    explanation: "SOP (Sum of Products) dibentuk dengan menjumlahkan minterm-minterm yang bernilai 1. Minterm adalah hasil kali (AND) dari seluruh literal."
  },

  // Peluang & Kombinatorika
  {
    id: "q-prob-1",
    moduleSlug: "module-probability",
    text: "Berapa banyak susunan kata berbeda yang dapat dibentuk dari kata 'BOSAN'?",
    options: [
      "24 susunan",
      "60 susunan",
      "120 susunan",
      "720 susunan"
    ],
    correctAnswer: 2,
    explanation: "Kata 'BOSAN' memiliki 5 huruf yang semuanya berbeda. Banyaknya susunan adalah permutasi dari 5 elemen, yaitu 5! = 5 × 4 × 3 × 2 × 1 = 120."
  },
  {
    id: "q-prob-2",
    moduleSlug: "module-probability",
    text: "Dalam pemilihan pengurus kelas (Ketua, Sekretaris, Bendahara) dari 10 siswa, manakah konsep yang digunakan?",
    options: [
      "Kombinasi (karena urutan tidak penting)",
      "Permutasi (karena urutan/posisi jabatan sangat penting)",
      "Peluang Bersyarat",
      "Kombinasi dengan Pengulangan"
    ],
    correctAnswer: 1,
    explanation: "Karena pemilihan jabatan memiliki peran spesifik (Ketua, Sekretaris, Bendahara), maka urutan penting pilihan siswa A-B-C tidak sama dengan B-C-A. Oleh karena itu, kita menggunakan Permutasi."
  },
  {
    id: "q-prob-3",
    moduleSlug: "module-probability",
    text: "Berapakah nilai dari C(6, 2) (kombinasi 6 mengambil 2)?",
    options: [
      "12",
      "15",
      "30",
      "36"
    ],
    correctAnswer: 1,
    explanation: "Rumus kombinasi adalah C(n, r) = n! / (r! (n-r)!). Maka C(6, 2) = 6! / (2! × 4!) = (6 × 5) / (2 × 1) = 15."
  },

  // Graf
  {
    id: "q-graph-1",
    moduleSlug: "module-graph",
    text: "Manakah rumus Euler yang tepat untuk graf planar terhubung dengan V simpul, E sisi, dan F bidang/muka?",
    options: [
      "V + E - F = 2",
      "V - E + F = 2",
      "V + E + F = 2",
      "V - E - F = 2"
    ],
    correctAnswer: 1,
    explanation: "Rumus Euler untuk graf bidang terhubung menyatakan bahwa jumlah simpul (Vertices) dikurangi jumlah sisi (Edges) ditambah jumlah muka/bidang (Faces) adalah selalu sama dengan 2. (V - E + F = 2)."
  },
  {
    id: "q-graph-2",
    moduleSlug: "module-graph",
    text: "Berikut ini adalah salah satu syarat mutlak agar dua buah graf dapat dikatakan Isomorfik, KECUALI...",
    options: [
      "Mempunyai jumlah simpul (V) yang sama",
      "Mempunyai jumlah sisi (E) yang sama",
      "Mempunyai derajat masing-masing simpul yang sama (derajat derajat bersesuaian)",
      "Mempunyai nama simpul yang sama persis secara alfabetis"
    ],
    correctAnswer: 3,
    explanation: "Graf isomorfik adalah graf yang secara struktur identik walaupun representasi visual dan penamaan simpulnya (labelnya) berbeda. Penamaan simpul tidak harus sama."
  },
  {
    id: "q-graph-3",
    moduleSlug: "module-graph",
    text: "Berapakah batas atas jumlah sisi (E) pada graf planar dengan V simpul (untuk V >= 3)?",
    options: [
      "E <= 3V - 6",
      "E <= 2V - 4",
      "E <= V + 2",
      "E <= 3V"
    ],
    correctAnswer: 0,
    explanation: "Pada graf planar terhubung sederhana dengan minimal 3 simpul, jumlah sisi dibatasi secara matematis oleh ketidaksamaan E <= 3V - 6."
  }
];

export const INITIAL_COMMENTS: Comment[] = [
  {
    id: "c1",
    userName: "Andi Saputra",
    userRole: "Mahasiswa Informatika ITB",
    text: "Penjelasan materi Aljabar Boolean di platform ini sangat visual dan detail dibanding buku teks biasa! Interaktivitas gerbang logika sangat membantu visualisasi saya.",
    timestamp: "2 jam yang lalu",
    likes: 12
  },
  {
    id: "c2",
    userName: "Siti Rahmawati",
    userRole: "Mahasiswa Sistem Informasi UI",
    text: "K-Map grid interaktif di bawah lesson sangat memudahkan saya me-verify jawaban tugas kuliah tentang SOP & POS. Sangat recommended untuk mahasiswa ilmu komputer!",
    timestamp: "1 hari yang lalu",
    likes: 8
  },
  {
    id: "c3",
    userName: "Budi Santoso",
    userRole: "Pelajar SMA Kelas 12",
    text: "Kombinatorika & permutasi biasanya membingungkan karena tertukar rumusnya, tetapi simulator n & r di sini menjelaskan perbedaannya dengan sangat praktis.",
    timestamp: "3 hari yang lalu",
    likes: 15
  }
];
