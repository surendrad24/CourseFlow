// import React, { useState, useEffect } from 'react'
// import { fetchCourses } from '../api'
// import { Course, Instance } from '../types'
// import { createInstance } from '../api'

// interface InstanceFormProps {
//   onCreate: (inst: Instance) => void
// }


// const InstanceForm: React.FC<InstanceFormProps> = ({ onCreate }) => {
//   const [courses, setCourses] = useState<Course[]>([])
//   const [year, setYear] = useState<number>(new Date().getFullYear())
//   const [semester, setSemester] = useState<number>(1)
//   const [courseId, setCourseId] = useState<number | null>(null)

//   useEffect(() => {
//     fetchCourses()
//     .then(setCourses)
//     .catch(err => console.error('Failed to load courses', err))
//   }, [])

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (courseId === null) return
//     const newInst = await createInstance({ year, semester, course: courseId })
//     onCreate(newInst)
//     // reset form if you like
//   }

//   return (
//     <form onSubmit={handleSubmit} className='course-form-container'>
//       <h2>Create Instance</h2>
//       <div>
//         {/* <label>Course</label><br/> */}
//         <select
//         className='course-field-sm'
//           value={courseId ?? ''}
//           onChange={e => setCourseId(+e.target.value)}
//           required
//         >
//           <option value="" disabled>Select Course</option>
//           {courses.map(c => (
//             <option key={c.id} value={c.id}>
//               {c.title} ({c.course_code})
//             </option>
//           ))}
//         </select>
//       </div>
//       <div className='two-col-fields'>
//       <div>
//         {/* <label>Year</label><br/> */}
//         <input className='field-sm'
//           type="number"
//           value={year}
//           onChange={e => setYear(+e.target.value)}
//           required
//           placeholder='Year'
//         />
//       </div>
//       <div>
//         {/* <label>Semester</label><br/> */}
//         <input className='field-sm'
//           type="number"
//           value={semester}
//           onChange={e => setSemester(+e.target.value)}
//           min={1}
//           max={4}
//           required
//           placeholder='Semester'
//         />
//       </div>
//       </div>
//       <button className = "btn-primary" type="submit">Add Instance</button>
//     </form>
//   )
// }

// export default InstanceForm


import React, { useState, useEffect, useCallback } from 'react'
import { fetchCourses, createInstance } from '../api'
import { Course, Instance } from '../types'

interface InstanceFormProps {
  onCreate: (inst: Instance) => void
}

const InstanceForm: React.FC<InstanceFormProps> = ({ onCreate }) => {
  const [courses, setCourses] = useState<Course[]>([])
  const [year, setYear] = useState<number>(new Date().getFullYear())
  const [semester, setSemester] = useState<number>(1)
  const [courseId, setCourseId] = useState<number | null>(null)

  // Encapsulate fetch logic
  const loadCourses = useCallback(() => {
    fetchCourses()
      .then(setCourses)
      .catch(err => console.error('Failed to load courses', err))
  }, [])

  // Fetch on mount
  useEffect(() => {
    loadCourses()
  }, [loadCourses])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (courseId === null) return
    const newInst = await createInstance({ year, semester, course: courseId, title: '' })
    onCreate(newInst)
    // optionally reset form here
  }

  return (
    <form onSubmit={handleSubmit} className="course-form-container">
      <h2>Create Instance</h2>

      <div className="field-group">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <select
            className="course-field-sm"
            value={courseId ?? ''}
            onChange={e => setCourseId(+e.target.value)}
            required
          >
            <option value="" disabled>
              Select Course
            </option>
            {courses.map(c => (
              <option key={c.id} value={c.id}>
                {c.title} ({c.course_code})
              </option>
            ))}
          </select>
          {/* Refresh button */}
          <button className="btn-primary" type="button"
            onClick={loadCourses}>
        Refresh
      </button>
          
        </div>
      </div>

      <div className="two-col-fields">
        <div>
          <input
            className="field-sm"
            type="number"
            value={year}
            onChange={e => setYear(+e.target.value)}
            required
            placeholder="Year"
          />
        </div>
        <div>
          <input
            className="field-sm"
            type="number"
            value={semester}
            onChange={e => setSemester(+e.target.value)}
            min={1}
            max={4}
            required
            placeholder="Semester"
          />
        </div>
      </div>

      <button className="btn-primary" type="submit">
        Add Instance
      </button>
    </form>
  )
}

export default InstanceForm
