describe('App tests', () => {
  it('should render three sections', () => {
    cy.visit('http://localhost:3000');
    cy.findByText('Favourites').should('exist');
    cy.findByText('Search History').should('exist');
    const searchInput = cy.get('.Main_searchInput');
    searchInput.should('exist');
  });
  it('should show search result', () => {
    const searchInput = cy.get('.Main_searchInput');
    searchInput.type('test');
    cy.wait(2000);
    cy.get('.WordCard').should('exist');
  });
  it('should show see searched word appearing on history list', () => {
    const historySection = cy.get('.History');
    historySection.findByText('test').should('exist');
  });
  it('should or should not show selected word on favourite list', () => {
    const favouritesSection = cy.get('.Favourites');
    const favouriteBtn = cy.get('.Main_favouriteBtn');
    favouriteBtn.then((btn) => {
      if (btn.hasClass('Main_favouriteBtn--checked')) {
        favouriteBtn
          .click()
          .wait(1000)
          .then(() => {
            favouriteBtn.should('not.have.class', 'Main_favouriteBtn--checked');
            favouritesSection.findAllByText('test').should('not.exist');
          });
      } else {
        favouriteBtn
          .click()
          .wait(1000)
          .then(() => {
            favouriteBtn.should('have.class', 'Main_favouriteBtn--checked');
            favouritesSection.findAllByText('test').should('exist');
          });
      }
    });
  });
  it('should move exsiting favouite word to the top', () => {
    const favouritesSection = cy.get('.Favourites');
    const existingLink = favouritesSection.findByText('mice').first();
    existingLink
      .click()
      .wait(2000)
      .then(() => {
        const firstWordCard = cy.get('.WordCard').first();
        const firstWord = firstWordCard.get('.WordCard_text').first();
        firstWord.should('have.text', 'mice');
      });
  });
});
