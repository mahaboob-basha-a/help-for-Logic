import {Component} from 'react'
import Tags from '../Tags'
import TaskList from '../TaskList'
import {v4 as uuid} from 'uuid'
import './index.css'

class Home extends Component {
  state = {
    taskVal: '',
    tagVal: 'HEALTH',
    ownList: [],
    categoryList: [],
    isFilter: false,
    status: '',
  }

  onAddTask = e => {
    e.preventDefault()
    const {taskVal, tagVal} = this.state
    const data = {
      id: uuid(),
      text: taskVal,
      tagText: tagVal,
    }
    this.setState(prev => ({ownList: [...prev.ownList, data], isFilter: false}))
  }

  isclicking = ids => {
    const {ownList} = this.state
    const filterCategory = ownList.filter(item => {
      return item.tagText === ids
    })

    this.setState({status: ids, categoryList: filterCategory, isFilter: true})
  }
  render() {
    const {tagsList} = this.props
    const {taskVal, tagVal, ownList, categoryList, isFilter, status} =
      this.state
    return (
      <div className="main-page">
        <div className="leftContainer">
          <h1>Create a task!</h1>
          <form>
            <label htmlFor="task">Task</label>
            <br />
            <input
              value={taskVal}
              onChange={e => this.setState({taskVal: e.target.value})}
              placeholder="Enter the task here"
              id="task"
              type="text"
            />
            <br />
            <label htmlFor="tags">Tags</label>
            <br />
            <select
              value={tagVal}
              onChange={e => this.setState({tagVal: e.target.value})}
              id="tags"
            >
              {tagsList.map(item => {
                const {optionId, displayText} = item
                return (
                  <option key={optionId} value={optionId}>
                    {displayText}
                  </option>
                )
              })}
            </select>
            <br />
            <button onClick={this.onAddTask} className="addbtn">
              Add Task
            </button>
          </form>
        </div>
        <div className="rightSide">
          <h1>Tags</h1>
          <ul className="tagsUl">
            {tagsList.map(item => {
              const {optionId, displayText} = item
              return (
                <li key={optionId}>
                  <Tags
                    isActive={status === optionId}
                    isClicked={this.isclicking}
                    text={displayText}
                    id={optionId}
                  />
                </li>
              )
            })}
          </ul>
          <h1>Tasks</h1>
          {ownList.length > 0 ? (
            <ul className="taskList">
              {isFilter
                ? categoryList.map(item => {
                    const {id, text, tagText} = item
                    return (
                      <li key={id}>
                        <TaskList id={id} text={text} tagText={tagText} />
                      </li>
                    )
                  })
                : ownList.map(item => {
                    const {id, text, tagText} = item
                    return (
                      <li key={id}>
                        <TaskList id={id} text={text} tagText={tagText} />
                      </li>
                    )
                  })}
            </ul>
          ) : (
            <p>No Tasks Added Yet</p>
          )}
        </div>
      </div>
    )
  }
}
export default Home
