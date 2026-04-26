const request = require('supertest');
const app = require('../src/app');

describe('Health Check', () => {
  it('GET /health returns 200 with status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.timestamp).toBeDefined();
  });
});

describe('Books API — GET', () => {
  it('GET /books returns list with count', async () => {
    const res = await request(app).get('/books');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.books)).toBe(true);
    expect(typeof res.body.count).toBe('number');
  });

  it('GET /books/:id returns a single book', async () => {
    const res = await request(app).get('/books/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(1);
  });

  it('GET /books/:id returns 404 for unknown id', async () => {
    const res = await request(app).get('/books/9999');
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Book not found');
  });
});

describe('Books API — POST', () => {
  it('POST /books creates a new book', async () => {
    const res = await request(app)
      .post('/books')
      .send({ title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', year: 2017 });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Designing Data-Intensive Applications');
    expect(res.body.id).toBeDefined();
  });

  it('POST /books returns 400 when title is missing', async () => {
    const res = await request(app).post('/books').send({ author: 'Unknown' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
  });
});

describe('Books API — PUT', () => {
  it('PUT /books/:id updates an existing book', async () => {
    const res = await request(app)
      .put('/books/1')
      .send({ title: 'The Pragmatic Programmer (20th Anniversary)' });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('The Pragmatic Programmer (20th Anniversary)');
  });

  it('PUT /books/:id returns 404 for unknown id', async () => {
    const res = await request(app).put('/books/9999').send({ title: 'Ghost' });
    expect(res.statusCode).toBe(404);
  });
});

describe('Books API — DELETE', () => {
  it('DELETE /books/:id deletes a book', async () => {
    const res = await request(app).delete('/books/2');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Book deleted');
  });

  it('DELETE /books/:id returns 404 for unknown id', async () => {
    const res = await request(app).delete('/books/9999');
    expect(res.statusCode).toBe(404);
  });
});

describe('Unknown Routes', () => {
  it('returns 404 for undefined routes', async () => {
    const res = await request(app).get('/nonexistent');
    expect(res.statusCode).toBe(404);
  });
});
