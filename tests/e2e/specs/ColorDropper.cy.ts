describe('Color dropper view should work as expected', {
  viewportHeight: 1000,
  viewportWidth: 1000,
}, () => {
  it('page load, can move the mouse over the canvas, get color and save it in the tools bar', () => {
    cy.visit('./')

    cy.get('#Color').check({ force: true })
    
    const canvas = cy.get('[data-testid="canvas"]')
    canvas.trigger('mousemove', { offsetX: 300, offsetY: 300 })
    canvas.trigger('click')

    let color = cy.get('[data-testid="color"]')
    color.should('contain.text', '#0489d8')

    cy.get('select').select('rgb')

    color = cy.get('[data-testid="color"]')
    color.should('contain.text', 'rgb(4, 137, 216)')

    cy.get('select').select('hsl')

    color = cy.get('[data-testid="color"]')
    color.should('contain.text', 'hsl(202, 96%, 43%)')
  })
})