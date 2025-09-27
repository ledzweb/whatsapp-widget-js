# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

## [1.0.1] - 2025-09-26

### 🔧 Correções
- **Tooltip**: Corrigida a posição da seta do tooltip que estava sempre centralizada
  - Agora a seta se alinha corretamente com o botão em todas as posições (esquerda/direita)
  - A seta aparece a 15px da borda do tooltip, alinhada com o centro do botão
- **Animação**: Removido o efeito pulsante padrão do botão
  - Alterado `animation: true` para `animation: false` nas configurações padrão
  - O efeito ainda pode ser ativado manualmente definindo `animation: true`

### 📝 Detalhes Técnicos
- Removido `left: 50%; margin-left: -5px;` da seta do tooltip
- Adicionado posicionamento específico: `left: 15px` ou `right: 15px` dependendo da posição
- Configuração padrão de animação alterada para `false`

### 🧪 Testes
- Testado em todas as 4 posições (bottom-right, bottom-left, top-right, top-left)
- Verificado que a seta do tooltip agora se alinha corretamente com o botão
- Confirmado que não há mais animação pulsante por padrão

## [1.0.0] - 2025-09-26

### 🎉 Lançamento Inicial
- Widget de WhatsApp flutuante e personalizável
- Suporte a múltiplos métodos de integração
- Configurador visual interativo
- Temas e configurações predefinidas
- Documentação completa
- Suporte a CDN jsDelivr
