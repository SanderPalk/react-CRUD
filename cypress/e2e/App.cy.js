

describe('Cypress testing (CRUD)', () => {

  it('Test the main page', () => {
    cy.visit('localhost:3000')

    cy.get('h1').should('contain', 'Photos')
    cy.get('h3').should('contain', 'Add picture')
    cy.get('[placeholder="Title"]').should('be.visible', true)
    cy.get('[placeholder="Url"]').should('be.visible', true)
    cy.get('form > button').should('be.visible', true)
    cy.get(':nth-child(1) > .photo > .title').should('have.text', 'accusamus beatae ad facilis cum similique qui sunt')
    cy.get(':nth-child(1) > .photo > .image').should('have.text', '')
    cy.get(':nth-child(1) > .photo > div > :nth-child(1)').should('be.visible', true)
    cy.get(':nth-child(1) > .photo > div > :nth-child(2)').should('be.visible', true)
  })

  it('Test adding a picture', () => {
    cy.get('[placeholder="Title"]').type('Pealkiri')
    cy.get('[placeholder="Url"]').type('https://via.placeholder.com/600/92c952')
    cy.get('form > button').click()
    cy.get(':nth-child(11) > .photo').should('be.visible', true)
    cy.get(':nth-child(11) > .photo > .title').should('contain', 'Pealkiri')
  })

  it('Test editing a picture', () => {
    cy.get(':nth-child(11) > .photo > div > :nth-child(1)').click()
    cy.get(':nth-child(11) > form > [placeholder="Title"]').clear()
    cy.get(':nth-child(11) > form > [placeholder="Title"]').type('Testimine').should('have.value', 'Testimine')
    cy.get(':nth-child(11) > form > [placeholder="Url"]').clear()
    cy.get(':nth-child(11) > form > [placeholder="Url"]').type('https://via.placeholder.com/600/92c952').should('have.value', 'https://via.placeholder.com/600/92c952')
    cy.get(':nth-child(11) > form > button').should('contain.text', 'Save').click()
  })

  it('Test deleting a picture', () => {
    cy.get(':nth-child(11) > .photo > div > :nth-child(2)').click()
    cy.get(':nth-child(11) > .photo').should('not.exist')
  })

})
