/// <reference types="cypress" />

it('loads and communicates', () => {
  cy.visit('/')
})

it('spies on console.log call', () => {
  cy.visit('/', {
    onBeforeLoad(win) {
      cy.spy(win.console, 'log').as('log')
    },
  })
  cy.get('@log').should(
    'have.been.calledWith',
    'TOP:',
    Cypress.sinon.match.string,
    'inner frame is ready',
  )
})

it('receives the window messages', () => {
  // https://on.cypress.io/stub
  const winMessage = cy.stub().as('message')
  cy.visit('/', {
    onBeforeLoad(win) {
      win.addEventListener('message', (e) => {
        // call our cy.stub (which is just a function)
        winMessage(e.data)
      })
    },
  })
  // confirm the inner frame sent the ready message
  cy.get('@message').should(
    'have.been.calledOnceWithExactly',
    'inner frame is ready',
  )
})
