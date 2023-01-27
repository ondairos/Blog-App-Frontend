/* eslint-disable no-undef */
// Mocha recommends that arrow functions are not used, because they might cause some issues in certain situations.
describe('Blog app', function () {
    it('front page can be opened', function () {
        cy.visit('http://localhost:3000')
        cy.contains('Blogs')
        cy.contains('Ioannis Kantiloros')
    })

    it('login form can be opened', function () {
        cy.visit('http://localhost:3000')
        cy.contains('login').click()
    })
})
