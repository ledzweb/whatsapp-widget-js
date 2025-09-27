# WhatsApp Widget JS

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/seu-usuario/whatsapp-widget-js)

Um widget de WhatsApp flutuante, leve, personalizável e sem dependências para qualquer site.

## ✨ Funcionalidades

- **Sem Dependências**: Feito com JavaScript puro (Vanilla JS), sem necessidade de jQuery ou outras bibliotecas.
- **Altamente Personalizável**: Configure cores, posição, tamanho, mensagem e muito mais.
- **Ícone SVG Embutido**: Não requer bibliotecas de ícones como Font Awesome.
- **Múltiplos Métodos de Integração**: Integre via tag de script, atributos de dados, JavaScript ou NPM.
- **Configurador Visual**: Use a página de demonstração para gerar o código de integração visualmente.
- **Temas e Configurações Predefinidas**: Aplique temas de cores e configurações para diferentes setores com uma única linha de código.
- **Horário de Funcionamento**: Defina mensagens diferentes para dentro e fora do horário comercial.
- **Responsivo**: Funciona perfeitamente em desktops e dispositivos móveis.
- **Leve**: Arquivo minificado com menos de 10KB.

## 🚀 Demonstração ao Vivo

Confira o **configurador visual** e exemplos de integração na página de demonstração:

[**Acessar Demonstração e Configurador**](./integration-examples.html)

## 🛠️ Instalação e Uso

Existem várias maneiras de adicionar o widget ao seu site. Escolha a que melhor se adapta ao seu projeto.

### Método 1: Script Tag (Recomendado)

Este é o método mais simples. Adicione o código abaixo antes do fechamento da tag `</body>` no seu HTML.

```html
<!-- WhatsApp Widget -->
<script>
window.whatsappWidgetConfig = {
    phoneNumber: '5541999999999', // Número do seu WhatsApp
    message: 'Olá! Como posso ajudá-lo?', // Mensagem pré-definida (opcional)
    position: 'bottom-right' // Posição do widget (opcional)
};
</script>
<script src="https://cdn.jsdelivr.net/gh/seu-usuario/whatsapp-widget@latest/whatsapp-widget.min.js" defer></script>
```

### Método 2: Atributos de Dados

Configure o widget diretamente na tag de script usando atributos `data-*`.

```html
<!-- WhatsApp Widget -->
<script 
    defer
    data-whatsapp-number="5541999999999"
    data-whatsapp-message="Olá! Gostaria de mais informações."
    data-whatsapp-position="bottom-left"
    src="https://cdn.jsdelivr.net/gh/seu-usuario/whatsapp-widget@latest/whatsapp-widget.min.js">
</script>
```

### Método 3: Instalação via NPM

Para projetos baseados em Node.js (React, Vue, Angular, etc.), você pode instalar o widget via NPM.

```bash
npm install whatsapp-widget-js
```

E então importar e usar no seu projeto:

```javascript
import WhatsAppWidget from 'whatsapp-widget-js';

document.addEventListener('DOMContentLoaded', () => {
  const widget = new WhatsAppWidget({
    phoneNumber: '5541999999999',
    message: 'Olá! 👋'
  });
});
```

## ⚙️ Opções de Configuração

Personalize o widget com as seguintes opções:

| Opção             | Tipo      | Padrão                   | Descrição                                                                                             |
|-------------------|-----------|--------------------------|-------------------------------------------------------------------------------------------------------|
| `phoneNumber`     | `string`  | `''` (vazio)             | **Obrigatório**. Número do WhatsApp no formato internacional (ex: `5511999999999`).                      |
| `message`         | `string`  | `''` (vazio)             | Mensagem de texto pré-definida que aparecerá na conversa do WhatsApp.                                 |
| `position`        | `string`  | `'bottom-right'`         | Posição do widget. Opções: `'bottom-right'`, `'bottom-left'`, `'top-right'`, `'top-left'`.              |
| `backgroundColor` | `string`  | `'#25D366'`              | Cor de fundo do botão.                                                                                |
| `hoverColor`      | `string`  | `'#128C7E'`              | Cor de fundo do botão ao passar o mouse.                                                              |
| `size`            | `string`  | `'medium'`               | Tamanho do widget. Opções: `'small'`, `'medium'`, `'large'`.                                            |
| `showTooltip`     | `boolean` | `true`                   | Exibir ou não o tooltip ao passar o mouse.                                                            |
| `tooltipText`     | `string`  | `'Fale conosco...'`      | Texto que aparece no tooltip.                                                                         |
| `animation`       | `boolean` | `true`                   | Ativa uma animação de pulso para chamar a atenção.                                                    |
| `zIndex`          | `number`  | `9999`                   | `z-index` do widget para controlar o empilhamento.                                                    |

## 🎨 Uso Avançado

### Temas e Configurações por Setor

Para facilitar a personalização, você pode usar temas e configurações predefinidas. Para isso, inclua o arquivo `whatsapp-widget-config.min.js`.

```html
<script src="https://cdn.jsdelivr.net/gh/ledzweb/whatsapp-widget@latest/whatsapp-widget-config.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/ledzweb/whatsapp-widget@latest/whatsapp-widget.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', () => {
  // Exemplo: Configuração para e-commerce com tema azul
  const config = whatsappConfig.createConfig({
    baseConfig: {
      phoneNumber: '5541999999999'
    },
    theme: 'blue', // Temas: 'dark', 'blue', 'purple', 'red', 'orange', 'minimal', 'gradient'
    industry: 'ecommerce' // Setores: 'ecommerce', 'restaurante', 'servicos', 'suporte', etc.
  });

  new WhatsAppWidget(config);
});
</script>
```

### Horário de Funcionamento

Defina mensagens diferentes para dentro e fora do horário de atendimento.

```javascript
const config = whatsappConfig.createConfig({
  baseConfig: {
    phoneNumber: '5541999999999'
  },
  businessHours: 'comercial' // Horários: 'comercial', 'varejo', 'restaurante', 'sempre'
});

new WhatsAppWidget(config);
```

## 👨‍💻 API de Controle

Você pode controlar o widget programaticamente após a sua criação.

```javascript
// Crie uma instância do widget
const myWidget = new WhatsAppWidget({ phoneNumber: '5541999999999' });

// Esconder o widget
myWidget.hide();

// Mostrar o widget
myWidget.show();

// Atualizar a configuração
myWidget.updateConfig({
  message: 'Nova mensagem!',
  backgroundColor: '#ef4444'
});

// Remover o widget da página
myWidget.destroy();
```

## 🌐 Compatibilidade

O widget é compatível com todos os navegadores modernos:

- Chrome
- Firefox
- Safari
- Edge
- Opera
- Navegadores mobile (iOS, Android)

## 📜 Licença

Este projeto está licenciado sob a **Licença MIT**. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.
