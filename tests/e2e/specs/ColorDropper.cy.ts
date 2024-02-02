describe('Color dropper view should work as expected', {
  viewportHeight: 1000,
  viewportWidth: 1000,
}, () => {
  it('page load, can move the mouse over the canvas, get color and save it in the tools bar', () => {
    cy.visit('./')
    
    cy.get('[type="checkbox"]').check({ force: true })
    
    const canvas = cy.get('[data-testid="canvas"]')
    canvas.trigger('mousemove', { clientX: 100, clientY: 100 })
    canvas.trigger('click')

    let color = cy.get('[data-testid="color"]')
    color.should('contain.text', '#74b459')

    cy.get('select').select('rgb')

    color = cy.get('[data-testid="color"]')
    color.should('contain.text', 'rgb(116, 180, 89)')

    cy.get('select').select('hsl')

    color = cy.get('[data-testid="color"]')
    color.should('contain.text', 'hsl(102, 38%, 53%)')
  })
})