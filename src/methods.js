
//This utility function exports articles based on their category
export const getObjectsByCategory = (data, category) => {
  var objects = [];
  if (data) {
    for (var i = 0; i < data?.length; i++) {
      if (data[i].category === category) {
        objects.push(data[i]);
      }
    }
  }
  return objects;
}

export const getItemById = (articles, id) => {
  const item = articles.find((item) => item.id === id);
  return item;
}

function filterObjectsByTitle(objects, searchTerm) {
  if (searchTerm?.length !== 0) {
    const lowercaseSearchTerm = searchTerm?.toLowerCase();
    return objects.filter((obj) => {
      const jsonString = JSON.stringify(obj);
      const lowercaseTitle = jsonString.toLowerCase();
      return lowercaseTitle?.includes(lowercaseSearchTerm);
    });
  }
  else {
    return objects;
  }
}

// Apply filters to data and update filteredData
export const applyFilters = (data, allFilters) => {
  let filteredResults = data;
  if (allFilters.price) {
    const [minPrice, maxPrice] = allFilters.price;
    filteredResults = filteredResults.filter(
      (item) => (item.price >= minPrice && item.price <= maxPrice) || item.price === 0
    );
  }


  if (allFilters.weight && allFilters.weight[1] !== 80 && allFilters.weight[0] !== 0) {
    const [minWeight, maxWeight] = allFilters.weight;
    filteredResults = filteredResults.filter(
      (item) => (item.weight >= minWeight && item.weight <= maxWeight) || item.weight === 0
    );
  }

  if (allFilters.race && allFilters.race.length > 0) {
    // Apply race filter logic
    filteredResults = filteredResults.filter(
      (item) => allFilters.race.includes(item.race)
    );
  }

  if (allFilters.age && allFilters.age.length > 0) {
    filteredResults = filteredResults.filter((item) =>
      allFilters.age.some((ageRange) =>
        item.age >= ageRange[0] && item.age < ageRange[1]
      )
    );
  }

  if (allFilters.type && allFilters.type.length > 0) {
    // Apply type filter logic
    filteredResults = filteredResults.filter(
      (item) => allFilters.type.includes(item.type)
    );
  }

  const disabled = false;
  if (!disabled) {
    if (allFilters.stat && allFilters.stat.length > 0) {
      filteredResults = filteredResults.filter((item) => {
        if (item.category === "Agnelles") {
          return true; // Keep the item if it matches the specified conditions
        }
        else {
          return allFilters.stat.includes(item.state);
        }
      });
    }
  }


  filteredResults = filterObjectsByTitle(filteredResults, allFilters.enteredWord);

  return filteredResults;
};
