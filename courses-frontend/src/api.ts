// src/api.ts
import { Course, Instance } from './types'

/**
 * In development, NODE_ENV !== 'production' so CRA’s proxy ("/api/...") will forward to port 8008.
 * In production (static build), we call the backend directly.
 */
const API_BASE =
  process.env.NODE_ENV === 'production'
    ? 'http://localhost:8008'
    : ''

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`API error ${res.status}: ${body}`)
  }
  return res.json() as Promise<T>
}

/** Fetch all courses */
export async function fetchCourses(): Promise<Course[]> {
  const res = await fetch(`${API_BASE}/api/courses/`)
  return handleResponse<Course[]>(res)
}

/** Create a new course */
export async function createCourse(data: Omit<Course, 'id'>): Promise<Course> {
  const res = await fetch(`${API_BASE}/api/courses/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse<Course>(res)
}

/** Delete a course by ID */
export async function deleteCourse(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/api/courses/${id}/`, {
    method: 'DELETE',
  })
  return handleResponse<void>(res)
}

/** Fetch instances for a given year & semester */
export async function fetchInstances(year: number, semester: number): Promise<Instance[]> {
  const res = await fetch(`${API_BASE}/api/instances/${year}/${semester}/`)
  return handleResponse<Instance[]>(res)
}

/** Create a new instance */
export async function createInstance(data: Instance): Promise<Instance> {
  const res = await fetch(`${API_BASE}/api/instances/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse<Instance>(res)
}

/** Delete one instance */
export async function deleteInstance(
  year: number,
  semester: number,
  courseId: number
): Promise<void> {
  const res = await fetch(`${API_BASE}/api/instances/${year}/${semester}/${courseId}/`, {
    method: 'DELETE',
  })
  return handleResponse<void>(res)
}
