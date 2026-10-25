/**
 * Anirudh Sarve — Portfolio Interactive Logic
 * Features: Sticky Header, Mobile Drawer, Active Section Highlighting,
 *           Resume Selector Modal, Project Details Modal, Contact Modal & Copy Toast
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation & Scroll Spy
  const siteHeader = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }

    // Scroll Spy for active nav item
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 140;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });

  // 2. Mobile Menu Drawer Toggle
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close drawer when clicking a mobile link
    const mobileLinks = mobileDrawer.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // 3. Modal Manager (Resume, Projects, About, Contact)
  const modals = document.querySelectorAll('.modal-backdrop');

  function openModal(modalId) {
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
      targetModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      // Accessibility focus
      const closeBtn = targetModal.querySelector('.modal-close-btn');
      if (closeBtn) closeBtn.focus();
    }
  }

  function closeModal(modalElement) {
    if (modalElement) {
      modalElement.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Close modals on clicking backdrop or close button
  modals.forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.closest('.modal-close-btn')) {
        closeModal(modal);
      }
    });
  });

  // Close modals on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach((modal) => closeModal(modal));
    }
  });



  // 5. Contact Modal Trigger
  const contactBtns = document.querySelectorAll('.js-open-contact-modal');
  contactBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // If mobile drawer was open, close it
      if (mobileDrawer) {
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      }
      openModal('contactModal');
    });
  });

  // 6. About Modal Trigger
  const aboutBtns = document.querySelectorAll('.js-open-about-modal');
  aboutBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('aboutModal');
    });
  });

  // 7. Project Details Data & Modal
  const projectDetails = {
    navigo: {
      title: 'NAViGO — Intelligent Navigation Engine',
      subtitle: 'Autonomous Vehicle Computer Vision & Real-Time Obstacle Detection',
      tags: ['Python', 'OpenCV', 'PyTorch', 'YOLOv8', 'ROS2', 'ARM Cortex-A'],
      description: `
        <p>NAViGO is an embedded computer vision navigation pipeline architected for real-time robotic and autonomous vehicle perception at the edge.</p>
        <br>
        <h4 style="color: var(--primary-orange); margin-bottom: 6px;">Key Engineering Highlights:</h4>
        <ul style="margin-left: 20px; line-height: 1.6; color: var(--text-secondary);">
          <li>Optimized <strong>YOLOv8</strong> object detector with dynamic frame-skipping and TensorRT quantizations, running at <strong>sub-3 ms CPU latency</strong> on ARM Cortex-A ECUs.</li>
          <li>Engineered a custom Lane Departure Warning System (LDWS) using dual-ROI sliding-window polynomial fitting with <strong>98.2% curve tracking accuracy</strong>.</li>
          <li>Integrated Kalman-filtered multi-camera sensor fusion to deliver deterministic obstacle velocity vectors and proactive collision alerts.</li>
        </ul>
      `,
      image: 'assets/navigo.jpg',
      link: 'https://github.com/anisarve2006'
    },
    protolink: {
      title: 'ProtoLink — Custom Network Protocol Lab',
      subtitle: 'TCP/IP Transmission Visualization & Distributed Packet Lab',
      tags: ['C++', 'Linux Sockets', 'Network Simulation', 'Multithreading', 'Protocols'],
      description: `
        <p>ProtoLink is a custom transport layer network protocol emulator and packet transmission laboratory designed to simulate packet drops, jitter, and selective acknowledgments.</p>
        <br>
        <h4 style="color: var(--primary-orange); margin-bottom: 6px;">Key Engineering Highlights:</h4>
        <ul style="margin-left: 20px; line-height: 1.6; color: var(--text-secondary);">
          <li>Implemented custom sliding-window flow control with selective repeat (SR) and cumulative ACK algorithms in modern C++.</li>
          <li>Engineered synthetic network degradation layers (dynamic latency injection, random packet dropping, and bit-level corruption).</li>
          <li>Designed real-time terminal telemetry and visual throughput graphs monitoring congestion windows (cwnd) and throughput metrics under varying channel loads.</li>
        </ul>
      `,
      image: 'assets/protolink.jpg',
      link: 'https://github.com/anisarve2006'
    },
    virtual_tryon: {
      title: 'Virtual Try-On — AI Powered Fashion Experience',
      subtitle: 'Deep Learning Garment Warping & Multimodal Listing Platform',
      tags: ['Python', 'Google Gemini Vision', 'WebAssembly', 'Next.js 16', 'U²-Net', 'Redis'],
      description: `
        <p>An enterprise-grade virtual try-on and multimodal ecommerce cataloging system that eliminates manual listing friction and renders garment fits.</p>
        <br>
        <h4 style="color: var(--primary-orange); margin-bottom: 6px;">Key Engineering Highlights:</h4>
        <ul style="margin-left: 20px; line-height: 1.6; color: var(--text-secondary);">
          <li>Integrated <strong>Google Gemini Vision</strong> multimodal APIs into merchant listing workflows, automating brand detection and categorizations to slash listing creation from 8 minutes to <strong>under 30 seconds</strong>.</li>
          <li>Deployed client-side <strong>WebAssembly background matting (U²-Net)</strong> processing images in <strong><3.5 seconds</strong> directly in-browser with zero cloud GPU fees.</li>
          <li>Architected resilient backend state management using Upstash Redis atomic locks (<code>SET NX EX</code>) and WebSockets for rock-solid concurrency.</li>
        </ul>
      `,
      image: 'assets/virtual_tryon.jpg',
      link: 'https://github.com/anisarve2006'
    },
    eskf_inertial: {
      title: 'Neural-Inertial Dead-Reckoning Engine with 15-State ESKF',
      subtitle: 'Continuous-Time Sensor Fusion & Non-Linear Optimization',
      tags: ['C++20', 'ROS2 Humble', 'Eigen3', 'Ceres Solver', 'PyTorch', 'RTK-GNSS'],
      description: `
        <p>A mission-critical subterranean robotics localization and dead-reckoning engine built for GNSS-denied environments (tunnels, underground pipelines, and disaster ruins).</p>
        <br>
        <h4 style="color: var(--primary-orange); margin-bottom: 6px;">Key Engineering Highlights:</h4>
        <ul style="margin-left: 20px; line-height: 1.6; color: var(--text-secondary);">
          <li>Implemented a <strong>15-state Error-State Kalman Filter (ESKF)</strong> fusing 6-DoF IMU kinematics at 200 Hz with optical flow and wheel odometry.</li>
          <li>Integrated deep-learned zero-velocity updates (ZUPT) and Ceres non-linear optimization to bound positioning drift to <strong>0.42%</strong> over kilometers of subterranean trajectories.</li>
          <li>Engineered deterministic ROS2 Humble node pipelines adhering to hard real-time execution budgets under <strong>5 ms latency</strong>.</li>
        </ul>
      `,
      image: 'assets/eskf_inertial.jpg',
      link: 'https://github.com/anisarve2006'
    },
    optical_sar: {
      title: 'Multimodal Optical-SAR Fusion ResU-Net',
      subtitle: 'Cross-Modal Attention for Cloud-Occluded Satellite Reconstruction',
      tags: ['PyTorch', 'CUDA', 'GDAL', 'Sentinel-1/2', 'ResU-Net', 'Attention'],
      description: `
        <p>Deep learning earth observation platform developed for ISRO imagery workflows to reconstruct multispectral optical data occluded by atmospheric cloud cover.</p>
        <br>
        <h4 style="color: var(--primary-orange); margin-bottom: 6px;">Key Engineering Highlights:</h4>
        <ul style="margin-left: 20px; line-height: 1.6; color: var(--text-secondary);">
          <li>Architected dual-stream <strong>ResU-Net with Cross-Modal Attention</strong> conditioning optical multispectral channels on Sentinel-1 C-band synthetic aperture radar (SAR) backscatter.</li>
          <li>Reached <strong>32.8 dB PSNR</strong> and <strong>0.91 SSIM</strong> on challenging cloud occlusions, outperforming standard GAN baselines by 4.2 dB.</li>
          <li>Built custom geospatial raster streaming pipelines with GDAL and CUDA acceleration, processing gigapixel tiles in minutes.</li>
        </ul>
      `,
      image: 'assets/optical_sar.jpg',
      link: 'https://github.com/anisarve2006'
    },
    vericlaim: {
      title: 'VeriClaim-Agent — Autonomous Insurance Adjudication',
      subtitle: 'Multi-Tier Multi-Agent Clinical Claim Validation & Fraud Triage',
      tags: ['Python', 'LangGraph', 'FastAPI', 'Qdrant', 'Gemini Flash', 'Docker'],
      description: `
        <p>An enterprise-grade autonomous agentic workflow automating healthcare insurance claim adjudication, policy adherence verification, and fraud detection.</p>
        <br>
        <h4 style="color: var(--primary-orange); margin-bottom: 6px;">Key Engineering Highlights:</h4>
        <ul style="margin-left: 20px; line-height: 1.6; color: var(--text-secondary);">
          <li>Engineered a stateful multi-agent DAG with <strong>LangGraph</strong> orchestrating clinical document parsing, ICD-10 medical code validation, and policy compliance verification.</li>
          <li>Integrated hybrid graph and dense vector retrieval over Qdrant, cutting claim validation turnaround from 7 days to <strong>under 15 seconds</strong>.</li>
          <li>Constructed an anomaly detection agent identifying fraudulent billing patterns and duplicate procedures with <strong>98.2% precision</strong>.</li>
        </ul>
      `,
      image: 'assets/vericlaim.jpg',
      link: 'https://github.com/anisarve2006'
    }
  };

  const projectCards = document.querySelectorAll('.project-card[data-project]');
  const projectModal = document.getElementById('projectModal');

  projectCards.forEach((card) => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project');
      const data = projectDetails[projectId];
      if (data && projectModal) {
        document.getElementById('projectModalTitle').innerText = data.title;
        document.getElementById('projectModalSubtitle').innerText = data.subtitle;
        document.getElementById('projectModalImage').src = data.image;
        document.getElementById('projectModalBody').innerHTML = data.description;

        const tagsContainer = document.getElementById('projectModalTags');
        tagsContainer.innerHTML = '';
        data.tags.forEach((tag) => {
          const span = document.createElement('span');
          span.className = 'project-tag';
          span.innerText = tag;
          tagsContainer.appendChild(span);
        });

        const githubBtn = document.getElementById('projectModalLink');
        if (githubBtn) {
          githubBtn.href = data.link;
        }

        openModal('projectModal');
      }
    });
  });

  // 7.1 Mobile Projects View Switcher (Cards Swipe Track vs Compact List)
  const mobileViewBtns = document.querySelectorAll('.mobile-view-tabs .view-tab-btn');
  const projectsGrid = document.getElementById('projectsGrid');
  const projectTrackStatus = document.getElementById('projectTrackStatus');

  if (mobileViewBtns.length && projectsGrid) {
    mobileViewBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const viewMode = btn.getAttribute('data-view');
        mobileViewBtns.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        if (viewMode === 'list') {
          projectsGrid.classList.add('list-view');
          if (projectTrackStatus) {
            projectTrackStatus.innerHTML = '6 projects &bull; Compact list';
          }
        } else {
          projectsGrid.classList.remove('list-view');
          if (projectTrackStatus) {
            const card = projectsGrid.querySelector('.project-card');
            const cardWidth = card ? card.offsetWidth + 16 : 300;
            const currentCard = Math.round(projectsGrid.scrollLeft / cardWidth) + 1;
            const clamped = Math.min(Math.max(currentCard, 1), 6);
            projectTrackStatus.innerHTML = `${clamped} of 6 &bull; Swipe cards &rarr;`;
          }
        }
      });
    });

    // Track scroll position on mobile horizontal cards carousel
    projectsGrid.addEventListener('scroll', () => {
      if (projectsGrid.classList.contains('list-view')) return;
      const card = projectsGrid.querySelector('.project-card');
      if (!card) return;
      const cardWidth = card.offsetWidth + 16;
      const currentIdx = Math.round(projectsGrid.scrollLeft / cardWidth) + 1;
      const clampedIdx = Math.min(Math.max(currentIdx, 1), 6);
      if (projectTrackStatus) {
        projectTrackStatus.innerHTML = `${clampedIdx} of 6 &bull; Swipe cards &rarr;`;
      }
    }, { passive: true });
  }

  // "View All Projects" button opens all projects modal
  const viewAllProjectsBtn = document.getElementById('viewAllProjectsBtn');
  if (viewAllProjectsBtn) {
    viewAllProjectsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('allProjectsModal');
    });
  }

  // Category filter tabs inside allProjectsModal
  const catalogTabBtns = document.querySelectorAll('.catalog-tab-btn');
  const catalogCards = document.querySelectorAll('.catalog-card');

  catalogTabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      catalogTabBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      catalogCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 8. Technology Stack Modal & Live Search / Category Filters
  const openTechModalBtns = document.querySelectorAll('#openTechModalBtn, .js-open-tech-modal, .more-chip');
  openTechModalBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('techStackModal');
    });
  });

  const techCategoryBtns = document.querySelectorAll('[data-tech-filter]');
  const techCards = document.querySelectorAll('.tech-card');
  const techSearchInput = document.getElementById('techSearchInput');
  let currentTechCategory = 'all';

  function filterTechCards() {
    const query = techSearchInput ? techSearchInput.value.toLowerCase().trim() : '';
    techCards.forEach((card) => {
      const cat = card.getAttribute('data-tech-cat');
      const keywords = (card.getAttribute('data-keywords') || '').toLowerCase();
      const name = (card.querySelector('.tech-card-name')?.innerText || '').toLowerCase();
      const desc = (card.querySelector('.tech-card-desc')?.innerText || '').toLowerCase();

      const matchesCategory = (currentTechCategory === 'all' || cat === currentTechCategory);
      const matchesSearch = !query || name.includes(query) || keywords.includes(query) || desc.includes(query);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  techCategoryBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      techCategoryBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentTechCategory = btn.getAttribute('data-tech-filter');
      filterTechCards();
    });
  });

  if (techSearchInput) {
    techSearchInput.addEventListener('input', () => {
      filterTechCards();
    });
  }

  // 9. Scroll-linked Momentum for Skills Marquee Rails
  const skillsWrapper = document.querySelector('.skills-wrapper');
  if (skillsWrapper) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = skillsWrapper.getBoundingClientRect();
          // Active when skills section is near or in viewport
          if (rect.top < window.innerHeight + 300 && rect.bottom > -300) {
            const scrollDistance = window.scrollY;
            skillsWrapper.style.setProperty('--scroll-shift-left', `${(scrollDistance * 0.4) % 1200}px`);
            skillsWrapper.style.setProperty('--scroll-shift-right', `${(scrollDistance * 0.4) % 1200}px`);
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // 10. Copy Email to Clipboard with Toast
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const toast = document.getElementById('toastNotice');
  const emailToCopy = 'anisarve2006@gmail.com';

  if (copyEmailBtn && toast) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailToCopy).then(() => {
        toast.classList.add('show');
        copyEmailBtn.innerText = 'Copied!';
        setTimeout(() => {
          toast.classList.remove('show');
          copyEmailBtn.innerText = 'Copy Email';
        }, 3000);
      });
    });
  }

  // 11. Real Multi-Channel Notification Dispatcher (Email & WhatsApp)
  // Optional: If you obtain a free Web3Forms access key, paste it below to enable background form POST!
  const WEB3FORMS_ACCESS_KEY = ""; // e.g., "YOUR-ACCESS-KEY-HERE"
  const TARGET_EMAIL = 'anisarve2006@gmail.com';
  const TARGET_PHONE = '919322381894';

  const contactForm = document.getElementById('contactForm');
  const sendWhatsAppFormBtn = document.getElementById('sendWhatsAppFormBtn');

  function showNotificationToast(msg) {
    if (toast) {
      toast.querySelector('.toast-text').innerText = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 4000);
    }
  }

  // A. Dispatch via Email Client or Web3Forms
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const message = document.getElementById('contactMessage').value.trim();
      const submitBtn = document.getElementById('sendEmailSubmitBtn');
      const originalText = submitBtn.innerHTML;

      if (!name || !email || !message) {
        showNotificationToast('Please fill in your name, email, and message.');
        return;
      }

      // If Web3Forms access key is configured, post via AJAX
      if (WEB3FORMS_ACCESS_KEY) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending...</span>`;

        try {
          const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
              access_key: WEB3FORMS_ACCESS_KEY,
              name: name,
              email: email,
              message: message,
              subject: `Portfolio Contact from ${name}`
            })
          });

          const result = await response.json();
          if (result.success) {
            submitBtn.innerHTML = `<span>Sent Successfully!</span>`;
            submitBtn.style.backgroundColor = '#10b981';
            setTimeout(() => {
              contactForm.reset();
              submitBtn.disabled = false;
              submitBtn.innerHTML = originalText;
              submitBtn.style.backgroundColor = '';
              closeModal(document.getElementById('contactModal'));
              showNotificationToast('Message sent! Anirudh has received your email.');
            }, 1200);
            return;
          }
        } catch (err) {
          console.warn('Web3Forms dispatch failed, falling back to mailto:', err);
        }
      }

      // Default Reliable Email Client Dispatch (Gmail / Default Mailer)
      const mailtoSubject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const mailtoBody = encodeURIComponent(
        `Hi Anirudh,\n\n${message}\n\n---\nSender Details:\nName: ${name}\nEmail: ${email}\nSent via Anirudh Sarve Portfolio`
      );
      const mailtoUrl = `mailto:${TARGET_EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`;

      // Open email client with pre-filled content
      window.location.href = mailtoUrl;

      setTimeout(() => {
        contactForm.reset();
        closeModal(document.getElementById('contactModal'));
        showNotificationToast('Opened your email client to send message to Anirudh!');
      }, 600);
    });
  }

  // B. Dispatch via Instant WhatsApp Message
  if (sendWhatsAppFormBtn && contactForm) {
    sendWhatsAppFormBtn.addEventListener('click', () => {
      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      let waText = '';
      if (name || message) {
        waText = encodeURIComponent(
          `Hi Anirudh,\nMy name is ${name || 'Visitor'}${email ? ' (' + email + ')' : ''}.\nI came across your engineering portfolio and wanted to connect:\n\n"${message || 'I would like to discuss an opportunity or collaboration.'}"`
        );
      } else {
        waText = encodeURIComponent(
          `Hi Anirudh,\nI came across your engineering portfolio and wanted to connect regarding a project / opportunity!`
        );
      }

      const waUrl = `https://api.whatsapp.com/send?phone=${TARGET_PHONE}&text=${waText}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');

      setTimeout(() => {
        closeModal(document.getElementById('contactModal'));
        showNotificationToast('Opened WhatsApp! Anirudh will receive your instant message.');
      }, 500);
    });
  }
});
