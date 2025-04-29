"use client"; 
import { useState, useRef, useEffect } from 'react';
import { FaCalendarAlt } from 'react-icons/fa'; 
import ReactCalendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css'; 
// import "../styles/ActionBar.css";

const ActionBar = () => {
  const [showCalendar, setShowCalendar] = useState(false); 
  const calendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar); 
  };

  return (
    <div className="action-bar flex gap-3 bg-white items-center justify-center mt-3 mb-1">
      <button className='flex items-center gap-1 bg-gray-200 px-4 py-2 rounded-full text-sm shadow-none' onClick={toggleCalendar}>
        <FaCalendarAlt className="calendar-icon" /> Order for Later
      </button>
      <button className='bg-gray-200 px-4 py-2 rounded-full text-sm shadow-none'>🔗 Share</button>

      {showCalendar && (
        <div className="calendar-popup absolute top-[60px] bg-white shadow-md z-50 p-3 rounded-md" ref={calendarRef}>
          <ReactCalendar />
        </div>
      )}
    </div>
  );
};

export default ActionBar;
