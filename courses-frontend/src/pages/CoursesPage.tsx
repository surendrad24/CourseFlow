// src/pages/CoursesPage.tsx
import React, { useEffect, useState } from 'react'
import CourseForm from '../components/CourseForm'
import CourseList from '../components/CourseList'
import { fetchCourses, deleteCourse } from '../api'
import { Course } from '../types'
import { Instance } from '../types'
import InstanceForm from '../components/InstanceForm'
import InstanceList from '../components/InstanceList'
import { fetchInstances, deleteInstance } from '../api'

export function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [instances, setInstances] = useState<Instance[]>([])
  const [year, setYear] = useState<number>(new Date().getFullYear())
  const [semester, setSemester] = useState<number>(1)

  useEffect(() => {
    fetchCourses().then(setCourses)
  }, [])


  const handleFetch = async () => {
    const data = await fetchInstances(year, semester)
    setInstances(data)
  }
  const handleCreate = (newCourse: Course) =>
    setCourses(prev => [...prev, newCourse])
    const handleCreateInstance = (inst: Instance) =>
      setInstances(prev => [...prev, inst])

  const handleDelete = (id: number) =>
    deleteCourse(id).then(() =>
      setCourses(prev => prev.filter(c => c.id !== id))
    )

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ textAlign: 'center' }}>Course Manager</h1>
      <div className="course-manager-container">
        <CourseForm onCreate={handleCreate} />
        <InstanceForm onCreate={handleCreateInstance} />
      </div>
      <CourseList courses={courses} onDelete={handleDelete} />
      <h2 style={{ textAlign: 'center' }}>Instance Manager</h2>

      <div className='course-list-container'>
      <div style={{ marginBottom: '1rem' }}>
        {/* <label>Year:</label>{' '} */}
        <input
        className='field-sm'
          type="number"
          value={new Date().getFullYear()}
          onChange={e => setYear(+e.target.value)}
        />
        {' '}
        {/* <label>Semester:</label>{' '} */}
        <input
        className='field-sm'
          type="number"
          value={1}
          onChange={e => setSemester(+e.target.value)}
          min={1} max={4}
        />
        {' '}
        <button className='btn-primary' onClick={handleFetch}>List Instance</button>
      </div>
    </div>
      <InstanceList instances={instances} onDelete={handleDelete} />
    </div>
  )
}
