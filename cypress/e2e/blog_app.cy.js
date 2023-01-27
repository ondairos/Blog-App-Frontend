// /* eslint-disable no-undef */
// // Mocha recommends that arrow functions are not used, because they might cause some issues in certain situations.

// describe('Blog app', function () {
//     beforeEach(function () {
//         cy.visit('http://localhost:3000')
//     })

//     it('front page can be opened', function () {
//         cy.contains('Blogs')
//         cy.contains('Ioannis Kantiloros')
//     })

//     it('user can log in', function () {
//         cy.contains('login').click()
//         cy.get('#username').type('test2')
//         cy.get('#password').type('13141')
//         cy.get('#login-button').click()

//         cy.contains('Testing Test2 logged-in')
//     })

//     describe('when logged in', function () {
//         beforeEach(function () {
//             cy.contains('login').click()
//             cy.get('#username').type('test2')
//             cy.get('#password').type('13141')
//             cy.get('#login-button').click()

//         })
//         // each test starts from zero as far as the browser is concerned. All changes to the browser's state are reversed after each test.
//         it('a new note can be created', function () {
//             cy.get('#toggle_button').click()
//             cy.get('#titleInput').type('a blogpost created by cypress')
//             cy.get('#authorInput').type('cypress')
//             cy.get('#urlInput').type('cypress.com')

//             cy.contains('Save').click()
//             cy.contains('a blogpost created by cypress by: cypress')
//         })
//     })
// })

