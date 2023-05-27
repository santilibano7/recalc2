const request = require('supertest');
const api = require('../src/api.js');
const { seed } = require('../src/seed.js')

beforeEach(async () => {
    await seed()
})

describe("API substract", () => {
    test("Deberia responder con un 200 ok", async () => {
        const app = await api.build()

        return request(app)
            .get('/api/v1/sub/2/1')
            .expect(200)
            .expect('Content-Type', "application/json; charset=utf-8")
            .then((res) => {
                expect(res.body.result).toEqual(1);
            });
    });
});

describe("API add", () => {
    test("Debería responder con un 200 ok", async () => {
        const app = await api.build();

        return request(app)
            .get('/api/v1/add/2/1')
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8")
            .then((res) => {
                expect(res.body.result).toEqual(3);
            });
    });

    //En el endpoint de suma, probar que si el segundo parámetro es negativo, 
    //el resultado sea menor al primer parámetro y que el endpoint devuelva un status 200.
    test("Debería responder con un 200 ok y el resultado menor al primer parámetro si el segundo parámetro es negativo", async () => {
        const app = await api.build();

        return request(app)
            .get('/api/v1/add/5/-3')
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8")
            .then((res) => {
                expect(res.body.result).toBeLessThan(5);
            });
    });

    //Testear que haciendo una request al endpoint de suma con 0.1 y 0.2 el resultado sea 0.3.
    test("Debería responder con un 200 ok y el resultado 0.3 si el primer parámetro es 0.1 y el segundo 0.2", async () => {
        const app = await api.build();

        return request(app)
            .get('/api/v1/add/0.1/0.2')
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8")
            .then((res) => {
                expect(res.body.result).toBeCloseTo(0.3, 2);
            });
    });
});
