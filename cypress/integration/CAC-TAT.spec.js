/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => cy.visit('src/index.html'))
  
    it('verifica o título da aplicação', () => {

        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
        
    });

    it('preenche os campos obrigatórios e envia o formulário', () =>{        
        cy.get('#firstName').type('Jefferson');
        cy.get('#lastName').type('Silva');
        cy.get('#email').type(Cypress.env("email"));
        cy.get('#phone').type('11995643528');
        cy.get('#open-text-area').type('lspumlspumlspumlspumlspumlspumlspumlspumlspumlspumlspumlspumlspumlspumlspumlspumlspumlspumlspumlspum', {delay: 0});
        cy.contains('button','Enviar').click();
        cy.get('.success').should('be.visible');
        cy.get('.success').should('contains.text', 'Mensagem enviada com sucesso.');
 
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () =>{        
        cy.get('#firstName').type('Jefferson');
        cy.get('#lastName').type('Silva');
        cy.get('#email').type('testeteste.com');
        cy.get('#phone').type('11995643528');
        cy.get('#open-text-area').type('lspumlspumlspumlspumlspumlspumlspumlspumlspumlspumlspumlspumlspumlspumlspumlspumlspumlspumlspumlspum', {delay: 0});
        cy.contains('button','Enviar').click();
        cy.get('.error').should('be.visible');
        cy.get('.error').should('contains.text', 'Valide os campos obrigatórios!');
 
    })
    it('Extra 3 - Validando campo telefone', () =>{        
        cy.get('#firstName').type('Jefferson');
        cy.get('#lastName').type('Silva');
        cy.get('#email').type('teste@teste.com');
        cy.get('#phone').type('dsadss').should('have.value', '');

 
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () =>{        
        cy.get('#firstName').type('Jefferson');
        cy.get('#lastName').type('Silva');
        cy.get('#email').type('teste@teste.com');
       // cy.get('#phone').type('11995643528');
        cy.get('#phone-checkbox').check();
        cy.get('#open-text-area').type('lspumlspumlspumlspumlspumlspumlspumlspumlspumlspumlspumlspumlspumlspumlspumlspumlspumlspumlspumlspum', {delay: 0});
        cy.contains('button','Enviar').click();
        cy.get('.error').should('be.visible');
        cy.get('.error').should('contains.text', 'Valide os campos obrigatórios!');
 
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () =>{        
        cy.get('#firstName')
            .type('Jefferson')
            .should('have.value', 'Jefferson')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Silva')
            .should('have.value', 'Silva')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('teste@teste.com')
            .should('have.value', 'teste@teste.com')
            .clear()
            .should('have.value', '');
        cy.get('#phone')
            .type('11995643528')
            .should('have.value', '11995643528')
            .clear()
            .should('have.value', '')       
 
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', () =>{    
        cy.contains('button','Enviar').click();
        cy.get('.error').should('be.visible');
        cy.get('.error').should('contains.text', 'Valide os campos obrigatórios!');
    })
    it('envia o formuário com sucesso usando um comando customizado', () =>{    
        cy.fillMandatoryFieldsAndSubmit();
        cy.get('.success').should('be.visible');
        cy.get('.success').should('contains.text', 'Mensagem enviada com sucesso.');
    })

    it('seleciona um produto (YouTube) por seu texto', () =>{
        cy.get('#product').select('YouTube')
            .should('have.value', 'youtube')


    })
    it('seleciona um produto (Mentoria) por seu valor', () =>{
        cy.get('#product').select('mentoria')
            .should('have.value', 'mentoria')


    })
    it('seleciona um produto (Blog) por seu index', () =>{
        cy.get('#product').select(1)
            .should('have.value', 'blog')

    })

     it('seleciona um produto de forma aleatoria', () => {
        cy.get('#product option')
        .its('length', {log : false}).then( n=>{
                cy.get('select').select(Cypress._.random(n))
            })
        }) 

    it('marca o tipo de atendimento "Feedback"', () =>{
        cy.get('[type="radio"]').check('feedback')
        .should('have.value', 'feedback')

    })
    it('marca cada tipo de atendimento', () =>{
        cy.get('[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it('marca ambos checkboxes', () =>{

        cy.get('input[type="checkbox"]')
        .as('checkboxes')
        .check()
        cy.get('@checkboxes')
        .each(checkbox => {
        expect(checkbox[0].checked).to.equal(true)
    })

        cy.get('input[type="checkbox"]')
        .last()
        .uncheck()
        .should('not.be.checked');

         
    })

    it('seleciona um arquivo da pasta fixtures', () =>{

        cy.get('input[type=file]')
        .selectFile('cypress/fixtures/example.json')
        .then ( input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })
    it('seleciona um arquivo simulando um drag-and-drop', () =>{

        cy.get('input[type=file]')
        .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
        .then ( input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',() => {
        cy.fixture('example.json').as('arquivo')
        cy.get('input[type=file]')
        .selectFile('@arquivo')
        .should ( input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    }) 
    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('a[target="_blank"]')
        .should('have.attr', 'target', '_blank')

    })
    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('a[target="_blank"]')
        .invoke('removeAttr', 'target')
        .click()
    })

    it('testa a página da política de privacidade de forma independente', () => {
        cy.get('a[target="_blank"]')
        .should ( $a => {
            expect($a.attr('href'), 'href').to.equal('privacy.html')
            expect($a.attr('target'), 'target').to.equal('_blank')
            $a.attr('target', '_self')

        }).click()
        cy.location('pathname').should('equal', '/src/privacy.html')   
    })

})