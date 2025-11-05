document.addEventListener('DOMContentLoaded',()=>{
  const reveals=document.querySelectorAll('.reveal');
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);} });
  },{threshold:0.1});
  reveals.forEach(r=>obs.observe(r));

  document.querySelectorAll('.accordion-toggle').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const exp=btn.getAttribute('aria-expanded')==='true';
      btn.setAttribute('aria-expanded',!exp);
      const panel=btn.nextElementSibling;panel.hidden=exp;
    });
  });

  const slider=document.getElementById('co2-slider');
  const temp=document.getElementById('temp-display');
  const fill=document.querySelector('.progress-fill');
  if (slider && temp && fill) {
    slider.addEventListener('input',()=>{
      const co2=+slider.value;
      const t=((co2-280)/200*2).toFixed(1);
      temp.textContent='+'+t+'°C';
      fill.style.width=((co2-300)/(800-300)*100)+'%';
    });
  }

  const form=document.getElementById('feedback-form');
  const results=document.getElementById('feedback-results');
  if (form && results) {
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const data=Object.fromEntries(new FormData(form).entries());
      const box=document.createElement('div');
      box.style.marginTop='1rem';
      box.innerHTML='<strong>'+data.name+'</strong> ('+data.role+') rated '+data.rating+'/5<br>'+data.comments;
      results.prepend(box);
      form.reset();
    });
  }
});