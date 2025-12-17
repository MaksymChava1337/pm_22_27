
function setUserName() {
    const fullName = "JOHN PARKER"; 

    const nameElement = document.getElementById('personName');

    if (nameElement) {
        nameElement.textContent = fullName;
    } else {
        console.error("Елемент з таким ID не знайдено!");
    }
}

document.addEventListener('DOMContentLoaded', setUserName);


document.addEventListener('DOMContentLoaded', function() {
    
    const arrows = document.querySelectorAll('.arrow-btn');

    arrows.forEach(arrow => {
        arrow.addEventListener('click', function() {
            
            this.classList.toggle('active');

            const headerContainer = this.closest('.section') || this.closest('.sectionL') || this.closest('.section1');
            
            const contentBlock = headerContainer.nextElementSibling;

            if (contentBlock && contentBlock.classList.contains('toggle-content')) {
                contentBlock.classList.toggle('hidden');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {

    const skillsData = [
        { 
            name: "Microsoft Word", 
            percent: 10  
        },
        { 
            name: "Adobe Illustrator", 
            percent: 75 
        },
        { 
            name: "Microsoft Powerpoint", 
            percent: 85 
        },
        { 
            name: "Adobe Photoshop", 
            percent: 60 
        }
    ];

    
    function renderSkills() {
       
        const container = document.getElementById('skillsContainer');

        if (!container) {
            console.error('Контейнер #skillsContainer не знайдено!');
            return;
        }

        container.innerHTML = '';

        skillsData.forEach(skill => {
            
            const htmlMarkup = `
                <div class="skills-block">
                    <div class="skills-text-dot">
                        <span class="dot"></span>
                        <p class="skill-txt m-0">${skill.name}</p>
                    </div>
                    <div class="skills-progress-bar">
                        <div style="width: ${skill.percent}%;"></div>
                    </div>
                </div>
            `;

            container.insertAdjacentHTML('beforeend', htmlMarkup);
        });
    }

    renderSkills();

});