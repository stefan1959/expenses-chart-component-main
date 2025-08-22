const container = document.getElementById("expenses-chart");

const appendItem = (item) => {
  // add the markup for each item to the DOM
  const todo = document.createElement("DIV");
  // try to change background value if hightvalue
  if (item.amount == maxValue) {
    // console.log(item.amount)
    todo.innerHTML = `
    <div style="height: ${
      item.amount * multiplr
    }px;" class="expenses-chart-amount bg-blue">
    <div class="expenses-chart-amount-display">$${item.amount}</div>
    </div>
    <div class="expenses-chart-day"> ${item.day} </div>
  `;
  } else {
    todo.innerHTML = `
    <div style="height: ${
      item.amount * multiplr
    }px;" class="expenses-chart-amount">
    
    <div class="expenses-chart-amount-display">$${item.amount}</div>
    </div>
    <div class="expenses-chart-day"> ${item.day} </div>
  `;
  }
  container.appendChild(todo);
};

// append the data to the DOM
const populateGraph = (data) => {
  //  with forEach loop
  data.forEach((item) => {
    appendItem(item);
  });
};

fetch("data.json")
  .then((response) => {
    if (!response.ok) return console.log("Oops! Something went wrong.");

    return response.json();
  })
  .then((data) => {
    // console.log(data);
    maxValue = getLargestIndex(data);
    multiplr = 100 / maxValue;
    populateGraph(data);
  });

function getLargestIndex(data) {
  maxValue = Math.max(...data.map((o) => o.amount));
  return maxValue;
}
