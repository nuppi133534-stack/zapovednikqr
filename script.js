// Основной скрипт для сайта с драматичным вступлением и 3D-эффектами
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация лоадера
    initLoader();

    // Инициализация tsParticles для фонового эффекта
    if (window.tsparticles) {
        initParticles();
    }

    // Инициализация эффекта прокрутки для элементов
    setupScrollAnimations();

    // Инициализация звукового фидбека
    initSoundEffects();
});

function initLoader() {
    // Индикатор загрузки
    let progress = 0;
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const loader = document.getElementById('loader');

    // Обновляем прогресс каждые 50мс (для 5-секундной анимации)
    const interval = setInterval(() => {
        progress += 2; // 2% каждые 50мс = 100% за 5 секунд

        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);

            // Показываем 100% и держим еще 1 секунду
            if (progressFill) {
                progressFill.style.width = progress + '%';
            }

            if (progressText) {
                progressText.textContent = progress + '%';
            }

            // Через 1 секунду скрываем лоадер
            setTimeout(() => {
                if (loader) {
                    loader.classList.add('hidden');

                    // Разрешаем скролл
                    document.body.style.overflow = 'auto';
                }
            }, 1000);
        }

        if (progressFill) {
            progressFill.style.width = progress + '%';
        }

        if (progressText) {
            progressText.textContent = progress + '%';
        }
    }, 50);
}

function initParticles() {
    // Настройка tsParticles для создания эффекта природных частиц
    tsparticles.load("particles-js", {
        fpsLimit: 60,
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ["#2E8B57", "#8FBC8F", "#ADD8E6", "#2ecc71"]
            },
            shape: {
                type: "circle"
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 4,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 1,
                    sync: false
                }
            },
            move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "grab"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        detectRetina: true
    });
}

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Элементы для анимации при прокрутке
    const elementsToAnimate = [
        '.main-title',
        '.subtitle',
        '.qr-card',
        '.qr-description'
    ];
    
    elementsToAnimate.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            if (!el.classList.contains('animate')) {
                observer.observe(el);
            }
        });
    });
}

// Звуковой фидбек (опционально)
let audioContext;

function initSoundEffects() {
    try {
        // Создаем AudioContext при первом взаимодействии пользователя
        document.body.addEventListener('click', function initAudio() {
            if (!audioContext) {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            document.body.removeEventListener('click', initAudio);
        }, { once: true });
    } catch (e) {
        console.log('Web Audio API не поддерживается в этом браузере');
    }
}

// Функция для воспроизведения звука
function playSound(frequency = 440, duration = 0.1) {
    if (!audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    gainNode.gain.value = 0.1;
    
    const now = audioContext.currentTime;
    gainNode.gain.setValueAtTime(0.1, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);
    
    oscillator.start(now);
    oscillator.stop(now + duration);
}

// Добавляем обработчик события для QR-карточки
document.addEventListener('DOMContentLoaded', function() {
    const qrCard = document.getElementById('qrCard');
    
    if (qrCard) {
        qrCard.addEventListener('click', function() {
            playSound(880, 0.05); // Высокий звук при клике
        });
    }
});