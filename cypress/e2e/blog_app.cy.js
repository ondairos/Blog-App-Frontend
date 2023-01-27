// Mocha recommends that arrow functions are not used, because they might cause some issues in certain situations.
describe('Blog app', function () {
    beforeEach(function() {
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function () {
        cy.contains('Blogs')
        cy.contains('Ioannis Kantiloros')
    })

    it('login form can be opened', function () {
        cy.contains('login').click()
        cy.get('#username').type('test2')
        cy.get('#password').type('13141')
        cy.get('#login-button').click()

        cy.contains('Testing Test2 logged-in')
    })
})
