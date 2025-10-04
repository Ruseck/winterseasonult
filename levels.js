const skillLevels = {
    1: { 
        name: 'Newcomer', 
        description: 'Learning fundamentals and basic game understanding',
        categories: {
            'throwing': {
                name: 'Throwing',
                description: 'Fundamental disc throwing techniques and accuracy',
                skills: [
                    { name: 'Basic backhand throw', description: 'Can throw a flat, stable backhand 10-15 meters to a stationary target' },
                    { name: 'Basic forehand throw', description: 'Can throw a stable forehand 10-15 meters to a stationary target' },
                    { name: 'Pivot footwork', description: 'Can pivot effectively to find throwing lanes without traveling' }
                ]
            },
            'catching': {
                name: 'Catching',
                description: 'Disc reception and securing techniques',
                skills: [
                    { name: 'Two-hand pancake catch', description: 'Can catch discs thrown directly at chest height using both hands' },
                    { name: 'High and low catches', description: 'Understands hand positioning for high throws and low throws with two hands' }
                ]
            },
            'movement': {
                name: 'Movement & Positioning',
                description: 'Field positioning and cutting patterns',
                skills: [
                    { name: 'Basic cutting', description: 'Can execute straight cuts toward and away from the disc' },
                    { name: 'Endzone spacing', description: 'Knows to spread out in the endzone' }
                ]
            },
            'defense': {
                name: 'Defense',
                description: 'Defensive positioning and marking techniques',
                skills: [
                    { name: 'Blocking throwing lanes', description: 'Actively tries to block throwing lanes with body and arm positioning' },
                    { name: 'Force concept', description: 'Can maintain a basic force direction (forehand or backhand)' }
                ]
            },
            'knowledge': {
                name: 'Game Knowledge',
                description: 'Rules understanding and game awareness',
                skills: [
                    { name: 'Basic rules', description: 'Knows the objective (score in endzone), turnovers, travel rules, and spirit of the game' },
                    { name: 'Field dimensions', description: 'Knows where endzones are and basic field boundaries' }
                ]
            }
        }
    },
    2: { 
        name: 'Developing Player', 
        description: 'Building consistency and game awareness (includes all Level 1 skills)',
        categories: {
            'throwing': {
                name: 'Throwing',
                description: 'Improved range and consistency',
                skills: [
                    { name: 'Improved backhand range', description: 'Can throw backhand 20-25 meters with reasonable accuracy' },
                    { name: 'Improved forehand range', description: 'Can throw forehand 20-25 meters with reasonable accuracy' }
                ]
            },
            'catching': {
                name: 'Catching',
                description: 'Advanced catching techniques and decision making',
                skills: [
                    { name: 'One-hand catches', description: 'Can catch with either hand at various heights (high, low, outside)' },
                    { name: 'Catching while moving', description: 'Can catch while jogging or running at moderate speed' },
                    { name: 'Two-hand vs one-hand', description: 'Knows when to use two-hand catches (more secure) vs one-hand catches (extended reach)' }
                ]
            },
            'movement': {
                name: 'Movement & Positioning',
                description: 'Timing and field awareness',
                skills: [
                    { name: 'Cut timing', description: 'Recognizes when to cut vs when to clear space for teammates' },
                    { name: 'Clearing effectively', description: 'Clears out quickly after unsuccessful cuts' }
                ]
            },
            'defense': {
                name: 'Defense',
                description: 'Active defensive techniques',
                skills: [
                    { name: 'Active marking', description: 'Actively moves arms and adjusts position to block throws' },
                    { name: 'Force discipline', description: 'Maintains force direction while marking' },
                    { name: 'Downfield positioning', description: 'Knows to stay close to their assigned player' }
                ]
            },
            'knowledge': {
                name: 'Game Knowledge',
                description: 'Expanded rules and game mechanics',
                skills: [
                    { name: 'Stall count', description: 'Understands the 10-second stall count' },
                    { name: 'Picks and fouls', description: 'Knows basic foul calls (travel, pick, foul)' },
                    { name: 'Pulling basics', description: 'Understands what a pull is and can attempt one' }
                ]
            }
        }
    },
    3: { 
        name: 'Competent Player', 
        description: 'Reliable skills under pressure with tactical understanding (includes all Level 1-2 skills)',
        categories: {
            'throwing': {
                name: 'Throwing',
                description: 'Consistent accuracy under pressure',
                skills: [
                    { name: 'Reliable backhand and forehand', description: 'Both throws are consistent at 25-30 meters to moving targets' },
                    { name: 'Basic break throws', description: 'Can throw inside-out or around mark in practice situations' },
                    { name: 'Varied throw power', description: 'Can adjust throw speed for short passes (3-5 meters) vs medium gains (15-20 meters)' },
                    { name: 'Throwing under pressure', description: 'Maintains throwing form with an active mark and stall count' }
                ]
            },
            'catching': {
                name: 'Catching',
                description: 'Reliable catches in contested situations',
                skills: [
                    { name: 'Contested catches', description: 'Can compete for and secure catches with defensive pressure' },
                    { name: 'Layout catches', description: 'Can execute layouts with proper form (extending fully, protecting the disc, safe landing)' },
                    { name: 'Bad throw adjustment', description: 'Can adjust to poorly thrown discs (high, low, behind)' }
                ]
            },
            'movement': {
                name: 'Movement & Positioning',
                description: 'Advanced cutting and positioning',
                skills: [
                    { name: 'Cutting variety', description: 'Can execute in-cuts, out-cuts, and under cuts with changes of pace' },
                    { name: 'Stack positioning', description: 'Understands vertical and horizontal stack positioning' },
                    { name: 'Give-and-go', description: 'Can execute continuation cuts after throwing' }
                ]
            },
            'defense': {
                name: 'Defense',
                description: 'Consistent defensive execution',
                skills: [
                    { name: 'Force discipline', description: 'Maintains consistent force throughout the point' },
                    { name: 'Switching and communication', description: 'Can switch defensive assignments and communicates with teammates' },
                    { name: 'Poaching awareness', description: 'Understands when to help defend dangerous spaces' },
                    { name: 'Contesting throws', description: 'Times bids on discs without excessive fouling' }
                ]
            },
            'knowledge': {
                name: 'Game Knowledge',
                description: 'Tactical understanding and strategy',
                skills: [
                    { name: 'Offensive flow', description: 'Understands how to reset the offense and keep disc moving' },
                    { name: 'Defensive strategies', description: 'Knows person defense and basic zone concepts' },
                    { name: 'Wind awareness', description: 'Adjusts throws and cuts based on wind conditions' },
                    { name: 'Rule proficiency', description: 'Can make and contest calls appropriately' }
                ]
            }
        }
    },
    4: { 
        name: 'Experienced Player', 
        description: 'Advanced skills with strategic leadership capabilities (includes all Level 1-3 skills)',
        categories: {
            'throwing': {
                name: 'Throwing',
                description: 'Advanced throwing arsenal and techniques',
                skills: [
                    { name: 'Full throw arsenal', description: 'Backhand, forehand, and hammer are reliable in game situations' },
                    { name: 'Advanced break throws', description: 'Consistent with inside-out, outside-in, high-release, and low-release breaks' },
                    { name: 'Hucking ability', description: 'Can throw deep shots (hucks) 35+ meters with reasonable accuracy' },
                    { name: 'Touch on hucks', description: 'Can lead receivers and vary disc speed on long throws' },
                    { name: 'Multiple releases', description: 'Can throw from various arm angles and positions' }
                ]
            },
            'catching': {
                name: 'Catching',
                description: 'Elite catching in all situations',
                skills: [
                    { name: 'High-pressure catches', description: 'Maintains catching percentage in critical situations' },
                    { name: 'Sky balls', description: 'Can track and catch high floating discs consistently' },
                    { name: 'Endzone reliability', description: 'Consistently catches scoring opportunities' },
                    { name: 'Reading discs', description: 'Anticipates disc flight and positions body optimally' }
                ]
            },
            'movement': {
                name: 'Movement & Positioning',
                description: 'Elite movement and strategic positioning',
                skills: [
                    { name: 'Elite cutting', description: 'Explosive changes of direction, selling fakes, timing cuts to disc movement' },
                    { name: 'Strategic positioning', description: 'Positions based on field position, personnel, and game situation' },
                    { name: 'Handler movement', description: 'Can play handler position with constant motion and reset options' },
                    { name: 'Deep cutting', description: 'Can execute effective deep cuts and time them with thrower' }
                ]
            },
            'defense': {
                name: 'Defense',
                description: 'Advanced defensive concepts and execution',
                skills: [
                    { name: 'Shutdown defense', description: 'Can consistently prevent their matchup from receiving' },
                    { name: 'Reading offense', description: 'Anticipates cuts and positions to deny targets before they\'re open' },
                    { name: 'Zone proficiency', description: 'Understands and executes multiple zone defenses (cup, wall, etc.)' },
                    { name: 'Transition defense', description: 'Quickly transitions from offense to defense after turnovers' }
                ]
            },
            'knowledge': {
                name: 'Game Knowledge',
                description: 'Strategic leadership and game management',
                skills: [
                    { name: 'Strategic awareness', description: 'Reads offensive and defensive schemes and adjusts' },
                    { name: 'Field leadership', description: 'Can direct teammates and adjust positioning' },
                    { name: 'Advanced strategies', description: 'Understands side stack, split stack, iso plays, and various zone offenses' },
                    { name: 'Game management', description: 'Understands timeouts, line changes, and managing points/game flow' }
                ]
            }
        }
    },
    5: { 
        name: 'Advanced Competitive Player', 
        description: 'Elite competitive performance with mastery across all areas (includes all Level 1-4 skills)',
        categories: {
            'throwing': {
                name: 'Throwing',
                description: 'Elite throwing mastery and weapon status',
                skills: [
                    { name: 'Weapon status', description: 'At least one throw (backhand or forehand) is a true weapon that defenses must respect' },
                    { name: 'Breaking the mark consistently', description: 'Can find throwing lanes against tight, experienced markers' },
                    { name: 'Huck accuracy', description: 'Places deep throws where only receiver can get them' },
                    { name: 'Difficult conditions', description: 'Maintains throwing effectiveness in wind, rain, or pressure situations' },
                    { name: 'No-look throws', description: 'Can disguise throwing intentions and execute deceptive releases' },
                    { name: 'Specialty throws', description: 'Has scoobers and push passes for specific situations' }
                ]
            },
            'catching': {
                name: 'Catching',
                description: 'Clutch performance and maximum extension',
                skills: [
                    { name: 'Clutch performance', description: 'Thrives in high-pressure catching situations (universe point, etc.)' },
                    { name: 'Layout mastery', description: 'Layouts are controlled, safe, and reliable' },
                    { name: 'Defensive catches', description: 'Can generate blocks that turn into catches (D\'s)' },
                    { name: 'Full extension', description: 'Maximizes catching radius in all directions' }
                ]
            },
            'movement': {
                name: 'Movement & Positioning',
                description: 'Elite conditioning and versatility',
                skills: [
                    { name: 'Conditioning excellence', description: 'Maintains explosive cutting and positioning for full games/tournaments' },
                    { name: 'Matchup exploitation', description: 'Identifies and exploits defensive weaknesses' },
                    { name: 'Off-disc impact', description: 'Creates space and opportunities for teammates without touching the disc' },
                    { name: 'Role versatility', description: 'Can play multiple positions (handler, cutter, deep) effectively' }
                ]
            },
            'defense': {
                name: 'Defense',
                description: 'Elite defensive mastery and strategy',
                skills: [
                    { name: 'Elite marking', description: 'Forces turnovers through marking pressure alone' },
                    { name: 'Bids and blocks', description: 'Generates turnovers by reading throws and positioning for blocks' },
                    { name: 'Defensive strategy', description: 'Can call and adjust defensive schemes mid-point' },
                    { name: 'Matchup dominance', description: 'Can guard elite opponents and limit their impact' },
                    { name: 'Help defense', description: 'Excels at reading plays and providing timely help' }
                ]
            },
            'knowledge': {
                name: 'Game Knowledge',
                description: 'Complete mastery and teaching ability',
                skills: [
                    { name: 'Tactical mastery', description: 'Understands situational play calling (clock management, wind management, score differential)' },
                    { name: 'Teaching ability', description: 'Can explain concepts to less experienced players' },
                    { name: 'Scouting opponents', description: 'Studies opponents and adjusts team strategy accordingly' },
                    { name: 'Mental toughness', description: 'Maintains performance under fatigue and pressure throughout tournaments' },
                    { name: 'Advanced set plays', description: 'Knows and executes sophisticated offensive and defensive schemes' },
                    { name: 'Complete rules knowledge', description: 'Expert-level understanding of rules including obscure situations' }
                ]
            }
        }
    }
};

function displayLevels() {
    const container = document.getElementById('levels-container');
    container.innerHTML = Object.entries(skillLevels).map(([level, data]) => `
        <div class="level-card level-${level}">
            <div class="level-header" onclick="toggleLevel(${level})">
                <h3>Level ${level}: ${data.name}</h3>
                <p class="level-description">${data.description}</p>
                <span class="expand-icon">▼</span>
            </div>
            <div class="level-content" id="level-${level}-content">
                ${Object.entries(data.categories).map(([categoryKey, category]) => `
                    <div class="category">
                        <h4>${category.name}</h4>
                        <p class="category-description">${category.description}</p>
                        <ul>${category.skills.map(skill => `<li><strong>${skill.name}:</strong> ${skill.description}</li>`).join('')}</ul>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function toggleLevel(level) {
    const content = document.getElementById(`level-${level}-content`);
    const icon = content.previousElementSibling.querySelector('.expand-icon');
    
    if (content.style.display === 'none' || !content.style.display) {
        content.style.display = 'block';
        icon.textContent = '▲';
    } else {
        content.style.display = 'none';
        icon.textContent = '▼';
    }
}
