let currentTheme = 'dark';
  let avatarDataUrl = null;

  function getInitials(name) {
    if (!name.trim()) return '?';
    return name.trim().split(/\s+/).map(w => w[0].toUpperCase()).slice(0,2).join('');
  }

  function update() {
    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    const bio = document.getElementById('bio').value;
    const skills = document.getElementById('skills').value;
    const github = document.getElementById('github').value.trim();
    const twitter = document.getElementById('twitter').value.trim();
    const linkedin = document.getElementById('linkedin').value.trim();
    const website = document.getElementById('website').value.trim();

    // Name
    document.getElementById('card-name').textContent = name || 'Your Name';

    // Role
    document.getElementById('card-role').textContent = role || 'Your Role';

    // Bio
    document.getElementById('card-bio').textContent = bio || 'Your short bio will appear here…';

    // Initials / avatar
    document.getElementById('card-initials').textContent = getInitials(name || 'YN');

    // Skills
    const skillEl = document.getElementById('card-skills');
    if (skills.trim()) {
      const tags = skills.split(',').map(s => s.trim()).filter(Boolean).slice(0, 10);
      skillEl.innerHTML = tags.map(t => `<span class="skill-tag">${t}</span>`).join('');
    } else {
      skillEl.innerHTML = '<span class="skill-tag">Skill 1</span><span class="skill-tag">Skill 2</span><span class="skill-tag">Skill 3</span>';
    }

    // Socials
    const footer = document.getElementById('card-footer');
    const socials = [];

    if (github) socials.push(`<a class="social-link" href="https://github.com/${github}">
      <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
      ${github}
    </a>`);

    if (twitter) socials.push(`<a class="social-link" href="https://twitter.com/${twitter.replace('@','')}">
      <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
      ${twitter.replace('@','')}
    </a>`);

    if (linkedin) {
      const handle = linkedin.replace(/.*in\//, '').replace(/\/$/, '');
      socials.push(`<a class="social-link" href="https://linkedin.com/in/${handle}">
        <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        ${handle}
      </a>`);
    }

    if (website) {
      const display = website.replace(/https?:\/\//, '');
      socials.push(`<a class="social-link" href="https://${display}">
        <svg class="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
        </svg>
        ${display}
      </a>`);
    }

    if (socials.length > 0) {
      footer.innerHTML = socials.join('');
    } else {
      footer.innerHTML = '<span class="social-link" style="color:var(--c-sub);font-size:0.75rem;">Fill in your details →</span>';
    }
  }

  function setTheme(theme, btn) {
    document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const card = document.getElementById('the-card');
    card.className = 'card theme-' + theme;
    currentTheme = theme;
  }

  function handlePhoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(ev) {
      avatarDataUrl = ev.target.result;
      // Preview in form
      const img = document.querySelector('#avatar-preview img');
      const placeholder = document.getElementById('avatar-placeholder');
      img.src = avatarDataUrl;
      img.style.display = 'block';
      placeholder.style.display = 'none';

      // Apply to card
      const cardPhoto = document.getElementById('card-photo');
      const cardInitials = document.getElementById('card-initials');
      cardPhoto.src = avatarDataUrl;
      cardPhoto.style.display = 'block';
      cardInitials.style.display = 'none';
    };
    reader.readAsDataURL(file);
  }

  async function downloadCard() {
    const btn = document.getElementById('download-btn');
    btn.textContent = '⏳ Rendering…';
    btn.disabled = true;

    const card = document.getElementById('the-card');
    try {
      const canvas = await html2canvas(card, {
        scale: 3,
        backgroundColor: null,
        useCORS: true,
        logging: false,
      });

      const link = document.createElement('a');
      link.download = 'devcard.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch(err) {
      alert('Could not capture image. Try a different browser.');
    }

    btn.innerHTML = '⬇ Download PNG';
    btn.disabled = false;
  }

  function copyHTML() {
    const card = document.getElementById('the-card');
    const btn = document.getElementById('copy-btn');

    const styles = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Mono:wght@400;700&display=swap');
.card{font-family:'Syne',sans-serif;border-radius:20px;overflow:hidden;position:relative;box-shadow:0 30px 80px rgba(0,0,0,0.5)}
.card.theme-dark{--c-bg:#0f0f17;--c-surface:#1a1a26;--c-text:#fff;--c-sub:rgba(255,255,255,.5);--c-accent:#c8f060;--c-border:rgba(255,255,255,.08);--c-tag-bg:rgba(255,255,255,.07);background:var(--c-bg)}
.card.theme-light{--c-bg:#f5f4f0;--c-surface:#fff;--c-text:#1a1a2e;--c-sub:rgba(26,26,46,.5);--c-accent:#6641ff;--c-border:rgba(0,0,0,.08);--c-tag-bg:rgba(102,65,255,.08);background:var(--c-bg)}
.card.theme-ocean{--c-bg:#020b18;--c-surface:#071828;--c-text:#e0f0ff;--c-sub:rgba(224,240,255,.5);--c-accent:#00e5ff;--c-border:rgba(0,229,255,.1);--c-tag-bg:rgba(0,229,255,.08);background:linear-gradient(135deg,#020b18,#051a2e)}
.card.theme-ember{--c-bg:#110809;--c-surface:#1e0f10;--c-text:#fff0e8;--c-sub:rgba(255,240,232,.5);--c-accent:#ff6b35;--c-border:rgba(255,107,53,.12);--c-tag-bg:rgba(255,107,53,.1);background:linear-gradient(135deg,#110809,#1a0c10)}
.card-accent-bar{height:3px;background:linear-gradient(90deg,var(--c-accent),transparent)}
.card-glow{position:absolute;top:-60px;right:-60px;width:200px;height:200px;border-radius:50%;background:radial-gradient(circle,var(--c-accent),transparent 70%);opacity:.12;pointer-events:none}
.card-header{padding:32px 32px 24px;display:flex;align-items:flex-start;gap:20px;border-bottom:1px solid var(--c-border);position:relative}
.card-avatar{width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,var(--c-accent),var(--c-surface));display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1.4rem;color:var(--c-bg);flex-shrink:0;border:2px solid var(--c-border);overflow:hidden;position:relative}
.card-avatar-photo{width:100%;height:100%;object-fit:cover;border-radius:50%}
.card-avatar-initials{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
.card-name{font-size:1.45rem;font-weight:800;color:var(--c-text);letter-spacing:-.03em;line-height:1.2;margin-bottom:4px}
.card-role{font-size:.82rem;color:var(--c-accent);font-weight:700;letter-spacing:.06em;text-transform:uppercase}
.card-body{padding:24px 32px}
.card-bio{font-family:'Space Mono',monospace;font-size:.88rem;color:var(--c-sub);line-height:1.7;margin-bottom:20px}
.card-skills{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:24px}
.skill-tag{background:var(--c-tag-bg);border:1px solid var(--c-border);color:var(--c-text);font-size:.72rem;padding:4px 11px;border-radius:20px;font-weight:700;font-family:'Space Mono',monospace}
.card-footer{padding:16px 32px 28px;display:flex;gap:16px;flex-wrap:wrap}
.social-link{display:flex;align-items:center;gap:6px;font-size:.75rem;color:var(--c-sub);text-decoration:none;font-family:'Space Mono',monospace}
.social-icon{width:16px;height:16px;opacity:.7}
</style>`;

    const fullHTML = styles + '\n' + card.outerHTML;

    navigator.clipboard.writeText(fullHTML).then(() => {
      btn.innerHTML = '✓ Copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.innerHTML = '⎘ Copy HTML';
        btn.classList.remove('copied');
      }, 2000);
    }).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = fullHTML;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      btn.innerHTML = '✓ Copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.innerHTML = '⎘ Copy HTML';
        btn.classList.remove('copied');
      }, 2000);
    });
  }
