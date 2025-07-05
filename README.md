# Aplicativo de Timer Pomodoro

## Visão Geral
O **Aplicativo de Timer Pomodoro** é uma ferramenta simples e eficaz de gerenciamento de tempo baseada na Técnica Pomodoro. Ele ajuda você a se manter focado e produtivo, dividindo seu trabalho em intervalos, tradicionalmente de 25 minutos, separados por pequenas pausas.

## Funcionalidades
- **Funcionalidade de Timer**: Inicie, pause e reinicie o timer com facilidade.
- **Pausas Personalizadas**: Escolha entre pausas curtas (5 min) e longas (15 min).
- **Som de Alarme**: Toca um som de alarme quando o timer termina.
- **Design Responsivo**: Construído com Bootstrap para um layout profissional e responsivo.
- **🌙 Tema Escuro/Claro**: Alterne entre temas claro e escuro com persistência automática.
- **♿ Acessibilidade**: Interface totalmente acessível com suporte a teclado e leitores de tela.
- **📱 Design Moderno**: Interface moderna com animações suaves e tipografia melhorada.

## Como Usar
1. Clique em **Iniciar Sessão** para começar o timer de 25 minutos.
2. Quando o timer terminar, faça uma pausa curta ou longa clicando em **Pausa Curta** (5 min) ou **Pausa Longa** (15 min).
3. Use o botão **Resetar** para reiniciar o timer para 25 minutos.
4. O botão **Parar** interrompe o timer a qualquer momento.
5. **Toggle de Tema**: Clique no ícone da lua/sol no canto superior direito para alternar entre tema claro e escuro.

### ⌨️ Atalhos de Teclado
- Use a tecla **Tab** para navegar entre os botões
- Pressione **Enter** ou **Espaço** para ativar botões
- A interface é totalmente acessível via teclado

## Tecnologias Utilizadas
- **HTML5**: Para a estrutura do aplicativo com semântica moderna.
- **CSS3**: Para o estilo e layout com sistema de design moderno.
- **JavaScript**: Para a funcionalidade do timer, gerenciamento de temas e interatividade.
- **Bootstrap 5**: Para um design responsivo e profissional.
- **Inter Font**: Tipografia moderna do Google Fonts.
- **CSS Custom Properties**: Sistema de temas flexível e manutenível.

## Sistema de Temas
O aplicativo oferece suporte completo a temas claro e escuro:

### 🎨 Características dos Temas
- **Tema Claro**: Design limpo com cores suaves e alto contraste
- **Tema Escuro**: Interface moderna escura, ideal para uso noturno
- **Persistência**: Sua preferência de tema é salva automaticamente
- **Responsividade**: Todos os temas são totalmente responsivos
- **Acessibilidade**: Contrastes otimizados para WCAG 2.1 AA

### ⚙️ Implementação Técnica
- Utiliza CSS Custom Properties para facilitar manutenção
- LocalStorage para persistência da preferência do usuário
- Suporte a `prefers-color-scheme` para detectar preferência do sistema
- Transições suaves entre temas
- Suporte a `prefers-reduced-motion` para acessibilidade

## Estrutura de Arquivos
```
app-pomodoro/
├── index.html       # Arquivo HTML principal
├── style.css        # Estilos personalizados
├── script.js        # Funcionalidade do timer
├── sounds/          # Diretório para arquivos de som
│   └── alarm_clock.mp3  # Som do alarme
└── README.md        # Documentação do projeto
```


## Capturas de Tela
![Captura de Tela do Timer Pomodoro](screenshot.png)

## Link para o Aplicativo
[Aplicativo de Timer Pomodoro](https://Rjj18.github.io/app-pomodoro/)

## Melhorias Futuras
- Criação de usuários para personalização.
- Rastrear sessões Pomodoro concluídas.
- Fornecer estatísticas detalhadas de produtividade.

## Licença
Este projeto é de código aberto e está disponível sob a [Licença MIT](LICENSE).

## Agradecimentos
- Inspirado na Técnica Pomodoro desenvolvida por Francesco Cirillo.
