

// File: src/components/InstanceList.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { FaSearch, FaTrash } from 'react-icons/fa';
import '../pages/courselist.css'; // reuse your styles
import { fetchInstances, deleteInstance,fetchCourses } from '../api'
import { Instance as InstanceType } from '../types';
import { Instance } from '../types'
import { Course } from '../types';

interface InstanceListProps {
  instances: InstanceType[]; // { year: number; semester: number; course: number }
  /** Optional lookup from course ID to human-readable title */
  titleLookup?: Record<number, string>;
  onDelete: (year: number, semester: number, courseId: number, title: string) => void;
  onView?: (year: number, semester: number, courseId: number, title: string) => void;
  /** Optional pagination; if omitted or ≤0, shows all rows */
  itemsPerPage?: number;
   
}

const InstanceList: React.FC<InstanceListProps> = ({
  instances,
  titleLookup,
  onDelete,
  onView,
  itemsPerPage,
  
}) => {
  // Unconditional hooks:
  // Determine page size
  
  const pageSize =
    itemsPerPage && itemsPerPage > 0 ? itemsPerPage : instances.length;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(instances.length / pageSize));
const [year, setYear] = useState<number>(new Date().getFullYear())
  const [semester, setSemester] = useState<number>(1)
  const [instance, setInstances] = useState<Instance[]>([])
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
    if (currentPage < 1) {
      setCurrentPage(1);
    }
  }, [instances.length, pageSize, currentPage, totalPages]);

  const displayed = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return instances.slice(start, start + pageSize);
  }, [instances, currentPage, pageSize]);
 const handleFetch = async () => {
    const data = await fetchInstances(year, semester)
    setInstances(data)
  }
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Early return is OK because hooks already called
  if (instances.length === 0) {
    return <p style={{ marginTop: '1rem' }}>No instances available.</p>;
  }

  return (
  <div>
    <div className="course-table-container">
      <table className="course-table">
        <thead>
          <tr>
            <th>Course Title</th>
            <th>Year-Sem</th>
            <th>Code</th>
            <th style={{ textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayed.map(inst => {
            const key = `${inst.year}-${inst.semester}-${inst.course}`;
            // Use lookup if provided; else fallback
            const title =
              (titleLookup && titleLookup[inst.course]) ||
              `Course ${inst.course}`;

            return (
              <tr key={key}>
                <td title={inst.title}>{inst.title}</td>
                <td title={`Year ${inst.year}, Semester ${inst.semester}`}>
                  {inst.year}-{inst.semester}
                </td>
                <td title={`Course Title: ${inst.course}`}>{inst.course}</td>
                <td className="actions-cell" style={{ textAlign: 'center' }}>
                  <button
                    type="button"
                    className="icon-button view-button"
                    aria-label="View instance"
                    title={onView ? 'View' : 'View (disabled)'}
                    onClick={() => {
                      if (onView) {
                        onView(inst.year, inst.semester, inst.course, inst.title);
                      }
                    }}
                    // disabled={!onView}
                  >
                    <FaSearch />
                  </button>
                  <button
                    type="button"
                    className="icon-button delete-button"
                    aria-label="Delete instance"
                    title="Delete"
                    onClick={() => {
                      const confirmed = window.confirm(
                        `Delete "${title}" (${inst.year}-${inst.semester})?`
                      );
                      if (confirmed) {
                        onDelete(inst.year, inst.semester, inst.course, inst.title);
                      }
                    }}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {pageSize < instances.length && totalPages > 1 && (
        <div className="pagination-container">
          <button
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
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
                const delta = 1;
                pages.push(1);
                if (currentPage - delta > 2) pages.push('left-ellipsis');
                for (
                  let i = Math.max(2, currentPage - delta);
                  i <= Math.min(totalPages - 1, currentPage + delta);
                  i++
                ) {
                  pages.push(i);
                }
                if (currentPage + delta < totalPages - 1)
                  pages.push('right-ellipsis');
                pages.push(totalPages);
                return pages.map((p, idx) => {
                  if (p === 'left-ellipsis' || p === 'right-ellipsis') {
                    return (
                      <span
                        key={`${p}-${idx}`}
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
    </div>
    </div>
  );
};

export default InstanceList;
