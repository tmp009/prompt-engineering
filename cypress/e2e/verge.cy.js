

describe('localhost', ()=>{
  const url = ' https://www.vergemotorcycles.com/fi_en/configurator/'
  
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  })

  beforeEach(() => {
    cy.visit(url);
    
    cy.contains('Allow all').click({timeout: 60000})
    cy.contains('Configure TS PRO').click({timeout: 60000})
    
    cy.get('#black > img.color-image', {timeout: 60000})
    .should('be.visible')
    .click({force: true})
  
    cy.contains('Configure seat').click({timeout: 60000})
    cy.get('#perforated-seat > div.configurator-option-details > div.configurator-option-name', {timeout: 60000})
    .should('be.visible')
    .click({force: true})
  
    cy.contains('Configure suspension').click({force: true})
  
    cy.get('#overview', {timeout: 60000})
    .should('be.visible')
    .click({force: true})
  
    cy.get('#overview-block > div.configurator-bottom > div.configurator-section-buttons > a', {timeout: 60000})
    .should('be.visible')
    .click({force: true})
  })
  
  it('can fill form', ()=>{
    cy.get('#fname').type('Jon')
    cy.get('#lname').type('White')
    cy.get('#pnumber').type('+348 0123456')

    cy.get('#saddress').type('Foobar 7 E')
    cy.get('#email').type('example@example.com')
    cy.get('#cemail').type('example@example.com')

    cy.get('#ainfo').type('851')
    cy.get('#zipcode').type('001234')
    cy.get('#state').type('Uusimaa')
    cy.get('#city').type('Helsinki')

  })
});