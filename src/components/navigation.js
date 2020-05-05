import React from 'react'
import { Link } from 'gatsby'

const Navigation = () => (
  <nav className="p-4 my-4 bg-gray-200">
    <ul className="flex justify-center">
      <li className="mr-6">
        <Link
          className="text-gray-500 hover:text-gray-700"
          activeClassName="text-teal-400 underline"
          to="/"
        >
          Start
        </Link>
      </li>
      <li className="mr-6">
        <Link
          className="text-gray-500 hover:text-gray-700"
          activeClassName="text-teal-400 underline"
          to="/blog/"
        >
          Blog
        </Link>
      </li>
      <li className="mr-6">
        <Link
          className="text-gray-500 hover:text-gray-700"
          activeClassName="text-black"
          to="/about/"
        >
          About
        </Link>
      </li>
      <li className="mr-6">
        <Link
          className="text-gray-500 hover:text-gray-700"
          activeClassName="text-black"
          to="/impressum/"
        >
          Impressum
        </Link>
      </li>
    </ul>
  </nav>
)

export default Navigation
