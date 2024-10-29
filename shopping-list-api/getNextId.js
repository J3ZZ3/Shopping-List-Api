const getNextId = (shoppingList) => {
    if (shoppingList.length === 0) return 1;
    const ids = shoppingList.map(item => item.id);
    return Math.max(...ids) + 1;
  };

  module.exports = getNextId;