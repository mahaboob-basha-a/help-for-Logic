import './index.css'

const TaskList = prop => {
  const {text, tagText} = prop
  return (
    <div className="tagList">
      <p>{text}</p>
      <p className="tagVal">{tagText}</p>
    </div>
  )
}
export default TaskList
