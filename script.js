 window.addEventListener('load', function() {
            const loadingScreen = document.getElementById('loadingScreen');
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1500);
        });


        const cursor = document.getElementById('cursor');
        const cursorFollower = document.getElementById('cursorFollower');
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX - 10 + 'px';
            cursor.style.top = mouseY - 10 + 'px';
        });

        function animateFollower() {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            cursorFollower.style.left = followerX - 4 + 'px';
            cursorFollower.style.top = followerY - 4 + 'px';
            requestAnimationFrame(animateFollower);
        }
        animateFollower();


        if (window.innerWidth <= 768) {
            cursor.style.display = 'none';
            cursorFollower.style.display = 'none';
        }

        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

       
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => {
            observer.observe(el);
        });

  
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            if (name && email && subject && message) {
                const submitBtn = this.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
           
                setTimeout(() => {
                    alert('Thank you for your message! I\'ll get back to you within 24 hours.');
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });

      
        document.querySelectorAll('.skill-category, .project-card, .contact-item').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const shapes = document.querySelectorAll('.shape');
            
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
            
            shapes.forEach((shape, index) => {
                const speed = 0.2 + (index * 0.1);
                shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
            });
        });

       
        function createFloatingElement() {
            const element = document.createElement('div');
            element.style.position = 'fixed';
            element.style.width = Math.random() * 4 + 1 + 'px';
            element.style.height = element.style.width;
            element.style.background = `rgba(255, 255, 255, ${Math.random() * 0.1 + 0.02})`;
            element.style.borderRadius = '50%';
            element.style.left = Math.random() * 100 + '%';
            element.style.top = '100%';
            element.style.pointerEvents = 'none';
            element.style.zIndex = '-1';
            
            document.body.appendChild(element);
            
            const animation = element.animate([
                { transform: 'translateY(0px)', opacity: 0 },
                { transform: 'translateY(-100vh)', opacity: 1 },
                { transform: 'translateY(-200vh)', opacity: 0 }
            ], {
                duration: Math.random() * 10000 + 15000,
                easing: 'linear'
            });
            
            animation.onfinish = () => {
                element.remove();
            };
        }

     
        setInterval(createFloatingElement, 3000);

       
        document.querySelectorAll('.cta-primary, .cta-secondary, .project-link, .submit-btn').forEach(button => {
            button.addEventListener('mouseenter', function() {
                cursor.style.transform = 'scale(1.5)';
                cursorFollower.style.transform = 'scale(2)';
            });
            
            button.addEventListener('mouseleave', function() {
                cursor.style.transform = 'scale(1)';
                cursorFollower.style.transform = 'scale(1)';
            });
        });

        function typeWriter(element, text, speed = 100) {
            element.textContent = '';
            let i = 0;
            
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            
            setTimeout(type, 2000);
        }

        const progressBar = document.createElement('div');
        progressBar.style.position = 'fixed';
        progressBar.style.top = '0';
        progressBar.style.left = '0';
        progressBar.style.width = '0%';
        progressBar.style.height = '3px';
        progressBar.style.background = 'linear-gradient(90deg, #ffffff, #8a8a8a)';
        progressBar.style.zIndex = '10001';
        progressBar.style.transition = 'width 0.1s ease';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', function() {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
        