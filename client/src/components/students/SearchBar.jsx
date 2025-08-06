import { useNavigate } from 'react-router-dom'
import { assets, dummyCourses } from '../../assets/assets'
import React, { useState } from 'react'

const SearchBar = ({ data, margin, functionSearch }) => {
  const navigate = useNavigate()
  const [input, setInput] = useState(data ? data : '')
  const onSearchHandler = (e) => {
    e.preventDefault()
    console.log(input)
    navigate('/course-list/' + input)
    let filterSearch = dummyCourses.filter((course) => course.courseTitle.toLowerCase().includes(input.toLowerCase()))
    localStorage.setItem('filterCourse', JSON.stringify(filterSearch))
  }

  return (
    <div className='search' style={{ marginTop: "30px", margin: `${margin}` }}>
      <form onSubmit={onSearchHandler}
        className="searchbar border-1 border-gray-500/20 flex justify-between items-center rounded"
        style={{ padding: "4px" }}
      >
        <img src={assets.search_icon} alt="" style={{ marginLeft: "10px" }} />
        <input type="text"
          className='border-none flex-1 outline-none text-gray-500/80 h-full'
          placeholder='Search for Courses' style={{ padding: "0 10px" }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type='submit'
          className='btn bg-blue-500 text-white cursor-pointer rounded'
          style={{ padding: "9px 30px" }}
          onClick={() => functionSearch(input)}
        >
          Search
        </button>
      </form>
    </div>
  )
}

export default SearchBar
