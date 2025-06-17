import React, { useState } from 'react'
import { createCourse } from '../api'
import { Course } from '../types'

interface CourseFormProps {
  onCreate: (course: Course) => void
}

const CourseForm: React.FC<CourseFormProps> = ({ onCreate }) => {
  const [title, setTitle] = useState('')
  const [courseCode, setCourseCode] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newCourse = await createCourse({
      title,
      course_code: courseCode,
      description,
    })
    onCreate(newCourse)
    setTitle('')
    setCourseCode('')
    setDescription('')
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <h2>Add New Course</h2>
      <div>
        <label>Title</label><br/>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Course title"
          required
        />
      </div>
      <div>
        <label>Course Code</label><br/>
        <input
          value={courseCode}
          onChange={e => setCourseCode(e.target.value)}
          placeholder="e.g. CS101"
          required
        />
      </div>
      <div>
        <label>Description</label><br/>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Short description"
          required
        />
      </div>
      <button type="submit">Create Course</button>
    </form>
  )
}

export default CourseForm
