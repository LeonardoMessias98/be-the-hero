const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach( async () => {
    await connection.migrate.latest();
  });

  afterAll( async () => {
    await connection.rollback();
    await connection.destroy();
  })

  it('should be able to create a new ONG',async ()=>{
    const response = await request(app)
      .post('/ongs')
      .send({
        name:"Chatuba de mesquita",
        email:"peroca@gmail.com",
        whatsapp: 5512991212121,
        city: "São Paulo",
        uf:"SP"
      })
    
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  })
})