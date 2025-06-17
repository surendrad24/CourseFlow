// src/types.ts

/** A course entity returned by /api/courses/ */
export interface Course {
  id: number;
  title: string;
  course_code: string;
  description: string;
}

/** An instance entity returned by /api/instances/ */
export interface Instance {
  year: number;
  semester: number;
  course: number;  // holds the Course.id
}
