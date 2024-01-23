
// describe('Math', () => {
//   it('Square root of 91', () => {
//     expect(Math.sqrt(81)).equal(9);
//   });

//   it('Square root of 2', () => {
//     expect(Math.sqrt(2)).to.be.closeTo(1.41, 0.05);
//   })
// })

// describe('Website', ()=>{
//   it('successfully loads', ()=>{
//     cy.visit('https://tmp009.github.io/');
//   })

//   it ('has contact information', ()=>{
//     cy.visit('https://tmp009.github.io/');
//     cy.contains('Yhteystiedot').click()
//   })

// })

describe('localhost', ()=>{
  it('successfully loads', ()=>{
    cy.visit('http://localhost:3000/');
  })

  it('can fetch data', ()=>{
    cy.visit('http://localhost:3000/');
    cy.get('#filename').type('product.csv')
    cy.get('#prompt').type('give 2 cheap products suitable for winter')
    
    cy.intercept('POST', '/query').as('query');
    cy.contains('send').click()
    
    cy.wait('@query', { timeout: 15000 }).then(async interception => {
      const response = interception.response;

      expect(response.statusCode).to.equal(200);
      expect(response.body[0]).to.have.property('id', '1')
      expect(response.body.length).to.equal(2)

    })
  })
})