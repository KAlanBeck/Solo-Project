import React, { Component } from 'react';
import { render } from 'react-dom';
import '../styles.css';

class App extends Component {
  render() {
    return (
      <div  id="App">
        <h1>Calorie Tracker</h1>
        <Main/>
      </div>
    )
  }
}

class Main extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      currentSelection: '',
      meal: { breakfast: [], lunch: [], dinner: [], snacks: [] },
      totals: { calories: 0, protein: 0, carbs: 0, fat: 0 }
    }
    this.handleClick = this.handleClick.bind(this);    
  }

  async handleClick(input) {
    console.log(this.state.currentSelection)
    console.log(this.state.inputValue)
    input = this.state.inputValue;
    const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/guessNutrition?title=${input}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '3f1385b474msh5cc468c6c6ca770p1784a6jsne23de33e28ca',
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      // console.log('calories:', result.calories.value)
      console.log(result.calories.value);

      this.setState((prevState) => {
        const updatedMeal = {
          ...prevState.meal,
          [prevState.currentSelection]: [...prevState.meal[prevState.currentSelection], prevState.inputValue]
        };
  
        const updatedTotals = {
          calories: prevState.totals.calories + result.calories.value,
          protein: prevState.totals.protein + result.protein.value,
          carbs: prevState.totals.carbs + result.carbs.value,
          fat: prevState.totals.fat + result.fat.value
        };
      
        return {
          meal: updatedMeal,
          inputValue: '',
          totals: updatedTotals
        };
      });
    } catch (error) {
      console.error(error);
    }

    console.log(this.state.inputValue)
    console.log(this.state.currentSelection)
  }

  handleChange = (event) => {
    this.setState({ inputValue: event.target.value }); 
  }

  handleChange2 = (event) => {
    this.setState({currentSelection: event.target.value})
  }

  render() {
    return (
      <div id="Main">
        <h3>Meal</h3>
        <form method="post">
          <label><input type="radio" name="radio" value="breakfast" onChange={this.handleChange2}/> Breakfast</label>
          <label><input type="radio" name="radio" value="lunch" onChange={this.handleChange2}/> Lunch</label> 
          <label><input type="radio" name="radio" value="dinner" onChange={this.handleChange2}/> Dinner</label> 
          <label><input type="radio" name="radio" value="snacks" onChange={this.handleChange2}/> Snacks</label> 
        </form>
        <input id="breakfastinput" placeholder="Food" value={this.state.inputValue} onChange={this.handleChange}/>
        <button onClick={this.handleClick}>submit</button>
        <MealDisplay breakfast={this.state.meal.breakfast} lunch={this.state.meal.lunch} dinner={this.state.meal.dinner} snacks={this.state.meal.snacks} 
        calories={this.state.totals.calories} fat={this.state.totals.fat} protein={this.state.totals.protein} carbs={this.state.totals.carbs}/>
      </div>
    )
  }

}

class MealDisplay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="MealDisplay">
        <h3>Daily Food Journal</h3>
          <a>Breakfast</a>
            {this.props.breakfast}
          <a>Lunch</a>
            {this.props.lunch}
          <a>Dinner</a>
            {this.props.dinner}
          <a>Snacks</a>
            {this.props.snacks}
          <Totals calories={this.props.calories} fat={this.props.fat} protein={this.props.protein} carbs={this.props.carbs}/>
      </div>
    )
  }
}

class Totals extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="Totals">
        <h3>Total Nutritional Information</h3>
          <a>Calories</a>
            {this.props.calories}
          <a>Fat</a>
            {this.props.fat}
          <a>Protein</a>
            {this.props.protein}
          <a>Carbs</a>
            {this.props.carbs}
      </div>
    )
  }
}

export default App;