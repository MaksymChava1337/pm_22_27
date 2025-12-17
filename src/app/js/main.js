
document.addEventListener('DOMContentLoaded', function() {

    
    function loadData() {
    
        fetch('json/data.json')
            .then(response => {
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                return response.json();
            })
            .then(data => {
               
                setPersonalData(data.personalData);
                renderSkills(data.skills);
            })
            .catch(error => {
               
                console.error('Помилка завантаження даних:', error);
                
                
                const skillsContainer = document.getElementById('skillsContainer');
                if (skillsContainer) {
                    skillsContainer.innerHTML = '<p style="color: red; text-align: center;">Не вдалося завантажити дані.</p>';
                }
                alert('Вибачте, сталася помилка при завантаженні даних з серверу.');
            });
    }

   
    function setPersonalData(data) {
       
        const nameElement = document.getElementById('personName');

        if (nameElement && data.firstName && data.lastName) {
            nameElement.textContent = `${data.firstName} ${data.lastName}`;
        }
    }

   
    function renderSkills(skillsArray) {
        
        const container = document.getElementById('skillsContainer');

        if (!container) return;

        
        container.innerHTML = '';

       
        skillsArray.forEach(skill => {
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

    
    function initAccordion() {
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
    }

    loadData();    
    initAccordion();

});