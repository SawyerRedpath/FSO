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
      <Part partName={props.parts[0].name} numberOfExercises={props.parts[0].exercises} />
      <Part partName={props.parts[1].name} numberOfExercises={props.parts[1].exercises}/>
      <Part partName={props.parts[2].name} numberOfExercises={props.parts[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  return(
    <p>
    Total number of exercises = {props.parts.map(part => part.exercises).reduce((prev,next) => prev + next)}
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
     <Header courseName={course} />
     <Content parts={parts} />
     <Total parts={parts} />
    </div>
  )
}

export default App