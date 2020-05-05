import React from 'react'
import { Link } from 'gatsby'

const Navigation = () => (
  <nav className="p-4 my-4 bg-gray-200">
    <ul className="flex justify-center">
      <li className="mr-6">
        <Link
          className="text-gray-500 hover:text-teal-500"
          activeClassName="text-teal-500 underline"
          to="/"
        >
          Start
        </Link>
      </li>
      <li className="mr-6">
        <Link
          className="text-gray-500 hover:text-teal-500"
          activeClassName="text-teal-500 underline"
          to="/blog/"
        >
          Blog
        </Link>
      </li>
      <li className="mr-6">
        <Link
          className="text-gray-500 hover:text-teal-500"
          activeClassName="text-teal-500 underline"
          to="/about/"
        >
          About
        </Link>
      </li>
      <li className="mr-6">
        <Link
          className="text-gray-500 hover:text-teal-500"
          activeClassName="text-teal-500 underline text-bold"
          to="/impressum/"
        >
          Impressum
        </Link>
      </li>
    </ul>
  </nav>
)

export default Navigation
