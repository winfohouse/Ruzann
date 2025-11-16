console.log('Scrept loaded')


const activeDot = `<img width="31" height="31" class="indicator-active indicator-dot " alt="carousel dots"
src="./assist/cloudfront/brightchamps-new-website/abstract_shape_active.webp">`

const inActiveDot = `<img width="17" height="17" class="indicator-inactive indicator-dot " alt="carousel dots"
src="./assist/cloudfront/brightchamps-new-website/abstract_circle.webp">`

// langues setup
const LanguageContainer = document.querySelector('.navbar-selectLanguageContainer');
LanguageContainer.addEventListener('click', () => {
    togoleClass(document.querySelector('.navbar-polygonIcon'), 'navbar-polygonIconRotate')
    togoleClass(document.querySelector('.navbar-languageDropdown'), 'active')
})


// How it Works section
togoleContenerClassByClcik('.ExpandablePanel-step', 'active')

// FAQS section
togoleContenerClassByClcik('.FAQBox-container', 'FAQBox-selectedFaqContainer')


// togole all active class
function togoleClass(element, className) {
    if (!element) console.log(element)

    let classList = element.classList
    if (classList.contains(className)) {
        classList.remove(className)
    }
    else {
        classList.add(className);
    }
}

function togoleContenerClassByClcik(contenerClassName, togoleClassName) {
    // expand able plates
    const expandablePanels = document.querySelectorAll(contenerClassName);
    expandablePanels.forEach(expandablePanel => {
        expandablePanel.addEventListener('click', () => {

            // remove all active class
            expandablePanels.forEach(expandablePanelS => {
                expandablePanelS.classList.remove(togoleClassName)
            })

            // togle clicked one
            togoleClass(expandablePanel, togoleClassName)
        })

    })
}


function setSlideIndicator(section) {
    const dotindicator = section.querySelector(".indicator-dotWrapper");
    if (!dotindicator) return;

    const slider = section.querySelector(".SlickCarousal-track");
    const slides = slider.querySelectorAll(".SlickCarousal-slide");


    let margeDot = ""
    if (slides.length < 1) return;
    for (let index = 0; index < slides.length; index++) {
        if (index === 0) { margeDot = activeDot; continue; }
        margeDot += inActiveDot
    }

    dotindicator.innerHTML = margeDot;
}

// set for all section
document.querySelectorAll('section').forEach(section => setSlideIndicator(section))


// const chooseBrightchampsSection = document.querySelector('[aria-label="Why Choose Brightchamps"]');
// const chooseBrightchampsSectionSlides = chooseBrightchampsSection.querySelectorAll(".SlickCarousal-slide");

// let chooseBrightchampsSectionInterval = 0;
// setInterval(() => {
//     let slideIndex = chooseBrightchampsSectionInterval % chooseBrightchampsSectionSlides.length // in renge of slide length
//     chooseBrightchampsSection.scrollTo({
//         left: chooseBrightchampsSectionSlides[slideIndex],
//         behavior: 'smooth'
//     });

//     console.log({ chooseBrightchampsSectionInterval, dom: chooseBrightchampsSectionSlides[slideIndex], slideIndex });
//     chooseBrightchampsSectionInterval++ // increase by 1
// }, 2000); // 2 secend

const slider = document.getElementById("slider");

let index = 0;

document.getElementById("next-button").onclick = () => {
    index++;
    if (index >= slides.length) index = slides.length - 1;

    slider.scrollTo({
        left: slides[index].offsetLeft,
        behavior: "smooth"
    });
    console.log({ slide: slides[index], index })
};

document.getElementById("previous-button").onclick = () => {
    index--;
    if (index < 0) index = 0;

    slider.scrollTo({
        left: slides[index].offsetLeft,
        behavior: "smooth"
    });
    console.log({ slide: slides[index], index })
};
