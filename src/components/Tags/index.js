import './index.css'

const Tags = prop => {
  const {id, text, isActive, isClicked} = prop
  const names = isActive ? 'Active' : 'inActive'
  return (
    <button onClick={() => isClicked(id)} className={names}>
      {text}
    </button>
  )
}
export default Tags
