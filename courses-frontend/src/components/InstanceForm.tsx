import React, { useState, useEffect } from 'react'
import { fetchCourses } from '../api'
import { Course, Instance } from '../types'
import { createInstance } from '../api'

interface InstanceFormProps {
  onCreate: (inst: Instance) => void
}

const InstanceForm: React.FC<InstanceFormProps> = ({ onCreate }) => {
  const [courses, setCourses] = useState<Course[]>([])
  const [year, setYear] = useState<number>(new Date().getFullYear())
  const [semester, setSemester] = useState<number>(1)
  const [courseId, setCourseId] = useState<number | null>(null)

  useEffect(() => {
    fetchCourses()
    .then(setCourses)
    .catch(err => console.error('Failed to load courses', err))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (courseId === null) return
    const newInst = await createInstance({ year, semester, course: courseId })
    onCreate(newInst)
    // reset form if you like
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <h2>Create Instance</h2>
      <div>
        <label>Year</label><br/>
        <input
          type="number"
          value={year}
          onChange={e => setYear(+e.target.value)}
          required
        />
      </div>
      <div>
        <label>Semester</label><br/>
        <input
          type="number"
          value={semester}
          onChange={e => setSemester(+e.target.value)}
          min={1}
          max={4}
          required
        />
      </div>
      <div>
        <label>Course</label><br/>
        <select
          value={courseId ?? ''}
          onChange={e => setCourseId(+e.target.value)}
          required
        >
          <option value="" disabled>Select a course</option>
          {courses.map(c => (
            <option key={c.id} value={c.id}>
              {c.title} ({c.course_code})
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Add Instance</button>
    </form>
  )
}

export default InstanceForm
