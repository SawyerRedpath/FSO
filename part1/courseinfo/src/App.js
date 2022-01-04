import React from 'react'

const Header = (props) => {
  return(
    <h2>
    {props.courseName}
    </h2>
  )
}

const Part = (props) => {
  return (
    <p>
    {props.partName} {props.numberOfExercises}
    </p>
  )
}

const Content = (props) => {
  return(
    <div>
      <Part partName={props.partName1} numberOfExercises={props.numberOfExercises1} />
      <Part partName={props.partName2} numberOfExercises={props.numberOfExercises2}/>
      <Part partName={props.partName3} numberOfExercises={props.numberOfExercises3} />
    </div>
  )
}

const Total = (props) => {
  return(
    <p>
    Total number of exercises = {props.exercises1 + props.exercises2 + props.exercises3}
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
     <Header courseName={course} />
     <Content partName1={part1.name} numberOfExercises1={part1.exercises} partName2={part2.name} numberOfExercises2={part2.exercises} partName3={part3.name} numberOfExercises3={part3.exercises} />
     <Total exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises} />
    </div>
  )
}

export default App