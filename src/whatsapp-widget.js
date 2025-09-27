/**
 * WhatsApp Widget - Widget flutuante reutilizável para WhatsApp
 * Versão: 1.0.0
 * Autor: Manus AI
 * Licença: MIT
 */

(function(window, document) {
    'use strict';

    // Configurações padrão
    var defaultConfig = {
        phoneNumber: '',
        message: '',
        position: 'bottom-right',
        backgroundColor: '#25D366',
        hoverColor: '#128C7E',
        size: 'medium',
        showTooltip: true,
        tooltipText: 'Fale conosco no WhatsApp',
        zIndex: 9999,
        margin: 20,
        animation: false
    };

    // Ícone SVG do WhatsApp
    var whatsappIcon = '<svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/></svg>';

    // Tamanhos disponíveis
    var sizes = {
        small: { width: 50, height: 50, iconSize: 24 },
        medium: { width: 60, height: 60, iconSize: 30 },
        large: { width: 70, height: 70, iconSize: 36 }
    };

    // Posições disponíveis
    var positions = {
        'bottom-right': { bottom: '20px', right: '20px' },
        'bottom-left': { bottom: '20px', left: '20px' },
        'top-right': { top: '20px', right: '20px' },
        'top-left': { top: '20px', left: '20px' }
    };

    /**
     * Construtor do Widget WhatsApp
     */
    function WhatsAppWidget(config) {
        this.config = this.mergeConfig(defaultConfig, config || {});
        this.element = null;
        this.tooltip = null;
        this.init();
    }

    /**
     * Mescla configurações padrão com configurações do usuário
     */
    WhatsAppWidget.prototype.mergeConfig = function(defaults, userConfig) {
        var merged = {};
        for (var key in defaults) {
            merged[key] = defaults[key];
        }
        for (var key in userConfig) {
            merged[key] = userConfig[key];
        }
        return merged;
    };

    /**
     * Inicializa o widget
     */
    WhatsAppWidget.prototype.init = function() {
        if (!this.config.phoneNumber) {
            console.error('WhatsApp Widget: phoneNumber é obrigatório');
            return;
        }

        this.createStyles();
        this.createElement();
        this.bindEvents();
    };

    /**
     * Cria os estilos CSS do widget
     */
    WhatsAppWidget.prototype.createStyles = function() {
        var styleId = 'whatsapp-widget-styles';
        
        // Remove estilos existentes se houver
        var existingStyle = document.getElementById(styleId);
        if (existingStyle) {
            existingStyle.remove();
        }

        var style = document.createElement('style');
        style.id = styleId;
        style.textContent = this.generateCSS();
        document.head.appendChild(style);
    };

    /**
     * Gera o CSS do widget
     */
    WhatsAppWidget.prototype.generateCSS = function() {
        var config = this.config;
        var size = sizes[config.size] || sizes.medium;
        var position = positions[config.position] || positions['bottom-right'];

        var css = `
            .whatsapp-widget {
                position: fixed;
                z-index: ${config.zIndex};
                cursor: pointer;
                transition: all 0.3s ease;
                border-radius: 50%;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                display: flex;
                align-items: center;
                justify-content: center;
                text-decoration: none;
                color: white;
                width: ${size.width}px;
                height: ${size.height}px;
                background-color: ${config.backgroundColor};
            }

            .whatsapp-widget:hover {
                background-color: ${config.hoverColor};
                transform: scale(1.1);
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
                text-decoration: none;
                color: white;
            }

            .whatsapp-widget-icon {
                width: ${size.iconSize}px;
                height: ${size.iconSize}px;
                display: block;
            }

            .whatsapp-widget-tooltip {
                position: absolute;
                background-color: #333;
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 14px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                white-space: nowrap;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: ${config.zIndex + 1};
                pointer-events: none;
            }

            .whatsapp-widget-tooltip::after {
                content: '';
                position: absolute;
                width: 0;
                height: 0;
                border-style: solid;
            }

            .whatsapp-widget:hover .whatsapp-widget-tooltip {
                opacity: 1;
                visibility: visible;
            }

            ${this.generateTooltipPositionCSS()}

            ${config.animation ? `
                @keyframes whatsapp-widget-pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }

                .whatsapp-widget-animate {
                    animation: whatsapp-widget-pulse 2s infinite;
                }
            ` : ''}

            /* Responsividade */
            @media (max-width: 768px) {
                .whatsapp-widget {
                    width: ${Math.max(size.width - 10, 40)}px;
                    height: ${Math.max(size.height - 10, 40)}px;
                }
                
                .whatsapp-widget-icon {
                    width: ${Math.max(size.iconSize - 6, 20)}px;
                    height: ${Math.max(size.iconSize - 6, 20)}px;
                }
            }
        `;

        // Adiciona posicionamento
        for (var prop in position) {
            css += `.whatsapp-widget { ${prop}: ${position[prop]}; }`;
        }

        return css;
    };

    /**
     * Gera CSS para posicionamento do tooltip
     */
    WhatsAppWidget.prototype.generateTooltipPositionCSS = function() {
        var position = this.config.position;
        var css = '';

        if (position.includes('bottom')) {
            css += `
                .whatsapp-widget-tooltip {
                    bottom: 100%;
                    margin-bottom: 10px;
                }
                .whatsapp-widget-tooltip::after {
                    top: 100%;
                    border-width: 5px 5px 0 5px;
                    border-color: #333 transparent transparent transparent;
                }
            `;
        } else {
            css += `
                .whatsapp-widget-tooltip {
                    top: 100%;
                    margin-top: 10px;
                }
                .whatsapp-widget-tooltip::after {
                    bottom: 100%;
                    border-width: 0 5px 5px 5px;
                    border-color: transparent transparent #333 transparent;
                }
            `;
        }

        if (position.includes('right')) {
            css += `
                .whatsapp-widget-tooltip {
                    right: 0;
                }
                .whatsapp-widget-tooltip::after {
                    right: 15px;
                }
            `;
        } else {
            css += `
                .whatsapp-widget-tooltip {
                    left: 0;
                }
                .whatsapp-widget-tooltip::after {
                    left: 15px;
                }
            `;
        }

        return css;
    };

    /**
     * Cria o elemento HTML do widget
     */
    WhatsAppWidget.prototype.createElement = function() {
        // Remove widget existente se houver
        var existingWidget = document.querySelector('.whatsapp-widget');
        if (existingWidget) {
            existingWidget.remove();
        }

        var link = document.createElement('a');
        link.className = 'whatsapp-widget';
        link.href = this.generateWhatsAppURL();
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.setAttribute('aria-label', this.config.tooltipText);

        // Adiciona ícone
        var icon = document.createElement('span');
        icon.className = 'whatsapp-widget-icon';
        icon.innerHTML = whatsappIcon;
        link.appendChild(icon);

        // Adiciona tooltip se habilitado
        if (this.config.showTooltip) {
            var tooltip = document.createElement('span');
            tooltip.className = 'whatsapp-widget-tooltip';
            tooltip.textContent = this.config.tooltipText;
            link.appendChild(tooltip);
            this.tooltip = tooltip;
        }

        // Adiciona animação se habilitada
        if (this.config.animation) {
            link.classList.add('whatsapp-widget-animate');
        }

        document.body.appendChild(link);
        this.element = link;
    };

    /**
     * Gera a URL do WhatsApp
     */
    WhatsAppWidget.prototype.generateWhatsAppURL = function() {
        var baseURL = 'https://wa.me/' + this.config.phoneNumber.replace(/[^\d]/g, '');
        
        if (this.config.message) {
            baseURL += '?text=' + encodeURIComponent(this.config.message);
        }
        
        return baseURL;
    };

    /**
     * Vincula eventos do widget
     */
    WhatsAppWidget.prototype.bindEvents = function() {
        var self = this;
        
        if (this.element) {
            this.element.addEventListener('click', function(e) {
                // Analytics tracking (opcional)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'click', {
                        event_category: 'WhatsApp Widget',
                        event_label: 'WhatsApp Contact'
                    });
                }
                
                // Callback personalizado
                if (typeof self.config.onClick === 'function') {
                    self.config.onClick(e);
                }
            });
        }
    };

    /**
     * Atualiza a configuração do widget
     */
    WhatsAppWidget.prototype.updateConfig = function(newConfig) {
        this.config = this.mergeConfig(this.config, newConfig);
        this.createStyles();
        this.createElement();
        this.bindEvents();
    };

    /**
     * Remove o widget
     */
    WhatsAppWidget.prototype.destroy = function() {
        if (this.element) {
            this.element.remove();
            this.element = null;
        }
        
        var style = document.getElementById('whatsapp-widget-styles');
        if (style) {
            style.remove();
        }
    };

    /**
     * Mostra o widget
     */
    WhatsAppWidget.prototype.show = function() {
        if (this.element) {
            this.element.style.display = 'flex';
        }
    };

    /**
     * Esconde o widget
     */
    WhatsAppWidget.prototype.hide = function() {
        if (this.element) {
            this.element.style.display = 'none';
        }
    };

    // Função de inicialização global
    window.WhatsAppWidget = WhatsAppWidget;

    // Auto-inicialização se houver configuração global
    if (window.whatsappWidgetConfig) {
        new WhatsAppWidget(window.whatsappWidgetConfig);
    }

    // Inicialização via atributos data-*
    document.addEventListener('DOMContentLoaded', function() {
        var scripts = document.querySelectorAll('script[data-whatsapp-number]');
        
        scripts.forEach(function(script) {
            var config = {
                phoneNumber: script.getAttribute('data-whatsapp-number'),
                message: script.getAttribute('data-whatsapp-message') || '',
                position: script.getAttribute('data-whatsapp-position') || 'bottom-right',
                backgroundColor: script.getAttribute('data-whatsapp-bg-color') || '#25D366',
                size: script.getAttribute('data-whatsapp-size') || 'medium',
                showTooltip: script.getAttribute('data-whatsapp-tooltip') !== 'false',
                tooltipText: script.getAttribute('data-whatsapp-tooltip-text') || 'Fale conosco no WhatsApp'
            };
            
            new WhatsAppWidget(config);
        });
    });

})(window, document);
