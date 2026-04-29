document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    let isMenuOpen = false;

    mobileMenuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('hidden');
            gsap.fromTo(mobileMenu, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.3 });
        } else {
            gsap.to(mobileMenu, { 
                opacity: 0, y: -20, duration: 0.3, 
                onComplete: () => mobileMenu.classList.add('hidden') 
            });
        }
    });

    // Close mobile menu on link click
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            gsap.to(mobileMenu, { 
                opacity: 0, y: -20, duration: 0.3, 
                onComplete: () => mobileMenu.classList.add('hidden') 
            });
        });
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-md');
        } else {
            navbar.classList.remove('shadow-md');
        }
    });

    // GSAP Reveal Animations
    const revealElements = document.querySelectorAll('.gsap-reveal');
    
    revealElements.forEach((el) => {
        gsap.fromTo(el, 
            { 
                y: 50, 
                opacity: 0,
                autoAlpha: 0
            },
            {
                y: 0,
                opacity: 1,
                autoAlpha: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%", // Reveal when element is 85% from the top of the viewport
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Hero specific animations (Staggered)
    const heroElements = document.querySelectorAll('.hero-content > *');
    if(heroElements.length > 0) {
        gsap.fromTo(heroElements, 
            { y: 30, opacity: 0, autoAlpha: 0 }, 
            { 
                y: 0, 
                opacity: 1, 
                autoAlpha: 1,
                duration: 0.8, 
                stagger: 0.15, 
                ease: "power2.out",
                delay: 0.2
            }
        );
    }

    // GSAP Pin Overlapping Services Animation
    const servicesSection = document.getElementById('services');
    const serviceCards = gsap.utils.toArray('.service-card');
    
    if (servicesSection && serviceCards.length > 1) {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: servicesSection.querySelector('.container-custom'),
                start: "top top", // Pin when the header reaches the top of the screen
                end: "+=1500", // Scroll duration for the pinning effect
                scrub: 1,
                pin: servicesSection,
                anticipatePin: 1
            }
        });

        // Animate each subsequent card sliding up perfectly
        for (let i = 1; i < serviceCards.length; i++) {
            tl.to(serviceCards[i], {
                y: 0,
                duration: 1,
                ease: "none"
            });
        }
    }
    // GSAP Horizontal Scroll for Projects
    const projectsSectionHorizontal = document.getElementById('projects');
    const projectsSlider = document.querySelector('.projects-slider');
    
    if (projectsSectionHorizontal && projectsSlider) {
        let getScrollAmount = () => {
            // Calculate based on parent width so it aligns perfectly with the container bounds
            let sliderWidth = projectsSlider.scrollWidth;
            let parentWidth = projectsSlider.parentElement.offsetWidth;
            
            // On desktop, the container has padding. We add a tiny buffer (24px) for perfect visual alignment 
            // of the last card's shadow/edge.
            let rightPaddingBuffer = window.innerWidth >= 1024 ? 24 : 16;
            
            return -(sliderWidth - parentWidth + rightPaddingBuffer); 
        };
        
        gsap.to(projectsSlider, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
                trigger: projectsSectionHorizontal.querySelector('.container-custom'),
                start: "top top",
                end: () => `+=${Math.abs(getScrollAmount())}`,
                pin: projectsSectionHorizontal,
                scrub: 1,
                invalidateOnRefresh: true,
                anticipatePin: 1
            }
        });
    }

    // GSAP Process Timeline Animation
    const processTimeline = document.getElementById('process-timeline');
    const timelineProgress = document.getElementById('timeline-progress');
    const processSteps = gsap.utils.toArray('.process-step');

    if (processTimeline && timelineProgress) {
        // Animate the line growing downwards
        gsap.to(timelineProgress, {
            height: "100%",
            ease: "none",
            scrollTrigger: {
                trigger: processTimeline,
                start: "top 50%", 
                end: "bottom 50%", 
                scrub: 1
            }
        });

        // Animate steps and dots sequentially
        processSteps.forEach((step) => {
            const dot = step.querySelector('.process-dot');
            const stepTl = gsap.timeline({
                scrollTrigger: {
                    trigger: step,
                    start: "top 50%", 
                    toggleActions: "play none none reverse"
                }
            });

            if (dot) {
                stepTl.to(dot, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" }, 0);
            }
            
            stepTl.to(step, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out"
            }, 0.1);
        });
    }
});
