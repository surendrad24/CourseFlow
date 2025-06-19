// import React from 'react'
// import { Course } from '../types'

// interface CourseListProps {
//   courses: Course[]
//   onDelete: (id: number) => void
// }

// const CourseList: React.FC<CourseListProps> = ({ courses, onDelete }) => (
//   <ul>
//     {courses.map(course => (
//       <li key={course.id} style={{ marginBottom: '1rem' }}>
//         <strong>{course.title}</strong> {' '}
//         <small>({course.course_code})</small>{' '}
//         <button onClick={() => onDelete(course.id)}>Delete</button>
//         <details>
//           <summary>View Description</summary>
//           <p>{course.description}</p>
//         </details>
//       </li>
//     ))}
//   </ul>
// )

// export default CourseList



// ================================
// File: src/types.ts
// // ================================
// export interface Course {
//   id: number;
//   title: string;
//   course_code: string;
//   description?: string;
// }

// ================================
// File: src/api.ts
// (Example stubs for fetchCourses and deleteCourse; adapt to your real API client.)
// ================================
// import { Course } from './types';
//import { fetchCourses, deleteCourse } from '../api'


import { Course } from '../types';

// ================================
// File: src/components/CourseList.tsx
// ================================
import React, { useState, useMemo, useEffect } from 'react';
// import { Course } from '../types';
import '../pages/courselist.css'; // Assuming you have some styles for the course list
import { FaSearch, FaTrash } from 'react-icons/fa';
import { fetchCourses, deleteCourse } from '../api'
interface CourseListProps {
  courses: Course[];
  onDelete: (id: number) => Promise<void> | void;
  /** Items per page for pagination. Optional; defaults to 5 */
  itemsPerPage?: number;
}

const CourseList: React.FC<CourseListProps> = ({
  courses,
  onDelete,
  itemsPerPage = 5,
}) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Compute total pages
  const totalPages = Math.ceil(courses.length / itemsPerPage);

  // Whenever courses or itemsPerPage changes, ensure currentPage is valid
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages > 0 ? totalPages : 1);
    }
    if (currentPage < 1 && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [courses, totalPages, currentPage]);

  // Slice the courses for the current page
  const currentCourses = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return courses.slice(startIdx, startIdx + itemsPerPage);
  }, [courses, currentPage, itemsPerPage]);

  // Handlers for pagination controls
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Delete handler with confirmation
  const handleDelete = async (courseId: number) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this course? This action cannot be undone.'
    );
    if (!confirmed) return;
    try {
      await onDelete(courseId);
      // Parent component updates courses prop; pagination effect will adjust page if needed
    } catch (err) {
      console.error('Error deleting course:', err);
      alert('Failed to delete course. Please try again.');
    }
  };

  // If no courses at all
  if (courses.length === 0) {
    return (
      <p style={{ marginTop: '1rem' }}>
        No courses available. Create one to get started.
      </p>
    );
  }
 
  return (
    <>
      <div className="course-table-container">
        <div className='course-list-container'>
    <button className='btn-primary' onClick={fetchCourses}>List Courses</button></div>
        <table className="course-table">
          <thead>
            <tr>
              <th>Course Title</th>
              <th>Code</th>
              <th style={{ textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentCourses.map(course => (
              <tr key={course.id}>
                <td title={course.title}>{course.title}</td>
                <td>{course.course_code}</td>
                <td className="actions-cell">
                  {/* Static View button: no onClick */}
                  <button
                    type="button"
                    className="icon-button view-button"
                    aria-label="View course (static)"
                    title="View (static)"
                    // disabled
                  >
                    <FaSearch />
                  </button>

                  {/* Delete button */}
                  <button
                    type="button"
                    className="icon-button delete-button"
                    aria-label="Delete course"
                    title="Delete"
                    onClick={() => handleDelete(course.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="pagination-container">
          <button
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {/** 
            For pagination numbers, show all if <=7 pages; if more, show first, last, neighbors with ellipses 
          **/}
          {totalPages <= 7
            ? Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
                pageNum => (
                  <button
                    key={pageNum}
                    type="button"
                    className={`page-number${
                      pageNum === currentPage ? ' active' : ''
                    }`}
                    onClick={() => goToPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                )
              )
            : (() => {
                const pages: (number | string)[] = [];
                const delta = 1; // neighbors around current
                // Always include first
                pages.push(1);
                // Determine left ellipsis
                if (currentPage - delta > 2) {
                  pages.push('left-ellipsis');
                }
                // Middle pages
                for (
                  let i = Math.max(2, currentPage - delta);
                  i <= Math.min(totalPages - 1, currentPage + delta);
                  i++
                ) {
                  pages.push(i);
                }
                // Determine right ellipsis
                if (currentPage + delta < totalPages - 1) {
                  pages.push('right-ellipsis');
                }
                // Always include last
                pages.push(totalPages);

                return pages.map((p, idx) => {
                  if (p === 'left-ellipsis' || p === 'right-ellipsis') {
                    const key = `${p}-${idx}`;
                    return (
                      <span
                        key={key}
                        className="page-number"
                        style={{ cursor: 'default' }}
                      >
                        ...
                      </span>
                    );
                  }
                  const pageNum = p as number;
                  return (
                    <button
                      key={pageNum}
                      type="button"
                      className={`page-number${
                        pageNum === currentPage ? ' active' : ''
                      }`}
                      onClick={() => goToPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                });
              })()}

          <button
            type="button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default CourseList;


