

describe('localhost', ()=>{
  const url = ' https://www.vergemotorcycles.com/fi_en/configurator/'
  
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  })

  // it('successfully loads', ()=>{
  //   cy.visit(url);
  // })

  beforeEach(() => {
    cy.visit(url);
    
    cy.contains('Allow all').click()
    cy.contains('Configure TS PRO').click()
  
    cy.wait(7000)
  
    cy.get('#black > img.color-image')
    .should('be.visible')
    .click()
  
    cy.contains('Configure seat').click()
    cy.get('#perforated-seat > div.configurator-option-details > div.configurator-option-name')
    .should('be.visible')
    .click()
  
    cy.contains('Configure suspension').click()
  
    // cy.wait(5000)
    cy.get('#overview')
    .should('be.visible')
    .click()
  
    cy.get('#overview-block > div.configurator-bottom > div.configurator-section-buttons > a')
    .should('be.visible')
    .click()
  })
});