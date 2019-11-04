const request = require("supertest");
const app = require("../../app");
const newTodo = require("../mock-data/new-todo.json");

const endpointUrl = "/todos/"; // enough because supertest will RUN the app

let firstTodo, newTodoId;

describe(endpointUrl, () => {
  test("GET " + endpointUrl, async () => { // "test" is same as "it" - purely semantics
    const res = await request(app)
      .get(endpointUrl);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body[0].title).toBeDefined();
    expect(res.body[0].done).toBeDefined();
    firstTodo = res.body[0];
  });
  test("GET by Id " + endpointUrl + ":todoId", async () => {
    const res = await request(app)
      .get(endpointUrl + firstTodo._id);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(firstTodo.title);
    expect(res.body.done).toBe(firstTodo.done);
  });
  test("GET todoById doesn't exist " + endpointUrl + ":todoId", async () => {
    const res = await request(app)
      .get(endpointUrl + "5db817235d43afa0dfcfed66");
    expect(res.statusCode).toBe(404);
  });
  test("POST " + endpointUrl, async () => {
    const res = await request(app)
      .post(endpointUrl)
      .send(newTodo);
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe(newTodo.title);
    expect(res.body.done).toBe(newTodo.done);
    newTodoId = res.body._id;
  });
  it("should return error 500 on malformed data with POST" + endpointUrl, async () => {
    const res = await request(app)
      .post(endpointUrl)
      .send({title: "Missing done property"});
    expect(res.statusCode).toBe(500);
    expect(res.body).toStrictEqual({
      message: "Todo validation failed: done: Path `done` is required."
    });
  });
  test("PUT " + endpointUrl, async () => {
    const testData = { title: "Make integration test for PUT", done: true }; // We could also continue to use the firstTodo
    const res = await request(app)
      .put(endpointUrl + newTodoId)
      .send(testData);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(testData.title);
    expect(res.body.done).toBe(testData.done);
  });
  test("PUT updateTodo doesn't exist " + endpointUrl + ":todoId", async () => {
    const res = await request(app)
      .put(endpointUrl + "5db817235d43afa0dfcfed66")
      .send(firstTodo);
    expect(res.statusCode).toBe(404);
  });
});