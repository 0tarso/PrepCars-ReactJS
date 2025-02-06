const HeaderPath = ({ text }: { text: string }) => {
  return (
    <div className="bg-gradient-to-r from-red-700 to-red-500 w-52 -skew-x-6 rounded-sm mb-2">
      <h1 className="ml-2 font-bold text-2xl fadeIn text-white">{text}</h1>
    </div>
  )
}

export default HeaderPath