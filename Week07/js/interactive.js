// Week08 jQuery Interactive Features
$(document).ready(function() {
    console.log('jQuery loaded and ready!');
    
    // 1. Toggle visibility of content sections
    initToggleFeatures();
    
    // 2. Image slider functionality
    initImageSlider();
    
    // 3. Form validation
    initFormValidation();
    
    // 4. Smooth scrolling enhancement
    initSmoothScrolling();
    
    // 5. Additional animations
    initAnimations();
});

// Toggle visibility of content sections
function initToggleFeatures() {
    // Add toggle buttons to project sections
    $('.project-section').each(function() {
        const $section = $(this);
        const title = $section.find('h2, h3').first().text() || 'Section';
        
        // Create toggle button
        const $toggleBtn = $('<button class="toggle-btn" data-expanded="true">' +
            '<span class="toggle-icon">−</span> ' + title + 
            '</button>');
        
        const $content = $section.find('.project-content, .section-content, p, ul, .persona-grid').not('h2, h3').first().parent();
        
        $toggleBtn.insertBefore($section.find('h2, h3').first());
        $section.find('h2, h3').first().hide();
        
        $toggleBtn.on('click', function() {
            const isExpanded = $(this).data('expanded');
            
            if (isExpanded) {
                $content.slideUp(300);
                $(this).find('.toggle-icon').text('+');
                $(this).data('expanded', false);
                $(this).addClass('collapsed');
            } else {
                $content.slideDown(300);
                $(this).find('.toggle-icon').text('−');
                $(this).data('expanded', true);
                $(this).removeClass('collapsed');
            }
        });
    });
    
    // Skills section toggle
    if ($('.skills-section').length) {
        $('.skills-section h2').on('click', function() {
            $(this).next('.skills-grid, .skills-list, ul').slideToggle(300);
            $(this).toggleClass('collapsed');
        });
    }
}

// Image slider functionality
function initImageSlider() {
    // Create image slider for project galleries
    $('.image-gallery, .project-images').each(function() {
        const $gallery = $(this);
        const $images = $gallery.find('img');
        
        if ($images.length > 1) {
            // Wrap gallery in slider container
            $gallery.addClass('slider-container');
            $images.hide().first().show();
            
            // Add navigation buttons
            const $prevBtn = $('<button class="slider-btn prev-btn">‹</button>');
            const $nextBtn = $('<button class="slider-btn next-btn">›</button>');
            const $indicators = $('<div class="slider-indicators"></div>');
            
            $gallery.append($prevBtn, $nextBtn, $indicators);
            
            // Create indicators
            $images.each(function(index) {
                const $indicator = $('<span class="indicator"></span>');
                if (index === 0) $indicator.addClass('active');
                $indicators.append($indicator);
                
                $indicator.on('click', function() {
                    showImage(index);
                });
            });
            
            let currentIndex = 0;
            
            function showImage(index) {
                $images.eq(currentIndex).fadeOut(200);
                $indicators.find('.indicator').eq(currentIndex).removeClass('active');
                
                currentIndex = index;
                $images.eq(currentIndex).fadeIn(200);
                $indicators.find('.indicator').eq(currentIndex).addClass('active');
            }
            
            $prevBtn.on('click', function() {
                const newIndex = (currentIndex - 1 + $images.length) % $images.length;
                showImage(newIndex);
            });
            
            $nextBtn.on('click', function() {
                const newIndex = (currentIndex + 1) % $images.length;
                showImage(newIndex);
            });
            
            // Auto-play slider
            let autoPlay = setInterval(function() {
                const newIndex = (currentIndex + 1) % $images.length;
                showImage(newIndex);
            }, 4000);
            
            // Pause on hover
            $gallery.on('mouseenter', function() {
                clearInterval(autoPlay);
            }).on('mouseleave', function() {
                autoPlay = setInterval(function() {
                    const newIndex = (currentIndex + 1) % $images.length;
                    showImage(newIndex);
                }, 4000);
            });
        }
    });
}

// Form validation
function initFormValidation() {
    const $forms = $('form');
    
    $forms.each(function() {
        const $form = $(this);
        
        // Real-time validation for email
        $form.find('input[type="email"]').on('input blur', function() {
            const $input = $(this);
            const email = $input.val();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailRegex.test(email)) {
                showFieldError($input, 'Please enter a valid email address');
            } else {
                clearFieldError($input);
            }
        });
        
        // Real-time validation for required fields
        $form.find('input[required], textarea[required]').on('blur', function() {
            const $input = $(this);
            
            if (!$input.val().trim()) {
                showFieldError($input, 'This field is required');
            } else {
                clearFieldError($input);
            }
        });
        
        // Form submission validation
        $form.on('submit', function(e) {
            let isValid = true;
            
            $form.find('input[required], textarea[required]').each(function() {
                const $input = $(this);
                
                if (!$input.val().trim()) {
                    showFieldError($input, 'This field is required');
                    isValid = false;
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                $form.find('.error-message').first().get(0).scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            } else {
                // Show success message
                showSuccessMessage($form);
            }
        });
    });
    
    function showFieldError($input, message) {
        clearFieldError($input);
        
        $input.addClass('error');
        const $errorMsg = $('<div class="error-message">' + message + '</div>');
        $input.after($errorMsg);
    }
    
    function clearFieldError($input) {
        $input.removeClass('error');
        $input.next('.error-message').remove();
    }
    
    function showSuccessMessage($form) {
        const $success = $('<div class="success-message">Message sent successfully! 🎉</div>');
        $form.prepend($success);
        
        setTimeout(function() {
            $success.fadeOut(300, function() {
                $(this).remove();
            });
        }, 3000);
    }
}

// Enhanced smooth scrolling
function initSmoothScrolling() {
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        const target = $(this.getAttribute('href'));
        
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 600, 'easeInOutQuad');
        }
    });
}

// Additional animations
function initAnimations() {
    // Fade in elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                $(entry.target).addClass('fade-in-visible');
            }
        });
    }, observerOptions);
    
    $('.card, .project-section, .hero-content').each(function() {
        $(this).addClass('fade-in-element');
        observer.observe(this);
    });
    
    // Hover effects for cards
    $('.card').on('mouseenter', function() {
        $(this).addClass('card-hover');
    }).on('mouseleave', function() {
        $(this).removeClass('card-hover');
    });
    
    // Typewriter effect for hero title
    initTypewriterEffect();
}

// Typewriter effect
function initTypewriterEffect() {
    const typewriterElements = $('.typewriter, .hero__title');
    
    typewriterElements.each(function() {
        const $element = $(this);
        const originalText = $element.text();
        const text = originalText || "Hey, I am Julia";
        
        // Clear the element and add cursor
        $element.empty().addClass('typewriter-active');
        $element.append('<span class="typewriter-text"></span><span class="typewriter-cursor">|</span>');
        
        const $textSpan = $element.find('.typewriter-text');
        let index = 0;
        
        function typeCharacter() {
            if (index < text.length) {
                $textSpan.text(text.substring(0, index + 1));
                index++;
                setTimeout(typeCharacter, 100); // 100ms delay between characters
            } else {
                // Hide cursor after typing is complete
                setTimeout(function() {
                    $element.find('.typewriter-cursor').fadeOut(500);
                }, 1000);
            }
        }
        
        // Start typing after a small delay
        setTimeout(typeCharacter, 500);
    });
}

// Custom easing function
$.easing.easeInOutQuad = function(x, t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
};