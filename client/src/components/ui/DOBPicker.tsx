import React from 'react'

const DOBPicker = ({value , onChange} : {value : string, onChange: (date : string) => void}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value
    console.log(dateValue)
    if (dateValue) {
      const [year, month, day] = dateValue.split('-')
      const formatted = `${year} / ${month} / ${day}`
      onChange(formatted)
    }
  }

  // Convert display format to input format
  const inputValue = value
    ? value.split(' / ').join('-')
    : ''
  console.log(inputValue)
  return (
    <input
      type="date"
      value={inputValue}
      onChange={handleChange}
      onClick={(e :React.MouseEvent<HTMLInputElement>)=>e.currentTarget.showPicker()}
      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 text-slate-900 cursor-pointer"
    />
  )
}

export default DOBPicker