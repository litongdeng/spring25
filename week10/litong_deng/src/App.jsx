import { useState } from "react";
import "./App.css";
import ShoppingList from "./ShoppingList";

function App() {
  const [shoppingList, setShoppingList] = useState([]);
  const [budget] = useState(100);
  const [categoryFilter, setCategoryFilter] = useState("All");

  const addItem = (event) => {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    let formDataObj = Object.fromEntries(formData.entries());
    formDataObj.cost = parseFloat(formDataObj.cost || 0);

    setShoppingList([...shoppingList, formDataObj]);
    form.reset();
  }

  const removeItem = (event) => {
    const name = event.target.value;
    setShoppingList(shoppingList.filter(item => item.name !== name));
  }

  const allCategories = [...new Set(shoppingList.map((i) => i.category))];

  const filteredList = categoryFilter === "All" ? shoppingList : shoppingList.filter((i) => i.category === categoryFilter);

  return (
    <>
      <h1>Shopping List Manager</h1>
      <div className="card">
        <form onSubmit={addItem} className="flex-apart">
          <input type="text" name="name" placeholder="Add item to list..." />
          <input type="text" name="cost" placeholder="Cost"/>
          <select name="category" defaultValue="grocery" className="select">
            <option value="grocery">Grocery</option>
            <option value="household">Household</option>
            <option value="other">Other</option>
          </select>
          <button className="btn purple" type="submit">Add</button>
        </form>
      </div>

      <div className="filter-bar">
        {["All", ...allCategories].map((cat) => (
          <button
          key={cat}
          className={`btn filter ${cat === categoryFilter ? "active" : ""}`}
          onClick={() => setCategoryFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <ShoppingList
        shoppingList={filteredList}
        removeItem={removeItem}
        budget={budget}
      />

    </>
  )
}

// function handleCategoryChange(cat) {
//   setCategory(cat);
// }

export default App;
