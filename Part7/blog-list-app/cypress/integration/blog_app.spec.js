describe('Blog App', function () {

    beforeEach(() => {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')

        const user = {
            name: 'gaston',
            username: 'gaston',
            password: 'gaston'
        }
        cy.request('POST', 'http://localhost:3001/api/users', user)
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function () {
        cy.contains('blogs')
    })

    it('is login form shown', function () {
        cy.contains('log in').click()
        cy.contains('password')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.contains('log in').click()
            cy.get('#username').type('gaston')
            cy.get('#password').type('gaston')
            cy.contains('login').click()
            cy.contains('gaston logged in')
        })

        it('fails with wrong credentials', function () {
            cy.contains('log in').click()
            cy.get('#username').type('wtfuser')
            cy.get('#password').type('wtfpass')
            cy.contains('login').click()
            cy.get('.error')
                .should('contain', 'Wrong credentials')
                .should('have.css', 'color', 'rgb(255, 0, 0)')
                .should('have.css', 'border-style', 'solid')
            cy.get('html').should('not.contain', 'gaston logged in')
        })

        describe('when logged in', function () {
            beforeEach(() => {
                cy.login(({ username: 'gaston', password: 'gaston' }))
            })

            it('a new blog can be created', function () {
                cy.createBlog({
                    title: 'another blog cypress',
                    author: 'gaston',
                    url: 'www.myspace.com'
                })
                cy.contains('another blog cypress')
            })

            describe('when a blog is created', function () {
                beforeEach(() => {
                    cy.createBlog({
                        title: 'another blog cypress',
                        author: 'gaston',
                        url: 'www.myspace.com'
                    })
                })

                it('user can like a blog', function () {
                    cy.contains('view').click()
                    cy.contains('like').click()
                    cy.get('.success')
                        .should('contain', 'Blog updated')
                })

                it('user can remove a blog', function () {
                    cy.contains('view').click()
                    cy.contains('remove').click()
                    cy.should('not.contain', 'another blog cypress')
                })

                it('user can sort blogs', function () {

                    let result = []

                    cy.createBlog({
                        title: 'second blog',
                        author: 'gaston',
                        url: 'www.myspace.com',
                        likes: 4
                    })

                    cy.createBlog({
                        title: 'third blog',
                        author: 'gaston',
                        url: 'www.myspace.com',
                        likes: 10
                    })

                    cy.contains('view').click()
                    cy.contains('view').click()
                    cy.contains('view').click()

                    cy.contains('Sort by likes').click()
                    cy.contains('Likes: 10')

                })
            })
        })
    })
})