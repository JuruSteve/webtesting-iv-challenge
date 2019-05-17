let cars = [];

module.exports = {
  addCar,
  getCars,
  deleteCar
};

function addCar(car) {
  return (cars = [...cars, car]);
}

function getCars() {
  return cars;
}

function deleteCar(name) {
  const cars = getCars();
  let del = cars.filter(x => x.model === name);
  //   let index = cars.indexOf(name);
  return cars.splice(del, 1);
}
