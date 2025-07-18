// Global Variables
let currentUser = {
    name: '',
    email: '',
    skills: [],
    interests: [],
    cvData: {}
};

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close');
const chatbot = document.getElementById('chatbot');
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendMessage = document.getElementById('sendMessage');
const openChatbot = document.getElementById('openChatbot');
const closeChatbot = document.getElementById('closeChatbot');
const contactForm = document.getElementById('contactForm');

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    animateOnScroll();
});

// Initialize Application
function initializeApp() {
    // Add smooth scrolling to navigation links
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

    // Initialize animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });
}

// Setup Event Listeners
function setupEventListeners() {
    // Mobile menu toggle
    hamburger.addEventListener('click', toggleMobileMenu);

    closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
    }
});


    // Chatbot events
    openChatbot.addEventListener('click', () => {
        chatbot.style.display = 'flex';
        openChatbot.style.display = 'none';
    });

    closeChatbot.addEventListener('click', () => {
        chatbot.style.display = 'none';
        openChatbot.style.display = 'block';
    });

    sendMessage.addEventListener('click', sendChatMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });

    // Contact form
    contactForm.addEventListener('submit', handleContactForm);
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Modal Functions
function openModal(type) {
    let content = '';
    
    switch(type) {
        case 'orientacion':
            content = getOrientacionContent();
            break;
        case 'cursos':
            content = getCursosContent();
            break;
        case 'cv':
            content = getCVContent();
            break;
        case 'entrevista':
            content = getEntrevistaContent();
            break;
        default:
            content = '<h2>Contenido no disponible</h2>';
    }
    
    modalBody.innerHTML = content;
    modal.classList.remove('hidden');

    
    // Setup modal-specific event listeners
    setupModalEvents(type);
}

// Orientation Content
function getOrientacionContent() {
    return `
        <div class="orientation-content">
            <h2><i class="fas fa-compass"></i> Test de Orientación Vocacional</h2>
            <p>Responde estas preguntas para descubrir tu vocación ideal:</p>
            
            <div id="orientation-test">
                <div class="question-container">
                    <h3>Pregunta 1 de 5</h3>
                    <p>¿Qué actividad te resulta más interesante?</p>
                    <div class="options">
                        <label><input type="radio" name="q1" value="tech"> Resolver problemas técnicos</label>
                        <label><input type="radio" name="q1" value="creative"> Crear contenido visual</label>
                        <label><input type="radio" name="q1" value="business"> Analizar datos de mercado</label>
                        <label><input type="radio" name="q1" value="social"> Ayudar a otras personas</label>
                    </div>
                </div>
                
                <div class="question-container" style="display: none;">
                    <h3>Pregunta 2 de 5</h3>
                    <p>¿En qué ambiente prefieres trabajar?</p>
                    <div class="options">
                        <label><input type="radio" name="q2" value="tech"> En una oficina con tecnología</label>
                        <label><input type="radio" name="q2" value="creative"> En un estudio creativo</label>
                        <label><input type="radio" name="q2" value="business"> En un entorno corporativo</label>
                        <label><input type="radio" name="q2" value="social"> En contacto directo con gente</label>
                    </div>
                </div>
                
                <div class="question-container" style="display: none;">
                    <h3>Pregunta 3 de 5</h3>
                    <p>¿Cuál es tu mayor fortaleza?</p>
                    <div class="options">
                        <label><input type="radio" name="q3" value="tech"> Pensamiento lógico</label>
                        <label><input type="radio" name="q3" value="creative"> Creatividad e innovación</label>
                        <label><input type="radio" name="q3" value="business"> Liderazgo y estrategia</label>
                        <label><input type="radio" name="q3" value="social"> Empatía y comunicación</label>
                    </div>
                </div>
                
                <div class="question-container" style="display: none;">
                    <h3>Pregunta 4 de 5</h3>
                    <p>¿Qué tipo de proyectos te motivan más?</p>
                    <div class="options">
                        <label><input type="radio" name="q4" value="tech"> Desarrollar aplicaciones</label>
                        <label><input type="radio" name="q4" value="creative"> Campañas publicitarias</label>
                        <label><input type="radio" name="q4" value="business"> Planes de negocio</label>
                        <label><input type="radio" name="q4" value="social"> Proyectos sociales</label>
                    </div>
                </div>
                
                <div class="question-container" style="display: none;">
                    <h3>Pregunta 5 de 5</h3>
                    <p>¿Cómo te ves en 5 años?</p>
                    <div class="options">
                        <label><input type="radio" name="q5" value="tech"> Como experto en tecnología</label>
                        <label><input type="radio" name="q5" value="creative"> Como director creativo</label>
                        <label><input type="radio" name="q5" value="business"> Como líder empresarial</label>
                        <label><input type="radio" name="q5" value="social"> Como agente de cambio social</label>
                    </div>
                </div>
                
                <div class="test-navigation">
                    <button id="prevBtn" style="display: none;">Anterior</button>
                    <button id="nextBtn">Siguiente</button>
                    <button id="submitTest" style="display: none;">Ver Resultados</button>
                </div>
            </div>
            
            <div id="orientation-results" style="display: none;">
                <h3>¡Tus Resultados!</h3>
                <div id="result-content"></div>
                <button class="btn btn-primary" onclick="startAIChat()">Consultar con IA</button>
            </div>
        </div>
    `;
}

// Courses Content
function getCursosContent() {
    return `
        <div class="courses-modal">
            <h2><i class="fas fa-graduation-cap"></i> Cursos Disponibles</h2>
            
            <div class="course-categories">
                <button class="category-btn active" data-category="all">Todos</button>
                <button class="category-btn" data-category="tech">Tecnología</button>
                <button class="category-btn" data-category="design">Diseño</button>
                <button class="category-btn" data-category="business">Negocios</button>
                <button class="category-btn" data-category="soft">Habilidades Blandas</button>
            </div>
            
            <div class="courses-list">
                <div class="modal-course-card" data-category="tech">
                    <div class="course-info">
                        <h3>Desarrollo Web Frontend</h3>
                        <p>HTML, CSS, JavaScript y React</p>
                        <div class="course-details">
                            <span><i class="fas fa-clock"></i> 40 horas</span>
                            <span><i class="fas fa-star"></i> 4.8/5</span>
                            <span><i class="fas fa-certificate"></i> Con certificado</span>
                        </div>
                    </div>
                    <button class="enroll-btn">Inscribirse Gratis</button>
                </div>
                
                <div class="modal-course-card" data-category="tech">
                    <div class="course-info">
                        <h3>Python para Principiantes</h3>
                        <p>Fundamentos de programación con Python</p>
                        <div class="course-details">
                            <span><i class="fas fa-clock"></i> 35 horas</span>
                            <span><i class="fas fa-star"></i> 4.9/5</span>
                            <span><i class="fas fa-certificate"></i> Con certificado</span>
                        </div>
                    </div>
                    <button class="enroll-btn">Inscribirse Gratis</button>
                </div>
                
                <div class="modal-course-card" data-category="design">
                    <div class="course-info">
                        <h3>Diseño Gráfico Digital</h3>
                        <p>Photoshop, Illustrator y principios de diseño</p>
                        <div class="course-details">
                            <span><i class="fas fa-clock"></i> 30 horas</span>
                            <span><i class="fas fa-star"></i> 4.7/5</span>
                            <span><i class="fas fa-certificate"></i> Con certificado</span>
                        </div>
                    </div>
                    <button class="enroll-btn">Inscribirse Gratis</button>
                </div>
                
                <div class="modal-course-card" data-category="business">
                    <div class="course-info">
                        <h3>Marketing Digital</h3>
                        <p>SEO, SEM, redes sociales y analytics</p>
                        <div class="course-details">
                            <span><i class="fas fa-clock"></i> 28 horas</span>
                            <span><i class="fas fa-star"></i> 4.6/5</span>
                            <span><i class="fas fa-certificate"></i> Con certificado</span>
                        </div>
                    </div>
                    <button class="enroll-btn">Inscribirse Gratis</button>
                </div>
                
                <div class="modal-course-card" data-category="soft">
                    <div class="course-info">
                        <h3>Habilidades de Comunicación</h3>
                        <p>Comunicación efectiva y presentaciones</p>
                        <div class="course-details">
                            <span><i class="fas fa-clock"></i> 20 horas</span>
                            <span><i class="fas fa-star"></i> 4.8/5</span>
                            <span><i class="fas fa-certificate"></i> Con certificado</span>
                        </div>
                    </div>
                    <button class="enroll-btn">Inscribirse Gratis</button>
                </div>
            </div>
        </div>
    `;
}

// CV Content
function getCVContent() {
    return `
        <div class="cv-builder">
            <h2><i class="fas fa-file-alt"></i> Generador de CV</h2>
            
            <div class="cv-steps">
                <div class="step active" data-step="1">
                    <span>1</span> Información Personal
                </div>
                <div class="step" data-step="2">
                    <span>2</span> Experiencia
                </div>
                <div class="step" data-step="3">
                    <span>3</span> Educación
                </div>
                <div class="step" data-step="4">
                    <span>4</span> Habilidades
                </div>
            </div>
            
            <div class="cv-form">
                <div class="step-content active" id="step-1">
                    <h3>Información Personal</h3>
                    <div class="form-row">
                        <input type="text" id="cv-name" placeholder="Nombre completo" required>
                        <input type="email" id="cv-email" placeholder="Email" required>
                    </div>
                    <div class="form-row">
                        <input type="tel" id="cv-phone" placeholder="Teléfono">
                        <input type="text" id="cv-location" placeholder="Ciudad, País">
                    </div>
                    <textarea id="cv-summary" placeholder="Resumen profesional (opcional)" rows="3"></textarea>
                </div>
                
                <div class="step-content" id="step-2">
                    <h3>Experiencia Laboral</h3>
                    <div id="experience-container">
                        <div class="experience-item">
                            <input type="text" placeholder="Puesto de trabajo">
                            <input type="text" placeholder="Empresa">
                            <div class="form-row">
                                <input type="text" placeholder="Fecha inicio">
                                <input type="text" placeholder="Fecha fin">
                            </div>
                            <textarea placeholder="Descripción de responsabilidades" rows="2"></textarea>
                        </div>
                    </div>
                    <button type="button" class="add-btn" onclick="addExperience()">+ Agregar Experiencia</button>
                </div>
                
                <div class="step-content" id="step-3">
                    <h3>Educación</h3>
                    <div id="education-container">
                        <div class="education-item">
                            <input type="text" placeholder="Título/Carrera">
                            <input type="text" placeholder="Institución">
                            <div class="form-row">
                                <input type="text" placeholder="Año inicio">
                                <input type="text" placeholder="Año fin">
                            </div>
                        </div>
                    </div>
                    <button type="button" class="add-btn" onclick="addEducation()">+ Agregar Educación</button>
                </div>
                
                <div class="step-content" id="step-4">
                    <h3>Habilidades</h3>
                    <div class="skills-input">
                        <input type="text" id="skill-input" placeholder="Escribe una habilidad y presiona Enter">
                        <div id="skills-container"></div>
                    </div>
                    
                    <h4>Idiomas</h4>
                    <div id="languages-container">
                        <div class="language-item">
                            <input type="text" placeholder="Idioma">
                            <select>
                                <option>Básico</option>
                                <option>Intermedio</option>
                                <option>Avanzado</option>
                                <option>Nativo</option>
                            </select>
                        </div>
                    </div>
                    <button type="button" class="add-btn" onclick="addLanguage()">+ Agregar Idioma</button>
                </div>
                
                <div class="cv-navigation">
                    <button id="cv-prev" style="display: none;">Anterior</button>
                    <button id="cv-next">Siguiente</button>
                    <button id="cv-generate" style="display: none;">Generar CV</button>
                </div>
            </div>
        </div>
    `;
}

// Interview Content
function getEntrevistaContent() {
    return `
        <div class="interview-simulator">
            <h2><i class="fas fa-microphone"></i> Simulador de Entrevistas</h2>
            
            <div class="interview-setup">
                <h3>Configura tu entrevista</h3>
                <div class="setup-options">
                    <div class="option-group">
                        <label>Tipo de puesto:</label>
                        <select id="job-type">
                            <option value="tech">Tecnología</option>
                            <option value="marketing">Marketing</option>
                            <option value="design">Diseño</option>
                            <option value="business">Negocios</option>
                            <option value="general">General</option>
                        </select>
                    </div>
                    
                    <div class="option-group">
                        <label>Nivel de experiencia:</label>
                        <select id="experience-level">
                            <option value="entry">Sin experiencia</option>
                            <option value="junior">Junior (1-2 años)</option>
                            <option value="mid">Intermedio (3-5 años)</option>
                        </select>
                    </div>
                    
                    <div class="option-group">
                        <label>Duración:</label>
                        <select id="interview-duration">
                            <option value="5">5 preguntas</option>
                            <option value="10">10 preguntas</option>
                            <option value="15">15 preguntas</option>
                        </select>
                    </div>
                </div>
                
                <button class="btn btn-primary" onclick="startInterview()">Comenzar Entrevista</button>
            </div>
            
            <div id="interview-session" style="display: none;">
                <div class="interview-progress">
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                    <span id="question-counter">Pregunta 1 de 5</span>
                </div>
                
                <div class="interview-question">
                    <h3 id="current-question">¿Puedes contarme sobre ti?</h3>
                    <div class="answer-section">
                        <textarea id="answer-input" placeholder="Escribe tu respuesta aquí..." rows="4"></textarea>
                        <div class="answer-controls">
                            <button class="btn btn-secondary" onclick="skipQuestion()">Saltar</button>
                            <button class="btn btn-primary" onclick="nextQuestion()">Siguiente</button>
                        </div>
                    </div>
                </div>
                
                <div class="interview-tips">
                    <h4><i class="fas fa-lightbulb"></i> Consejo:</h4>
                    <p id="current-tip">Mantén un equilibrio entre lo personal y lo profesional. Enfócate en tus fortalezas relevantes para el puesto.</p>
                </div>
            </div>
            
            <div id="interview-results" style="display: none;">
                <h3>¡Entrevista Completada!</h3>
                <div class="results-summary">
                    <div class="score-section">
                        <div class="score-circle">
                            <span id="interview-score">0</span>
                        // Continuación del código JavaScript de la plataforma de carreras

                        </div>
                        <p>Puntuación General</p>
                    </div>
                    
                    <div class="feedback-sections">
                        <div class="feedback-item">
                            <h4>Fortalezas</h4>
                            <ul id="strengths-list">
                                <li>Respuestas claras y estructuradas</li>
                                <li>Buena comunicación verbal</li>
                            </ul>
                        </div>
                        
                        <div class="feedback-item">
                            <h4>Áreas de Mejora</h4>
                            <ul id="improvements-list">
                                <li>Agregar más ejemplos específicos</li>
                                <li>Mejorar la conexión con el puesto</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="results-actions">
                    <button class="btn btn-secondary" onclick="restartInterview()">Nueva Entrevista</button>
                    <button class="btn btn-primary" onclick="getDetailedFeedback()">Feedback Detallado</button>
                </div>
            </div>
        </div>
    `;
}

// Modal Event Setup
function setupModalEvents(type) {
    switch(type) {
        case 'orientacion':
            setupOrientationTest();
            break;
        case 'cursos':
            setupCoursesEvents();
            break;
        case 'cv':
            setupCVBuilder();
            break;
        case 'entrevista':
            setupInterviewSimulator();
            break;
    }
}

// Orientation Test Setup
function setupOrientationTest() {
    let currentQuestion = 0;
    const questions = document.querySelectorAll('.question-container');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitTest');
    
    function showQuestion(n) {
        questions.forEach(q => q.style.display = 'none');
        questions[n].style.display = 'block';
        
        prevBtn.style.display = n > 0 ? 'inline-block' : 'none';
        nextBtn.style.display = n < questions.length - 1 ? 'inline-block' : 'none';
        submitBtn.style.display = n === questions.length - 1 ? 'inline-block' : 'none';
    }
    
    // Dentro de setupOrientationTest(), justo después de definir prevBtn, nextBtn y submitBtn:
    const allLabels = document.querySelectorAll('.options label');
    allLabels.forEach(label => {
    label.addEventListener('click', () => {
        // Limpiamos todas las opciones del mismo grupo
        const parent = label.closest('.options');
        parent.querySelectorAll('label').forEach(l => l.classList.remove('selected'));
        // Marcamos la que seleccionaste
        label.classList.add('selected');
    });
    });



    nextBtn.addEventListener('click', () => {
        const currentRadio = questions[currentQuestion].querySelector('input[type="radio"]:checked');
        if (currentRadio) {
            currentQuestion++;
            showQuestion(currentQuestion);
        } else {
            alert('Por favor selecciona una respuesta');
        }
    });
    
    prevBtn.addEventListener('click', () => {
        currentQuestion--;
        showQuestion(currentQuestion);
    });
    
    submitBtn.addEventListener('click', calculateOrientationResults);
}

// Calculate Orientation Results
function calculateOrientationResults() {
    const answers = {
        tech: 0,
        creative: 0,
        business: 0,
        social: 0
    };
    
    for (let i = 1; i <= 5; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected) {
            answers[selected.value]++;
        }
    }
    
    const maxScore = Math.max(...Object.values(answers));
    const result = Object.keys(answers).find(key => answers[key] === maxScore);
    
    const resultContent = getResultContent(result, answers);
    
    document.getElementById('orientation-test').style.display = 'none';
    document.getElementById('orientation-results').style.display = 'block';
    document.getElementById('result-content').innerHTML = resultContent;
    
    currentUser.interests = [result];
}

// Get Result Content
function getResultContent(result, scores) {
    const results = {
        tech: {
            title: 'Perfil Tecnológico',
            description: 'Tienes afinidad por la tecnología y la resolución de problemas técnicos.',
            careers: ['Desarrollo de Software', 'Ingeniería de Sistemas', 'Ciencia de Datos', 'Ciberseguridad'],
            skills: ['Programación', 'Análisis lógico', 'Resolución de problemas', 'Pensamiento crítico']
        },
        creative: {
            title: 'Perfil Creativo',
            description: 'Tu fuerte es la creatividad y la expresión artística.',
            careers: ['Diseño Gráfico', 'Marketing Creativo', 'Arquitectura', 'Multimedia'],
            skills: ['Creatividad', 'Diseño visual', 'Comunicación visual', 'Innovación']
        },
        business: {
            title: 'Perfil Empresarial',
            description: 'Tienes habilidades naturales para los negocios y el liderazgo.',
            careers: ['Administración', 'Marketing', 'Finanzas', 'Consultoría'],
            skills: ['Liderazgo', 'Análisis estratégico', 'Negociación', 'Gestión']
        },
        social: {
            title: 'Perfil Social',
            description: 'Te motiva ayudar a otros y generar impacto social.',
            careers: ['Trabajo Social', 'Psicología', 'Educación', 'Recursos Humanos'],
            skills: ['Empatía', 'Comunicación', 'Trabajo en equipo', 'Resolución de conflictos']
        }
    };
    
    const profile = results[result];
    
    return `
        <div class="result-profile">
            <h3>${profile.title}</h3>
            <p>${profile.description}</p>
            
            <div class="result-section">
                <h4>Carreras Recomendadas:</h4>
                <ul>
                    ${profile.careers.map(career => `<li>${career}</li>`).join('')}
                </ul>
            </div>
            
            <div class="result-section">
                <h4>Habilidades a Desarrollar:</h4>
                <ul>
                    ${profile.skills.map(skill => `<li>${skill}</li>`).join('')}
                </ul>
            </div>
            
            <div class="scores-breakdown">
                <h4>Puntuaciones por Área:</h4>
                <div class="score-bars">
                    <div class="score-bar">
                        <span>Tecnología</span>
                        <div class="bar"><div class="fill" style="width: ${(scores.tech/5)*100}%"></div></div>
                        <span>${scores.tech}/5</span>
                    </div>
                    <div class="score-bar">
                        <span>Creativo</span>
                        <div class="bar"><div class="fill" style="width: ${(scores.creative/5)*100}%"></div></div>
                        <span>${scores.creative}/5</span>
                    </div>
                    <div class="score-bar">
                        <span>Negocios</span>
                        <div class="bar"><div class="fill" style="width: ${(scores.business/5)*100}%"></div></div>
                        <span>${scores.business}/5</span>
                    </div>
                    <div class="score-bar">
                        <span>Social</span>
                        <div class="bar"><div class="fill" style="width: ${(scores.social/5)*100}%"></div></div>
                        <span>${scores.social}/5</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Setup Courses Events
function setupCoursesEvents() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const courseCards = document.querySelectorAll('.modal-course-card');
    const enrollBtns = document.querySelectorAll('.enroll-btn');
    
    // Category filtering
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            
            courseCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Enrollment buttons
    enrollBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const courseCard = e.target.closest('.modal-course-card');
            const courseTitle = courseCard.querySelector('h3').textContent;
            
            // Simulate enrollment
            btn.textContent = 'Inscrito ✓';
            btn.disabled = true;
            btn.style.backgroundColor = '#4CAF50';
            
            // Show success message
            showNotification(`Te has inscrito exitosamente en: ${courseTitle}`, 'success');
        });
    });
}

// Setup CV Builder
function setupCVBuilder() {
    let currentStep = 1;
    const totalSteps = 4;
    
    const prevBtn = document.getElementById('cv-prev');
    const nextBtn = document.getElementById('cv-next');
    const generateBtn = document.getElementById('cv-generate');
    
    function showStep(step) {
        // Hide all step contents
        document.querySelectorAll('.step-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Hide all step indicators
        document.querySelectorAll('.step').forEach(stepEl => {
            stepEl.classList.remove('active');
        });
        
        // Show current step
        document.getElementById(`step-${step}`).classList.add('active');
        document.querySelector(`.step[data-step="${step}"]`).classList.add('active');
        
        // Update navigation buttons
        prevBtn.style.display = step > 1 ? 'inline-block' : 'none';
        nextBtn.style.display = step < totalSteps ? 'inline-block' : 'none';
        generateBtn.style.display = step === totalSteps ? 'inline-block' : 'none';
    }
    
    nextBtn.addEventListener('click', () => {
        if (validateCurrentStep(currentStep)) {
            currentStep++;
            showStep(currentStep);
        }
    });
    
    prevBtn.addEventListener('click', () => {
        currentStep--;
        showStep(currentStep);
    });
    
    generateBtn.addEventListener('click', generateCV);
    
    // Skills input handling
    const skillInput = document.getElementById('skill-input');
    skillInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && skillInput.value.trim()) {
            addSkill(skillInput.value.trim());
            skillInput.value = '';
        }
    });
}

// Validate Current Step
function validateCurrentStep(step) {
    switch(step) {
        case 1:
            const name = document.getElementById('cv-name').value;
            const email = document.getElementById('cv-email').value;
            if (!name || !email) {
                alert('Por favor completa nombre y email');
                return false;
            }
            break;
        // Add more validation as needed
    }
    return true;
}

// Add Experience
function addExperience() {
    const container = document.getElementById('experience-container');
    const newExperience = document.createElement('div');
    newExperience.className = 'experience-item';
    newExperience.innerHTML = `
        <input type="text" placeholder="Puesto de trabajo">
        <input type="text" placeholder="Empresa">
        <div class="form-row">
            <input type="text" placeholder="Fecha inicio">
            <input type="text" placeholder="Fecha fin">
        </div>
        <textarea placeholder="Descripción de responsabilidades" rows="2"></textarea>
        <button type="button" class="remove-btn" onclick="removeExperience(this)">Eliminar</button>
    `;
    container.appendChild(newExperience);
}

// Remove Experience
function removeExperience(btn) {
    btn.parentElement.remove();
}

// Add Education
function addEducation() {
    const container = document.getElementById('education-container');
    const newEducation = document.createElement('div');
    newEducation.className = 'education-item';
    newEducation.innerHTML = `
        <input type="text" placeholder="Título/Carrera">
        <input type="text" placeholder="Institución">
        <div class="form-row">
            <input type="text" placeholder="Año inicio">
            <input type="text" placeholder="Año fin">
        </div>
        <button type="button" class="remove-btn" onclick="removeEducation(this)">Eliminar</button>
    `;
    container.appendChild(newEducation);
}

// Remove Education
function removeEducation(btn) {
    btn.parentElement.remove();
}

// Add Skill
function addSkill(skill) {
    const container = document.getElementById('skills-container');
    const skillTag = document.createElement('div');
    skillTag.className = 'skill-tag';
    skillTag.innerHTML = `
        <span>${skill}</span>
        <button onclick="removeSkill(this)">×</button>
    `;
    container.appendChild(skillTag);
}

// Remove Skill
function removeSkill(btn) {
    btn.parentElement.remove();
}

// Add Language
function addLanguage() {
    const container = document.getElementById('languages-container');
    const newLanguage = document.createElement('div');
    newLanguage.className = 'language-item';
    newLanguage.innerHTML = `
        <input type="text" placeholder="Idioma">
        <select>
            <option>Básico</option>
            <option>Intermedio</option>
            <option>Avanzado</option>
            <option>Nativo</option>
        </select>
        <button type="button" class="remove-btn" onclick="removeLanguage(this)">Eliminar</button>
    `;
    container.appendChild(newLanguage);
}

// Remove Language
function removeLanguage(btn) {
    btn.parentElement.remove();
}

// Generate CV
function generateCV() {
    // Collect all form data
    const cvData = {
        personal: {
            name: document.getElementById('cv-name').value,
            email: document.getElementById('cv-email').value,
            phone: document.getElementById('cv-phone').value,
            location: document.getElementById('cv-location').value,
            summary: document.getElementById('cv-summary').value
        },
        experience: [],
        education: [],
        skills: [],
        languages: []
    };
    
    // Collect experience data
    document.querySelectorAll('.experience-item').forEach(item => {
        const inputs = item.querySelectorAll('input, textarea');
        if (inputs[0].value) { // Only add if position is filled
            cvData.experience.push({
                position: inputs[0].value,
                company: inputs[1].value,
                startDate: inputs[2].value,
                endDate: inputs[3].value,
                description: inputs[4].value
            });
        }
    });
    
    // Collect education data
    document.querySelectorAll('.education-item').forEach(item => {
        const inputs = item.querySelectorAll('input');
        if (inputs[0].value) { // Only add if degree is filled
            cvData.education.push({
                degree: inputs[0].value,
                institution: inputs[1].value,
                startYear: inputs[2].value,
                endYear: inputs[3].value
            });
        }
    });
    
    // Collect skills
    document.querySelectorAll('.skill-tag span').forEach(skill => {
        cvData.skills.push(skill.textContent);
    });
    
    // Collect languages
    document.querySelectorAll('.language-item').forEach(item => {
        const inputs = item.querySelectorAll('input, select');
        if (inputs[0].value) {
            cvData.languages.push({
                language: inputs[0].value,
                level: inputs[1].value
            });
        }
    });
    
    // Store CV data
    currentUser.cvData = cvData;
    
    // Generate and display CV
    displayGeneratedCV(cvData);
}

// Display Generated CV
function displayGeneratedCV(cvData) {
    const cvHTML = `
        <div class="generated-cv">
            <h2>Tu CV Generado</h2>
            <div class="cv-preview">
                <div class="cv-header">
                    <h1>${cvData.personal.name}</h1>
                    <div class="contact-info">
                        <span>${cvData.personal.email}</span>
                        ${cvData.personal.phone ? `<span>${cvData.personal.phone}</span>` : ''}
                        ${cvData.personal.location ? `<span>${cvData.personal.location}</span>` : ''}
                    </div>
                    ${cvData.personal.summary ? `<p class="summary">${cvData.personal.summary}</p>` : ''}
                </div>
                
                ${cvData.experience.length > 0 ? `
                <div class="cv-section">
                    <h3>Experiencia Laboral</h3>
                    ${cvData.experience.map(exp => `
                        <div class="cv-item">
                            <h4>${exp.position} - ${exp.company}</h4>
                            <span class="date">${exp.startDate} - ${exp.endDate}</span>
                            ${exp.description ? `<p>${exp.description}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
                ` : ''}
                
                ${cvData.education.length > 0 ? `
                <div class="cv-section">
                    <h3>Educación</h3>
                    ${cvData.education.map(edu => `
                        <div class="cv-item">
                            <h4>${edu.degree}</h4>
                            <p>${edu.institution}</p>
                            <span class="date">${edu.startYear} - ${edu.endYear}</span>
                        </div>
                    `).join('')}
                </div>
                ` : ''}
                
                ${cvData.skills.length > 0 ? `
                <div class="cv-section">
                    <h3>Habilidades</h3>
                    <div class="skills-list">
                        ${cvData.skills.map(skill => `<span class="skill-item">${skill}</span>`).join('')}
                    </div>
                </div>
                ` : ''}
                
                ${cvData.languages.length > 0 ? `
                <div class="cv-section">
                    <h3>Idiomas</h3>
                    ${cvData.languages.map(lang => `
                        <div class="language-item">
                            <span>${lang.language}</span>
                            <span class="level">${lang.level}</span>
                        </div>
                    `).join('')}
                </div>
                ` : ''}
            </div>
            
            <div class="cv-actions">
                <button class="btn btn-primary" onclick="downloadCV()">Descargar PDF</button>
                <button class="btn btn-secondary" onclick="editCV()">Editar</button>
                <button class="btn btn-success" onclick="shareCV()">Compartir</button>
            </div>
        </div>
    `;
    
    modalBody.innerHTML = cvHTML;
}

// Setup Interview Simulator
function setupInterviewSimulator() {
    // Interview setup is already in the HTML
    // Event listeners are set up through onclick attributes
}

// Interview Questions Database
const interviewQuestions = {
    tech: {
        entry: [
            "¿Por qué te interesa la tecnología?",
            "¿Qué lenguajes de programación conoces?",
            "¿Cómo te mantienes actualizado con las nuevas tecnologías?",
            "Describe un proyecto personal que hayas realizado",
            "¿Cómo resolverías un problema técnico que no sabes cómo abordar?",
            "¿Qué es lo que más te gusta de programar?",
            "¿Tienes experiencia trabajando en equipo?",
            "¿Cómo manejas los errores en tu código?",
            "¿Qué herramientas de desarrollo prefieres usar?",
            "¿Dónde te ves en 3 años en el área tech?"
        ],
        junior: [
            "Explica la diferencia entre frontend y backend",
            "¿Cómo optimizarías una aplicación web lenta?",
            "Describe tu proceso de debugging",
            "¿Qué metodologías ágiles has usado?",
            "¿Cómo manejas el control de versiones?",
            "Explica un desafío técnico que hayas superado",
            "¿Qué frameworks prefieres y por qué?",
            "¿Cómo aseguras la calidad de tu código?",
            "Describe tu experiencia con APIs",
            "¿Cómo te adaptas a nuevas tecnologías?"
        ]
    },
    marketing: {
        entry: [
            "¿Qué te atrae del marketing?",
            "¿Qué campañas publicitarias admiras?",
            "¿Cómo definirías marketing digital?",
            "¿Qué redes sociales usas más?",
            "¿Cómo medirías el éxito de una campaña?",
            "Describe una marca que consideres exitosa",
            "¿Qué harías para promocionar un nuevo producto?",
            "¿Cómo te mantienes al día con las tendencias?",
            "¿Qué opinas del marketing de influencers?",
            "¿Cómo abordarías el marketing para diferentes generaciones?"
        ]
    },
    design: [
        "¿Qué te inspiró a dedicarte al diseño?",
        "¿Cuál es tu proceso creativo?",
        "¿Qué herramientas de diseño dominas?",
        "¿Cómo manejas las críticas a tu trabajo?",
        "Describe un proyecto de diseño del que estés orgulloso",
        "¿Cómo equilibras creatividad y funcionalidad?",
        "¿Qué diseñador admiras más?",
        "¿Cómo abordarías un brief de diseño confuso?",
        "¿Qué tendencias de diseño sigues?",
        "¿Cómo trabajas con feedback del cliente?"
    ],
    general: [
        "Háblame sobre ti",
        "¿Por qué quieres trabajar aquí?",
        "¿Cuáles son tus fortalezas?",
        "¿Cuál es tu mayor debilidad?",
        "¿Dónde te ves en 5 años?",
        "¿Por qué deberíamos contratarte?",
        "Describe un desafío que hayas superado",
        "¿Cómo manejas el estrés?",
        "¿Prefieres trabajar solo o en equipo?",
        "¿Qué te motiva en el trabajo?"
    ]
};

// Interview Tips Database
const interviewTips = {
    "¿Puedes contarme sobre ti?": "Mantén un equilibrio entre lo personal y lo profesional. Enfócate en tus fortalezas relevantes para el puesto.",
    "¿Por qué quieres trabajar aquí?": "Investiga sobre la empresa y conecta sus valores con tus objetivos profesionales.",
    "¿Cuáles son tus fortalezas?": "Menciona fortalezas específicas y proporciona ejemplos concretos de cómo las has aplicado.",
    "¿Cuál es tu mayor debilidad?": "Elige una debilidad real pero que no sea crítica para el puesto, y explica cómo estás trabajando para mejorarla.",
    "¿Dónde te ves en 5 años?": "Muestra ambición pero también realismo. Conecta tus metas con el crecimiento en la empresa."
};

let currentInterview = {
    questions: [],
    currentQuestion: 0,
    answers: [],
    settings: {}
};

// Start Interview
function startInterview() {
    const jobType = document.getElementById('job-type').value;
    const experienceLevel = document.getElementById('experience-level').value;
    const duration = parseInt(document.getElementById('interview-duration').value);
    
    currentInterview.settings = { jobType, experienceLevel, duration };
    
    // Select questions based on job type and experience
    let questionPool = [];
    
    if (interviewQuestions[jobType] && interviewQuestions[jobType][experienceLevel]) {
        questionPool = [...interviewQuestions[jobType][experienceLevel]];
    } else if (interviewQuestions[jobType]) {
        questionPool = [...interviewQuestions[jobType]];
    } else {
        questionPool = [...interviewQuestions.general];
    }
    
    // Add some general questions
    questionPool = [...questionPool, ...interviewQuestions.general.slice(0, 3)];
    
    // Shuffle and select required number of questions
    currentInterview.questions = shuffleArray(questionPool).slice(0, duration);
    currentInterview.currentQuestion = 0;
    currentInterview.answers = [];
    
    // Show interview session
    document.querySelector('.interview-setup').style.display = 'none';
    document.getElementById('interview-session').style.display = 'block';
    
    showCurrentQuestion();
}

// Shuffle Array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Show Current Question
function showCurrentQuestion() {
    const question = currentInterview.questions[currentInterview.currentQuestion];
    const questionCounter = `Pregunta ${currentInterview.currentQuestion + 1} de ${currentInterview.questions.length}`;
    
    document.getElementById('current-question').textContent = question;
    document.getElementById('question-counter').textContent = questionCounter;
    
    // Update progress bar
    const progress = ((currentInterview.currentQuestion + 1) / currentInterview.questions.length) * 100;
    document.querySelector('.progress-fill').style.width = `${progress}%`;
    
    // Clear previous answer
    document.getElementById('answer-input').value = '';
    
    // Update tip
    const tip = interviewTips[question] || "Responde de manera honesta y específica. Usa ejemplos concretos cuando sea posible.";
    document.getElementById('current-tip').textContent = tip;
}

// Next Question
function nextQuestion() {
    const answer = document.getElementById('answer-input').value.trim();
    
    if (!answer) {
        alert('Por favor, escribe una respuesta antes de continuar.');
        return;
    }
    
    // Save answer
    currentInterview.answers.push({
        question: currentInterview.questions[currentInterview.currentQuestion],
        answer: answer
    });
    
    currentInterview.currentQuestion++;
    
    if (currentInterview.currentQuestion >= currentInterview.questions.length) {
        finishInterview();
    } else {
        showCurrentQuestion();
    }
}

// Skip Question
function skipQuestion() {
    currentInterview.answers.push({
        question: currentInterview.questions[currentInterview.currentQuestion],
        answer: '[Pregunta omitida]'
    });
    
    currentInterview.currentQuestion++;
    
    if (currentInterview.currentQuestion >= currentInterview.questions.length) {
        finishInterview();
    } else {
        showCurrentQuestion();
    }
}

// Finish Interview
function finishInterview() {
    document.getElementById('interview-session').style.display = 'none';
    document.getElementById('interview-results').style.display = 'block';
    
    // Calculate score and feedback
    const results = calculateInterviewResults();
    displayInterviewResults(results);
}

// Calculate Interview Results
function calculateInterviewResults() {
    let score = 0;
    const strengths = [];
    const improvements = [];
    
    currentInterview.answers.forEach((answer, index) => {
        if (answer.answer !== '[Pregunta omitida]') {
            const answerLength = answer.answer.length;
            const words = answer.answer.split(' ').length;
            
            // Basic scoring based on answer quality
            if (answerLength > 50 && words > 10) {
                score += 20;
            } else if (answerLength > 20 && words > 5) {
                score += 15;
            } else {
                score += 10;
            }
            
            // Add strengths and improvements based on answer analysis
            if (words > 15 && answerLength > 100) {
                strengths.push('Respuestas detalladas y completas');
            }
            
            if (answer.answer.toLowerCase().includes('ejemplo') || 
                answer.answer.toLowerCase().includes('experiencia')) {
                strengths.push('Uso de ejemplos específicos');
            }
        } else {
            improvements.push('Evitar omitir preguntas importantes');
        }
    });
    
    // Normalize score to 100
    const maxPossibleScore = currentInterview.questions.length * 20;
    const finalScore = Math.round((score / maxPossibleScore) * 100);
    
    // Add default feedback if none generated
    if (strengths.length === 0) {
        strengths.push('Completaste la entrevista', 'Mostraste interés en el proceso');
    }
    
    if (improvements.length === 0) {
        improvements.push('Agregar más ejemplos específicos', 'Elaborar más en las respuestas');
    }
    
    return { score: finalScore, strengths, improvements };
}

// Display Interview Results
function displayInterviewResults(results) {
    document.getElementById('interview-score').textContent = results.score;
    
    const strengthsList = document.getElementById('strengths-list');
    const improvementsList = document.getElementById('improvements-list');
    
    strengthsList.innerHTML = results.strengths.map(strength => `<li>${strength}</li>`).join('');
    improvementsList.innerHTML = results.improvements.map(improvement => `<li>${improvement}</li>`).join('');
}

// Restart Interview
function restartInterview() {
    document.getElementById('interview-results').style.display = 'none';
    document.querySelector('.interview-setup').style.display = 'block';
    
    // Reset interview data
    currentInterview = {
        questions: [],
        currentQuestion: 0,
        answers: [],
        settings: {}
    };
}

// Get Detailed Feedback
function getDetailedFeedback() {
    const feedbackContent = generateDetailedFeedback();
    
    modalBody.innerHTML = `
        <div class="detailed-feedback">
            <h2><i class="fas fa-chart-bar"></i> Feedback Detallado</h2>
            ${feedbackContent}
            <div class="feedback-actions">
                <button class="btn btn-primary" onclick="openModal('entrevista')">Nueva Entrevista</button>
                <button class="btn btn-secondary" onclick="startAIChat()">Consultar con IA</button>
            </div>
        </div>
    `;
}

// Generate Detailed Feedback
function generateDetailedFeedback() {
    let feedbackHTML = '<div class="questions-feedback">';
    
    currentInterview.answers.forEach((answer, index) => {
        const wordCount = answer.answer.split(' ').length;
        const charCount = answer.answer.length;
        
        let qualityScore = 'Básica';
        let qualityClass = 'basic';
        
        if (wordCount > 20 && charCount > 150) {
            qualityScore = 'Excelente';
            qualityClass = 'excellent';
        } else if (wordCount > 10 && charCount > 75) {
            qualityScore = 'Buena';
            qualityClass = 'good';
        }
        
        feedbackHTML += `
            <div class="question-feedback">
                <h4>Pregunta ${index + 1}: ${answer.question}</h4>
                <div class="answer-analysis">
                    <div class="answer-stats">
                        <span>Palabras: ${wordCount}</span>
                        <span>Caracteres: ${charCount}</span>
                        <span class="quality ${qualityClass}">Calidad: ${qualityScore}</span>
                    </div>
                    <div class="answer-preview">
                        <strong>Tu respuesta:</strong>
                        <p>${answer.answer}</p>
                    </div>
                    <div class="improvement-suggestions">
                        <strong>Sugerencias de mejora:</strong>
                        <ul>
                            ${generateAnswerSuggestions(answer.question, answer.answer)}
                        </ul>
                    </div>
                </div>
            </div>
        `;
    });
    
    feedbackHTML += '</div>';
    return feedbackHTML;
}

// Generate Answer Suggestions
function generateAnswerSuggestions(question, answer) {
    const suggestions = [];
    const wordCount = answer.split(' ').length;
    
    // General suggestions based on answer length
    if (wordCount < 10) {
        suggestions.push('Elabora más tu respuesta con ejemplos específicos');
    }
    
    if (!answer.toLowerCase().includes('ejemplo') && !answer.toLowerCase().includes('experiencia')) {
        suggestions.push('Incluye ejemplos concretos de tu experiencia');
    }
    
    // Question-specific suggestions
    if (question.toLowerCase().includes('fortaleza')) {
        suggestions.push('Conecta tus fortalezas con el puesto al que aplicas');
        suggestions.push('Proporciona evidencia de cómo has usado esta fortaleza');
    }
    
    if (question.toLowerCase().includes('debilidad')) {
        suggestions.push('Explica qué estás haciendo para mejorar esta área');
        suggestions.push('Elige una debilidad que no sea crítica para el puesto');
    }
    
    if (question.toLowerCase().includes('por qué')) {
        suggestions.push('Investiga más sobre la empresa y el puesto');
        suggestions.push('Conecta tus objetivos con los de la organización');
    }
    
    if (suggestions.length === 0) {
        suggestions.push('Respuesta adecuada, considera agregar más detalles específicos');
    }
    
    return suggestions.map(suggestion => `<li>${suggestion}</li>`).join('');
}

// Chatbot Functions
function sendChatMessage() {
    const message = userInput.value.trim();
    if (!message) return;
    
    // Add user message to chat
    addMessageToChat('user', message);
    userInput.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        const response = generateAIResponse(message);
        addMessageToChat('ai', response);
    }, 1000);
}

// Add Message to Chat
function addMessageToChat(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatar = sender === 'user' ? '👤' : '🤖';
    messageDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">
            <p>${message}</p>
            <span class="message-time">${new Date().toLocaleTimeString()}</span>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Generate AI Response
function generateAIResponse(message) {
    const responses = {
        greeting: [
            "¡Hola! Soy tu asistente de carrera. ¿En qué puedo ayudarte hoy?",
            "¡Hola! Estoy aquí para ayudarte con tu desarrollo profesional. ¿Qué te interesa saber?",
            "¡Saludos! ¿Cómo puedo asistirte en tu búsqueda de carrera?"
        ],
        career: [
            "Para encontrar la carrera ideal, te recomiendo hacer nuestro test de orientación vocacional. También puedes contarme sobre tus intereses y habilidades.",
            "Hay muchas opciones profesionales. ¿Qué áreas te interesan más: tecnología, negocios, creatividad o trabajo social?",
            "Te sugiero explorar diferentes campos. ¿Has considerado qué tipo de ambiente de trabajo prefieres?"
        ],
        cv: [
            "Un buen CV debe ser claro y conciso. Te recomiendo usar nuestro generador de CV para crear uno profesional.",
            "Los elementos clave de un CV son: información personal, experiencia, educación y habilidades. ¿En cuál necesitas más ayuda?",
            "Para un CV efectivo, enfócate en logros específicos y usa palabras clave relevantes para tu industria."
        ],
        interview: [
            "Para prepararte para entrevistas, practica con nuestro simulador. También es importante investigar sobre la empresa.",
            "Las entrevistas evalúan tanto tus habilidades técnicas como tu fit cultural. ¿Qué tipo de puesto te interesa?",
            "Consejos para entrevistas: llega temprano, prepara preguntas, y usa la técnica STAR para responder."
        ],
        courses: [
            "Tenemos cursos en tecnología, diseño, negocios y habilidades blandas. ¿Qué área te interesa desarrollar?",
            "El aprendizaje continuo es clave para el crecimiento profesional. ¿Hay alguna habilidad específica que quieras desarrollar?",
            "Nuestros cursos están diseñados para diferentes niveles. ¿Eres principiante o ya tienes experiencia?"
        ],
        default: [
            "Interesante pregunta. ¿Podrías ser más específico para poder ayudarte mejor?",
            "No estoy seguro de entender completamente. ¿Puedes reformular tu pregunta?",
            "Me gustaría ayudarte mejor. ¿Puedes darme más detalles sobre lo que necesitas?"
        ]
    };
    
    const msg = message.toLowerCase();
    
    if (msg.includes('hola') || msg.includes('hi') || msg.includes('saludos')) {
        return getRandomResponse(responses.greeting);
    } else if (msg.includes('carrera') || msg.includes('profesión') || msg.includes('trabajo')) {
        return getRandomResponse(responses.career);
    } else if (msg.includes('cv') || msg.includes('currículum') || msg.includes('resume')) {
        return getRandomResponse(responses.cv);
    } else if (msg.includes('entrevista') || msg.includes('interview')) {
        return getRandomResponse(responses.interview);
    } else if (msg.includes('curso') || msg.includes('capacitación') || msg.includes('aprender')) {
        return getRandomResponse(responses.courses);
    } else {
        return getRandomResponse(responses.default);
    }
}

// Get Random Response
function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

// Start AI Chat (from buttons in modals)
function startAIChat() {
    modal.style.display = 'none';
    chatbot.style.display = 'flex';
    openChatbot.style.display = 'none';
    
    // Add welcome message based on context
    let welcomeMessage = "¡Hola! Vi que estás explorando nuestras herramientas de carrera. ¿En qué puedo ayudarte específicamente?";
    
    if (currentUser.interests.length > 0) {
        welcomeMessage = `¡Hola! Veo que tu perfil vocacional es ${currentUser.interests[0]}. ¿Te gustaría que conversemos sobre carreras en esta área?`;
    }
    
    setTimeout(() => {
        addMessageToChat('ai', welcomeMessage);
    }, 500);
}

// Contact Form Handler
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.textContent = 'Enviado ✓';
        submitBtn.style.backgroundColor = '#4CAF50';
        
        showNotification('¡Mensaje enviado exitosamente! Te contactaremos pronto.', 'success');
        
        // Reset form after 2 seconds
        setTimeout(() => {
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.backgroundColor = '';
        }, 2000);
    }, 1500);
}

// Utility Functions

// Show Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Download CV
function downloadCV() {
    // Simulate PDF download
    showNotification('Generando PDF... La descarga comenzará en un momento.', 'info');
    
    setTimeout(() => {
        // Create a simple text file for demonstration
        const cvContent = generateCVText(currentUser.cvData);
        const blob = new Blob([cvContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `CV_${currentUser.cvData.personal.name.replace(/\s+/g, '_')}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showNotification('CV descargado exitosamente!', 'success');
    }, 2000);
}

// Generate CV Text
function generateCVText(cvData) {
    let text = `CURRÍCULUM VITAE\n\n`;
    text += `${cvData.personal.name}\n`;
    text += `${cvData.personal.email}\n`;
    if (cvData.personal.phone) text += `${cvData.personal.phone}\n`;
    if (cvData.personal.location) text += `${cvData.personal.location}\n`;
    text += `\n`;
    
    if (cvData.personal.summary) {
        text += `RESUMEN PROFESIONAL\n`;
        text += `${cvData.personal.summary}\n\n`;
    }
    
    if (cvData.experience.length > 0) {
        text += `EXPERIENCIA LABORAL\n`;
        cvData.experience.forEach(exp => {
            text += `${exp.position} - ${exp.company}\n`;
            text += `${exp.startDate} - ${exp.endDate}\n`;
            if (exp.description) text += `${exp.description}\n`;
            text += `\n`;
        });
    }
    
    if (cvData.education.length > 0) {
        text += `EDUCACIÓN\n`;
        cvData.education.forEach(edu => {
            text += `${edu.degree}\n`;
            text += `${edu.institution}\n`;
            text += `${edu.startYear} - ${edu.endYear}\n\n`;
        });
    }
    
    if (cvData.skills.length > 0) {
        text += `HABILIDADES\n`;
        text += cvData.skills.join(', ') + '\n\n';
    }
    
    if (cvData.languages.length > 0) {
        text += `IDIOMAS\n`;
        cvData.languages.forEach(lang => {
            text += `${lang.language}: ${lang.level}\n`;
        });
    }
    
    return text;
}

// Edit CV
function editCV() {
    openModal('cv');
    // Populate form with existing data
    populateCVForm(currentUser.cvData);
}

// Populate CV Form
function populateCVForm(cvData) {
    if (!cvData || !cvData.personal) return;
    
    // Personal information
    document.getElementById('cv-name').value = cvData.personal.name || '';
    document.getElementById('cv-email').value = cvData.personal.email || '';
    document.getElementById('cv-phone').value = cvData.personal.phone || '';
    document.getElementById('cv-location').value = cvData.personal.location || '';
    document.getElementById('cv-summary').value = cvData.personal.summary || '';
    
    // Add experience items
    if (cvData.experience && cvData.experience.length > 0) {
        const container = document.getElementById('experience-container');
        container.innerHTML = ''; // Clear existing
        
        cvData.experience.forEach(exp => {
            const expDiv = document.createElement('div');
            expDiv.className = 'experience-item';
            expDiv.innerHTML = `
                <input type="text" placeholder="Puesto de trabajo" value="${exp.position || ''}">
                <input type="text" placeholder="Empresa" value="${exp.company || ''}">
                <div class="form-row">
                    <input type="text" placeholder="Fecha inicio" value="${exp.startDate || ''}">
                    <input type="text" placeholder="Fecha fin" value="${exp.endDate || ''}">
                </div>
                <textarea placeholder="Descripción de responsabilidades" rows="2">${exp.description || ''}</textarea>
                <button type="button" class="remove-btn" onclick="removeExperience(this)">Eliminar</button>
            `;
            container.appendChild(expDiv);
        });
    }
    
    // Add education items
    if (cvData.education && cvData.education.length > 0) {
        const container = document.getElementById('education-container');
        container.innerHTML = ''; // Clear existing
        
        cvData.education.forEach(edu => {
            const eduDiv = document.createElement('div');
            eduDiv.className = 'education-item';
            eduDiv.innerHTML = `
                <input type="text" placeholder="Título/Carrera" value="${edu.degree || ''}">
                <input type="text" placeholder="Institución" value="${edu.institution || ''}">
                <div class="form-row">
                    <input type="text" placeholder="Año inicio" value="${edu.startYear || ''}">
                    <input type="text" placeholder="Año fin" value="${edu.endYear || ''}">
                </div>
                <button type="button" class="remove-btn" onclick="removeEducation(this)">Eliminar</button>
            `;
            container.appendChild(eduDiv);
        });
    }
    
    // Add skills
    if (cvData.skills && cvData.skills.length > 0) {
        const container = document.getElementById('skills-container');
        container.innerHTML = ''; // Clear existing
        
        cvData.skills.forEach(skill => {
            addSkill(skill);
        });
    }
    
    // Add languages
    if (cvData.languages && cvData.languages.length > 0) {
        const container = document.getElementById('languages-container');
        container.innerHTML = ''; // Clear existing
        
        cvData.languages.forEach(lang => {
            const langDiv = document.createElement('div');
            langDiv.className = 'language-item';
            langDiv.innerHTML = `
                <input type="text" placeholder="Idioma" value="${lang.language || ''}">
                <select>
                    <option ${lang.level === 'Básico' ? 'selected' : ''}>Básico</option>
                    <option ${lang.level === 'Intermedio' ? 'selected' : ''}>Intermedio</option>
                    <option ${lang.level === 'Avanzado' ? 'selected' : ''}>Avanzado</option>
                    <option ${lang.level === 'Nativo' ? 'selected' : ''}>Nativo</option>
                </select>
                <button type="button" class="remove-btn" onclick="removeLanguage(this)">Eliminar</button>
            `;
            container.appendChild(langDiv);
        });
    }
}

// Share CV
function shareCV() {
    const shareData = {
        title: `CV de ${currentUser.cvData.personal.name}`,
        text: `Mira mi currículum vitae`,
        url: window.location.href
    };
    
    if (navigator.share) {
        navigator.share(shareData)
            .then(() => showNotification('CV compartido exitosamente!', 'success'))
            .catch(() => showNotification('Error al compartir', 'error'));
    } else {
        // Fallback for browsers that don't support Web Share API
        const shareUrl = `mailto:?subject=${encodeURIComponent(shareData.title)}&body=${encodeURIComponent(shareData.text + ' ' + shareData.url)}`;
        window.open(shareUrl);
        showNotification('Se abrirá tu cliente de email para compartir', 'info');
    }
}

// Animate on Scroll
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Special animations for different elements
                if (entry.target.classList.contains('stat-number')) {
                    animateNumber(entry.target);
                }
                
                if (entry.target.classList.contains('progress-bar')) {
                    animateProgressBar(entry.target);
                }
            }
        });
    }, { threshold: 0.1 });
    
    // Observe elements for animation
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .stat-number, .progress-bar').forEach(el => {
        observer.observe(el);
    });
}

// Animate Number
function animateNumber(element) {
    const target = parseInt(element.textContent);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Animate Progress Bar
function animateProgressBar(element) {
    const progressFill = element.querySelector('.progress-fill');
    if (progressFill) {
        const targetWidth = progressFill.style.width || '0%';
        progressFill.style.width = '0%';
        
        setTimeout(() => {
            progressFill.style.transition = 'width 2s ease-in-out';
            progressFill.style.width = targetWidth;
        }, 100);
    }
}

// Initialize tooltips and other UI enhancements
function initializeUIEnhancements() {
    // Add loading states to buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function() {
            if (!this.disabled && !this.classList.contains('no-loading')) {
                const originalText = this.textContent;
                this.classList.add('loading');
                
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1000);
            }
        });
    });
    
    // Add smooth hover effects
    document.querySelectorAll('.card, .service-card, .course-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Error handling and recovery
window.addEventListener('error', function(e) {
    console.error('Error caught:', e.error);
    showNotification('Ha ocurrido un error. Por favor, recarga la página.', 'error');
});

// Service Worker registration (for offline functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registered successfully');
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Final initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeUIEnhancements();
    
    // Add welcome message to chatbot
    setTimeout(() => {
        if (chatMessages.children.length === 0) {
            addMessageToChat('ai', '¡Hola! Soy tu asistente de carrera. Haz clic en el botón de chat cuando necesites ayuda. 👋');
        }
    }, 3000);
});

document.addEventListener('DOMContentLoaded', () => {
    const courseBtns = document.querySelectorAll('.courses-grid .course-btn');

    const urls = [
        'https://www.codecademy.com/catalog/subject/web-development',
        'https://www.edutin.com/cursos-gratis',
        'https://www.edx.org/learn/design'
    ];

    courseBtns.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            window.open(urls[i], '_blank');
        });
    });
});

