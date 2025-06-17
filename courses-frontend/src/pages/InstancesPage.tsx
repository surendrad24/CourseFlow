// src/pages/InstancesPage.tsx
import React, { useState } from 'react'
import { fetchInstances, deleteInstance } from '../api'
import { Instance } from '../types'
import InstanceForm from '../components/InstanceForm'
import InstanceList from '../components/InstanceList'

export function InstancesPage() {
  const [year, setYear] = useState<number>(new Date().getFullYear())
  const [semester, setSemester] = useState<number>(1)
  const [instances, setInstances] = useState<Instance[]>([])

  const handleFetch = async () => {
    const data = await fetchInstances(year, semester)
    setInstances(data)
  }

  const handleCreate = (inst: Instance) =>
    setInstances(prev => [...prev, inst])

  const handleDelete = (y: number, s: number, c: number) =>
    deleteInstance(y, s, c).then(() =>
      setInstances(prev =>
        prev.filter(i =>
          !(i.year === y && i.semester === s && i.course === c)
        )
      )
    )

  return (
    <div style={{ padding: '2rem', maxWidth: 600, margin: '0 auto' }}>
      <h1>Instance Manager</h1>

      <div style={{ marginBottom: '1rem' }}>
        <label>Year:</label>{' '}
        <input
          type="number"
          value={year}
          onChange={e => setYear(+e.target.value)}
        />
        {' '}
        <label>Semester:</label>{' '}
        <input
          type="number"
          value={semester}
          onChange={e => setSemester(+e.target.value)}
          min={1} max={4}
        />
        {' '}
        <button onClick={handleFetch}>Load Instances</button>
      </div>

      <InstanceForm onCreate={handleCreate} />
      <InstanceList instances={instances} onDelete={handleDelete} />
    </div>
  )
}

