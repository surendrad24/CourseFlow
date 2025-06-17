import React from 'react'
import { Instance } from '../types'

interface InstanceListProps {
  instances: Instance[]
  onDelete: (year: number, semester: number, courseId: number) => void
}

const InstanceList: React.FC<InstanceListProps> = ({ instances, onDelete }) => (
  <ul>
    {instances.map(inst => (
      <li key={`${inst.year}-${inst.semester}-${inst.course}`}>
        Year {inst.year} • Sem {inst.semester} • Course ID {inst.course}{' '}
        <button onClick={() => onDelete(inst.year, inst.semester, inst.course)}>
          Delete
        </button>
      </li>
    ))}
  </ul>
)

export default InstanceList
