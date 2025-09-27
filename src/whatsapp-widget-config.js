/**
 * WhatsApp Widget - Configurações e Temas Predefinidos
 * Versão: 1.0.0
 */

(function(window) {
    'use strict';

    // Temas predefinidos
    var themes = {
        default: {
            backgroundColor: '#25D366',
            hoverColor: '#128C7E',
            tooltipText: 'Fale conosco no WhatsApp'
        },
        
        dark: {
            backgroundColor: '#1f2937',
            hoverColor: '#374151',
            tooltipText: 'Entre em contato'
        },
        
        blue: {
            backgroundColor: '#3b82f6',
            hoverColor: '#2563eb',
            tooltipText: 'Converse conosco'
        },
        
        purple: {
            backgroundColor: '#8b5cf6',
            hoverColor: '#7c3aed',
            tooltipText: 'Fale conosco'
        },
        
        red: {
            backgroundColor: '#ef4444',
            hoverColor: '#dc2626',
            tooltipText: 'Suporte via WhatsApp'
        },
        
        orange: {
            backgroundColor: '#f97316',
            hoverColor: '#ea580c',
            tooltipText: 'Atendimento WhatsApp'
        },
        
        minimal: {
            backgroundColor: '#ffffff',
            hoverColor: '#f3f4f6',
            color: '#1f2937',
            border: '2px solid #e5e7eb',
            tooltipText: 'WhatsApp'
        },
        
        gradient: {
            backgroundColor: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
            hoverColor: 'linear-gradient(135deg, #128C7E 0%, #0d6e5e 100%)',
            tooltipText: 'Fale conosco no WhatsApp'
        }
    };

    // Configurações por setor/indústria
    var industryConfigs = {
        ecommerce: {
            message: 'Olá! Gostaria de saber mais sobre nossos produtos?',
            tooltipText: 'Dúvidas sobre produtos?',
            position: 'bottom-right',
            size: 'large'
        },
        
        restaurante: {
            message: 'Olá! Gostaria de fazer um pedido ou reserva?',
            tooltipText: 'Faça seu pedido',
            position: 'bottom-right',
            size: 'medium'
        },
        
        servicos: {
            message: 'Olá! Como posso ajudá-lo com nossos serviços?',
            tooltipText: 'Solicite um orçamento',
            position: 'bottom-left',
            size: 'medium'
        },
        
        suporte: {
            message: 'Olá! Precisa de ajuda? Estou aqui para ajudar!',
            tooltipText: 'Suporte técnico',
            position: 'bottom-right',
            size: 'large',
            animation: true
        },
        
        imobiliaria: {
            message: 'Olá! Interessado em algum imóvel? Vamos conversar!',
            tooltipText: 'Fale com corretor',
            position: 'bottom-right',
            size: 'medium'
        },
        
        educacao: {
            message: 'Olá! Gostaria de saber mais sobre nossos cursos?',
            tooltipText: 'Informações sobre cursos',
            position: 'bottom-left',
            size: 'medium'
        }
    };

    // Configurações por horário de funcionamento
    var businessHours = {
        comercial: {
            start: '08:00',
            end: '18:00',
            days: [1, 2, 3, 4, 5], // Segunda a sexta
            messageInHours: 'Olá! Como posso ajudá-lo?',
            messageOutHours: 'Olá! Nosso horário de atendimento é de segunda a sexta, das 8h às 18h. Deixe sua mensagem que retornaremos em breve!'
        },
        
        varejo: {
            start: '09:00',
            end: '22:00',
            days: [1, 2, 3, 4, 5, 6], // Segunda a sábado
            messageInHours: 'Olá! Estamos online para ajudá-lo!',
            messageOutHours: 'Olá! Nosso atendimento é de segunda a sábado, das 9h às 22h. Deixe sua mensagem!'
        },
        
        restaurante: {
            start: '11:00',
            end: '23:00',
            days: [0, 1, 2, 3, 4, 5, 6], // Todos os dias
            messageInHours: 'Olá! Faça seu pedido ou reserva!',
            messageOutHours: 'Olá! Nosso restaurante funciona todos os dias das 11h às 23h. Deixe sua mensagem para reservas!'
        },
        
        sempre: {
            start: '00:00',
            end: '23:59',
            days: [0, 1, 2, 3, 4, 5, 6],
            messageInHours: 'Olá! Como posso ajudá-lo?',
            messageOutHours: 'Olá! Como posso ajudá-lo?'
        }
    };

    /**
     * Classe para gerenciar configurações avançadas
     */
    function WhatsAppWidgetConfig() {
        this.themes = themes;
        this.industryConfigs = industryConfigs;
        this.businessHours = businessHours;
    }

    /**
     * Aplica um tema predefinido
     */
    WhatsAppWidgetConfig.prototype.applyTheme = function(themeName, baseConfig) {
        var theme = this.themes[themeName];
        if (!theme) {
            console.warn('Tema não encontrado:', themeName);
            return baseConfig;
        }
        
        return this.mergeConfig(baseConfig, theme);
    };

    /**
     * Aplica configuração por indústria
     */
    WhatsAppWidgetConfig.prototype.applyIndustryConfig = function(industry, baseConfig) {
        var config = this.industryConfigs[industry];
        if (!config) {
            console.warn('Configuração de indústria não encontrada:', industry);
            return baseConfig;
        }
        
        return this.mergeConfig(baseConfig, config);
    };

    /**
     * Aplica horário de funcionamento
     */
    WhatsAppWidgetConfig.prototype.applyBusinessHours = function(hoursType, baseConfig) {
        var hours = this.businessHours[hoursType];
        if (!hours) {
            console.warn('Horário de funcionamento não encontrado:', hoursType);
            return baseConfig;
        }
        
        var now = new Date();
        var currentDay = now.getDay();
        var currentTime = now.getHours().toString().padStart(2, '0') + ':' + 
                         now.getMinutes().toString().padStart(2, '0');
        
        var isBusinessDay = hours.days.includes(currentDay);
        var isBusinessHour = currentTime >= hours.start && currentTime <= hours.end;
        var isOpen = isBusinessDay && isBusinessHour;
        
        var message = isOpen ? hours.messageInHours : hours.messageOutHours;
        
        return this.mergeConfig(baseConfig, { message: message });
    };

    /**
     * Mescla configurações
     */
    WhatsAppWidgetConfig.prototype.mergeConfig = function(base, override) {
        var merged = {};
        for (var key in base) {
            merged[key] = base[key];
        }
        for (var key in override) {
            merged[key] = override[key];
        }
        return merged;
    };

    /**
     * Cria configuração completa baseada em parâmetros
     */
    WhatsAppWidgetConfig.prototype.createConfig = function(options) {
        var config = options.baseConfig || {};
        
        // Aplica tema se especificado
        if (options.theme) {
            config = this.applyTheme(options.theme, config);
        }
        
        // Aplica configuração de indústria se especificada
        if (options.industry) {
            config = this.applyIndustryConfig(options.industry, config);
        }
        
        // Aplica horário de funcionamento se especificado
        if (options.businessHours) {
            config = this.applyBusinessHours(options.businessHours, config);
        }
        
        // Aplica configurações customizadas
        if (options.customConfig) {
            config = this.mergeConfig(config, options.customConfig);
        }
        
        return config;
    };

    /**
     * Valida configuração
     */
    WhatsAppWidgetConfig.prototype.validateConfig = function(config) {
        var errors = [];
        
        if (!config.phoneNumber) {
            errors.push('phoneNumber é obrigatório');
        }
        
        if (config.phoneNumber && !/^\+?[\d\s\-\(\)]+$/.test(config.phoneNumber)) {
            errors.push('phoneNumber deve conter apenas números, espaços, hífens, parênteses e opcionalmente começar com +');
        }
        
        if (config.position && !['bottom-right', 'bottom-left', 'top-right', 'top-left'].includes(config.position)) {
            errors.push('position deve ser: bottom-right, bottom-left, top-right ou top-left');
        }
        
        if (config.size && !['small', 'medium', 'large'].includes(config.size)) {
            errors.push('size deve ser: small, medium ou large');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    };

    /**
     * Gera código de incorporação
     */
    WhatsAppWidgetConfig.prototype.generateEmbedCode = function(config, options) {
        options = options || {};
        var validation = this.validateConfig(config);
        
        if (!validation.isValid) {
            throw new Error('Configuração inválida: ' + validation.errors.join(', '));
        }
        
        var embedCode = '';
        
        if (options.method === 'script-tag') {
            embedCode = this.generateScriptTagEmbed(config);
        } else if (options.method === 'data-attributes') {
            embedCode = this.generateDataAttributesEmbed(config);
        } else if (options.method === 'javascript') {
            embedCode = this.generateJavaScriptEmbed(config);
        } else {
            // Método padrão
            embedCode = this.generateScriptTagEmbed(config);
        }
        
        return embedCode;
    };

    /**
     * Gera embed via script tag
     */
    WhatsAppWidgetConfig.prototype.generateScriptTagEmbed = function(config) {
        return `<!-- WhatsApp Widget -->
<script>
window.whatsappWidgetConfig = ${JSON.stringify(config, null, 2)};
</script>
<script src="https://cdn.jsdelivr.net/gh/seu-usuario/whatsapp-widget@latest/whatsapp-widget.min.js"></script>`;
    };

    /**
     * Gera embed via data attributes
     */
    WhatsAppWidgetConfig.prototype.generateDataAttributesEmbed = function(config) {
        var attributes = [
            `data-whatsapp-number="${config.phoneNumber}"`
        ];
        
        if (config.message) attributes.push(`data-whatsapp-message="${config.message}"`);
        if (config.position) attributes.push(`data-whatsapp-position="${config.position}"`);
        if (config.backgroundColor) attributes.push(`data-whatsapp-bg-color="${config.backgroundColor}"`);
        if (config.size) attributes.push(`data-whatsapp-size="${config.size}"`);
        if (config.showTooltip === false) attributes.push(`data-whatsapp-tooltip="false"`);
        if (config.tooltipText) attributes.push(`data-whatsapp-tooltip-text="${config.tooltipText}"`);
        
        return `<!-- WhatsApp Widget -->
<script ${attributes.join(' ')} src="https://cdn.jsdelivr.net/gh/seu-usuario/whatsapp-widget@latest/whatsapp-widget.min.js"></script>`;
    };

    /**
     * Gera embed via JavaScript
     */
    WhatsAppWidgetConfig.prototype.generateJavaScriptEmbed = function(config) {
        return `<!-- WhatsApp Widget -->
<script src="https://cdn.jsdelivr.net/gh/seu-usuario/whatsapp-widget@latest/whatsapp-widget.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    new WhatsAppWidget(${JSON.stringify(config, null, 4)});
});
</script>`;
    };

    // Exporta para uso global
    window.WhatsAppWidgetConfig = WhatsAppWidgetConfig;

    // Cria instância global para facilitar o uso
    window.whatsappConfig = new WhatsAppWidgetConfig();

})(window);
