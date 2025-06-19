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
    <form onSubmit={handleSubmit} className='course-form-container'>
      <h2>Add New Course</h2>
      <div>
        {/* <label>Title</label><br/> */}
        <input
        className='course-field-sm'
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Course Title"
          required
        />
      </div>
      <div>
        {/* <label>Course Code</label><br/> */}
        <input
        className='course-field-sm'
          value={courseCode}
          onChange={e => setCourseCode(e.target.value)}
          placeholder="Course Code"
          required
        />
      </div>
      <div>
        {/* <label>Description</label><br/> */}
        <textarea
        className='course-field-sm'
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Course description"
          required
        />
      </div>
      <button className='btn-primary' type="submit">Add Course</button>
    </form>
  )
}

export default CourseForm
