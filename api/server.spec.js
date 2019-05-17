// @ts-nocheck
const request = require("supertest");
const server = require("./server");

jest.fn(function deleteCar(name) {
  return db.deleteCar(name);
});

describe("server", () => {
  it("sets the environment to testing", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });
});

describe("Post: /cars", () => {
  it("adds a car and return status 200", async () => {
    const car = { model: "Honda", year: 2004 };
    const res = await request(server)
      .post("/cars")
      .send(car);
    expect(res.status).toBe(200);
  });
  it("returns Content-Type: application/json", async () => {
    const car = { model: "maserati", year: 2004 };
    const res = await request(server)
      .post("/cars")
      .send(car);
    expect(res.type).toBe("application/json");
  });
});

describe("Get: /cars", () => {
  it("returns status 200", async () => {
    const car = { model: "maserati", year: 2004 };
    const res = await request(server).get("/cars");
    expect(res.status).toBe(200);
  });
  it("returns Content-Type: application/json", async () => {
    const res = await request(server).get("/cars");
    expect(res.type).toBe("application/json");
  });
});

describe("delete: /cars", () => {
  it("returns status 200", async () => {
    const car = { model: "maserati", year: 2004 };
    const car1 = { model: "honda", year: 2004 };
    const car2 = { model: "nissan", year: 2004 };
    const res = await request(server)
      .post("/cars")
      .send(car, car2, car1);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);
    const delRes = await request(server).del("/cars" + "/honda");
    expect(delRes.status).toBe(200);
  });
  it("returns msg and list of remaining cars", async () => {
    const car = { model: "maserati", year: 2004 };
    const car1 = { model: "honda", year: 2004 };
    const car2 = { model: "nissan", year: 2004 };
    const res = await request(server)
      .post("/cars")
      .send(car, car2, car1);
    expect(res.status).toBe(200);
    const delRes = await request(server).del("/cars" + "/honda");
    expect(res.type).toBe("application/json");
    expect(delRes.body.msg).toBe("Item deleted");
    expect(delRes.body.cars).toHaveLength(2);
  });
});
