document.addEventListener('DOMContentLoaded', function() {
    // Function to include external HTML files
    function includeHTML(selector, filePath) {
        fetch(filePath)
           .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
           .then(data => {
                const element = document.querySelector(selector);
                if (element) {
                    element.innerHTML = data;
                } else {
                    console.warn(`Element with selector "${selector}" not found.`);
                }
            })
           .catch(error => console.error('Error loading HTML:', filePath, error));
    }

    // Include header and footer
    includeHTML('#header-placeholder', 'header.html');
    includeHTML('#footer-placeholder', 'footer.html');

    // Set current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Mobile menu toggle logic
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        // Use MutationObserver to ensure the header content is loaded before attaching listeners
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    const mobileMenuButton = document.getElementById('mobile-menu-button');
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (mobileMenuButton && mobileMenu) {
                        mobileMenuButton.addEventListener('click', () => {
                            mobileMenu.classList.toggle('hidden');
                        });
                        // Close mobile menu when a link inside it is clicked
                        mobileMenu.querySelectorAll('a').forEach(link => {
                            link.addEventListener('click', () => {
                                mobileMenu.classList.add('hidden');
                            });
                        });
                        observer.disconnect(); // Disconnect once listeners are attached
                        // Now that header is loaded, apply active link highlighting
                        highlightActiveNavLink();
                        break; // Stop observing after successful setup
                    }
                }
            }
        });
        // Start observing the header placeholder for changes in its children
        observer.observe(headerPlaceholder, { childList: true, subtree: true });
    }

    // Function for active nav link highlighting
    function highlightActiveNavLink() {
        const currentPath = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.nav-link'); // Select all nav links
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href').split('/').pop();
            if (currentPath === linkPath |
| (currentPath === '' && linkPath === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Roadmap Data (only if on roadmap.html)
    if (document.getElementById('roadmapChart')) {
        const roadmapPhases =,
                technologies: "Freqtrade, LLM for textual analysis, 2D Avatar Generation.",
                platforms: "Instagram.",
                engagement: "Initial feedback collection on analyses and project; Beta status transparency."
            },
            {
                id: "phase2",
                title: "Phase 2: Visual & Content Expansion",
                objective: "Significantly enhance avatar realism and expand the range of content formats and analytical depth.",
                deliverables:,
                technologies: "3D Avatar Generation, AI Character Animation, AI Voice Synthesis, AI Lip-sync.",
                platforms: "Instagram, YouTube (initial), TikTok (initial).",
                engagement: "Feedback on avatar realism and video formats; Content routine building."
            },
            {
                id: "phase3",
                title: "Phase 3: Interactive Immersion & Universe Expansion",
                objective: "Significantly deepen user engagement through direct, personalized interaction and strategically expand the AI persona universe.",
                deliverables:,
                technologies: "AI Chatbot, NLP for interaction, AI Character Creation.",
                platforms: "Instagram, Twitter, YouTube, TikTok.",
                engagement: "Direct interaction with avatars; Ideas for new avatars and niches; Co-creation of personalities."
            },
            {
                id: "phase4",
                title: "Phase 4: Ecosystem & Monetization",
                objective: "Introduce strategic monetization streams and exclusive digital assets, leveraging established community and brand loyalty.",
                deliverables:,
                technologies: "Blockchain (NFTs), E-commerce Platforms, Product Design.",
                platforms: "NFT Platforms, Online Store.",
                engagement: "Community involvement in exclusive launches; Financial support via donations/purchases."
            },
            {
                id: "phase5",
                title: "Phase 5: Diversification & Multi-Platform Growth",
                objective: "Achieve extensive reach across major digital platforms and continuously explore new AI persona applications and niches, solidifying market leadership.",
                deliverables: [
                    "Full Multi-platform Expansion.",
                    "Advanced Video Content Portfolio.",
                    "Continuous Exploration of AI Influencer Niches."
                ],
                technologies: "Content Distribution Optimization, AI Series Generation, AI Character Animation.",
                platforms: "All major platforms (Twitter, YouTube, TikTok, etc.).",
                engagement: "Participation in content and reach expansion; Brand loyalty reinforcement."
            }
        ];

        const phaseDetailsContainer = document.getElementById('phaseDetailsContainer');
        let roadmapChartInstance = null; // To store the chart instance

        function displayPhaseDetails(phaseIndex) {
            if (phaseIndex < 0 |
| phaseIndex >= roadmapPhases.length) {
                phaseDetailsContainer.innerHTML = '<p class="text-center text-text-secondary">Select a phase from the chart or titles to see details.</p>';
                return;
            }
            const phase = roadmapPhases[phaseIndex];
            phaseDetailsContainer.innerHTML = `
                <div class="phase-details-card card border-l-4 border-purple-accent">
                    <h3 class="text-2xl font-bold mb-3 text-purple-accent">${phase.title}</h3>
                    <p class="mb-2"><strong class="font-semibold text-text-primary">Main Objective:</strong> ${phase.objective}</p>
                    <p class="mb-1 font-semibold text-text-primary">Key Deliverables:</p>
                    <ul class="list-disc list-inside space-y-1 mb-3 text-text-secondary pl-4">
                        ${phase.deliverables.map(deliverable => `<li>${deliverable}</li>`).join('')}
                    </ul>
                    <p class="mb-2 text-sm"><strong class="font-semibold text-text-secondary">Technologies/Resources:</strong> ${phase.technologies}</p>
                    <p class="mb-2 text-sm"><strong class="font-semibold text-text-secondary">Target Platforms:</strong> ${phase.platforms}</p>
                    <p class="text-sm"><strong class="font-semibold text-text-secondary">Engagement Focus:</strong> ${phase.engajamento}</p>
                </div>
            `;
            // Trigger animation
            setTimeout(() => {
                const card = phaseDetailsContainer.querySelector('.phase-details-card');
                if (card) card.classList.add('visible');
            }, 50);
        }
        
        // Initial display (e.g., first phase or placeholder)
        displayPhaseDetails(0);


        // Chart.js Roadmap Chart
        const ctxRoadmap = document.getElementById('roadmapChart');
        if (ctxRoadmap) {
            const data = {
                labels: roadmapPhases.map(p => p.title.split(':')), // "Phase 1", "Phase 2", etc.
                datasets:,
                    borderColor: [
                        'rgba(139, 92, 246, 1)',
                        'rgba(124, 58, 237, 1)',
                        'rgba(109, 40, 217, 1)',
                        'rgba(93, 23, 191, 1)',
                        'rgba(76, 29, 149, 1)'
                    ],
                    borderWidth: 1,
                    hoverBackgroundColor: [
                        'rgba(139, 92, 246, 0.9)',
                        'rgba(124, 58, 237, 0.9)',
                        'rgba(109, 40, 217, 0.9)',
                        'rgba(93, 23, 191, 0.9)',
                        'rgba(76, 29, 149, 0.9)'
                    ]
                }]
            };

            roadmapChartInstance = new Chart(ctxRoadmap, {
                type: 'bar', // Changed to bar for better label readability with more text
                data: data,
                options: {
                    indexAxis: 'y', // Makes it a horizontal bar chart
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Number of Key Deliverables',
                                color: 'var(--color-text-secondary)'
                            },
                            ticks: { color: 'var(--color-text-secondary)' },
                            grid: { color: 'var(--color-border-secondary)' }
                        },
                        y: {
                           ticks: { 
                                color: 'var(--color-text-secondary)',
                                font: { size: 10 } // Smaller font for phase labels if needed
                            },
                           grid: { display: false }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false // Hiding legend as it's self-explanatory
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label |
| '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.x!== null) {
                                        label += context.parsed.x;
                                    }
                                    return label;
                                }
                            }
                        }
                    },
                    onClick: (event, elements) => {
                        if (elements.length > 0) {
                            const phaseIndex = elements.index;
                            displayPhaseDetails(phaseIndex);
                            // Optionally, scroll to the details container on mobile
                            if (window.innerWidth < 1024) { // lg breakpoint
                                phaseDetailsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                        }
                    }
                }
            });
        }

        // Function to copy BTC Address (only if on community.html)
        if (document.getElementById('btcAddress')) {
            window.copyBtcAddress = function(address) { // Make it global for onclick
                const feedbackDiv = document.getElementById('copyFeedback');
                if (!navigator.clipboard) {
                    // Fallback for older browsers
                    const textArea = document.createElement("textarea");
                    textArea.value = address;
                    textArea.style.position = "fixed"; //avoid scrolling to bottom
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    try {
                        document.execCommand('copy');
                        feedbackDiv.textContent = 'Address copied!';
                    } catch (err) {
                        feedbackDiv.textContent = 'Failed to copy.';
                        console.error('Fallback: Oops, unable to copy', err);
                    }
                } else {
                    navigator.clipboard.writeText(address).then(function() {
                        feedbackDiv.textContent = 'Address copied!';
                    }, function(err) {
                        feedbackDiv.textContent = 'Failed to copy.';
                        console.error('Async: Could not copy text: ', err);
                    });
                }
                setTimeout(() => { feedbackDiv.textContent = ''; }, 3000);
            };
        }
    });