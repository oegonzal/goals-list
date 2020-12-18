import React, { useEffect, useState } from 'react';
import './App.css';

//  http://www.mocky.io/v2/5eb421880e00005000081991


type Goal = {
  id: string;
  name: string;
  currentSavedCents?: number;
  icon: any;
}

function App() {
  const [goals, setGoals] = useState<Array<Goal>>([]);
  const [newGoalName, setNewGoalName] = useState("");

  useEffect(() => {
    async function getData() {
      const res = await fetch('http://www.mocky.io/v2/5eb421880e00005000081991');
      const data = await res.json();

      setGoals(data.goals)
      return data;
    }

    getData()
  }, []);


  function onCreateNewGoal(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setGoals([...goals, { id: Date.now().toString(), name: newGoalName, icon: undefined }])
    setNewGoalName('');
  }

  function onNewGoalNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewGoalName(event.target.value);
  }

  function rotateGoalsUp() {
    //  Rotate up remove 0 ind and append it to end of list
    const removedGoal = goals.splice(0, 1);
    const newGoalsList = [...goals, ...removedGoal];
    setGoals(newGoalsList);
  }

  function rotateGoalsDown() {
    //  Rotate down: remove last ind and append to start
    const removedGoal = goals.splice(goals.length - 1, goals.length);
    const newGoalsList = [...removedGoal, ...goals];
    setGoals(newGoalsList);
  }

  return (
    <div className="App">
      {goals.map(goal => {
          const { id, name, icon, currentSavedCents } = goal
          return (
            <div className="GoalItem" key={id}>

              <div className="GoalItem__header"> 
                <div className="GoalItem__header__title">{name}</div>
                <div>{icon}</div>
              </div>

              <div>
                {currentSavedCents}
              </div>

            </div>
          )
        })
      }

      <form onSubmit={onCreateNewGoal}>
        <input type="text" 
          onChange={onNewGoalNameChange} value={newGoalName} placeholder={"Enter goal name..."}/>
        <button type="submit">Add Goal</button>
      </form>

      <div>
        <button onClick={rotateGoalsUp}>Rotate up</button>
        <button onClick={rotateGoalsDown}>Rotate down</button>
      </div>


    </div>
  );
}

export default App;
