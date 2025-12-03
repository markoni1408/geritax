/* ========================================
   Global Variables & Configuration
   ======================================== */

let autocompleteFrom = null;
let autocompleteTo = null;
let directionsService = null;
let selectedFromPlace = null;
let selectedToPlace = null;

// Pricing Configuration
const PRICING = {
    standard: {
        name: 'Standard Taxi',
        basePrice: 39,
        airportKeywords: ['flughafen', 'airport', 'schwechat', 'vie'],
        pricePerKm: 2.5,
        description: 'Wien ↔ Flughafen: €39 Fixpreis'
    },
    premium: {
        name: 'Premium Taxi',
        basePrice: 48,
        airportKeywords: ['flughafen', 'airport', 'schwechat', 'vie'],
        pricePerKm: 3.5,
        description: 'Wien ↔ Flughafen: €48 Fixpreis'
    },
    bus: {
        name: 'Busservice',
        basePrice: null,
        description: 'Preis auf Anfrage'
    }
};

// Vienna coordinates for distance calculation
const VIENNA_CENTER = {
    lat: 48.2082,
    lng: 16.3738
};

const VIENNA_AIRPORT = {
    lat: 48.1103,
    lng: 16.5697
};

/* ========================================
   DOM Content Loaded
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeDateTimePicker();
    initializeScrollFeatures();
    initializeFormHandlers();
    initializeStatCounters();
    
    // Google Maps API will be loaded asynchronously
    // Autocomplete will be initialized when API is ready
    window.initGoogleMaps = initGoogleMaps;
});

/* ========================================
   Google Maps Initialization
   ======================================== */

function initGoogleMaps() {
    if (typeof google === 'undefined' || !google.maps) {
        console.warn('Google Maps API not loaded. Address autocomplete will not work.');
        // Show fallback message
        showGoogleMapsWarning();
        return;
    }
    
    try {
        // Initialize Directions Service for distance calculation
        directionsService = new google.maps.DirectionsService();
        
        // Initialize autocomplete for "from" address
        const fromInput = document.getElementById('fromAddress');
        if (fromInput) {
            autocompleteFrom = new google.maps.places.Autocomplete(fromInput, {
                componentRestrictions: { country: 'at' },
                fields: ['formatted_address', 'geometry', 'name', 'place_id']
            });
            
            autocompleteFrom.addListener('place_changed', function() {
                selectedFromPlace = autocompleteFrom.getPlace();
                calculatePrice();
            });
        }
        
        // Initialize autocomplete for "to" address
        const toInput = document.getElementById('toAddress');
        if (toInput) {
            autocompleteTo = new google.maps.places.Autocomplete(toInput, {
                componentRestrictions: { country: 'at' },
                fields: ['formatted_address', 'geometry', 'name', 'place_id']
            });
            
            autocompleteTo.addListener('place_changed', function() {
                selectedToPlace = autocompleteTo.getPlace();
                calculatePrice();
            });
        }
        
        console.log('Google Maps initialized successfully');
    } catch (error) {
        console.error('Error initializing Google Maps:', error);
        showGoogleMapsWarning();
    }
}

function showGoogleMapsWarning() {
    const priceDisplay = document.getElementById('priceAmount');
    if (priceDisplay) {
        priceDisplay.innerHTML = '<small style="color: #F44336;">⚠️ Google Maps API-Schlüssel erforderlich für Adresssuche</small>';
    }
}

/* ========================================
   Navigation
   ======================================== */

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active state
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Close mobile menu if open
                    if (navMenu) {
                        navMenu.classList.remove('active');
                    }
                }
            }
        });
    });
    
    // Mobile menu toggle
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNav);
}

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

/* ========================================
   Date & Time Picker Initialization
   ======================================== */

function initializeDateTimePicker() {
    const dateInput = document.getElementById('pickupDate');
    const timeInput = document.getElementById('pickupTime');
    
    if (dateInput) {
        // Set minimum date to today
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        dateInput.min = `${yyyy}-${mm}-${dd}`;
        
        // Set default date to today
        dateInput.value = `${yyyy}-${mm}-${dd}`;
    }
    
    if (timeInput) {
        // Set default time to current time + 2 hours
        const now = new Date();
        now.setHours(now.getHours() + 2);
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        timeInput.value = `${hours}:${minutes}`;
    }
}

/* ========================================
   Scroll Features
   ======================================== */

function initializeScrollFeatures() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/* ========================================
   Price Calculation
   ======================================== */

function calculatePrice() {
    const vehicleType = document.getElementById('vehicleType').value;
    const priceAmount = document.getElementById('priceAmount');
    const priceNote = document.getElementById('priceNote');
    
    if (!vehicleType) {
        priceAmount.textContent = 'Bitte Fahrzeugtyp wählen';
        priceNote.textContent = '';
        return;
    }
    
    const pricing = PRICING[vehicleType];
    
    // Bus service is always on request
    if (vehicleType === 'bus') {
        priceAmount.textContent = 'Auf Anfrage';
        priceNote.textContent = 'Kontaktieren Sie uns für ein individuelles Angebot';
        return;
    }
    
    if (!selectedFromPlace || !selectedToPlace) {
        priceAmount.textContent = 'Bitte Adressen eingeben';
        priceNote.textContent = pricing.description;
        return;
    }
    
    // Check if route involves airport
    const fromAddress = selectedFromPlace.formatted_address?.toLowerCase() || '';
    const toAddress = selectedToPlace.formatted_address?.toLowerCase() || '';
    
    const isAirportRoute = 
        pricing.airportKeywords.some(keyword => fromAddress.includes(keyword) || toAddress.includes(keyword));
    
    if (isAirportRoute) {
        // Check if the other address is in Vienna
        const isViennaRoute = 
            fromAddress.includes('wien') || fromAddress.includes('vienna') ||
            toAddress.includes('wien') || toAddress.includes('vienna');
        
        if (isViennaRoute) {
            priceAmount.textContent = `€${pricing.basePrice}`;
            priceNote.textContent = '✓ Fixpreis Wien ↔ Flughafen';
            return;
        }
    }
    
    // Calculate distance-based price if Google Maps API is available
    if (directionsService && selectedFromPlace.geometry && selectedToPlace.geometry) {
        calculateDistancePrice(
            selectedFromPlace.geometry.location,
            selectedToPlace.geometry.location,
            pricing
        );
    } else {
        // Fallback: Estimate based on coordinates
        priceAmount.textContent = '€' + Math.round(pricing.basePrice * 1.2);
        priceNote.textContent = 'Geschätzter Preis - Finale Berechnung bei Bestätigung';
    }
}

function calculateDistancePrice(origin, destination, pricing) {
    const priceAmount = document.getElementById('priceAmount');
    const priceNote = document.getElementById('priceNote');
    
    const request = {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
    };
    
    directionsService.route(request, function(result, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            const distanceInMeters = result.routes[0].legs[0].distance.value;
            const distanceInKm = (distanceInMeters / 1000).toFixed(1);
            
            // Calculate price: base price + distance * price per km
            const calculatedPrice = Math.round(pricing.basePrice + (distanceInKm * pricing.pricePerKm));
            
            priceAmount.textContent = `€${calculatedPrice}`;
            priceNote.textContent = `Geschätzte Distanz: ${distanceInKm} km`;
        } else {
            priceAmount.textContent = '€' + pricing.basePrice;
            priceNote.textContent = 'Route konnte nicht berechnet werden - Kontaktieren Sie uns für genauen Preis';
        }
    });
}

/* ========================================
   Form Handlers
   ======================================== */

function initializeFormHandlers() {
    const bookingForm = document.getElementById('bookingForm');
    const contactForm = document.getElementById('contactForm');
    const vehicleTypeSelect = document.getElementById('vehicleType');
    
    // Vehicle type change handler
    if (vehicleTypeSelect) {
        vehicleTypeSelect.addEventListener('change', calculatePrice);
    }
    
    // Booking form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

function handleBookingSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const bookingData = {
        vehicleType: formData.get('vehicleType'),
        fromAddress: formData.get('fromAddress'),
        toAddress: formData.get('toAddress'),
        pickupDate: formData.get('pickupDate'),
        pickupTime: formData.get('pickupTime'),
        passengers: formData.get('passengers'),
        childSeat: formData.get('childSeat'),
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        notes: formData.get('notes'),
        estimatedPrice: document.getElementById('priceAmount').textContent
    };
    
    // Validate addresses
    if (!selectedFromPlace || !selectedToPlace) {
        alert('Bitte wählen Sie gültige Adressen aus den Vorschlägen.');
        return;
    }
    
    console.log('Booking Data:', bookingData);
    
    // In a real application, this would send data to a server
    // For now, we'll simulate success
    
    // Create email body
    const emailBody = `
Neue Buchungsanfrage von Geri Taxi Website

Fahrzeugtyp: ${getVehicleTypeName(bookingData.vehicleType)}
Von: ${bookingData.fromAddress}
Nach: ${bookingData.toAddress}
Datum: ${bookingData.pickupDate}
Uhrzeit: ${bookingData.pickupTime}
Passagiere: ${bookingData.passengers}
Kindersitz: ${bookingData.childSeat === 'yes' ? 'Ja' : 'Nein'}

Kundendaten:
Name: ${bookingData.name}
E-Mail: ${bookingData.email}
Telefon: ${bookingData.phone}

Geschätzter Preis: ${bookingData.estimatedPrice}

${bookingData.notes ? 'Zusätzliche Informationen:\n' + bookingData.notes : ''}
    `.trim();
    
    // Create mailto link (fallback method)
    const mailtoLink = `mailto:info@geritaxi.at?subject=Buchungsanfrage von ${encodeURIComponent(bookingData.name)}&body=${encodeURIComponent(emailBody)}`;
    
    // Show success modal
    showSuccessModal();
    
    // Open email client
    setTimeout(() => {
        window.location.href = mailtoLink;
    }, 1500);
    
    // Reset form
    e.target.reset();
    selectedFromPlace = null;
    selectedToPlace = null;
    calculatePrice();
    initializeDateTimePicker();
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const contactData = {
        name: formData.get('contactName'),
        email: formData.get('contactEmail'),
        phone: formData.get('contactPhone'),
        message: formData.get('contactMessage')
    };
    
    console.log('Contact Data:', contactData);
    
    // Create email body
    const emailBody = `
Neue Kontaktanfrage von Geri Taxi Website

Name: ${contactData.name}
E-Mail: ${contactData.email}
${contactData.phone ? 'Telefon: ' + contactData.phone : ''}

Nachricht:
${contactData.message}
    `.trim();
    
    // Create mailto link
    const mailtoLink = `mailto:info@geritaxi.at?subject=Kontaktanfrage von ${encodeURIComponent(contactData.name)}&body=${encodeURIComponent(emailBody)}`;
    
    // Show success modal
    showSuccessModal();
    
    // Open email client
    setTimeout(() => {
        window.location.href = mailtoLink;
    }, 1500);
    
    // Reset form
    e.target.reset();
}

function getVehicleTypeName(type) {
    const names = {
        'standard': 'Standard Taxi',
        'premium': 'Premium Taxi',
        'bus': 'Busservice'
    };
    return names[type] || type;
}

/* ========================================
   Modal Functions
   ======================================== */

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('successModal');
    if (e.target === modal) {
        closeModal();
    }
});

/* ========================================
   Statistics Counter Animation
   ======================================== */

function initializeStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;
    
    function animateCounters() {
        if (animated) return;
        
        const statsSection = document.querySelector('.about-stats');
        if (!statsSection) return;
        
        const rect = statsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible) {
            animated = true;
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                if (isNaN(target)) return;
                
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        stat.textContent = Math.floor(current).toLocaleString('de-DE');
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target.toLocaleString('de-DE');
                    }
                };
                
                updateCounter();
            });
        }
    }
    
    window.addEventListener('scroll', animateCounters);
    animateCounters(); // Check on load
}

/* ========================================
   Utility Functions
   ======================================== */

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('de-DE', options);
}

// Format time for display
function formatTime(timeString) {
    return timeString;
}

// Validate email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate phone
function isValidPhone(phone) {
    const re = /^[\d\s\+\-\(\)]+$/;
    return re.test(phone);
}

/* ========================================
   Error Handling
   ======================================== */

window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
});

// Google Maps API error callback
window.gm_authFailure = function() {
    console.error('Google Maps API authentication failed');
    showGoogleMapsWarning();
};

/* ========================================
   Initialize on Google Maps Load
   ======================================== */

// This function will be called by the Google Maps API callback
window.initGoogleMaps = initGoogleMaps;