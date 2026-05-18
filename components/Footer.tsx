'use client';

export function Footer() {
  return (
    <footer className="relative bg-atlas w-full text-washi pt-20 border-t border-saffron/20 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 pb-24 z-10 relative">
        
        {/* Brand */}
        <div className="flex flex-col">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 border border-saffron rounded-t-full rounded-b-xl flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              <span className="font-display text-saffron text-2xl">⛩</span>
            </div>
          </div>
          <h3 className="font-display text-2xl leading-tight mb-2">CAFÉ <br/> MARRAKECH</h3>
          <p className="font-jp text-sm text-washi/50 mb-6">珈琲の道は、マラケシュで始まる</p>
          <div className="font-sans text-sm font-light text-washi/70 space-y-3">
            <p>Born from the convergence of two ancient cultures of hospitality.</p>
            <p>Every cup carries the warmth of a Moroccan medina and the precision of a Kyoto tea ceremony.</p>
            <p className="italic text-saffron pt-2">Come as a stranger. Leave as family.</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col">
          <span className="font-jp text-[10px] text-washi/30 mb-1">探索</span>
          <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-saffron border-b border-saffron/30 pb-2 mb-6 inline-block self-start">EXPLORER</h4>
          <ul className="space-y-4 font-sans text-lg font-light text-washi/80">
            {['Accueil', 'Notre Menu', 'Notre Histoire', 'Sakura 🌸', 'Nos Origines', 'Nous Trouver'].map(link => (
              <li key={link} className="group cursor-pointer flex items-center gap-2 hover:text-saffron transition-colors">
                <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-xs">→</span>
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Find Us */}
        <div className="flex flex-col">
          <span className="font-jp text-[10px] text-washi/30 mb-1">場所</span>
          <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-saffron border-b border-saffron/30 pb-2 mb-6 inline-block self-start">NOUS TROUVER</h4>
          <div className="font-sans text-sm text-washi/80 leading-relaxed mb-6">
            <p className="text-marrakech mb-1">📍 12 Derb Sidi Ahmed Tijaniyy</p>
            <p>Médina de Marrakech, 40000</p>
            <p>Royaume du Maroc</p>
          </div>
          <div className="font-mono text-[10px] tracking-wider text-washi/60 space-y-2">
            <div className="flex justify-between border-b border-washi/10 pb-1"><span>Lun–Ven</span> <span>07:00 – 22:00</span></div>
            <div className="flex justify-between border-b border-washi/10 pb-1"><span>Samedi</span> <span>08:00 – 23:00</span></div>
            <div className="flex justify-between border-washi/10 pb-1"><span>Dimanche</span> <span>09:00 – 21:00</span></div>
          </div>
        </div>

        {/* Connect */}
        <div className="flex flex-col">
          <span className="font-jp text-[10px] text-washi/30 mb-1">つながる</span>
          <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-saffron border-b border-saffron/30 pb-2 mb-6 inline-block self-start">NOUS SUIVRE</h4>
          <div className="grid grid-cols-2 gap-4 mb-10 font-sans text-sm text-washi/80">
            <a href="#" className="hover:text-saffron">Instagram</a>
            <a href="#" className="hover:text-saffron">TikTok</a>
            <a href="#" className="hover:text-saffron">WhatsApp</a>
            <a href="#" className="hover:text-saffron">Pinterest</a>
          </div>
          
          <div className="mt-auto">
            <h5 className="font-mono text-[10px] tracking-widest text-saffron mb-2">RECEVOIR NOS RITUELS</h5>
            <p className="font-sans text-xs text-washi/60 mb-4">Menus saisonniers, histoires et mélanges exclusifs.</p>
            <div className="flex border border-saffron/30 rounded-full overflow-hidden bg-white/5 focus-within:border-saffron transition-colors">
              <input type="email" placeholder="Email.." className="bg-transparent px-4 py-2 text-sm w-full outline-none text-washi placeholder:text-washi/30" />
              <button className="px-4 text-xs font-mono tracking-widest text-saffron border-l border-saffron/30 hover:bg-saffron/10">→</button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full border-t border-washi/10 py-6 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between font-mono text-[10px] tracking-widest text-washi/40 z-10 bg-atlas">
        <div>© 2024 Café Marrakech. Tous droits réservés.</div>
        <div className="flex items-center gap-6 my-4 md:my-0 text-lg opacity-50">
          <span className="hover:scale-110 transition-transform cursor-pointer">🌙</span>
          <span className="h-1 w-1 bg-saffron rounded-full"></span>
          <span className="hover:scale-110 transition-transform cursor-pointer">⛩</span>
          <span className="h-1 w-1 bg-saffron rounded-full"></span>
          <span className="hover:scale-110 transition-transform cursor-pointer">☕</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Conçu avec amour · Marrakech × Tokyo</span>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth'})} className="text-saffron hover:text-washi transition-colors">↑ HAUT DE PAGE</button>
        </div>
      </div>
    </footer>
  );
}
