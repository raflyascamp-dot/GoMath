export interface Lesson {
  id: string;
  title: string;
  slug: string;
  duration: string;
  difficulty: "Dasar" | "Menengah" | "Lanjut";
  isCompleted?: boolean;
}

export interface Module {
  id: string;
  title: string;
  badge: string;
  description: string;
  lessons: Lesson[];
  progress: number; // calculated dynamically or hardcoded initial
}

export interface Question {
  id: string;
  moduleSlug: string;
  text: string;
  options: string[];
  correctAnswer: number; // index of option
  explanation: string;
}

export interface Comment {
  id: string;
  userName: string;
  userRole: string;
  text: string;
  timestamp: string;
  likes: number;
}
