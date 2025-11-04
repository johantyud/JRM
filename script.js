// Toggle Section Expand/Collapse
function toggleSection(header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector('.toggle-icon');
    
    header.classList.toggle('active');
    content.classList.toggle('expanded');
    
    // Smooth scroll to section
    setTimeout(() => {
        header.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

// Ver más button functionality
document.querySelectorAll('.ver-mas-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const section = this.closest('.section-expandible');
        const header = section.querySelector('.section-header');
        toggleSection(header);
        
        // Change button text
        this.textContent = header.classList.contains('active') ? 'Ver menos' : 'Ver más';
    });
});

// WhatsApp Chatbot
function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    chatbot.classList.toggle('active');
}

// Predefined responses
const responses = {
    '¿Cuál es tu experiencia?': 'Tengo experiencia como desarrollador junior en aplicaciones móviles, web y soporte tecnico. He trabajado con Laravel, CodeIgniter, Flutter y bases de datos. Actualmente estoy en búsqueda de nuevas oportunidades para crecer profesionalmente.',
    '¿Qué tecnologías usas?': 'Utilizo principalmente: Laravel, JavaScript, Bootstrap, CSS3, Firebase, Sql Server, SqFlite y Git. También tengo conocimientos en Flutter.',
    '¿Cómo puedo contactarte?': 'Puedes contactarme a través de: 📧 Email: johan999.jr98@gmal.com | 📱 WhatsApp: +51 994803768 | 💼 LinkedIn: linkedin.com/in/johanrivera',
    'Quiero contratar tus servicios': '¡Excelente! Me encantaría trabajar contigo. Por favor enviame un mensaje al whatsapp +51 994803768 o llamame gracias.'
};

function sendMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    const chatOptions = document.getElementById('chatOptions');
    
    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'message user-message';
    userMsg.innerHTML = `<p>${message}</p>`;
    chatMessages.appendChild(userMsg);
    
    // Hide options
    chatOptions.style.display = 'none';
    
    // Simulate bot response delay
    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'message bot-message';
        const response = responses[message] || 'Gracias por tu mensaje. Sera redirigido a whatsapp.';
        botMsg.innerHTML = `<p>${response}</p>`;
        chatMessages.appendChild(botMsg);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 500);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendUserMessage() {
   const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    if (message) {
        // Envías el mensaje al chatbot (si tienes esa función)
        sendMessage(message);

        // Número de WhatsApp al que se enviará el mensaje
        const phoneNumber = '+51978415913'; // <-- cámbialo por tu número sin espacios ni símbolos
        
        // Codificar el mensaje para URL
        const encodedMessage = encodeURIComponent(message);
        
        // Crear la URL completa para abrir WhatsApp
        const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
        
        // Abrir WhatsApp en una nueva pestaña o ventana
        window.open(whatsappURL, '_blank');

        // Limpiar el input
        input.value = '';
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendUserMessage();
    }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section-expandible').forEach(section => {
    observer.observe(section);
});