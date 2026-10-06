/*----------------togle icon navbar---------*/
let menuicon= document.querySelector("#menu-icon")
let navbar=document.querySelector(".navbar")
menuicon.addEventListener("click",()=>{
       menuicon.classList.toggle('fa-xmark')
       navbar.classList.toggle('active')
})

/*----------------scrool section active link---------*/

let sections= document.querySelectorAll('section')
let navlinks= document.querySelectorAll('header nav a')
window.onscroll= ()=>{
    
    sections.forEach(sec =>{
        let top= window.scrollY;
        let offset= sec.offsetTop-150;
        let height=sec.offsetHeight;
        let id= sec.getAttribute('id')

        if(top >= offset && top < offset + height){
            navlinks.forEach(links =>{
                links.classList.remove('active')
                document.querySelector('header nav a[href="#' + id + '"]').classList.add('active');
            });
        };
    });

    /*---------------------sticky navbar--------------*/

    let header= document.querySelector('header')
    header.classList.toggle('sticky', window.scrollY > 100)

    /*----------------remove toggle icon and navbar--------*/
    menuicon.classList.remove('fa-xmark')
    navbar.classList.remove('active')
}

   /*----------------scrool reveal (behaivour)--------*/
   ScrollReveal({
     distance:'80px',
     duration: 2000,
     delay: 200,
    });

    ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
    ScrollReveal().reveal('.home-img, .services-container, .project-box, .contact form, footer', { origin: 'bottom' });
    ScrollReveal().reveal('.home-content h1, .about-img, .contact-content', { origin:'left' });
    ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

     /*----------------name typed (typed js)--------*/

     const typed= new Typed('.multiple-text',{
        strings:['Fullstack Developer', 'Web Developer','MERN STACK Developer','App Developer'],
        typeSpeed:70,
        backSpeed:70,
        backDelay:2000,
        loop:true,
     });

