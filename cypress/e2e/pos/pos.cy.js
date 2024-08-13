/// <reference types="cypress" />

describe('POS challenge app', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8888/')
    })

    it('displays a cashier selection form with the first cashier selected', () => {
        cy.get('input[type="radio"]').first().should('be.checked')
    })

    it('can accept a cashier selection and navigate to dashboard', () => {
        cy.get('[data-cy="accept-cashier-selection"]').click()
        cy.contains('Cashier Sales Statistics').should('have.length', 1)
        cy.contains('C1').should('have.length', 1)
    })

    it('can navigate back to cashier selection, make a new selection and navigate to dashboard', () => {
        cy.get('[data-cy="accept-cashier-selection"]').click()
        cy.get('[data-cy="switch-to-cashier-selection"]').click()
        cy.get('input[type="radio"]')
            .last()
            .should('not.be.checked')
            .click()
            .should('be.checked')
        cy.get('[data-cy="accept-cashier-selection"]').click()
        cy.contains('Cashier Sales Statistics').should('have.length', 1)
        cy.contains('C3').should('have.length', 1)
    })

    it('can navigate to add sale screen, and go back', () => {
        cy.get('[data-cy="accept-cashier-selection"]').click()
        cy.get('[data-cy="switch-to-add-sale"]').click()
        cy.get('[data-cy="add-sale-item"]').should('have.length', 3)
        cy.get('[data-cy="back-to-dashboard"]').click()
        cy.contains('Cashier Sales Statistics').should('have.length', 1)
    })

    it('can navigate to add sale screen, and add a sale', () => {
        // Navigate to dashboard and check chart
        cy.get('[data-cy="accept-cashier-selection"]').click()
        cy.get('rect.MuiBarElement-root')
            .should('have.length', 3)
            .first()
            .trigger('mouseover')
        cy.contains('Cashier 1').should('have.length', 1)
        cy.contains('Total sales').should('have.length', 1)

        // Navigate to add sale
        cy.get('[data-cy="switch-to-add-sale"]').click()
        cy.get('[data-cy="add-sale-item"]').should('have.length', 3)

        // Increment first item
        cy.get('[data-cy="add-sale-item-increment"').first().click()
        cy.get('[data-cy="add-sale-item-increment"').first().click()
        cy.get('[data-cy="add-sale-item-increment"').first().click()
        cy.get('[data-cy="add-sale-item"] input')
            .first()
            .should('have.value', '3')

        // Decrement first item
        cy.get('[data-cy="add-sale-item-decrement"').first().click()
        cy.get('[data-cy="add-sale-item"] input')
            .first()
            .should('have.value', '2')

        // Increment last item
        cy.get('[data-cy="add-sale-item-increment"').last().click()
        cy.get('[data-cy="add-sale-item-increment"').last().click()
        cy.get('[data-cy="add-sale-item"] input')
            .last()
            .should('have.value', '2')

        // Decrement last item
        cy.get('[data-cy="add-sale-item-decrement"').last().click()
        cy.get('[data-cy="add-sale-item-decrement"').last().click()
        cy.get('[data-cy="add-sale-item-decrement"')
            .last()
            .should('be.disabled')
        cy.get('[data-cy="add-sale-item"] input')
            .last()
            .should('have.value', '0')

        // Submit and return to dashboard
        cy.get('[data-cy="add-sale-submit"]').click()
        cy.contains('Cashier Sales Statistics').should('have.length', 1)

        // Check bars reflect additional sale
        cy.get('rect.MuiBarElement-root').should('have.length', 3)
    })
})
