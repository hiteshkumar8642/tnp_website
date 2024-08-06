import { useState, useEffect, useRef } from 'react';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <div>
        <p
          type="button"
          className="hover:text-[#6c63ff] ml-[30px] text-[#5d5d5d] text-lg flex justify-center items-center cursor-pointer"
          onClick={toggleDropdown}
        >
          Options
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.44l3.71-3.21a.75.75 0 011.02 1.1l-4.25 3.67a.75.75 0 01-1.02 0L5.23 8.3a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </p>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:no-underline"
              role="menuitem"
            >
              Account settings
            </a>
            <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:no-underline"
              role="menuitem"
            >
              Support
            </a>
            <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:no-underline"
              role="menuitem"
            >
              License
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
