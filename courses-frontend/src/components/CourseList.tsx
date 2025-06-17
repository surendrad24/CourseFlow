import React from 'react'
import { Course } from '../types'

interface CourseListProps {
  courses: Course[]
  onDelete: (id: number) => void
}

const CourseList: React.FC<CourseListProps> = ({ courses, onDelete }) => (
  <ul>
    {courses.map(course => (
      <li key={course.id} style={{ marginBottom: '1rem' }}>
        <strong>{course.title}</strong> {' '}
        <small>({course.course_code})</small>{' '}
        <button onClick={() => onDelete(course.id)}>Delete</button>
        <details>
          <summary>View Description</summary>
          <p>{course.description}</p>
        </details>
      </li>
    ))}
  </ul>
)

export default CourseList
