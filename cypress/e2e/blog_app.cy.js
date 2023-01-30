/* eslint-disable no-undef */
// Mocha recommends that arrow functions are not used, because they might cause some issues in certain situations.

describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')

        const user = {
            name: 'John Tester',
            username: 'test2',
            password: '13141'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function () {
        cy.contains('Blogs')
        cy.contains('Ioannis Kantiloros')
    })

    it('login fails with wrong password', function () {
        cy.contains('login').click()
        cy.get('#username').type('test2')
        cy.get('#password').type('111111')
        cy.get('#login-button').click()

        cy.contains('Wrong username or password')
        cy.get('html').should('not.contain', 'John Tester logged-in')
    })

    it('user can log in', function () {
        cy.contains('login').click()
        cy.get('#username').type('test2')
        cy.get('#password').type('13141')
        cy.get('#login-button').click()

        cy.contains('John Tester logged-in')
    })


    describe('when logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'test2', password: '13141' })
        })
        // each test starts from zero as far as the browser is concerned. All changes to the browser's state are reversed after each test.
        it.skip('a new blog post can be created', function () {
            // cy.get('#toggle_button').click()
            cy.wait(1500)
            cy.get('#toggle_button').click()
            cy.get('#titleInput').type('a blogpost created by cypress')
            cy.get('#authorInput').type('cypress')
            cy.get('#urlInput').type('cypress.com')

            cy.contains('Save').click()
            cy.contains('a blogpost created by cypress by: cypress')
        })

        describe('and a blog post exists', function () {
            beforeEach(function () {
                cy.createBlogPost({
                    title: 'Another blog Post',
                    author: 'Lorem Ipsum',
                    blogUrl: 'lorem.com',
                    likes: 111
                })
            })
        })
    })
})

