
describe('Math', () => {
  it('Square root of 91', () => {
    expect(Math.sqrt(81)).equal(9);
  });

  it('Square root of 2', () => {
    expect(Math.sqrt(2)).to.be.closeTo(1.41, 0.05);
  })
})

describe('Website', ()=>{
  it('successfully loads', ()=>{
    cy.visit('https://tmp009.github.io/');
  })

  it ('has contact information', ()=>{
    cy.visit('https://tmp009.github.io/');
    cy.contains('Yhteystiedot').click()
  })

})