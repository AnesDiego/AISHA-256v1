document.addEventListener('DOMContentLoaded', function() {
    // F
    function includeHTML(selector, filePath, callback) {
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
                    if (typeof callback === "function") callback();
                } else {
                    console.warn(`Element with selector "${selector}" not found.`);
                }
            })
            .catch(error => console.error('Error loading HTML:', filePath, error));
    }

    //s
    includeHTML('#header-placeholder', 'header.html', setupHeaderLogic);
    includeHTML('#footer-placeholder', 'footer.html', setupFooterYear);

    // F
    function setupFooterYear() {
        const currentYearSpan = document.getElementById('currentYear');
        if (currentYearSpan) {
            currentYearSpan.textContent = new Date().getFullYear();
        }
    }

    // F
    function setupHeaderLogic() {
        // G
        // M
        const menuDesktop = document.querySelector('nav.md\\:flex');
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        // M
        if (menuDesktop && window.innerWidth >= 768) {
            menuDesktop.classList.remove('hidden');
        }

        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
            // F
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                });
            });
        }

        // D
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-link').forEach(link => {
            const linkPath = link.getAttribute('href').split('/').pop();
            if (currentPath === linkPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // --- Roadmap Chart (roadmap.html) ---
    if (document.getElementById('roadmapChart')) {
        const roadmapPhases = [
            {
                id: "phase1",
                title: "Phase 1: Beta & Essential Foundation",
                objective: "Establish the fundamental AI analysis system, implement initial avatar presence, and begin cultivating the core community.",
                deliverables: [
                    "Automated 1-hour Bitcoin Analysis (Freqtrade, AI).",
                    "2D Ultra-realistic Female Avatar (AISHA-256v1) on Instagram.",
                    "Automated Content Publishing System (hourly API).",
                    "Initial Community Building and Feedback Channels.",
                    "Comprehensive Disclaimer Implementation.",
                    "Emphasis on DYOR and Risk.",
                    "Beta Status Transparency."
                ],
                technologies: "Freqtrade, LLM for textual analysis, 2D Avatar Generation.",
                platforms: "Instagram.",
                engagement: "Initial feedback collection on analyses and project; Beta status transparency."
            },
            {
                id: "phase2",
                title: "Phase 2: Visual & Content Expansion",
                objective: "Significantly enhance avatar realism and expand the range of content formats and analytical depth.",
                deliverables: [
                    "3D Ultra-realistic Avatar (AISHA-256vX).",
                    "Dynamic Video Content Production (anchor/influencer).",
                    "Multi-timeframe Analysis Expansion (4h, daily).",
                    "Content Diversification for Engagement."
                ],
                technologies: "3D Avatar Generation, AI Character Animation, AI Voice Synthesis, AI Lip-sync.",
                platforms: "Instagram, YouTube (initial), TikTok (initial).",
                engagement: "Feedback on avatar realism and video formats; Content routine building."
            },
            {
                id: "phase3",
                title: "Phase 3: Interactive Immersion & Universe Expansion",
                objective: "Significantly deepen user engagement through direct, personalized interaction and strategically expand the AI persona universe.",
                deliverables: [
                    "AI Chat with Avatars (distinct personalities).",
                    "New Specialized AI Avatars (programmer, chef, etc.).",
                    "Automated Comment Interaction."
                ],
                technologies: "AI Chatbot, NLP for interaction, AI Character Creation.",
                platforms: "Instagram, Twitter, YouTube, TikTok.",
                engagement: "Direct interaction with avatars; Ideas for new avatars and niches; Co-creation of personalities."
            },
            {
                id: "phase4",
                title: "Phase 4: Ecosystem & Monetization",
                objective: "Introduce strategic monetization streams and exclusive digital assets, leveraging established community and brand loyalty.",
                deliverables: [
                    "NFT Launch (collectibles, utility).",
                    "Personalized Merchandise Line (physical/digital)."
                ],
                technologies: "Blockchain (NFTs), E-commerce Platforms, Product Design.",
                platforms: "NFT Platforms, Online Store.",
                engagement: "Community involvement in exclusive launches; Financial support via donations/compras."
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
        let roadmapChartInstance = null;

        function displayPhaseDetails(phaseIndex) {
            if (phaseIndex < 0 || phaseIndex >= roadmapPhases.length) {
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
                    <p class="text-sm"><strong class="font-semibold text-text-secondary">Engagement Focus:</strong> ${phase.engagement}</p>
                </div>
            `;
            setTimeout(() => {
                const card = phaseDetailsContainer.querySelector('.phase-details-card');
                if (card) card.classList.add('visible');
            }, 50);
        }

        displayPhaseDetails(0);

        const ctxRoadmap = document.getElementById('roadmapChart');
        if (ctxRoadmap) {
            const data = {
                labels: roadmapPhases.map(p => p.title.split(':')[0]),
                datasets: [{
                    label: 'Number of Key Deliverables',
                    data: roadmapPhases.map(p => p.deliverables.length),
                    backgroundColor: [
                        'rgba(139, 92, 246, 0.7)',
                        'rgba(124, 58, 237, 0.7)',
                        'rgba(109, 40, 217, 0.7)',
                        'rgba(93, 23, 191, 0.7)',
                        'rgba(76, 29, 149, 0.7)'
                    ],
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
                type: 'bar',
                data: data,
                options: {
                    indexAxis: 'y',
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
                                font: { size: 10 }
                            },
                            grid: { display: false }
                        }
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) label += ': ';
                                    if (context.parsed.x !== null) label += context.parsed.x;
                                    return label;
                                }
                            }
                        }
                    },
                    onClick: (event, elements) => {
                        if (elements.length > 0) {
                            const phaseIndex = elements[0].index;
                            displayPhaseDetails(phaseIndex);
                            if (window.innerWidth < 1024) {
                                phaseDetailsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                        }
                    }
                }
            });
        }

        // C (community.html)
        if (document.getElementById('btcAddress')) {
            window.copyBtcAddress = function(address) {
                const feedbackDiv = document.getElementById('copyFeedback');
                if (!navigator.clipboard) {
                    const textArea = document.createElement("textarea");
                    textArea.value = address;
                    textArea.style.position = "fixed";
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
                    document.body.removeChild(textArea);
                } else {
                    navigator.clipboard.writeText(address).then(function() {
                        feedbackDiv.textContent = 'Address copied!';
                    }, function(err) {
                        feedbackDiv.textContent = 'Failed to copy.';
                        console.error('Async: Could not copy text: ', err);
                    });
                }
                setTimeout(() => { if (feedbackDiv) feedbackDiv.textContent = ''; }, 3000);
            };
        }
    }
});