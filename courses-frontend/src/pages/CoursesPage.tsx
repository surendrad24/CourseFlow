// src/pages/CoursesPage.tsx
import React, { useEffect, useState } from 'react'
import CourseForm from '../components/CourseForm'
import CourseList from '../components/CourseList'
import { fetchCourses, deleteCourse } from '../api'
import { Course } from '../types'

export function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    fetchCourses().then(setCourses)
  }, [])

  const handleCreate = (newCourse: Course) =>
    setCourses(prev => [...prev, newCourse])

  const handleDelete = (id: number) =>
    deleteCourse(id).then(() =>
      setCourses(prev => prev.filter(c => c.id !== id))
    )

  return (
    <div style={{ padding: '2rem', maxWidth: 600, margin: '0 auto' }}>
      <h1>Course Manager</h1>
      <CourseForm onCreate={handleCreate} />
      <CourseList courses={courses} onDelete={handleDelete} />
    </div>
  )
}
